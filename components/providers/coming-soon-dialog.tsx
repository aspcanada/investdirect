'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ComingSoonDialogContextType {
  showComingSoon: (title: string) => void
}

const ComingSoonDialogContext = createContext<
  ComingSoonDialogContextType | undefined
>(undefined)

export function ComingSoonDialogProvider({
  children,
}: {
  children: ReactNode
}) {
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')

  const showComingSoon = (title: string) => {
    setModalTitle(title)
    setShowModal(true)
  }

  return (
    <ComingSoonDialogContext.Provider value={{ showComingSoon }}>
      {children}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modalTitle} Coming Soon</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            We're working hard to bring you {modalTitle.toLowerCase()}{' '}
            functionality. Stay tuned!
          </p>
        </DialogContent>
      </Dialog>
    </ComingSoonDialogContext.Provider>
  )
}

export function useComingSoonDialog() {
  const context = useContext(ComingSoonDialogContext)
  if (context === undefined) {
    throw new Error(
      'useComingSoonDialog must be used within a ComingSoonDialogProvider',
    )
  }
  return context
}
