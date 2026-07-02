/**
 * UI Store — global UI state for SpeakAI
 *
 * Owns: sidebar visibility, theme preference, active modal, toast-style
 * notifications, and network status.
 *
 * Only `theme` is persisted to localStorage. Everything else resets on page
 * load, which is the correct behaviour for ephemeral UI state.
 *
 * Selector pattern (performance):
 *   ✅ const sidebarOpen = useUIStore(state => state.sidebarOpen)
 *      → component only re-renders when sidebarOpen changes
 *
 *   ❌ const { sidebarOpen } = useUIStore()
 *      → subscribes to the entire store; re-renders on every state change
 */

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message?: string;
  createdAt: Date;
  /** When true the consumer should auto-dismiss after a timeout */
  autoClose?: boolean;
}

interface UIState {
  // ---- State ----------------------------------------------------------------
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";
  activeModal: string | null;
  notifications: Notification[];
  isOnline: boolean;

  // ---- Actions --------------------------------------------------------------
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  addNotification: (
    notification: Omit<Notification, "id" | "createdAt">,
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setOnline: (online: boolean) => void;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        // ---- Initial state --------------------------------------------------
        sidebarOpen: false,
        theme: "system",
        activeModal: null,
        notifications: [],
        isOnline: true,

        // ---- Sidebar --------------------------------------------------------
        toggleSidebar: () =>
          set(
            (state) => ({ sidebarOpen: !state.sidebarOpen }),
            false,
            "ui/toggleSidebar",
          ),

        setSidebarOpen: (open) =>
          set({ sidebarOpen: open }, false, "ui/setSidebarOpen"),

        // ---- Theme ----------------------------------------------------------
        setTheme: (theme) => set({ theme }, false, "ui/setTheme"),

        // ---- Modal ----------------------------------------------------------
        openModal: (modalId) =>
          set({ activeModal: modalId }, false, "ui/openModal"),

        closeModal: () =>
          set({ activeModal: null }, false, "ui/closeModal"),

        // ---- Notifications --------------------------------------------------
        addNotification: (notification) => {
          // Safe UUID generation — falls back to Math.random for old envs
          const id =
            typeof crypto !== "undefined" && crypto.randomUUID
              ? crypto.randomUUID()
              : Math.random().toString(36).slice(2);

          set(
            (state) => ({
              notifications: [
                ...state.notifications,
                { ...notification, id, createdAt: new Date() },
              ],
            }),
            false,
            "ui/addNotification",
          );
        },

        removeNotification: (id) =>
          set(
            (state) => ({
              notifications: state.notifications.filter((n) => n.id !== id),
            }),
            false,
            "ui/removeNotification",
          ),

        clearNotifications: () =>
          set({ notifications: [] }, false, "ui/clearNotifications"),

        // ---- Network --------------------------------------------------------
        setOnline: (online) => set({ isOnline: online }, false, "ui/setOnline"),
      }),

      {
        name: "speakai-ui",
        // Only persist the theme — everything else is ephemeral
        partialize: (state) => ({ theme: state.theme }),
      },
    ),
    { name: "UIStore" },
  ),
);
