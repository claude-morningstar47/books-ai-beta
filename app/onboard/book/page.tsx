import { auth } from "@/auth";
import OnboardingBook from "@/components/onboard-book";
import { Session } from "@/lib/types";

export default async function OnboardingBookPage() {
  const session = (await auth()) as Session;

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-screen p-2 transition-all duration-300 ease-in-out">
      <OnboardingBook session={session} />
    </div>
  );
}
