import { Capsule, Tag, Location } from "@/common/types/Capsule/Capsule";

import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { TbUrgent } from "react-icons/tb";
import { AiFillStar } from "react-icons/ai";
import { BsFillCircleFill } from "react-icons/bs";

import { borderColorClasses, textColorClasses, shadowClasses } from "@/utils/StatusColors";

type Props = {
  capsule: Capsule;
  openModal: (capsule: Capsule) => void;
};

export default function CapsuleCard({ capsule, openModal }: Props) {
  const border_color = borderColorClasses[capsule.status];
  const text_color = textColorClasses[capsule.status];
  const shadow = shadowClasses[capsule.status];

  // limit title to 60 characters and add ellipsis
  const title: string = capsule.title.length > 80 ? capsule.title.substring(0, 80) + "..." : capsule.title;

  // const bottom_icon = capsule.status == "B" ? <TbUrgent className="animate-pulse duration-50 ease-linear" size={"2em"} /> : capsule.status == "F" ? <AiFillStar size={"2em"} /> : <BsFillCircleFill size={"2em"} />;

  const handleClick = () => {
    openModal(capsule);
  };

  return (
    <>
      <div
        className={`${shadow} card border-2 ${border_color} text-primary hover:scale-102 transition-transform duration-200`}
        onClick={handleClick}
      >
        <div className="card-body flex justify-between">
          <div className="grid grid-cols-2">
            <div>
              <span className={text_color}>
                <FontAwesomeIcon icon={faNewspaper} /> Breaking
              </span>
            </div>

            <span className="ml-auto flex gap-x-1 text-xl text-gray-500">
              {capsule.locations?.slice(0, 3).map((location: Location, index: number) => {
                return (
                  <div key={index} className="tooltip tooltip-primary" data-tip={location.name}>
                    {location.info?.flag || "[" + location.name + "]"}
                  </div>
                );
              })}
            </span>
          </div>

          <p className="text-xs text-gray-500 text-end">{moment(capsule.created_at).format("dddd ll")}</p>

          <h2 className={`card-title self-start ${text_color}`}>{title}</h2>

          <div className="divider h-0"></div>

          <div className="mt-2 card-actions">
            <div className="grid grid-rows-3 gap-2">
              {capsule.tags?.slice(0, 3).map((tag: Tag, index: number) => {
                return (
                  <div key={index} className="badge badge-outline badge-md hover:border-warning hover:text-warning">
                    {tag.name.length > 20 ? tag.name.substring(0, 20) + "..." : tag.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
