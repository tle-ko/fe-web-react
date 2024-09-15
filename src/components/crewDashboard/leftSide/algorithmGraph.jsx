import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const SolvedProbGraph = ({ crew }) => {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tagData, setTagData] = useState([]);

  useEffect(() => {
    if (!crew || !crew.tags) return;

    const tagsToTrack = [
      'math', 'implementation', 'greedy', 'string', 'data_structures', 'graphs', 'dp', 'geometry'
    ];

    const tagCount = tagsToTrack.reduce((acc, tag) => {
      acc[tag] = 0;
      return acc;
    }, {});

    let totalTrackedProblems = 0;

    // 태그 데이터 처리
    crew.tags.forEach(tag => {
      if (tagsToTrack.includes(tag.key)) {
        tagCount[tag.key] = tag.problem_count;
        totalTrackedProblems += tag.problem_count;
      }
    });

    setCategories(tagsToTrack.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1)));
    setSeries([{
      name: '태그 개수',
      data: tagsToTrack.map(tag => tagCount[tag]) 
    }]);

    const processedTagData = crew.tags
      .filter(tag => tagsToTrack.includes(tag.key))
      .map(tag => {
        const percentage = totalTrackedProblems > 0
          ? ((tag.problem_count / totalTrackedProblems) * 100).toFixed(1)
          : 0;
        return {
          tag: tag.label.ko,
          count: tag.problem_count,
          percentage
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // 상위 5개의 태그만 선택

    setTagData(processedTagData);
  }, [crew]);

  // 데이터가 없는 경우 렌더링 중지
  if (!series || series.length === 0 || crew.problem_count === 0) {
    return null;
  }

  // 최대 count 값을 5배수로
  const maxCount = Math.max(...series[0]?.data || [0]);
  const yAxisMax = Math.ceil(maxCount / 5) * 5;

  const chartOptions = {
    chart: {
      height: 350,
      type: 'radar',
      fontFamily: 'inherit',
      toolbar: {
        show: false
      }
    },
    grid: {
      padding: {
        top: -20,
        bottom: -20
      }
    },
    xaxis: {
      categories: categories
    },
    yaxis: {
      min: 0,
      max: yAxisMax, 
      tickAmount: yAxisMax / 5, // 눈금 개수를 5로 나누어 지정
      labels: {
        formatter: (value) => Math.ceil(value) 
      }
    }
  };

  return (
    <div className="box flex flex-col justify-start">
      <div className="flex justify-between gap-4">
        <div className="text-gray-900 text-lg font-bold font-cafe24"><p>크루 알고리즘 분석</p></div>
        <p className="text-gray-900 text-base font-normal">총 {crew.problem_count}개</p>
      </div>
      {crew.problem_count > 0 ? (
        <div className="solved-prob-graph relative flex flex-col">
          <div className="chart-wrap">
            <div id="chart">
              {series[0]?.data.some(val => val > 0) && (
                <ReactApexChart options={chartOptions} series={series} type="radar" height={350} />
              )}
            </div>
          </div>
          <div id="series-data" className="mt-4">
            <div className="grid grid-cols-3 gap-4 border-b pb-4 text-center text-gray-500 text-base font-medium">
              <div>태그</div>
              <div>문제 수</div>
              <div>비율</div>
            </div>
            <ul>
              {/* 상위 5개의 태그만 리스트로 표시 */}
              {tagData.map((data, index) => (
                <li key={index} className="grid grid-cols-3 gap-4 border-b py-4 text-center text-gray-800 text-sm font-semibold whitespace-nowrap">
                  <div>#{data.tag}</div>
                  <div>{data.count}</div>
                  <div>{data.percentage}%</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-6 text-gray-600">
          <div className="justify-start items-center gap-2 inline-flex animate-bounce">
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
          </div>
          <p>선장님이 문제를 등록하지 않았어요😓</p>
        </div>
      )}
    </div>
  );
};

export default SolvedProbGraph;
