import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ProblemLevelGraph = ({ statistics }) => {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [problemCounts, setProblemCounts] = useState([]);

  useEffect(() => {
    if (!statistics || !statistics.difficulties) return;

    const newLabels = [];
    const newProblemCounts = [];
    let totalProblems = 0;

    statistics.difficulties.forEach(difficultyData => {
      newLabels.push(`Lv. ${difficultyData.difficulty + 1}`);
      newProblemCounts.push(difficultyData.problem_count);
      totalProblems += difficultyData.problem_count;
    });

    const newSeries = newProblemCounts.map(count => (count / totalProblems) * 100);

    setSeries(newSeries);
    setLabels(newLabels);
    setProblemCounts(newProblemCounts);
  }, [statistics]);

  if (!statistics || statistics.problem_count === 0 || series.length === 0) {
    return null;
  }

  const chartOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
      height: 350,
    },
    labels: labels,
    legend: {
      position: 'right', 
      width: '20%',
      height: 350,
      fontSize: '14px',
      markers: {
        width: 12,
        height: 12,
      },
      itemMargin: {
        vertical: 5,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
        },
      },
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
        },
      },
    },
  };

  return (
    <div className="min-h-40 box flex flex-col justify-start gap-10">
      <div className="w-full flex flex-wrap gap-4 justify-between">
        <p className="text-gray-900 text-lg font-bold font-cafe24">
          문제 난이도
        </p>
        <p className="text-gray-900 text-base font-normal">총 {statistics.problem_count}개</p>
      </div>
      {statistics.problem_count > 0 ? (
        <div className="solved-prob-graph relative flex flex-col gap-10">
          <div className="chart-wrap min-h-32 max-h-72">
            <div id="chart min-h-32">
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
