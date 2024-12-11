import { ClassicalIcon } from '@/assets/genre-icons/classical-icon';
import { ElectronicIcon } from '@/assets/genre-icons/electronic-icon';
import { HipHopIcon } from '@/assets/genre-icons/hip-hop-icon';
import { JazzIcon } from '@/assets/genre-icons/jazz-icon';
import { PopIcon } from '@/assets/genre-icons/pop-icon';
import { RockIcon } from '@/assets/genre-icons/rock-icon';

export const genres = [
  { name: 'Rock', icon: <RockIcon /> },
  { name: 'Jazz', icon: <JazzIcon /> },
  { name: 'Hip Hop', icon: <HipHopIcon /> },
  { name: 'Classical', icon: <ClassicalIcon /> },
  { name: 'Electronic', icon: <ElectronicIcon /> },
  { name: 'Pop', icon: <PopIcon /> },
] as const;
