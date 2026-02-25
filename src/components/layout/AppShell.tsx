import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function AppShell() {
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <Sidebar />
      <main className="flex-1 ml-60 p-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}