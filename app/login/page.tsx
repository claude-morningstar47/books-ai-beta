import { auth } from "@/auth";
import LoginPage from "@/components/signin-form";
import { Session } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = (await auth()) as Session;

  if (session) {
    redirect("/");
  }
  return (
    <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
      <LoginPage />
    </main>
  );
}
