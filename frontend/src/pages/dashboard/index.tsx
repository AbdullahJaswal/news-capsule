import Head from "next/head";

import { ReactElement, useState } from "react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { AuthSession } from "@/common/types/Auth/AuthSession";
import { getServerSession } from "next-auth/next";

import AuthLayout from "@/components/layouts/AuthLayout";
import { getAllCapsules } from "@/pages/api/capsule/getAllCapsules";
import { Capsules, Capsule, Point, Tag, Location } from "@/common/types/Capsule/Capsule";

import moment from "moment";
import getPointColors from "@/utils/PointColors";
import getPointIcons from "@/utils/PointIcons";
import getPointFontSize from "@/utils/PointFontSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faNewspaper, faXmark } from "@fortawesome/free-solid-svg-icons";
import { TbUrgent } from "react-icons/tb";

import { Merriweather as Font } from "next/font/google";
import Link from "next/link";
import BreakingBar from "@/components/news/BreakingBar";
import CapsuleModal from "@/components/news/CapsuleModal";
import FeaturedList from "@/components/news/FeaturedList";
import NormalGrid from "@/components/news/NormalGrid";
import { scrollbarColorClasses } from "@/utils/StatusColors";

const font = Font({
  subsets: ["latin"],
  weight: "400",
});

const empty_capsule: Capsule = {
  title: "",
  slug: "",
  created_at: "",
  status: "",
};

