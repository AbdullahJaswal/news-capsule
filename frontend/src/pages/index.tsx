import Head from "next/head";

import { useState } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { getAllCapsules } from "@/pages/api/capsule/getAllCapsules";
import { Capsule } from "@/common/types/Capsule/Capsule";

import BreakingBar from "@/components/news/BreakingBar";
import CapsuleModal from "@/components/news/CapsuleModal";
import FeaturedList from "@/components/news/FeaturedList";
import NormalGrid from "@/components/news/NormalGrid";

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

          <div className="flex justify-center flex-wrap mt-4">
            <BreakingBar capsules={capsules.breaking} openModal={openModal} />
          </div>
        </div>
      )}

      {capsules.featured.length > 0 ? (
        <div className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 grid-auto-rows-max">
            <div className="col-span-1">
              <h2 className="text-center text-xl font-bold text-warning">Featured</h2>

              <div className="mt-4 flex flex-row lg:p-6 lg:max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-warning scrollbar-thumb-rounded-md">
                <FeaturedList capsules={capsules.featured} openModal={openModal} />
              </div>
            </div>

            <div className="col-span-2">
              <h2 className="text-center text-xl font-bold text-primary">Latest News</h2>

              <div className="mt-4 flex flex-row lg:p-6 lg:max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-md">
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

              <div className="mt-4 flex flex-row lg:p-6 md:h-[42rem] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-md">
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

  const capsules = await getAllCapsules();

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
