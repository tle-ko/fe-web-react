import { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

const Notice = ({ content }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full notice flex justify-between items-center text-gray-700 text-base font-medium">
      <div className="flex gap-2">
        <div><p>📌</p></div>
        <div>{content}</div>
      </div>
      <HiOutlineXMark className="w-5 h-5 cursor-pointer" onClick={handleClose} />
    </div>
  );
}

export default Notice;
