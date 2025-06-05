'use client'

import { Button } from '@/components/ui/button'
import { useComingSoonDialog } from '@/components/providers/coming-soon-dialog'

export function InterestedButton() {
  const { showComingSoon } = useComingSoonDialog()

  return (
    <Button
      size="lg"
      className="bg-primary hover:bg-primary/90"
      onClick={() => showComingSoon('Deal Interest')}
    >
      I'm Interested
    </Button>
  )
}
