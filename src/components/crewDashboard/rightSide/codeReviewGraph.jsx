import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileImg from '../../../assets/images/profile.svg';
import DataLoadingSpinner from '../../common/dataLoadingSpinner';

const CodeReview = ({ members, problems, isLoading }) => {
  const { id } = useParams();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [reviewerImages, setReviewerImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (members?.length > 0) {
      setSelectedUserId(members[0].user_id);
    }
  }, [members]);

  useEffect(() => {
    if (selectedUserId !== null && problems) {
      const reviewerImagesMap = {};
      problems.forEach((problem) => {
        if (problem?.submissions) {
          const userSubmission = problem.submissions.find(
            (sub) => sub.submitted_by.user_id === selectedUserId
          );
          if (userSubmission) {
            const problemReviewers = userSubmission.reviewers.map((reviewer, index) => (
              <img
                key={`${reviewer.user_id}-${index}`}
                src={
                  reviewer.profile_image
                    ? `${process.env.REACT_APP_API_URL}/media/${reviewer.profile_image}`
                    : ProfileImg
                }
                alt={reviewer.username}
                className="h-6 w-6 rounded-full object-cover"
                style={{ marginLeft: index === 0 ? '0' : '-6px' }}
                title={reviewer.username}
              />
            ));
            reviewerImagesMap[problem.problem_id] =
              problemReviewers.length > 0 ? problemReviewers : [null];
          } else {
            reviewerImagesMap[problem.problem_id] = [null];
          }
        }
      });
      setReviewerImages(reviewerImagesMap);
    }
  }, [selectedUserId, problems]);

  if (!members) return null;

  const handleProfileClick = (userId) => {
    setSelectedUserId(userId);
    setReviewerImages({}); // 초기화
  };

  const firstMemberId = members[0]?.user_id;
  const lastMemberId = members[members.length - 1]?.user_id;

  const getContentStyle = () => {
    if (selectedUserId === firstMemberId) {
      return 'rounded-b-2xl rounded-tr-2xl';
    } else if (selectedUserId === lastMemberId) {
      return 'rounded-b-2xl rounded-tl-2xl';
    } else {
      return 'rounded-2xl';
    }
  };

  const handleRowClick = (problemId, submitId) => {
    navigate(`/crew/${id}/problems/${problemId}/submit/${submitId}`);
  };

  const formatSubmissionDate = (dateString) => {
    return dateString.split('T')[0];
  };

  return (
    <div className="box flex flex-col gap-6">
      <div className="flex gap-4">
        <div className="font-cafe24 text-lg font-bold text-gray-900">
          <p>코드 리뷰</p>
        </div>
        <p className="text-base font-normal text-gray-900">
          동료의 프로필을 클릭해서 코드 리뷰를 할 수 있어요
        </p>
      </div>

      {isLoading ? (
        <div className="w-full p-10">
          <div className="flex flex-col items-center justify-center">
            <DataLoadingSpinner />
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="grid w-full xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-8">
            {members.map((member) => (
              <div
                key={member.user_id}
                className={`relative flex w-full justify-center rounded-t-2xl p-4 sm:p-1 md:p-2 ${selectedUserId === member.user_id ? 'bg-gray-50' : ''}`}
                style={{ opacity: selectedUserId === member.user_id ? 1 : 0.7 }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.opacity = selectedUserId === member.user_id ? 1 : 0.6)
                }
              >
                <img
                  src={
                    member.profile_image
                      ? `${process.env.REACT_APP_API_URL}${member.profile_image}`
                      : ProfileImg
                  }
                  alt={member.username}
                  className="h-10 w-10 cursor-pointer rounded-full object-cover"
                  onClick={() => handleProfileClick(member.user_id)}
                  title={member.username}
                />
              </div>
            ))}
          </div>
          {selectedUserId && (
            <div className={`bg-gray-50 pb-6 pt-4 ${getContentStyle()} overflow-x-auto`}>
              {!problems || problems.length === 0 ? ( // problems 데이터가 비어 있을 때 예외 처리
                <div className="mt-2 flex flex-col items-center gap-3 py-6 text-gray-600">
                  <div className="inline-flex animate-bounce items-center justify-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                  </div>
                  <p>선장님이 문제를 등록하지 않았어요 😓</p>
                </div>
              ) : problems.some((problem) =>
                  problem.submissions.some((sub) => sub.submitted_by.user_id === selectedUserId)
                ) ? (
                <>
                  <div className="grid grid-cols-4 gap-4 border-b pb-2 text-center text-base text-gray-900">
                    <div>문제 번호</div>
                    <div>제목</div>
                    <div>제출일</div>
                    <div>코드 리뷰어</div>
                  </div>
                  {problems.map((problem) => {
                    const submission = problem.submissions.find(
                      (sub) => sub.submitted_by.user_id === selectedUserId
                    );
                    return submission ? (
                      <div
                        key={problem.problem_id}
                        className="grid cursor-pointer grid-cols-4 items-center gap-4 border-b bg-white py-2 text-center text-sm text-gray-800 hover:bg-gray-50"
                        onClick={() => handleRowClick(problem.problem_id, submission.submission_id)}
                      >
                        <div className="cursor-pointer">{problem.order}</div>
                        <div className="cursor-pointer">{problem.title}</div>
                        <div className="cursor-pointer">
                          {formatSubmissionDate(submission.submitted_at)}
                        </div>
                        <div className="hidden-scrollbar relative flex cursor-pointer justify-start overflow-x-auto">
                          {reviewerImages[problem.problem_id]}
                        </div>
                      </div>
                    ) : null;
                  })}
                </>
              ) : (
                <div className="mt-2 flex flex-col items-center gap-3 py-6 text-gray-600">
                  <div className="inline-flex animate-bounce items-center justify-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                  </div>
                  <p>동료가 문제를 풀이하지 않았어요 😓</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeReview;
