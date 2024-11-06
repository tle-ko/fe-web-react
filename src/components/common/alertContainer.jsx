import { FaCheckCircle } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import Button from './button';

function AlertContainer({ type, content, onButtonClick, buttonContent }) {
  return (
    <div className="">
      <div className="my-10 inline-flex w-full flex-col items-center justify-start gap-6">
        {type === 'check' ? (
          <div className="inline-flex flex-col items-center justify-start gap-[1.5rem]">
            <FaCheckCircle color="#5383E8" size={48} />
            <p className="text-xl font-medium text-gray-600">{content}</p>
          </div>
        ) : type === 'delete' ? (
          <div className="inline-flex flex-col items-center justify-start">
            <div className="mb-10 flex flex-col items-center justify-start gap-[1.5rem]">
              <MdCancel color="#e84057" size={48} />
              <p className="text-xl font-medium text-gray-600">{content}</p>
            </div>
            <Button
              buttonSize="formBtn"
              colorStyle="redWhite"
              content={buttonContent}
              onClick={onButtonClick}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AlertContainer;
