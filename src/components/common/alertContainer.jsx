import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const AlertContainer = ({ type, content }) => {
  return (
    <div className="w-full my-10 flex-col justify-start items-center gap-6 inline-flex">
      {type === 'check' ? (
        <FaCheckCircle color="#5383E8" size={48} />
      ) : type === 'delete' ? (
        <MdCancel color="#e84057" size={48} />
      ) : null}
      <p className="text-gray-600 text-xl font-medium">{content}</p>
    </div>
  );
}

export default AlertContainer;
