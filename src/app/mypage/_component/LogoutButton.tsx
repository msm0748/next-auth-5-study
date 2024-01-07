'use client';
import { signOut } from 'next-auth/react';
import { deleteCookie } from 'cookies-next';

export default function LogoutButton() {
  const onLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' }).then(() => {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
    });
  };
  return (
    <button onClick={onLogout} className="border-2 p-2">
      로그아웃
    </button>
  );
}
