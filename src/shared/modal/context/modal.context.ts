'use client';

import { createContext } from 'react';
import { ModalContextType } from '../types/modal.types';

export const ModalContext = createContext<ModalContextType | null>(null);
