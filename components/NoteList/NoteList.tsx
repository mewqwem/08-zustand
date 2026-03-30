"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { deleteNote } from "@/lib/api";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getNotes"] });
      toast.success("Note successfully deleted");
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note.");
    },
  });

  return (
    <>
      {mutation.isPending && (
        <div className={css.backdrop}>
          <BeatLoader color="#0029ff" size={40} />
        </div>
      )}
      <ul className={css.list}>
        {notes.map((note) => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`}>View details</Link>
              <button
                className={css.button}
                onClick={() => mutation.mutate(note.id)}
                disabled={mutation.isPending}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default NoteList;
