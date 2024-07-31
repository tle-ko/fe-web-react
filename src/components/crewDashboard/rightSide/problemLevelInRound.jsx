import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ProblemLevelInRound = ({ activity, problems }) => {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [problemCounts, setProblemCounts] = useState([]);

  useEffect(() => {
    const difficultyCount = {};

    activity.problems.forEach(problem => {
      const problemData = problems.find(p => p.id === problem.problem_id);
      if (problemData && problemData.analysis && problemData.analysis.length > 0) {
        const difficulty = problemData.analysis[0].difficulty;
        difficultyCount[difficulty] = (difficultyCount[difficulty] || 0) + 1;
      }
    });

    const newProblemCounts = [];
    const newLabels = [];
    let totalDifficulties = 0;

    for (const [difficulty, count] of Object.entries(difficultyCount)) {
      newLabels.push(`Lv. ${difficulty}`);
      newProblemCounts.push(count);
      totalDifficulties += count;
    }

    const newSeries = newProblemCounts.map(count => (count / totalDifficulties) * 100);

    setSeries(newSeries);
    setLabels(newLabels);
    setProblemCounts(newProblemCounts);
  }, [activity, problems]);

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
        <p className="text-gray-900 text-base font-normal">총 {activity.problems.length}개</p>
      </div>
      {activity.problems.length > 0 ? (
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
          <div id="html-dist"></div>
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

export default ProblemLevelInRound;
