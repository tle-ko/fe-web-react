import LanguageTag from "../../common/languageTag";
import AlgorithmGraph from "./algorithmGraph";
import { FaCrown } from "react-icons/fa";
import ProfileImg from "../../../assets/images/profile.svg";

export default function LeftDashboard({ crew }) {
  if (!crew) return null;

  // 호스트와 나머지 멤버를 구분
  const host = crew.members.items.find(member => member.is_captain);
  const crewMembers = crew.members.items.filter(member => !member.is_captain);

  return (
    <div className="grid gap-6">
      <div className="box flex justify-start gap-5">
        <div className="text-gray-900 text-lg font-bold font-cafe24"><p>크루 태그</p></div>
        <div className="justify-start items-center gap-2 inline-flex flex-wrap">
          {crew.tags
            .filter(tag => tag.type === "language")
            .map((tag, index) => (
              <LanguageTag key={index} language={tag.name} />
          ))}
          {crew.tags
            .filter(tag => tag.type === "level")
            .map((tag, index) => (
              <LanguageTag key={index} language={tag.name} className="tag border bg-gray-600 text-white" />
          ))}
          {crew.tags
            .filter(tag => tag.type === "custom")
            .map((tag, index) => (
              <LanguageTag key={index} language={tag.name} className="bg-white text-gray-600 border border-gray-600" />
          ))}
        </div>
      </div>
      <div className="box flex flex-col justify-start gap-5">
        <div className="flex gap-4">
          <div className="text-gray-900 text-lg font-bold font-cafe24">
            <p>나의 동료</p>
          </div>
          <p className="text-gray-900 text-base font-normal">{crew.members.count}명</p>
        </div>
        <div className="flex flex-col gap-4">
          {host && (
            <div className="flex items-center gap-4">
              <img src={host.profile_image ? `http://api.tle-kr.com${host.profile_image}` : ProfileImg} alt={host.username} className="w-10 h-10 rounded-full" />
              <span>{host.username}</span>
              <div><FaCrown color="#FFCA41" /></div>
            </div>
          )}
          {crewMembers.map((member, index) => (
            <div key={index} className="flex items-center gap-4">
              <img src={member.profile_image ? `http://api.tle-kr.com${member.profile_image}` : ProfileImg} alt={member.username} className="w-10 h-10 rounded-full" />
              <span>{member.username}</span>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
