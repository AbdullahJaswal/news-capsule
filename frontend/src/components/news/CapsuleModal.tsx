import { Capsule, Point } from "@/common/types/Capsule/Capsule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import getPointColors from "@/utils/PointColors";
import getPointIcons from "@/utils/PointIcons";
import getPointFontSize from "@/utils/PointFontSize";
import { faNewspaper, faList } from "@fortawesome/free-solid-svg-icons";
import { borderColorClasses, textColorClasses, scrollbarColorClasses } from "@/utils/StatusColors";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  capsule: Capsule;
};

export default function CapsuleModal({ isOpen, onClose, capsule }: Props) {
  const border_color = borderColorClasses[capsule?.status];
  const text_color = textColorClasses[capsule?.status];
  const scrollbar_color = scrollbarColorClasses[capsule?.status];

  const closeModal = () => {
    onClose();
  };

  return (
    <>
      {capsule && (
        <>
          <input type="checkbox" id="capsule-modal" className="modal-toggle" checked={isOpen} onChange={closeModal} />
          <label htmlFor="capsule-modal" className="modal cursor-pointer modal-bottom md:modal-middle">
            <label
              className={`h-fit scrollbar-thin ${scrollbar_color} scrollbar-thumb-rounded-md modal-box min-h-[16rem] max-h-99vh md:max-w-4xl border-t-2 border-x-2 md:border-2 ${border_color}`}
              htmlFor="capsule-modal"
            >
              <h1 className={`text-3xl font-bold ${text_color}`}>
                <FontAwesomeIcon icon={faNewspaper} className="mr-4" /> {capsule?.title}
              </h1>

              <div className="divider">
                <FontAwesomeIcon icon={faList} className={`${text_color}`} />
              </div>

              <div className="flex flex-col gap-y-8">
                {capsule?.points?.map((point: Point, index: number) => {
                  const pointColor = getPointColors(point.type);
                  const fontSize = getPointFontSize(point.priority);

                  let fontWeight = "font-normal";

                  if (point.priority >= 9) {
                    fontWeight = "font-bold";
                  }

                  return (
                    <div key={index} className="text-start tooltip tooltip-primary w-fit" data-tip={point.type}>
                      <FontAwesomeIcon
                        icon={getPointIcons(point.type)}
                        className="mr-2"
                        style={{ color: pointColor }}
                      />
                      &nbsp;&nbsp;
                      <span
                        className={
                          point.type == "Quote" ? fontSize + " " + fontWeight + " italic" : fontSize + " " + fontWeight
                        }
                      >
                        {point.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </label>
          </label>
        </>
      )}
    </>
  );
}
