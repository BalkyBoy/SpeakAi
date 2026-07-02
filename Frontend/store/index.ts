/**
 * Store barrel export
 *
 * Import stores and their public types from here rather than from individual
 * store files. This keeps import paths short and makes it easy to see the
 * full surface area of the global state layer at a glance.
 *
 * Usage:
 *   import { useUIStore, useLessonStore } from '@/store'
 *   import type { Notification, LessonProgress } from '@/store'
 */

export { useAuthStore } from "./use-auth-store";
export type { UserProfile, AuthSession } from "./use-auth-store";

export { useUIStore } from "./use-ui-store";
export type { Notification } from "./use-ui-store";

export { useLessonStore } from "./use-lesson-store";
export type { LessonProgress, ActiveSession } from "./use-lesson-store";
