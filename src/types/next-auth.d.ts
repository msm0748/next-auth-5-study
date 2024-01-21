import NextAuth, { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role: 'admin' | 'user';
    } & DefaultSession['user'];
  }
}

import { JWT } from '@auth/core/jwt';

declare module '@auth/core/jwt' {
  interface JWT {
    role: 'admin' | 'user';
  }
}
