'use client'; // Ensure this is a client component

import { setupWorker } from 'msw/browser';
import { handlers } from './handler';

export const worker = setupWorker(...handlers);
