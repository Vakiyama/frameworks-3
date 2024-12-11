/*
'use server';

import crypto from 'crypto';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { eq, InferInsertModel } from 'drizzle-orm';
import { songsTable } from '@/db/schema/song';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';

const allowedFileTypes = ['audio/mp3', 'audio/mpeg'];

const maxFileSize = 1048576 * 100; // 10 MB

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

type SignedURLResponse = Promise<
  | { failure?: undefined; success: { url: string } }
  | { failure: string; success?: undefined }
>;

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex');

export async function getSignedURL(params: {
  fileType: string;
  fileSize: number;
  checksum: string;
}): SignedURLResponse {
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    return { failure: 'not authenticated' };
  }

  if (!allowedFileTypes.includes(params.fileType)) {
    return { failure: 'File type not allowed' };
  }

  if (params.fileSize > maxFileSize) {
    return { failure: 'File size too large' };
  }

  const user = await getUser();

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateFileName(),
    ContentType: params.fileType,
    ContentLength: params.fileSize,
    ChecksumSHA256: params.checksum,
    Metadata: {
      userId: user.id,
    },
  });

  const url = await getSignedUrl(
    s3Client,
    putObjectCommand,
    { expiresIn: 60 } // 60 seconds
  );

  return { success: { url } };
}

export async function createSong(song: InferInsertModel<typeof songsTable>) {
  await db.insert(songsTable).values(song);
  revalidatePath('/', 'layout');
}

export async function deleteSong(id: number) {
  try {
    const deletedMedia = await db
      .delete(songsTable)
      .where(eq(songsTable.id, id))
      .returning()
      .then((res) => res[0]);

    await db.delete(songsTable).where(eq(songsTable.id, id)).returning();

    if (deletedMedia) {
      const url = deletedMedia.url;
      const key = url.split('/').slice(-1)[0];

      const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
      };

      await s3Client.send(new DeleteObjectCommand(deleteParams));
    }

    revalidatePath('/', 'layout');
  } catch (e) {
    console.error(e);
  }
}
*/
