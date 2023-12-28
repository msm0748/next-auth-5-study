import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_CLIENT_ID!,
      clientSecret: process.env.AUTH_KAKAO_CLIENT_SECRET!,
    }),
  ],
});
