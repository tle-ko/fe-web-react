import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileImg from "../../../assets/images/profile.svg";
import DataLoadingSpinner from "../../common/dataLoadingSpinner";

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
      problems.forEach(problem => {
        if (problem?.submissions) {
          const userSubmission = problem.submissions.find(sub => sub.submitted_by.user_id === selectedUserId);
          if (userSubmission) {
            const problemReviewers = userSubmission.reviewers.map((reviewer, index) => (
              <img
                key={`${reviewer.user_id}-${index}`}
                src={reviewer.profile_image ? `http://api.tle-kr.com${reviewer.profile_image}` : ProfileImg}
                alt={reviewer.username}
                className="w-6 h-6 rounded-full object-cover"
                style={{ marginLeft: index === 0 ? '0' : '-6px' }}
                title={reviewer.username}
              />
            ));
            reviewerImagesMap[problem.problem_id] = problemReviewers.length > 0 ? problemReviewers : [null];
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
    setReviewerImages({});  // 초기화
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
        <div className="text-gray-900 text-lg font-bold font-cafe24">
          <p>코드 리뷰</p>
        </div>
        <p className="text-gray-900 text-base font-normal">동료의 프로필을 클릭해서 코드 리뷰를 할 수 있어요</p>
      </div>
      
      {isLoading ? (
        <div className="w-full p-10">
          <div className="flex flex-col justify-center items-center">
            <DataLoadingSpinner />
          </div>
        </div>
      ) : (
        <div className='flex flex-col'>
          <div className="w-full grid grid-cols-8">
            {members.map(member => (
              <div
                key={member.user_id}
                className={`relative p-4 rounded-t-2xl ${selectedUserId === member.user_id ? 'bg-gray-50' : ''}`}
                style={{ opacity: selectedUserId === member.user_id ? 1 : 0.7 }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = selectedUserId === member.user_id ? 1 : 0.6}
              >
                <img
                  src={`http://api.tle-kr.com${member.profile_image}`}
                  alt={member.username}
                  className="w-10 h-10 rounded-full cursor-pointer object-cover"
                  onClick={() => handleProfileClick(member.user_id)}
                  title={member.username}
                />
              </div>
            ))}
          </div>
          {selectedUserId && (
            <div className={`pt-4 pb-6 bg-gray-50 ${getContentStyle()} overflow-x-auto`}>
              {(!problems || problems.length === 0) ? (  // problems 데이터가 비어 있을 때 예외 처리
                <div className="mt-2 flex flex-col items-center gap-3 py-6 text-gray-600">
                  <div className="justify-start items-center gap-2 inline-flex animate-bounce">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                  </div>
                  <p>선장님이 문제를 등록하지 않았어요 😓</p>
                </div>
              ) : problems.some(problem => problem.submissions.some(sub => sub.submitted_by.user_id === selectedUserId)) ? (
                <>
                  <div className="grid grid-cols-4 gap-4 text-center text-gray-900 text-base border-b pb-2">
                    <div>문제 번호</div>
                    <div>제목</div>
                    <div>제출일</div>
                    <div>코드 리뷰어</div>
                  </div>
                  {problems.map(problem => {
                    const submission = problem.submissions.find(sub => sub.submitted_by.user_id === selectedUserId);
                    return submission ? (
                      <div
                        key={problem.problem_id}
                        className="grid grid-cols-4 gap-4 items-center text-center text-gray-800 text-sm py-2 border-b bg-white hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleRowClick(problem.problem_id, submission.submission_id)}
                      >
                        <div className='cursor-pointer'>{problem.order}</div>
                        <div className='cursor-pointer'>{problem.title}</div>
                        <div className='cursor-pointer'>{formatSubmissionDate(submission.submitted_at)}</div>
                        <div className="flex justify-start relative cursor-pointer overflow-x-auto hidden-scrollbar">
                          {reviewerImages[problem.problem_id]}
                        </div>
                      </div>
                    ) : null;
                  })}
                </>
              ) : (
                <div className="mt-2 flex flex-col items-center gap-3 py-6 text-gray-600">
                  <div className="justify-start items-center gap-2 inline-flex animate-bounce">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
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
