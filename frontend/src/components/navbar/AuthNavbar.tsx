import Link from "next/link";

import ThemeButton from "@/components/misc/ThemeButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { signOut } from "next-auth/react";

export default function AuthNavbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link
          href={"/dashboard"}
          className="btn btn-ghost normal-case text-primary text-xl hover:bg-primary/20 hover:scale-105"
        >
          NewsCapsule
        </Link>
      </div>

      <div className="flex-none">
        <ThemeButton />

        <ul className="menu menu-horizontal px-1">
          <li className="text-error">
            <button
              className="hover:bg-error/20 hover:scale-110"
              onClick={() => signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}}` })}
            >
              <FontAwesomeIcon icon={faRightFromBracket} size={"lg"} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
