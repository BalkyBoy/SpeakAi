/**
 * Lesson Store — active learning session and per-lesson progress for SpeakAI
 *
 * Owns: per-lesson progress records, the currently active session (step
 * tracking, interim answers), recording state, and async lesson submission.
 *
 * Only `progress` is persisted so learners can resume across page reloads.
 * The active session is intentionally ephemeral — a hard refresh clears it,
 * preventing half-finished sessions from being restored in a broken state.
 *
 * Selector pattern (performance):
 *   ✅ const isRecording = useLessonStore(state => state.isRecording)
 *      → re-renders only when isRecording changes
 *
 *   ❌ const { isRecording } = useLessonStore()
 *      → subscribes to the entire store; re-renders on every state change
 */

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  /** Overall lesson score 0–100, null before first submission */
  score: number | null;
  attempts: number;
  lastAttemptAt: Date | null;
  /** AI-graded pronunciation score 0–100, null before first submission */
  pronunciationScore: number | null;
}

export interface ActiveSession {
  lessonId: string;
  startedAt: Date;
  currentStep: number;
  totalSteps: number;
  /** Keyed by step identifier — stores the learner's answer for each step */
  answers: Record<string, unknown>;
}

interface LessonState {
  // ---- State ----------------------------------------------------------------
  /** All known lesson progress records, keyed by lessonId */
  progress: Record<string, LessonProgress>;
  activeSession: ActiveSession | null;
  isRecording: boolean;
  lastError: string | null;

  // ---- Sync actions ---------------------------------------------------------
  startSession: (lessonId: string, totalSteps: number) => void;
  endSession: () => void;
  nextStep: () => void;
  saveAnswer: (stepKey: string, answer: unknown) => void;
  setRecording: (recording: boolean) => void;

  // ---- Async actions --------------------------------------------------------
  /**
   * Submit the completed lesson and update progress.
   *
   * Demonstrates the optimistic-update + async pattern:
   * 1. Immediately write the new score to the store (optimistic).
   * 2. Simulate an API call with a short delay.
   * 3. In production, replace the setTimeout with a real API call and roll
   *    back the optimistic update on failure.
   */
  submitLesson: (
    lessonId: string,
    score: number,
    pronunciationScore: number,
  ) => Promise<void>;

  resetProgress: (lessonId: string) => void;
  clearError: () => void;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useLessonStore = create<LessonState>()(
  devtools(
    persist(
      (set, get) => ({
        // ---- Initial state --------------------------------------------------
        progress: {},
        activeSession: null,
        isRecording: false,
        lastError: null,

        // ---- Session lifecycle ----------------------------------------------

        startSession: (lessonId, totalSteps) =>
          set(
            {
              activeSession: {
                lessonId,
                startedAt: new Date(),
                currentStep: 0,
                totalSteps,
                answers: {},
              },
              lastError: null,
            },
            false,
            "lesson/startSession",
          ),

        endSession: () =>
          set(
            { activeSession: null, isRecording: false },
            false,
            "lesson/endSession",
          ),

        nextStep: () =>
          set(
            (state) => {
              if (!state.activeSession) return state;

              const next = state.activeSession.currentStep + 1;
              const clamped = Math.min(
                next,
                state.activeSession.totalSteps - 1,
              );

              return {
                activeSession: {
                  ...state.activeSession,
                  currentStep: clamped,
                },
              };
            },
            false,
            "lesson/nextStep",
          ),

        saveAnswer: (stepKey, answer) =>
          set(
            (state) => {
              if (!state.activeSession) return state;

              return {
                activeSession: {
                  ...state.activeSession,
                  answers: {
                    ...state.activeSession.answers,
                    [stepKey]: answer,
                  },
                },
              };
            },
            false,
            "lesson/saveAnswer",
          ),

        setRecording: (recording) =>
          set({ isRecording: recording }, false, "lesson/setRecording"),

        // ---- Async submission -----------------------------------------------

        submitLesson: async (lessonId, score, pronunciationScore) => {
          const existing = get().progress[lessonId];

          // --- Optimistic update ---
          set(
            (state) => ({
              progress: {
                ...state.progress,
                [lessonId]: {
                  lessonId,
                  completed: score >= 70, // passing threshold
                  score,
                  pronunciationScore,
                  attempts: (existing?.attempts ?? 0) + 1,
                  lastAttemptAt: new Date(),
                },
              },
              lastError: null,
            }),
            false,
            "lesson/submitLesson/optimistic",
          );

          try {
            // --- Simulated API call (replace with real endpoint) ---
            await new Promise<void>((resolve) => setTimeout(resolve, 400));

            /*
             * Production example:
             *
             * const response = await apiClient.post('/lessons/submit', {
             *   lessonId, score, pronunciationScore,
             * })
             * // Reconcile server response if it differs from the optimistic state
             * set({ progress: { ...get().progress, [lessonId]: response.data } })
             */

            set({}, false, "lesson/submitLesson/confirmed");
          } catch (err) {
            // --- Roll back on failure ---
            set(
              (state) => ({
                progress: existing
                  ? { ...state.progress, [lessonId]: existing }
                  : (() => {
                      const next = { ...state.progress };
                      delete next[lessonId];
                      return next;
                    })(),
                lastError:
                  err instanceof Error
                    ? err.message
                    : "Failed to submit lesson",
              }),
              false,
              "lesson/submitLesson/rollback",
            );
          }
        },

        // ---- Utility --------------------------------------------------------

        resetProgress: (lessonId) =>
          set(
            (state) => {
              const next = { ...state.progress };
              delete next[lessonId];
              return { progress: next };
            },
            false,
            "lesson/resetProgress",
          ),

        clearError: () => set({ lastError: null }, false, "lesson/clearError"),
      }),

      {
        name: "speakai-lessons",
        // Only persist progress — active session is intentionally ephemeral
        partialize: (state) => ({ progress: state.progress }),
      },
    ),
    { name: "LessonStore" },
  ),
);
