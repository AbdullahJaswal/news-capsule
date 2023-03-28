// pages/403.tsx
import { NextPage } from "next";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { signOut } from "next-auth/react";

const Custom403: NextPage = () => {
  return (
    <div className="flex flex-col mx-auto justify-between mt-40">
      <div className="my-4 text-center">
        <h1 className="font-bold text-2xl">403 - Unauthorized</h1>
        <p className="font-bold">Please login to access</p>
      </div>

      <button
        className="btn btn-circle btn-error w-12 mx-auto"
        onClick={() => signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}}` })}
      >
        <FontAwesomeIcon icon={faRightFromBracket} size={"lg"} />
      </button>
    </div>
  );
};

export default Custom403;
