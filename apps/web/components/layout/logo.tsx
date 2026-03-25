import Image from "next/image";
import Link from "next/link";
import { cn } from "@jess-web/ui";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center group", className)}>
      {/* Logo Image */}
      <Image
        src="/LOGO_2.png"
        alt="YOUR MINDZ"
        width={220}
        height={60}
        className="h-auto w-auto max-h-[70px]"
        priority
      />
      
    </Link>
  );
}
