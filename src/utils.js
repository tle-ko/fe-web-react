// utils.js
export const languageMapping = {
  1005: 'Java',
  1001: 'C',
  1003: 'Python',
  1004: 'C++',
  1009: 'C#',
  1010: 'JavaScript',
  1013: 'Swift',
  1008: 'Kotlin',
};

export const tiers = [
  "티어 무관", "브론즈 5", "브론즈 4", "브론즈 3", "브론즈 2", "브론즈 1",
  "실버 5", "실버 4", "실버 3", "실버 2", "실버 1",
  "골드 5", "골드 4", "골드 3", "골드 2", "골드 1",
  "플래티넘 5", "플래티넘 4", "플래티넘 3", "플래티넘 2", "플래티넘 1",
  "다이아몬드 5", "다이아몬드 4", "다이아몬드 3", "다이아몬드 2", "다이아몬드 1",
  "루비 5", "루비 4", "루비 3", "루비 2", "루비 1"
];

export const getBojLevelTag = (level) => {
  if (!level) return "티어 무관";
  const tierMapping = {
    b: "브론즈",
    s: "실버",
    g: "골드",
    p: "플래티넘",
    d: "다이아몬드",
    r: "루비",
    m: "마스터",
  };
  const division = level[0];
  const tierNumber = level.slice(1);
  const tier = tierMapping[division];
  return tier ? `${tier} ${tierNumber} 이상` : "티어 무관";
};