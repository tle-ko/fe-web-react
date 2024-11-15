import LanguageTag from '../../common/languageTag';
import { FaCrown } from 'react-icons/fa';
import ProfileImg from '../../../assets/images/profile.svg';
import SolvedProbGraph from './algorithmGraph';

export default function LeftDashboard({ crew, statistics }) {
  // crew 데이터에서 호스트와 멤버 구분
  const host = crew.members.find((member) => member.is_captain);
  const crewMembers = crew.members.filter((member) => !member.is_captain);

  if (!crew) return null;

  return (
    <div className="grid gap-6">
      <div className="box flex justify-start gap-5">
        <div className="font-cafe24 text-lg font-bold text-gray-900">
          <p>크루 태그</p>
        </div>
        <div className="inline-flex flex-wrap items-center justify-start gap-2">
          {crew.tags
            .filter((tag) => tag.type === 'language')
            .map((tag, index) => (
              <LanguageTag key={index} language={tag.name} />
            ))}
          {crew.tags
            .filter((tag) => tag.type === 'level')
            .map((tag, index) => (
              <LanguageTag
                key={index}
                language={tag.name}
                className="tag border bg-gray-600 text-white"
              />
            ))}
          {crew.tags
            .filter((tag) => tag.type === 'custom')
            .map((tag, index) => (
              <LanguageTag
                key={index}
                language={tag.name}
                className="border border-gray-600 bg-white text-gray-600"
              />
            ))}
        </div>
      </div>

      <div className="box flex flex-col justify-start gap-5">
        <div className="flex gap-4">
          <div className="font-cafe24 text-lg font-bold text-gray-900">
            <p>나의 동료</p>
          </div>
          <p className="text-base font-normal text-gray-900">{crew.member_count.count}명</p>
        </div>
        <div className="flex flex-col gap-4">
          {/* 호스트 표시 */}
          {host && (
            <div className="flex items-center gap-4">
              <img
                src={
                  host.profile_image
                    ? `${process.env.REACT_APP_API_URL}${host.profile_image}`
                    : ProfileImg
                }
                alt={host.username}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span>{host.username}</span>
              <div>
                <FaCrown color="#FFCA41" />
              </div>
            </div>
          )}

          {/* 일반 멤버 표시 */}
          {crewMembers.map((member, index) => (
            <div key={index} className="flex items-center gap-4">
              <img
                src={
                  member.profile_image
                    ? `${process.env.REACT_APP_API_URL}${member.profile_image}`
                    : ProfileImg
                }
                alt={member.username}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span>{member.username}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 문제 해결 그래프 */}
      <SolvedProbGraph crew={statistics} />
    </div>
  );
}
