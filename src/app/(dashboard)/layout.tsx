import { onLoginUser } from "@/actions/auth";
import { ChatProvider } from "@/context/use-chat-context";
import { AppSidebar } from "@/app/(dashboard)/_components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BreadcrumbSettings } from "./_components/breadcrumb-settings";
import BreadCrumb from "./_components/bread-crumb";

type Pros = {
  children: React.ReactNode;
};
const DashboardLayout = async ({ children }: Pros) => {
  const authincated = await onLoginUser();
  if (!authincated) return null;

  return (
    <ChatProvider>
      <SidebarProvider>
        <AppSidebar domains={authincated.domains} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadcrumbSettings />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <BreadCrumb />
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ChatProvider>
  );
};

export default DashboardLayout;
