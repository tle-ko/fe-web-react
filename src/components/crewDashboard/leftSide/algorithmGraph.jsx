import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const SolvedProbGraph = ({ crew, problems }) => {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [totalProblems, setTotalProblems] = useState(0);

  useEffect(() => {
    const tags = [
      'math', 'implementation', 'greedy', 'string', 'data_structures', 'graphs', 'dp', 'geometry'
    ];

    const tagCount = tags.reduce((acc, tag) => {
      acc[tag] = 0;
      return acc;
    }, {});

    let totalProblemsCount = 0;

    crew.activities.forEach(activity => {
      activity.problems.forEach(problem => {
        const problemData = problems.find(p => p.id === problem.problem_id);
        if (problemData) {
          totalProblemsCount++;
          if (problemData.analysis && problemData.analysis.length > 0) {
            problemData.analysis[0].tags.forEach(tag => {
              if (tagCount.hasOwnProperty(tag.key)) {
                tagCount[tag.key]++;
              }
            });
          }
        }
      });
    });

    const maxCount = Math.max(...Object.values(tagCount));
    const categories = tags.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1));

    setCategories(categories);
    setSeries([{
      name: '태그 개수',
      data: Object.values(tagCount).map(count => (maxCount > 0 ? (count / maxCount) * 10 : 0))
    }]);

    setTagData(Object.entries(tagCount).map(([tag, count]) => {
      if (count === 0) return null; // 문제 수가 0개인 태그는 제외
      const percentage = ((count / totalProblemsCount) * 100).toFixed(1);
      const tagNameKo = problems.flatMap(problem => 
        problem.analysis ? problem.analysis.flatMap(analysis => 
          analysis.tags.filter(t => t.key === tag).map(t => t.name_ko)
        ) : []
      )[0] || tag;
      return {
        tag: tagNameKo,
        count,
        percentage
      };
    }).filter(Boolean)); // null 값을 제외한 배열로 만듦

    setTotalProblems(totalProblemsCount);
  }, [crew, problems]);

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
      max: Math.max(...Object.values(series[0]?.data || [0])) * 1.5,
      tickAmount: Math.ceil((Math.max(...Object.values(series[0]?.data || [0])) * 1.5) / 5),
      labels: {
        formatter: (value) => Math.ceil(value / 5) * 5
      }
    }
  };

  return (
    <div className="box flex flex-col justify-start">
      <div className="flex justify-between gap-4">
        <div className="text-gray-900 text-lg font-bold font-cafe24"><p>크루 알고리즘 분석</p></div>
        <p className="text-gray-900 text-base font-normal">총 {totalProblems}개</p>
      </div>
      {totalProblems > 0 ? (
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
              {tagData.map((data, index) => (
                <li key={index} className="grid grid-cols-3 gap-4 border-b py-4 text-center text-gray-800 text-sm font-semibold">
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
