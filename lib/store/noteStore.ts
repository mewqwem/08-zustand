import { type CreateNote } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NoteDraft {
  noteData: CreateNote;
  setNoteData: (newNoteData: CreateNote) => void;
  clearNoteData: () => void;
}

const initialNoteData: CreateNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraft = create<NoteDraft>()(
  persist(
    (set) => {
      return {
        noteData: initialNoteData,
        setNoteData: (newNoteData) => {
          set({
            noteData: newNoteData,
          });
        },
        clearNoteData: () => {
          set({
            noteData: initialNoteData,
          });
        },
      };
    },
    {
      name: "NoteDraft",
      partialize: (state) => ({ noteData: state.noteData }),
    },
  ),
);
