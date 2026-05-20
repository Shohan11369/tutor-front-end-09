// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL: "http://localhost:3000",
// });
// export const { signIn, signUp, signOut, useSession } = createAuthClient();
// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient();


import { createAuthClient } from 'better-auth/react';
import { jwtClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL, // .env এ NEXT_PUBLIC দিন
  plugins: [jwtClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;