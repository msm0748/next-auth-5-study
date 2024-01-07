import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import { cookies } from 'next/headers';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_CLIENT_ID!,
      clientSecret: process.env.AUTH_KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { name, email, image } = user;

      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          image,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) return false;

      const data = await response.json();

      const { accessToken, refreshToken } = data;
      // 브라우저에 쿠키를 심어주는 것
      cookies().set('accessToken', accessToken);
      cookies().set('refreshToken', refreshToken);

      return true;
    },
  },
});
