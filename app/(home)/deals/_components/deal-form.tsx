'use client';

import { type Deal } from '@/app/db/schema/deals';
import { useActionState } from 'react';
import { upsertDeal } from '../actions';
import { Input } from '@/components/ui/input';

interface DealFormProps {
  mode: 'add' | 'edit';
  deal?: Deal;
}

export function DealForm({ mode, deal }: DealFormProps) {
  const [state, formAction, isPending] = useActionState(upsertDeal, null);

  return (
    <form action={formAction}>
      {mode === 'edit' && <input type="hidden" name="id" value={deal?.id} />}

      {/* Rest of your existing form code */}
      {/* Update defaultValue props to use deal?.property when in edit mode */}
      <Input
        id="dealName"
        name="dealName"
        defaultValue={
          mode === 'edit' ? deal?.dealName : state?.inputs?.dealName
        }
        // ... other props
      />

      {/* Continue with rest of form fields */}
    </form>
  );
}
