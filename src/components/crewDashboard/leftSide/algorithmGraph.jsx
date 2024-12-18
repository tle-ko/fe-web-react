import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const AlgorithmGraph = ({ crew }) => {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tagData, setTagData] = useState([]);

  useEffect(() => {
    if (!crew || !crew.tags) return;

    const tagsToTrack = [
      'math',
      'implementation',
      'greedy',
      'string',
      'data_structures',
      'graphs',
      'dp',
      'geometry',
    ];

    const trackedTags = crew.tags.filter((tag) => tagsToTrack.includes(tag.tag.key));
    const totalTrackedProblems = trackedTags.reduce((acc, tag) => acc + tag.count, 0);

    const tagCount = trackedTags.reduce((acc, tag) => {
      acc[tag.tag.key] = tag.count;
      return acc;
    }, {});

    setCategories(tagsToTrack.map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1)));
    setSeries([
      {
        name: '태그 개수',
        data: tagsToTrack.map((tag) => tagCount[tag] || 0),
      },
    ]);

    const processedTagData = trackedTags
      .map((tag) => ({
        tag: tag.tag.name_ko || tag.tag.name_en,
        count: tag.count,
        percentage:
          totalTrackedProblems > 0 ? ((tag.count / totalTrackedProblems) * 100).toFixed(1) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setTagData(processedTagData);
  }, [crew]);

  const maxCount = Math.max(...(series[0]?.data || [0]));
  const yAxisMax = Math.ceil(maxCount / 5) * 5;

  const chartOptions = {
    chart: {
      height: 350,
      type: 'radar',
      fontFamily: 'inherit',
      toolbar: {
        show: false,
      },
    },
    grid: {
      padding: {
        top: -20,
        bottom: -20,
      },
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      min: 0,
      max: yAxisMax,
      tickAmount: yAxisMax / 5,
      labels: {
        formatter: (value) => Math.ceil(value),
      },
    },
  };

  return (
    <div className="box flex flex-col justify-start">
      <div className="flex justify-between gap-4">
        <div className="font-cafe24 text-lg font-bold text-gray-900">
          <p>크루 알고리즘 분석</p>
        </div>
        <p className="text-base font-normal text-gray-900">총 {crew.problem_count}개</p>
      </div>

      {crew.problem_count === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-gray-600">
          <div className="inline-flex animate-bounce items-center justify-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
            <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
            <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
          </div>
          <p>선장님이 문제를 등록하지 않았어요😓</p>
        </div>
      ) : crew.tags.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-gray-600">
          <div className="inline-flex animate-bounce items-center justify-start gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
            <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
            <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
          </div>
          <p className="text-center">
            크루 알고리즘 태그가 분석되면
            <br />
            그래프가 표시돼요 😊
          </p>
        </div>
      ) : (
        <div className="solved-prob-graph relative flex flex-col">
          <div className="chart-wrap">
            <div id="chart">
              <ReactApexChart options={chartOptions} series={series} type="radar" height={350} />
            </div>
          </div>
          <div id="series-data" className="mt-4">
            <div className="grid grid-cols-3 gap-4 border-b pb-4 text-center text-base font-medium text-gray-500">
              <div>태그</div>
              <div>문제 수</div>
              <div>비율</div>
            </div>
            <ul>
              {tagData.map((data, index) => (
                <li
                  key={index}
                  className="grid grid-cols-3 gap-4 whitespace-nowrap border-b py-4 text-center text-sm font-semibold text-gray-800"
                >
                  <div>#{data.tag}</div>
                  <div>{data.count}</div>
                  <div>{data.percentage}%</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgorithmGraph;
