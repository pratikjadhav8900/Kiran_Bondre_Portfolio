import { create } from 'zustand'

interface OrbState {
  activeExperienceIndex: number | null
  orbTargetRect: DOMRect | null
  setActiveExperienceIndex: (index: number | null) => void
  setOrbTargetRect: (rect: DOMRect | null) => void
}

export const useOrbStore = create<OrbState>((set) => ({
  activeExperienceIndex: null,
  orbTargetRect: null,
  setActiveExperienceIndex: (index) => set({ activeExperienceIndex: index }),
  setOrbTargetRect: (rect) => set({ orbTargetRect: rect }),
}))
