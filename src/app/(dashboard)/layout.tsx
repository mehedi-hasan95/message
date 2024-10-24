import { onLoginUser } from "@/actions/auth";
import { LoginLogout } from "@/components/common/login-logout";
import { Logo } from "@/components/common/logo";
import { ChatProvider } from "@/context/use-chat-context";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const authincated = await onLoginUser();
  if (!authincated) return null;
  return (
    <ChatProvider>
      <div className="flex w-full h-screen"></div>
    </ChatProvider>
  );
};

export default DashboardLayout;
