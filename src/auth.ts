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
      async profile(profile) {
        const name = profile.kakao_account?.profile?.nickname;
        const email = profile.kakao_account?.email;
        const image = profile.kakao_account?.profile?.profile_image_url;

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

        const data = await response.json();

        if (data) {
          const { accessToken, refreshToken } = data;
          // 브라우저에 쿠키를 심어주는 것
          cookies().set('accessToken', accessToken);
          cookies().set('refreshToken', refreshToken);
        }

        return {
          id: String(profile.id),
          name,
          email,
          image,
          role: data.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});