export default function Dashboard({ capsules }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [capsuleModal, setCapsuleModal] = useState<Capsule>(empty_capsule);
  const [isCapsuleModalOpen, setIsCapsuleModalOpen] = useState(false);

  const openModal = (capsule: Capsule) => {
    setCapsuleModal(capsule);
    setIsCapsuleModalOpen(true);
  };

  const closeModal = () => {
    setIsCapsuleModalOpen(false);
  };

  /* capsules.breaking = [
    ...Array(4).fill({
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      slug: "lorem-ipsum",
      created_at: "2021-09-01T00:00:00.000000Z",
      status: "B",
      tags: [
        {
          name: "Lorem",
          slug: "lorem",
        },
        {
          name: "Ipsum",
          slug: "ipsum",
        },
      ],
      locations: [
        {
          name: "Lorem",
          slug: "lorem",
          info: {
            flag: "🇱🇷",
            alpha_2: "US",
            alpha_3: "USA",
            name: "United States",
            numeric: "840",
            official_name: "United States of America",
          },
        },
        {
          name: "Ipsum",
          slug: "ipsum",
          info: {
            flag: "🇮🇹",
            alpha_2: "IT",
            alpha_3: "ITA",
            name: "Italy",
            numeric: "380",
            official_name: "Italian Republic",
          },
        },
      ],
      institutions: [
        {
          name: "Lorem Ipsum University",
          slug: "lorem-ipsum-university",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ],
      people: [
        {
          name: "John Doe",
          slug: "john-doe",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ],
      points: [
        {
          text: "Lorem ipsum dolor sit amet.",
          type: "Fact",
          priority: 1,
        },
        {
          text: "Consectetur adipiscing elit.",
          type: "Opinion",
          priority: 2,
        },
        {
          text: "Lorem ipsum dolor sit amet.",
          type: "Fact",
          priority: 1,
        },
        {
          text: "Consectetur adipiscing elit.",
          type: "Opinion",
          priority: 2,
        },
        {
          text: "Lorem ipsum dolor sit amet.",
          type: "Fact",
          priority: 1,
        },
        {
          text: "Consectetur adipiscing elit.",
          type: "Opinion",
          priority: 2,
        },
        {
          text: "Lorem ipsum dolor sit amet.",
          type: "Fact",
          priority: 1,
        },
        {
          text: "Consectetur adipiscing elit.",
          type: "Opinion",
          priority: 2,
        },
        {
          text: "Lorem ipsum dolor sit amet.",
          type: "Fact",
          priority: 1,
        },
        {
          text: "Consectetur adipiscing elit.",
          type: "Opinion",
          priority: 2,
        },
        {
          text: "Lorem ipsum dolor sit amet.",
          type: "Fact",
          priority: 1,
        },
        {
          text: "Consectetur adipiscing elit.",
          type: "Opinion",
          priority: 2,
        },
        {
          text: "Lorem ipsum dolor sit amet.",
          type: "Fact",
          priority: 1,
        },
        {
          text: "Consectetur adipiscing elit.",
          type: "Opinion",
          priority: 2,
        },
        {
          text: "Lorem ipsum dolor sit amet.",
          type: "Fact",
          priority: 1,
        },
        {
          text: "Consectetur adipiscing elit.",
          type: "Opinion",
          priority: 2,
        },
        {
          text: "Lorem ipsum dolor sit amet.",
          type: "Fact",
          priority: 1,
        },
        {
          text: "Consectetur adipiscing elit.",
          type: "Opinion",
          priority: 2,
        },
        {
          text: "Lorem ipsum dolor sit amet.",
          type: "Fact",
          priority: 1,
        },
        {
          text: "Consectetur adipiscing elit.",
          type: "Opinion",
          priority: 2,
        },
        {
          text: "Lorem ipsum dolor sit amet.",
          type: "Fact",
          priority: 1,
        },
        {
          text: "Consectetur adipiscing elit.",
          type: "Opinion",
          priority: 2,
        },
        {
          text: "Lorem ipsum dolor sit amet.",
          type: "Fact",
          priority: 1,
        },
        {
          text: "Consectetur adipiscing elit.",
          type: "Opinion",
          priority: 2,
        },
        {
          text: "Lorem ipsum dolor sit amet.",
          type: "Fact",
          priority: 1,
        },
        {
          text: "Consectetur adipiscing elit.",
          type: "Opinion",
          priority: 2,
        },
        {
          text: "Lorem ipsum dolor sit amet.",
          type: "Fact",
          priority: 1,
        },
        {
          text: "Consectetur adipiscing elit.",
          type: "Opinion",
          priority: 2,
        },
      ],
    }),
  ]; */

  return (
    <>
      <Head>
        <title>NewsCapsule</title>
        <meta name="description" content="NewsCapsule description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {capsules.breaking.length > 0 && (
        <div className="mt-2">
          <h2 className="text-center text-xl font-bold text-error animate-pulse">Breaking</h2>

          <div className="mt-4 flex flex-row">
            <BreakingBar capsules={capsules.breaking} openModal={openModal} />
          </div>
        </div>
      )}

      {capsules.featured.length > 0 ? (
        <div className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 grid-auto-rows-max">
            <div className="col-span-1">
              <h2 className="text-center text-xl font-bold text-warning">Featured</h2>

              <div className="mt-4 flex flex-row p-6 lg:max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-warning scrollbar-thumb-rounded-md">
                <FeaturedList capsules={capsules.featured} openModal={openModal} />
              </div>
            </div>

            <div className="col-span-2">
              <h2 className="text-center text-xl font-bold text-primary">Latest News</h2>

              <div className="mt-4 flex flex-row p-6 lg:max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-md">
                <NormalGrid capsules={capsules.normal} openModal={openModal} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-3">
              <h2 className="text-start text-xl font-bold text-primary">Latest News</h2>

              <div className="mt-4 flex flex-row p-6 md:h-[42rem] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-md">
                <NormalGrid capsules={capsules.normal} openModal={openModal} />
              </div>
            </div>
          </div>
        </div>
      )}

      <CapsuleModal isOpen={isCapsuleModalOpen} onClose={closeModal} capsule={capsuleModal} />
    </>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  context.res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=59");

  const session: AuthSession | null = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      notFound: true,
    };
  }

  const capsules = await getAllCapsules(session.access);

  if (!capsules) {
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
