import LanguageTag from "../../common/languageTag";
import { FaCrown } from "react-icons/fa";
import ProfileImg from "../../../assets/images/profile.svg";
import SolvedProbGraph from "./algorithmGraph";
import { client } from "../../../utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function LeftDashboard({ crew, statistics }) {
  const { id } = useParams();
  const [members, setMembers] = useState([]); // 새로운 멤버 데이터 상태
  const [host, setHost] = useState(null); // 호스트 상태
  const [crewMembers, setCrewMembers] = useState([]); // 크루 멤버 상태

  useEffect(() => {
    const fetchCrewMembers = async () => {
      try {
        const response = await client.get(`/api/v1/crew/${id}/members`, {
          withCredentials: true
        });
        if (response.status === 200) {
          const membersData = response.data;
          const hostData = membersData.find(member => member.is_captain);
          const crewMembersData = membersData.filter(member => !member.is_captain);

          setMembers(membersData); // 전체 멤버 저장
          setHost(hostData); // 호스트 설정
          setCrewMembers(crewMembersData); // 일반 멤버 설정
        } else {
          console.error("크루 멤버 데이터를 불러오지 못했어요.", response.statusText);
        }
      } catch (error) {
        console.error("크루 멤버 데이터를 불러오는데 문제가 발생했어요.", error);
      }
    };

    fetchCrewMembers();
  }, [id]);

  if (!crew) return null;

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
          <p className="text-gray-900 text-base font-normal">{crew.member_count.count}명</p>
        </div>
        <div className="flex flex-col gap-4">
          {host && (
            <div className="flex items-center gap-4">
              <img
                src={host.profile_image ? `http://api.tle-kr.com${host.profile_image}` : ProfileImg}
                alt={host.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span>{host.username}</span>
              <div><FaCrown color="#FFCA41" /></div>
            </div>
          )}
          {crewMembers.map((member, index) => (
            <div key={index} className="flex items-center gap-4">
              <img
                src={member.profile_image ? `http://api.tle-kr.com${member.profile_image}` : ProfileImg}
                alt={member.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span>{member.username}</span>
            </div>
          ))}
        </div>
      </div>
      <SolvedProbGraph crew={statistics} /> {/* SolvedProbGraph에 statistics 전달 */}
    </div>
  );
}
