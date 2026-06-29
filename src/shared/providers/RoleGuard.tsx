'use client';

import { ReactNode } from 'react';
import { useAuth } from '../auth/hooks/use-auth';
import { Role } from '../auth/types/auth.types';

interface RoleGuardProps {
  roles: Role[];
  children: ReactNode;
}

export function RoleGuard({ roles, children }: RoleGuardProps) {
  const { role, user } = useAuth();

  if (!user) return null;

  return roles.includes(role as Role) ? children : null;
}
