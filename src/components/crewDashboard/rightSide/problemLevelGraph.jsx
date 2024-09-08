import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ProblemLevelGraph = ({ statistics }) => {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [problemCounts, setProblemCounts] = useState([]);

  useEffect(() => {
    // statistics가 있는지 확인
    if (!statistics || !statistics.difficulties) return;

    const newLabels = [];
    const newProblemCounts = [];
    let totalProblems = 0;

    // statistics에서 difficulties 데이터를 사용
    statistics.difficulties.forEach(difficultyData => {
      newLabels.push(`Lv. ${difficultyData.difficulty}`); // 난이도 레벨
      newProblemCounts.push(difficultyData.problem_count); // 문제 수
      totalProblems += difficultyData.problem_count; // 전체 문제 수 계산
    });

    // 전체 문제 수를 기반으로 각 난이도의 비율을 계산
    const newSeries = newProblemCounts.map(count => (count / totalProblems) * 100);

    setSeries(newSeries);
    setLabels(newLabels);
    setProblemCounts(newProblemCounts);
  }, [statistics]);

  const chartOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit'
    },
    labels: labels,
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230,
      fontFamily: 'inherit'
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (val, { seriesIndex }) => {
          const total = series.reduce((acc, value) => acc + value, 0);
          const percentage = (series[seriesIndex] / total) * 100;
          return `${percentage.toFixed(1)}% (${problemCounts[seriesIndex]} 문제)`;
        }
      }
    }
  };

  return (
    <div className="box flex flex-col justify-start gap-10">
      <div className="flex gap-4">
        <div className="text-gray-900 text-lg font-bold font-cafe24">
          <p>문제 난이도</p>
        </div>
        <p className="text-gray-900 text-base font-normal">총 {statistics.problem_count}개</p> {/* 총 문제 수를 statistics.problem_count로 표시 */}
      </div>
      {statistics.problem_count > 0 ? (
        <div className="solved-prob-graph relative flex flex-col gap-10">
          <div className="chart-wrap">
            <div id="chart">
              <ReactApexChart options={chartOptions} series={series} type="donut" width="100%" />
            </div>
          </div>
          <div id="series-data" className="mt-4">
            <div className="grid grid-cols-3 gap-4 border-b pb-4 text-center text-gray-500 text-base font-medium">
              <div>레벨</div>
              <div>문제 수</div>
              <div>비율</div>
            </div>
            <ul>
              {labels.map((label, index) => (
                <li key={index} className="grid grid-cols-3 gap-4 border-b py-4 text-center text-gray-800 text-sm font-semibold">
                  <div>{label}</div>
                  <div>{problemCounts[index]}</div>
                  <div>{series[index].toFixed(1)}%</div>
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

export default ProblemLevelGraph;
