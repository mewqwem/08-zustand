import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const actualTag = slug[0] as string;
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
