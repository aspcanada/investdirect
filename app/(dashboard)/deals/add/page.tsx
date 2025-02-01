import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { AddDealForm } from './add-form';

export const metadata = {
  title: 'Add Deal',
  description: 'Add a new deal to the database'
};

export default function AddDealPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a deal</CardTitle>
      </CardHeader>
      <CardContent>
        {/* TODO: https://ui.shadcn.com/docs/components/form */}
        <AddDealForm />
      </CardContent>
    </Card>
  );
}
