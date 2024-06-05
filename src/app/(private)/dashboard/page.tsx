import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { UserDataButton } from './components/UserDataButton';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    return <Link href="api/auth/login">Login</Link>;
  }

  return (
    session.user && (
      <div>
        <img src={session.user.picture} alt={session.user.name} />
        <h2>{session.user.name}</h2>
        <p>{session.user.email}</p>
        <UserDataButton></UserDataButton>
        <a href="/api/auth/login">Login</a>
      </div>
    )
  );
}
