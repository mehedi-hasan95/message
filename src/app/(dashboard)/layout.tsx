import { LoginLogout } from "@/components/common/login-logout";
import { Logo } from "@/components/common/logo";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex justify-between items-center container mx-auto px-6 pt-5">
        <Logo />
        <LoginLogout />
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
