import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ProblemLevelGraph = ({ statistics }) => {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [problemCounts, setProblemCounts] = useState([]);
  const [displayData, setDisplayData] = useState([]); // 그래프와 테이블에 표시할 데이터
  const [onlyAnalysis, setOnlyAnalysis] = useState(false); // "분석 중"만 존재하는지 여부
  const [chartHeight, setChartHeight] = useState('350px'); // 기본 높이 설정

  // 화면 크기에 따라 차트 높이를 동적으로 설정하는 함수
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // Tailwind의 sm, md, lg에 맞춰 차트 높이를 설정
      let newHeight;
      if (width <= 640) {
        newHeight = '250px'; // 작은 화면에서는 차트 높이 감소
      } else if (width <= 1024) {
        newHeight = '300px'; // 중간 화면에서는 차트 높이 중간
      } else {
        newHeight = '350px'; // 큰 화면에서는 기본 크기 유지
      }

      // 음수나 잘못된 값 방지 (예시로 최소 150px 설정)
      if (parseInt(newHeight, 10) <= 0) {
        newHeight = '150px';
      }

      setChartHeight(newHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 화면 크기 적용

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!statistics) return;

    const newLabels = [];
    const newProblemCounts = [];
    const allDisplayData = []; // 모든 데이터 저장
    let totalProblems = 0;
    let hasNonAnalysisData = false;

    if (statistics.difficulties && statistics.difficulties.length > 0) {
      // 데이터 처리
      statistics.difficulties.forEach(difficultyData => {
        const label = difficultyData.difficulty === 0 ? '분석 중' : `Lv. ${difficultyData.difficulty}`;
        allDisplayData.push({
          label,
          count: difficultyData.count,
          difficulty: difficultyData.difficulty,
        });

        if (difficultyData.difficulty !== 0) { // 난이도 0인 항목을 그래프에서 제외
          newLabels.push(`Lv. ${difficultyData.difficulty}`);
          newProblemCounts.push(difficultyData.count);
          totalProblems += difficultyData.count;
          hasNonAnalysisData = true;
        }
      });

      const newSeries = newProblemCounts.map(count => (count / totalProblems) * 100);

      setSeries(newSeries);
      setLabels(newLabels);
      setProblemCounts(newProblemCounts);
      setDisplayData(allDisplayData); // 모든 데이터를 저장
      setOnlyAnalysis(!hasNonAnalysisData); // "분석 중"만 있는지 여부 설정
    }
  }, [statistics]);

  const renderGraphOrMessage = () => {
    if (!statistics || statistics.problem_count === 0) {
      // 문제 등록이 아예 없을 때
      return (
        <div className="flex flex-col items-center gap-3 py-6 text-gray-600">
          <div className="justify-start items-center gap-2 inline-flex animate-bounce">
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
          </div>
          <p>선장님이 문제를 등록하지 않았어요😓</p>
        </div>
      );
    }

    if (onlyAnalysis) {
      // "분석 중"만 있을 때
      return (
        <>
          <div className="flex flex-col items-center gap-3 py-16 text-gray-600">
            <div className="justify-start items-center gap-2 inline-flex animate-bounce">
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
            </div>
            <p className="text-center">문제 난이도가 분석되면<br />그래프가 표시돼요 😊</p>
          </div>
          {renderTableData()}
        </>
      );
    }

    const chartOptions = {
      chart: {
        type: 'donut',
        fontFamily: 'inherit',
        height: parseInt(chartHeight, 10) > 0 ? chartHeight : '150px', // 최소 높이 설정
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
      <div className="solved-prob-graph relative flex flex-col gap-10">
        <div className="chart-wrap min-h-32 max-h-72">
          <div id="chart min-h-32">
            <ReactApexChart options={chartOptions} series={series} type="donut" width="100%" />
          </div>
        </div>
        {renderTableData()} {/* 테이블을 렌더링 */}
      </div>
    );
  };

  const renderTableData = () => (
    <div id="series-data" className="mt-4">
      <div className="grid grid-cols-3 gap-4 border-b pb-4 text-center text-gray-500 text-base font-medium">
        <div>레벨</div>
        <div>문제 수</div>
        <div>비율</div>
      </div>
      <ul>
        {displayData.map((data, index) => (
          <li key={index} className="grid grid-cols-3 gap-4 border-b py-4 text-center text-gray-800 text-sm font-semibold">
            <div>{data.label === `Lv. 0` ? "분석 중" : data.label}</div>
            <div>{data.count}</div>
            <div>{((data.count / statistics.problem_count) * 100).toFixed(1)}%</div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-40 box flex flex-col justify-start gap-10">
      <div className="w-full flex flex-wrap gap-4 justify-between">
        <p className="text-gray-900 text-lg font-bold font-cafe24">문제 난이도</p>
        <p className="text-gray-900 text-base font-normal">총 {statistics.problem_count}개</p>
      </div>
      {renderGraphOrMessage()}
    </div>
  );
};

export default ProblemLevelGraph;
