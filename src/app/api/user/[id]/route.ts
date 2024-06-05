import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withApiAuthRequired(async (req: NextRequest, ctx: any) => {
  const session = await getSession();
  console.log(session);
  return NextResponse.json({ message: 'Hello, World!' }, { status: 200 });
});
