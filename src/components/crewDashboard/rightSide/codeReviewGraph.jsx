import { useState, useEffect } from 'react';

const CodeReview = ({ activity, crew, userData, problems }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [reviewerImages, setReviewerImages] = useState({});

  useEffect(() => {
    if (crew && crew.members.length > 0) {
      setSelectedUserId(crew.members[0].user_id);
    }
  }, [crew]);

  useEffect(() => {
    if (selectedUserId !== null) {
      const reviewerImagesMap = {};
      activity.problems.forEach(problem => {
        const userSubmission = problem.submissions.find(sub => sub.created_by === selectedUserId);
        if (userSubmission) {
          const problemReviewers = userSubmission.submission_comments.map((comment, index) => {
            const reviewer = userData.find(user => user.id === comment.created_by);
            return reviewer ? (
              <img
                key={`${comment.id}-${index}`}
                src={reviewer.image_url}
                alt={reviewer.username}
                className="w-6 h-6 rounded-full"
                style={{ marginLeft: index === 0 ? '0' : '-6px' }}
                title={reviewer.username}
              />
            ) : null;
          });
          reviewerImagesMap[problem.id] = problemReviewers.length > 0 ? problemReviewers : [null];
        } else {
          reviewerImagesMap[problem.id] = [null];
        }
      });
      setReviewerImages(reviewerImagesMap);
    }
  }, [selectedUserId, userData, activity.problems]);

  if (!activity || !crew || !userData || !problems) return null;

  const handleProfileClick = (userId) => {
    setSelectedUserId(userId);
    setReviewerImages({});  // 초기화
  };

  const selectedUser = userData.find(user => user.id === selectedUserId);
  const firstMemberId = crew.members[0]?.user_id;
  const lastMemberId = crew.members[crew.members.length - 1]?.user_id;

  const getContentStyle = () => {
    if (selectedUserId === firstMemberId) {
      return 'rounded-b-2xl rounded-tr-2xl';
    } else if (selectedUserId === lastMemberId) {
      return 'rounded-b-2xl rounded-tl-2xl';
    } else {
      return 'rounded-2xl';
    }
  };

  const userHasSubmissions = activity.problems.some(problem =>
    problem.submissions.some(submission => submission.created_by === selectedUserId)
  );

  return (
    <div className="box flex flex-col gap-6">
      <div className="flex gap-4">
        <div className="text-gray-900 text-lg font-bold font-cafe24">
          <p>코드 리뷰</p>
        </div>
        <p className="text-gray-900 text-base font-normal">동료의 프로필을 클릭해서 코드 리뷰를 할 수 있어요</p>
      </div>
      <div className='flex flex-col'>
        <div className="w-full grid grid-cols-8">
          {crew.members.map(member => {
            const user = userData.find(user => user.id === member.user_id);
            if (!user) return null;
            return (
              <div
                key={user.id}
                className={`relative p-4 rounded-t-2xl ${selectedUserId === user.id ? 'bg-gray-50' : ''}`}
                style={{ opacity: selectedUserId === user.id ? 1 : 0.7 }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = selectedUserId === user.id ? 1 : 0.6}
              >
                <img
                  src={user.image_url}
                  alt={user.username}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => handleProfileClick(user.id)}
                  title={user.username}
                />
              </div>
            );
          })}
        </div>
        {selectedUser && (
          <div className={`pt-4 pb-6 bg-gray-50 ${getContentStyle()} overflow-x-auto`}>
            {userHasSubmissions ? (
              <>
                <div className="grid grid-cols-4 gap-4 text-center text-gray-900 text-base border-b pb-2">
                  <div>문제 번호</div>
                  <div>제목</div>
                  <div>제출일</div>
                  <div>코드 리뷰어</div>
                </div>
                {activity.problems.map(problem => {
                  const userSubmission = problem.submissions.find(sub => sub.created_by === selectedUserId);
                  if (!userSubmission) return null;
                  const problemData = problems.find(p => p.id === problem.problem_id);
                  return (
                    <div key={problem.id} className="grid grid-cols-4 gap-4 items-center text-center text-gray-800 text-sm py-2 border-b bg-white hover:bg-gray-50 cursor-pointer">
                      <div className='cursor-pointer'>{problem.id}</div>
                      <div className='cursor-pointer'>{problemData ? problemData.title : 'Unknown'}</div>
                      <div className='cursor-pointer'>{userSubmission.created_at}</div>
                      <div className="flex justify-start relative cursor-pointer">
                        {reviewerImages[problem.id]}
                      </div>
                    </div>
                  );
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
    </div>
  );
};

export default CodeReview;
