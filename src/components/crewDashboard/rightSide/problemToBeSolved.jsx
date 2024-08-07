import { FiPlus } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";

const ProblemToBeSolved = ({ activity, userId }) => {
  const problems = activity?.problems || [];

  return (
    <div className="box flex flex-col gap-6">
      <div className="text-gray-900 text-lg font-bold font-cafe24">
        <p>풀이할 문제</p>
      </div>
      {problems.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-6 text-gray-600">
          <div className="justify-start items-center gap-2 inline-flex animate-bounce">
                  <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
          </div>
          <p>선장님이 문제를 등록하지 않았어요 😓</p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-8 gap-5">
          {Array.from({ length: 8 }).map((_, index) => {
            const problem = problems[index];
            if (!problem) return null;

            const hasSubmission = problem.submissions.some(submission => submission.created_by === userId);
            return (
              <div
                key={index}
                className={`px-3 py-6 rounded-xl flex-col justify-center items-center inline-flex gap-4 ${hasSubmission ? 'bg-color-blue-w25 text-color-blue-main' : 'bg-gray-50 hover:bg-color-blue-w25'}`}
              >
                <div className="text-center text-base font-extrabold">{`문제${index + 1}`}</div>
                {hasSubmission ? <FaCheck size="1.5rem" /> : <FiPlus className="text-gray-600" size="1.5rem" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProblemToBeSolved;
