import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton
} from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      Landing
      <SignedIn>
        <Link
          href="/dashboard"
          //   className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
        >
          Dashboard
        </Link>
        <SignOutButton>
          <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
            Sign out
          </button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <Link
          href="/sign-in"
          //   className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
        >
          Sign in
        </Link>
        <Link
          href="/sign-up"
          //   className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
        >
          Sign up
        </Link>
      </SignedOut>
    </>
  );
}
