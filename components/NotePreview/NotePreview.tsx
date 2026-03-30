import React from "react";
import css from "./NotePreview.module.css";
import { Note } from "@/types/note";

interface NotePreviewProps {
  note: Note;
}

function NotePreview({ note }: NotePreviewProps) {
  return (
    <>
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default NotePreview;
