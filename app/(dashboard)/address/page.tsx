import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import AddressForm from './address-form';

export const metadata = {
  title: 'Address',
  description: 'Manage your address information.'
};

export default async function AddressPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Address</CardTitle>
        <CardDescription>Manage your address information.</CardDescription>
      </CardHeader>
      <CardContent>
        <AddressForm />
      </CardContent>
    </Card>
  );
}
