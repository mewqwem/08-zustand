"use client";

import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import css from "@/components/NotePreview/NotePreview.module.css";

export default function NotePreviewClient() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["getNote", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleClose}>
      <button className={css.backBtn} onClick={handleClose}>
        Close
      </button>
      {note && <NotePreview note={note} />}
    </Modal>
  );
}
