import { Logo } from "@/components/common/logo";
import { HomeMenu } from "@/components/home/home-menu";
import { Pricing } from "@/components/home/pricing";
import { HomeService } from "@/components/home/service";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-[#46BA93] via-[#29B497] to-[#0EA487] flex flex-col gap-5 py-5">
        <div className="flex justify-between items-center container mx-auto px-6">
          <Logo className="text-white" />
          <HomeMenu />
          <Link
            href="/dashboard"
            className="bg-orange-300 border-orange-500 p-2 rounded-md font-bold"
          >
            Free Trial
          </Link>
        </div>
        <HomeService />
      </div>
      <div className="container mx-auto px-6">
        <Pricing />
      </div>
    </div>
  );
};

export default LandingPage;
