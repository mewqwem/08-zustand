import axios from "axios";
import type { Note, NoteData } from "../types/note.ts";

const NEXT_PUBLIC_NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const notesInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

export const getNotes = async (
  search: string,
  page: number,
  perPage: number,
  tag?: string,
): Promise<NotesResponse> => {
  const { data } = await notesInstance.get<NotesResponse>("/notes", {
    params: {
      page: page,
      perPage: perPage,
      search: search,
      tag: tag,
    },
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return data;
};

export const createNote = async (noteData: NoteData) => {
  const { data } = await notesInstance.post<Note>("/notes", noteData, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return data;
};

export const deleteNote = async (id: Note["id"]) => {
  const { data } = await notesInstance.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return data;
};

export const fetchNoteById = async (id: Note["id"]) => {
  const { data } = await notesInstance.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return data;
};
