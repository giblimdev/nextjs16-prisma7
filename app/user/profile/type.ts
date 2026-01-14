// @/types/auth.ts

import { UserRole } from "@/lib/generated/prisma/client";

/**
 * Types d'authentification basés sur le schéma Prisma
 * Utilise uniquement les rôles (UserRole) - pas de système de permissions
 */

// ✅ Utilisateur EXACT selon ton schéma
export interface ExtendedUser {
  id: string;
  name: string;              // pseudo
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  roles: UserRole[];         // Tableau enum avec @default([USER])
}

// ✅ Session EXACTE selon ton schéma
export interface ExtendedSession {
  user: ExtendedUser;
  session: {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

// ✅ Account EXACT selon ton schéma
export interface UserAccount {
  id: string;
  userId: string;
  accountId: string;
  providerId: string;
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: Date | null;
  refreshTokenExpiresAt: Date | null;
  scope: string | null;
  idToken: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Verification EXACTE selon ton schéma
export interface Verification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt: Date | null;
  updatedAt: Date | null;
}

// ✅ Type pour les données de session useSession()
export interface SessionData {
  user: ExtendedUser;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
  };
}

// ✅ Helpers pour vérifier les RÔLES uniquement

export function hasRole(roles: UserRole[], role: UserRole): boolean {
  return roles.includes(role);
}

export function hasAnyRole(roles: UserRole[], requiredRoles: UserRole[]): boolean {
  return roles.some(role => requiredRoles.includes(role));
}

export function hasAllRoles(roles: UserRole[], requiredRoles: UserRole[]): boolean {
  return requiredRoles.every(role => roles.includes(role));
}

export function isAdmin(roles: UserRole[]): boolean {
  return roles.includes(UserRole.ADMIN);
}

export function isDev(roles: UserRole[]): boolean {
  return roles.includes(UserRole.DEV) || roles.includes(UserRole.ADMIN);
}

export function isVendor(roles: UserRole[]): boolean {
  return roles.includes(UserRole.VENDOR) || roles.includes(UserRole.ADMIN);
}

export function isClient(roles: UserRole[]): boolean {
  return roles.includes(UserRole.CLIENT);
}

export function isUser(roles: UserRole[]): boolean {
  return roles.includes(UserRole.USER);
}

// ✅ Type pour les données d'inscription
export interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

// ✅ Type pour les données de connexion
export interface SignInData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// ✅ Type pour la mise à jour du profil
export interface UpdateProfileData {
  name?: string;
  email?: string;
  image?: string | null;
}

// ✅ Type pour le changement de mot de passe
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ✅ Type pour la réponse d'authentification
export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: ExtendedUser;
  session?: SessionData["session"];
  error?: string;
}

// ✅ Type pour les erreurs d'authentification
export enum AuthErrorCode {
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
  WEAK_PASSWORD = "WEAK_PASSWORD",
  SESSION_EXPIRED = "SESSION_EXPIRED",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  INVALID_TOKEN = "INVALID_TOKEN",
  EMAIL_NOT_VERIFIED = "EMAIL_NOT_VERIFIED",
}

// ✅ Type pour les erreurs formatées
export interface AuthError {
  code: AuthErrorCode;
  message: string;
  field?: string;
}
