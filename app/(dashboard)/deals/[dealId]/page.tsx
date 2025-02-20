import { notFound } from 'next/navigation';
import { db } from '@/app/db';
import { dealsTable } from '@/app/db/schema/deals';
import { eq } from 'drizzle-orm';
import { ImageCarousel } from './components/ImageCarousel';
import { QuickFactsCard } from './components/QuickFactsCard';
import { AboutDealCard } from './components/AboutDealCard';
import { LocationCard } from './components/LocationCard';
import { UserCard } from '@/components/UserCard';
import { clerkClient } from '@clerk/nextjs/server';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface DealPageProps {
  params: {
    dealId: string;
  };
}

async function getDeal(dealId: string) {
  'use server';
  try {
    const deal = await db.query.dealsTable.findFirst({
      where: eq(dealsTable.id, dealId)
    });

    if (!deal) {
      notFound();
    }
    return deal;
  } catch (error) {
    // console.error(error);
    notFound();
  }
}

async function getUser(userId: string) {
  'use server';
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    avatarUrl: user.imageUrl,
    lastSignInAt: user.lastSignInAt ?? undefined
  };
}

export default async function DealPage({ params }: DealPageProps) {
  const deal = await getDeal(params.dealId);
  const user = await getUser(deal.userId);

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* back to deals button */}
      <section>
        <Button variant="outline" asChild>
          <Link href="/deals">
            <ArrowLeft />
            Back to Deals
          </Link>
        </Button>
      </section>
      {/* Image Carousel Card */}
      <section>
        <ImageCarousel images={deal.images} />
      </section>

      {/* Quick Facts Card */}
      <section>
        <QuickFactsCard
          dealName={deal.dealName}
          amount={deal.financials.amountNeeded}
          interestRate={deal.financials.interestRate}
          term={deal.financials.loanTerm}
        />
      </section>

      {/* About Deal & Location Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <AboutDealCard
            description={deal.description}
            financials={deal.financials}
            propertyDetails={deal.propertyDetails}
          />
        </section>
        <section className="space-y-8">
          <LocationCard address={deal.propertyDetails.address} />
          <UserCard
            name={user.name}
            id={user.id}
            avatarUrl={user.avatarUrl}
            lastSignInAt={user.lastSignInAt}
          />
        </section>
      </div>
    </main>
  );
}
