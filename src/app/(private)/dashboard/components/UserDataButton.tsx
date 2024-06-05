'use client';

import React from 'react';
import { getUserData } from '../actions/getUserData';

export const UserDataButton = () => {
  return <button onClick={() => getUserData()}>Get User</button>;
};
