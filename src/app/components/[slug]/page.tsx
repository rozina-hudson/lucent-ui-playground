import { notFound } from "next/navigation";

// this page renders a client-heavy playground; turn off static prerendering to
// avoid unexpected runtime errors during the build (see customizer additions).
export const dynamic = "force-dynamic";
import { getComponent, getAllSlugs, getPrevNext } from "@/lib/componentData";
import { DocLayout } from "@/components/docs/DocLayout";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const def = getComponent(slug);
  if (!def) return {};
  return {
    title: `${def.name} — Lucent UI`,
    description: def.description,
  };
}

export default async function ComponentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const def = getComponent(slug);
  if (!def) notFound();
  const { prev, next } = getPrevNext(slug);
  return <DocLayout def={def} prev={prev} next={next} />;
}
