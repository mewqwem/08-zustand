"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { BarLoader } from "react-spinners";
import toast from "react-hot-toast";
import { getNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import css from "./App.module.css";
import Link from "next/link";

interface NotesClientProps {
  tag?: string[];
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const perPage = 12;
  const tagValue = tag?.[0];
  const currentTag = tagValue === "all" ? undefined : tagValue;

  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["getNotes", searchValue, page, currentTag],
    queryFn: () => getNotes(searchValue, page, perPage, currentTag),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  useEffect(() => {
    if (!isLoading && !isFetching && notes.length === 0 && searchValue !== "") {
      toast.error("No notes found for your search!");
    }
    if (isError) {
      toast.error("Server error! Please try again.");
    }
  }, [notes.length, isLoading, isFetching, isError, searchValue]);

  const searchNote = useDebouncedCallback((value: string) => {
    setSearchValue(value);
    setPage(1);
  }, 500);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={searchNote} value={searchValue} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
          <Link href="/notes/action/create" className="btn-create">
            Create note +
          </Link>
        </header>

        {isLoading ? (
          <BarLoader color="#0029ff" />
        ) : notes.length === 0 ? (
          <p>Notes not found</p>
        ) : (
          <NoteList notes={notes} />
        )}
      </div>
    </>
  );
}
