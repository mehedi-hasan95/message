import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  className?: string;
}
export const Logo = ({ className }: Props) => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/logo.svg" alt="Logo" height={40} width={40} />
      <h4 className={cn("text-2xl font-bold", className)}>Chatzy</h4>
    </Link>
  );
};
