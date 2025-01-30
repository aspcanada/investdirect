import { Payment, columns } from './columns';
import { DataTable } from './data-table';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  const data: Payment[] = [];

  for (let i = 0; i < 30; i++) {
    data.push({
      id: i.toString(),
      amount: i * 100,
      status: 'pending',
      email: `${i}@example.com`
    });
  }
  return data;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
