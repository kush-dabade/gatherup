import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection'
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image'
import Link from 'next/link'

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  })

  return (
    <>
  <section className="relative py-20 md:py-32">
    <Image 
      src="/assets/images/hero.png"
      alt="hero background"
      fill
      priority
      className="object-cover object-center z-0"
    />

    <div className="absolute inset-0 bg-black/20 z-0"></div>

    <div className="wrapper relative z-10 grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0 text-white">
      <div className="flex flex-col justify-center gap-8">
        <h1 className="h1-bold">Discover Events Like Never Before!</h1>
        <p className="p-regular-20 md:p-regular-24">Land your next local gig. Shine on stage with GatherUp.</p>
        <Button size="lg" asChild className="button w-full sm:w-fit">
          <Link href="#events">Explore</Link>
        </Button>
      </div>
    </div>
  </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Trusted by <br /> Indie artists around the world</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection 
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  )
}
