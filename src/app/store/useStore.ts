import { create } from 'zustand'

interface Coursework {
  courseworkType: string;
  subject: string;
  essayTitle: string;
}

interface StoreState {
  file: File | null;
  courseworks: Coursework[]; // Changed to an array
  addFile: (file: File) => void;
  addCoursework: (coursework: Coursework) => void;
  addCourseworks: (courseworks: Coursework[]) => void; // Optional: Add a method to update the array
}

const useStore = create<StoreState>((set) => ({
  file: null,
  courseworks: [], // Initialize as an empty array
  addFile: (file) => set({ file }),
  addCoursework: (coursework) => set((state) => ({
    courseworks: [...state.courseworks, coursework] // Add new coursework to the array
  })),
  addCourseworks: (courseworks) => set({ courseworks }) // Optional: Set multiple courseworks at once
}))


export default useStore