"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";
import { useRouter } from "next/router";
import css from "@/components/NotePreview/NotePreview.module.css";

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getNote", id],
    queryFn: () => fetchNoteById(id),
    staleTime: 60 * 1000,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <>
      <button className={css.backBtn} onClick={handleClose}>
        Close
      </button>
      {note && <NotePreview note={note} />}
    </>
  );
}
