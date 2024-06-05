'use server';

import {
  getAccessToken,
  getSession,
  handleLogin,
  Session,
  updateSession,
} from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import React from 'react';
import * as jose from 'jose';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

type Props = {
  children: React.ReactNode;
};

const PrivatePagesLayout = async (props: Props) => {
  const session = await getSession();
  const pathname = headers().get('x-pathname');

  if (!session) redirect('/');

  const JWKS = jose.createRemoteJWKSet(
    new URL(`${process.env.AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`)
  );

  try {
    console.log('checking token');
    console.log(session.refreshToken);

    await jose.jwtVerify(session.accessToken!, JWKS, {
      issuer: `${process.env.AUTH0_ISSUER}`,
    });

    return props.children;
  } catch (err) {
    try {
      console.log('gettin new token');
      await handleLogin({
        returnTo: pathname?.toString(),
        authorizationParams: {
          prompt: 'none',
          audience: process.env.AUTH0_AUDIENCE,
          client_id: process.env.AUTH0_CLIENT_ID,
          scope: 'openid profile email offline_access',
        },
      });

      return props.children;
    } catch (err) {
      redirect('/');
    }
  }
};

export default PrivatePagesLayout;
