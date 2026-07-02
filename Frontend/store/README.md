# SpeakAI — State Management

Zustand v5 is used for **synchronous, client-side UI and session state**. TanStack Query v5 is used for **server state** (data fetched from the API). They serve different concerns and should not overlap.

---

## Store map

| Store | File | Persisted | Owns |
|---|---|---|---|
| `useAuthStore` | `use-auth-store.ts` | `session` | JWT token, user profile, auth loading/error |
| `useUIStore` | `use-ui-store.ts` | `theme` | Sidebar, active modal, notifications, online status |
| `useLessonStore` | `use-lesson-store.ts` | `progress` | Active learning session, per-lesson progress, recording state |

All stores are re-exported from `index.ts`:

```ts
import { useAuthStore, useUIStore, useLessonStore } from '@/store'
import type { Notification, LessonProgress } from '@/store'
```

---

## Selector pattern — always subscribe to a slice

Subscribing to the whole store causes a re-render on **every** state change, even fields the component doesn't use.

```ts
// ✅ Subscribe to a slice — re-renders only when sidebarOpen changes
const sidebarOpen = useUIStore(state => state.sidebarOpen)
const toggleSidebar = useUIStore(state => state.toggleSidebar)

// ❌ Subscribes to the entire store — re-renders on any change
const { sidebarOpen, toggleSidebar } = useUIStore()
```

For components that need several fields from the same store, pull each one with a separate selector call or use the `useShallow` helper from `zustand/shallow`:

```ts
import { useShallow } from 'zustand/shallow'

const { sidebarOpen, activeModal } = useUIStore(
  useShallow(state => ({ sidebarOpen: state.sidebarOpen, activeModal: state.activeModal }))
)
```

---

## Adding a new store

1. Create `Frontend/store/use-my-feature-store.ts`.
2. Follow the same pattern: `create<MyState>()(devtools(persist(...)))`.
3. Only `partialize` the fields that genuinely need to survive a page refresh.
4. Give the devtools a readable `name` (`{ name: 'MyFeatureStore' }`).
5. Give the persist config a namespaced key (`speakai-my-feature`).
6. Export the hook and its public types from `index.ts`.

```ts
// use-my-feature-store.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface MyFeatureState {
  count: number
  increment: () => void
}

export const useMyFeatureStore = create<MyFeatureState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set(state => ({ count: state.count + 1 }), false, 'myFeature/increment'),
      }),
      {
        name: 'speakai-my-feature',
        partialize: (state) => ({ count: state.count }),
      },
    ),
    { name: 'MyFeatureStore' },
  ),
)
```

---

## Zustand vs TanStack Query — when to use which

| Concern | Use |
|---|---|
| Data fetched from the API (lessons list, user stats) | **TanStack Query** — handles caching, background refetch, loading/error states |
| Derived UI state from server data | **TanStack Query** selectors / `select` option |
| Active lesson session (current step, interim answers) | **Zustand** — transient client state, no server round-trip needed |
| Accumulated lesson progress (local cache for offline UX) | **Zustand + persist** |
| Auth token / user profile | **Zustand + persist** — needs to be available synchronously before any query runs |
| Theme, sidebar, modal state | **Zustand** — pure UI state, never needs to hit the server |
| Form state | **react-hook-form** — purpose-built and more ergonomic than either |

The rule of thumb: if it comes from the server and needs to stay fresh, reach for TanStack Query. If it's owned by the client and needs to be read synchronously, reach for Zustand.
