
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Button from "./button";

const AlertContainer = ({ type, content, onButtonClick, buttonContent }) => {
  return (
    <div className="">
      <div className="w-full my-10 flex-col justify-start items-center gap-6 inline-flex">
        {type === 'check' ? (
          <div className="flex-col justify-start items-center inline-flex gap-[1.5rem]">
            <FaCheckCircle color="#5383E8" size={48} />
            <p className="text-gray-600 text-xl font-medium">{content}</p>
          </div>
        ) : type === 'delete' ? (
          <div className="flex-col justify-start items-center inline-flex">
            <div className="flex flex-col justify-start items-center gap-[1.5rem] mb-10">
              <MdCancel color="#e84057" size={48} />
              <p className="text-gray-600 text-xl font-medium">{content}</p>
            </div>
            <Button
              buttonSize={"formBtn"}
              colorStyle={"redWhite"}
              content={buttonContent}
              onClick={onButtonClick}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AlertContainer; 
