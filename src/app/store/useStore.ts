import { create } from 'zustand'

interface Coursework {
  courseworkType: string;
  subject: string;
  essayTitle: string;
}

interface StoreState {
  file: File | null;
  coursework: Coursework | null;
  addFile: (file: File) => void;
  addCoursework: (coursework: Coursework) => void;
}

const useStore = create<StoreState>((set) => ({
  file: null,
  coursework: null,
  addFile: (file) => set({ file }),
  addCoursework: (coursework) => set({ coursework }),
}))

export default useStore