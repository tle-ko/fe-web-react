import { useState, useEffect } from 'react';

const CodeReview = ({ activity, crew, userData, problems }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [reviewerImages, setReviewerImages] = useState({});

  useEffect(() => {
    if (crew?.members?.length > 0) {
      setSelectedUserId(crew.members[0].user_id);
    }
  }, [crew]);

  useEffect(() => {
    if (selectedUserId !== null && activity?.problems) {
      const reviewerImagesMap = {};
      activity.problems.forEach(problem => {
        if (problem?.submissions) {
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
        }
      });
      setReviewerImages(reviewerImagesMap);
    }
  }, [selectedUserId, userData, activity?.problems]);

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

  // 목업 데이터로 userHasSubmissions를 true로 고정
  const userHasSubmissions = true;

  // 목업 데이터 삽입
  const mockProblems = [
    { id: 1, title: "분산처리", problem_id: 1 },
    { id: 2, title: "횡단보도", problem_id: 2 },
    { id: 2, title: "쥐 잡기", problem_id: 3 },
    { id: 2, title: "하얀 칸", problem_id: 4 },
    { id: 2, title: "카드 섞기", problem_id: 5 },
  ];
  const mockSubmissions = [
    { created_by: selectedUserId, created_at: "2024-08-14" },
    { created_by: selectedUserId, created_at: "2024-08-15" },
    { created_by: selectedUserId, created_at: "2024-08-17" },
    { created_by: selectedUserId, created_at: "2024-08-17" },
    { created_by: selectedUserId, created_at: "2024-08-19" }
  ];

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
          {crew.members.map(member => (
            <div
              key={member.user_id}
              className={`relative p-4 rounded-t-2xl ${selectedUserId === member.user_id ? 'bg-gray-50' : ''}`}
              style={{ opacity: selectedUserId === member.user_id ? 1 : 0.7 }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = selectedUserId === member.user_id ? 1 : 0.6}
            >
              <img
                src={ `http://api.tle-kr.com${member.profile_image}` }
                alt={member.username}
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => handleProfileClick(member.user_id)}
                title={member.username}
              />

            </div>
          ))}
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
                {/* 목업 데이터 사용 */}
                {mockProblems.map(problem => (
                  <div key={problem.id} className="grid grid-cols-4 gap-4 items-center text-center text-gray-800 text-sm py-2 border-b bg-white hover:bg-gray-50 cursor-pointer">
                    <div className='cursor-pointer'>{problem.id}</div>
                    <div className='cursor-pointer'>{problem.title}</div>
                    <div className='cursor-pointer'>{mockSubmissions[problem.id - 1]?.created_at}</div>
                    <div className="flex justify-start relative cursor-pointer">
                      {/* 리뷰어 이미지 부분 */}
                      {reviewerImages[problem.id] || <img src="http://api.tle-kr.com/media/user/profile/9/%EA%B3%B5%EB%B6%80%EC%8A%A4%EB%88%84%ED%94%BC.jpg" alt="Default" className="w-6 h-6 rounded-full" />}
                    </div>
                  </div>
                ))}
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
