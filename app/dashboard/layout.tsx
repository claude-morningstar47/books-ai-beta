import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarLayout, SidebarTrigger } from "@/components/ui/sidebar";
import { Session } from "@/lib/types";
import { ReactNode } from "react";

export default async function Page({ children }: { children: ReactNode }) {
  const { cookies } = await import("next/headers");
  const session = (await auth()) as Session;
  // console.log(session.user);
  return (
    <SidebarLayout
      defaultOpen={cookies().get("sidebar:state")?.value === "true"}
    >
      <AppSidebar userData={session} />
      <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
        <div className="h-full rounded-md border-2 border-dashed p-2">
          <SidebarTrigger />
          {children}
        </div>
      </main>
    </SidebarLayout>
  );
}
