import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function HomePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Home</CardTitle>
        <CardDescription>
          Home page here. Maybe a dashboard of sorts?
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}
