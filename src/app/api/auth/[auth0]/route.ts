import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export const GET = handleAuth({
  async login(req: any, res: any) {
    try {
      return await handleLogin(req, res, {
        authorizationParams: {
          audience: process.env.AUTH0_AUDIENCE,
          client_id: process.env.AUTH0_CLIENT_ID,
          scope: 'openid profile email offline_access',
        },
      });
    } catch (error: any) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async 'silent-login'(req: NextApiRequest, res: NextApiResponse) {
    console.log('silent-login');
    try {
      return await handleLogin(req, res, {
        returnTo: req.url || '/',
        authorizationParams: {
          prompt: 'none',
          audience: process.env.AUTH0_AUDIENCE,
          client_id: process.env.AUTH0_CLIENT_ID,
          scope: 'openid profile email offline_access',
        },
      });
    } catch (e: any) {
      res.status(e.status || 500).end(e.message);
    }
  },
});
