import { auth } from "@/auth";
import Onboarding from "@/components/onboard-user";
import { Session } from "@/lib/types";

export default async function OnboardingPage() {
  const session = (await auth()) as Session;

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-screen p-2 transition-all duration-300 ease-in-out">
      <Onboarding session={session} />
    </div>
  );
}
