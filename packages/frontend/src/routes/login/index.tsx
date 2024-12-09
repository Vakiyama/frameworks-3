import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login/')({
  component: Login,
})

function Login() {
  return (
    <div className="mx-4 flex flex-col items-center justify-center h-[80%]">
      <div className="py-4 rounded-lg mt-8 bg-lightest w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl semibold">Welcome back!</h1>
        <div className="flex flex-col items-center justify-center gap-2 mt-8">
          <a href="/api/login">
            <button className="rounded w-40 py-1 bg-dark text-white">
              Sign in
            </button>
          </a>
          <a href="/api/register">
            <button className="rounded w-40 py-1 border-2 border-dark">
              Sign up
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
