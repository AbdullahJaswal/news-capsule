import CapsuleCard from "./CapsuleCard";
import { Capsule } from "@/common/types/Capsule/Capsule";

type Props = {
  capsules: Capsule[];
  openModal: (capsule: Capsule) => void;
};

export default function FeaturedList({ capsules, openModal }: Props) {
  return (
    <div className="grid gap-4 grid-cols-1 w-full">
      {capsules.map((capsule: Capsule, index: number) => (
        <CapsuleCard key={index} capsule={capsule} openModal={openModal} />
      ))}
    </div>
  );
}
