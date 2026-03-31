import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug.join(" / ");

  return {
    title: `Notes: ${filter}`,
    description: `Viewing notes filtered by: ${filter}`,
    openGraph: {
      title: `Notes filtered by ${filter}`,
      description: `Explore all notes categorized under ${filter}.`,
      url: `https://08-zustand-lac-delta.vercel.app/notes/filter/${slug.join("/")}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Preview",
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;

  const actualTag = slug[0];
  const tagForApi = actualTag === "all" ? undefined : actualTag;

  const queryClient = new QueryClient();
  const perPage = 12;

  await queryClient.prefetchQuery({
    queryKey: ["getNotes", "", 1, tagForApi],
    queryFn: () => getNotes("", 1, perPage, tagForApi),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={slug} />
    </HydrationBoundary>
  );
}
