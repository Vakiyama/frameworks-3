import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});
import { useState } from 'react';
import './index.css';
import { client } from '../lib/api';
import { useQuery } from '@tanstack/react-query';

async function getTest() {
  const res = await client.api.test.$get();
  if (!res.ok) {
    throw new Error('server error');
  }
  const data = await res.json();
  return data;
}

function Home() {
  const [count, setCount] = useState(0);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['test'],
    queryFn: getTest,
  });

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred' + error.message;

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}
