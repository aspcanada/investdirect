import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SelectDeal } from '@/app/db/schema/deals';
import { formatCurrency } from '@/lib/utils';

interface AboutDealCardProps {
  description: string;
  financials: SelectDeal['financials'];
  propertyDetails: SelectDeal['propertyDetails'];
}

export function AboutDealCard({
  description,
  financials,
  propertyDetails
}: AboutDealCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About this Deal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Financial Details</h3>
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <dt className="text-muted-foreground">Property Value</dt>
            <dd className="font-medium">{formatCurrency(financials.value)}</dd>
            <dt className="text-muted-foreground">Repair Costs</dt>
            <dd className="font-medium">
              {formatCurrency(financials.repairCosts)}
            </dd>
          </dl>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Property Details</h3>
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <dt className="text-muted-foreground">Property Type</dt>
            <dd className="font-medium">{propertyDetails.propertyType}</dd>
            <dt className="text-muted-foreground">Year Built</dt>
            <dd className="font-medium">{propertyDetails.year}</dd>
            <dt className="text-muted-foreground">Bedrooms</dt>
            <dd className="font-medium">{propertyDetails.bedrooms}</dd>
            <dt className="text-muted-foreground">Bathrooms</dt>
            <dd className="font-medium">{propertyDetails.bathrooms}</dd>
            <dt className="text-muted-foreground">Building Size</dt>
            <dd className="font-medium">{propertyDetails.buildingSf} sq ft</dd>
            <dt className="text-muted-foreground">Lot Size</dt>
            <dd className="font-medium">{propertyDetails.lotSizeSf} sq ft</dd>
          </dl>
        </div>
      </CardContent>
    </Card>
  );
}
