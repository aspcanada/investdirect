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
    <>
      <h3 className="font-semibold">Home</h3>
      <p className="text-sm text-muted-foreground">
        Home page here. Maybe a dashboard?
      </p>
    </>
  )
}
