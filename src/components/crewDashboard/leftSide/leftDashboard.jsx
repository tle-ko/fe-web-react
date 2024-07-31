import LanguageTag from "../../common/languageTag";
import AlgorithmGraph from "./algorithmGraph";
import { FaCrown } from "react-icons/fa";

export default function LeftDashboard({ crew, userData, problems }) {
  if (!crew || !userData || !problems) return null;

  const getUserInfo = (userId) => userData.find(user => user.id === userId);

  const crewMembers = crew.members.map(member => getUserInfo(member.user_id));
  const host = getUserInfo(crew.host_id);

  return (
    <div className="grid gap-6">
      <div className="box flex justify-start gap-5">
        <div className="text-gray-900 text-lg font-bold font-cafe24"><p>크루 태그</p></div>
        <div className="justify-start items-center gap-2 inline-flex flex-wrap">
          {crew.allowed_languages.map((languageId, index) => (
            <LanguageTag key={index} language={languageMapping[languageId]} />
          ))}
          <LanguageTag language={getBojLevelTag(crew.required_boj_level)} className="tag border bg-gray-600 text-white" />
          {crew.tags.map((tag, index) => (
            <LanguageTag key={index} language={tag} className="bg-white text-gray-600 border border-gray-600" />
          ))}
        </div>
      </div>
      <div className="box flex flex-col justify-start gap-5">
        <div className="flex gap-4">
          <div className="text-gray-900 text-lg font-bold font-cafe24">
            <p>나의 동료</p>
          </div>
          <p className="text-gray-900 text-base font-normal">{crewMembers.length}명</p>
        </div>
        <div className="flex flex-col gap-4">
          {host && (
            <div className="flex items-center gap-4">
              <img src={host.image_url} alt={host.username} className="w-10 h-10 rounded-full" />
              <span>{host.username}</span>
              <div><FaCrown color="#FFCA41" /></div>
            </div>
          )}
          {crewMembers.map((member, index) => (
            member && member.id !== crew.host_id && (
              <div key={index} className="flex items-center gap-4">
                <img src={member.image_url} alt={member.username} className="w-10 h-10 rounded-full" />
                <span>{member.username}</span>
              </div>
            )
          ))}
        </div>
      </div>
      <AlgorithmGraph crew={crew} problems={problems} />
    </div>
  );
}

const languageMapping = {
  1005: 'Java',
  1001: 'C',
  1003: 'Python',
  1004: 'C++',
  1009: 'C#',
  1010: 'JavaScript',
  1013: 'Swift',
  1008: 'Kotlin',
};

const getBojLevelTag = (level) => {
  if (level === null) return "티어 무관";
  const tierMapping = {
    b: "브론즈 이상",
    s: "실버 이상",
    g: "골드 이상",
    p: "플래티넘 이상",
    d: "다이아 이상",
    r: "루비 이상",
    m: "마스터 이상",
  };
  const tier = tierMapping[level[0]];
  return tier || "티어 무관";
};
