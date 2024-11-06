import { useState, useEffect } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

const Notice = ({ content }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!content) {
      setIsVisible(false);
    }
  }, [content]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="notice flex w-full items-center justify-between text-base font-medium text-gray-700">
      <div className="flex gap-2">
        <div>
          <p>📌</p>
        </div>
        <div>{content}</div>
      </div>
      <HiOutlineXMark className="h-5 w-5 cursor-pointer" onClick={handleClose} />
    </div>
  );
};

export default Notice;
