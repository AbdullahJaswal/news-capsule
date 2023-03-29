import Head from "next/head";

import { ReactElement, useState } from "react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { AuthSession } from "@/common/types/Auth/AuthSession";
import { getServerSession } from "next-auth/next";

import AuthLayout from "@/components/layouts/AuthLayout";
import { getAllCapsules } from "../api/capsule/getAllCapsules";
import { Capsule, Point, Tag, Location } from "@/common/types/News/Capsule";

import moment from "moment";
import getPointColors from "@/utils/PointColors";
import getPointIcons from "@/utils/PointIcons";
import getPointFontSize from "@/utils/PointFontSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faXmark } from "@fortawesome/free-solid-svg-icons";

import { Martel as Font } from "next/font/google";

const font = Font({
  subsets: ["latin"],
  weight: "400",
});

export default function Dashboard({ capsules }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [points, setPoints] = useState<Point[]>([]);
  const [activeCapsule, setActiveCapsule] = useState<Capsule | null>(null);

  return (
    <>
      <Head>
        <title>NewsCapsule</title>
        <meta name="description" content="NewsCapsule description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto max-w-7xl flex flex-row gap-10">
        <div className="flex flex-col gap-4">
          {capsules.results.map((capsule: Capsule, index: number) => {
            return (
              <div
                key={index}
                className={`card w-80 md:w-96 lg:w-[30rem] border-2 text-primary hover:scale-105 transition-transform duration-100 ${
                  capsule === activeCapsule ? "border-success" : "border-primary"
                }`}
                onClick={() => {
                  setPoints(capsule.points || []);
                  setActiveCapsule(capsule);
                }}
              >
                <div className="card-body flex justify-between">
                  <div className="grid grid-cols-2">
                    <FontAwesomeIcon icon={faNewspaper} />

                    <span key={index} className="ml-auto flex gap-x-1 text-xl text-gray-500">
                      {capsule.locations?.map((location: Location, index: number) => {
                        return (
                          <div key={index} className="tooltip tooltip-primary" data-tip={location.name}>
                            {location.info?.flag || "[" + location.name + "]"}
                          </div>
                        );
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 text-end">{moment(capsule.created_at).format("dddd ll")}</p>

                  <h2 className="card-title self-start">{capsule.title}</h2>

                  <div className="divider h-0"></div>

                  <div className="mt-2 card-actions justify-end">
                    {capsule.tags?.map((tag: Tag, index: number) => {
                      return (
                        <div
                          key={index}
                          className="badge badge-outline badge-md cursor-pointer hover:border-warning hover:text-warning"
                        >
                          {tag.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full">
          {points.length > 0 && (
            <>
              <div className="flex flex-row gap-2">
                <h1 className="flex-1 text-3xl font-bold">
                  <FontAwesomeIcon icon={faNewspaper} /> Capsule
                </h1>
                <div
                  className="flex-none hover:cursor-pointer hover:scale-110 hover:text-error"
                  onClick={() => {
                    setPoints([]);
                    setActiveCapsule(null);
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} size="2xl" />
                </div>
              </div>

              <br />

              <ul className="flex flex-col gap-4 text-lg">
                {points.map((point: Point, index: number) => {
                  const pointColor = getPointColors(point.type);
                  const fontSize = getPointFontSize(point.priority);

                  let fontWeight = "font-normal";

                  if (point.priority >= 9) {
                    fontWeight = "font-bold";
                  }

                  return (
                    <li key={index}>
                      <span>
                        <div className="text-start tooltip tooltip-primary" data-tip={point.type}>
                          <FontAwesomeIcon
                            icon={getPointIcons(point.type)}
                            className="mr-2"
                            style={{ color: pointColor }}
                          />
                          &nbsp;&nbsp;
                          <span
                            className={
                              point.type == "Quote"
                                ? fontSize + " " + fontWeight + " italic"
                                : fontSize + " " + fontWeight
                            }
                          >
                            {point.text}
                          </span>
                        </div>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session: AuthSession | null = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      notFound: true,
    };
  }

  const capsules = await getAllCapsules(session.access);

  if (!capsules.results) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      capsules: capsules,
    },
  };
};

Dashboard.getLayout = function (page: ReactElement) {
  return (
    <main className={font.className}>
      <AuthLayout>{page}</AuthLayout>
    </main>
  );
};
