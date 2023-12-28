'use client';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  const onLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };
  return (
    <button onClick={onLogout} className="border-2 p-2">
      로그아웃
    </button>
  );
}
