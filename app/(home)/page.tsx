import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const metadata = {
  title: 'Home | InvestDirect Community',
  description: 'Your real estate investment dashboard and community hub.',
}

export default async function HomePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Home</CardTitle>
        <CardDescription>Home page here. Maybe a dashboard?</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}
