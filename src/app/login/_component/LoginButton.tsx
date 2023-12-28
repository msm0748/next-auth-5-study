'use client';

import { signIn } from 'next-auth/react';

export default function LoginButton() {
  const onLogin = async () => {
    await signIn('kakao', {
      redirect: true,
      callbackUrl: '/',
    });
  };
  return (
    <button onClick={onLogin} className="border-2 p-2">
      카카오 로그인
    </button>
  );
}
