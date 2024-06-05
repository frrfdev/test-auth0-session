'use client';

import { getSession, handleProfile, Session } from '@auth0/nextjs-auth0';
import { NextRequest } from 'next/server';

export async function getUserData() {
  // await handleProfile({
  //   afterRefetch: async (_: NextRequest, newSession: Session) => {
  //     console.log(newSession);
  //     return newSession;
  //   },
  // });

  const a = await fetch('http://localhost:3000/api/user/1');
  console.log(a);
  if (a.status !== 200) {
    throw new Error('Error fetching user data');
  }
  const b = await a.json();
  return b;
}
