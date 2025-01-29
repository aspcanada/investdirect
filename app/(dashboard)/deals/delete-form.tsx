'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { deleteDeal } from './actions';

const initialState = {
  message: ''
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Delete
    </button>
  );
}

export function DeleteForm({
  dealId,
  userId
}: {
  dealId: string;
  userId: string;
}) {
  // useActionState is available with React 19 (Next.js App Router)
  const [state, formAction] = useActionState(deleteDeal, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="dealId" value={dealId} />
      <input type="hidden" name="userId" value={userId} />
      <DeleteButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
