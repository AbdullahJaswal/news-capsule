import Link from "next/link";

import ThemeButton from "@/components/misc/ThemeButton";

export default function DefaultNavbar() {
  return (
    <div className="navbar bg-base-100 text-primary">
      <div className="flex-1">
        <Link
          href={"/"}
          className="btn btn-ghost normal-case text-xl hover:bg-primary/20 hover:scale-105"
        >
          NewsCapsule
        </Link>
      </div>

      <div className="flex-none">
        <ThemeButton />
      </div>
    </div>
  );
}
