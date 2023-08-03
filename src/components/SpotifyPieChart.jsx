import React, { useCallback, useState, useEffect } from "react";
import { PieChart, Pie, Sector } from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.genreName}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        className="active-shape"
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function SpotifyPieChart({ chartData, artistToGenres }) {
  const [chartDimensions, setChartDimensions] = useState({ width: 600, height: 600 });
  const [chartRadius, setChartRadius] = useState({ inner: 130, outer: 160 });
  const [chartPosition, setChartPosition] = useState({ x: 290, y: 290 });
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = 600; // Maximum width for the chart
      const maxHeight = 600; // Maximum height for the chart
      const screenWidth = window.innerWidth;

      // Adjust width and height based on the screen size
      if (screenWidth <= 480) {
        setChartDimensions({ width: screenWidth - 20, height: (screenWidth - 20) });
        setChartRadius({inner: 75, outer: 90});
        setChartPosition({ x: 160, y: 110 });
      } else {
        // Keep the chart within the maximum width and height
        setChartDimensions({ width: maxWidth, height: maxHeight });
        setChartRadius({ inner: 130, outer: 160 });
        setChartPosition({ x: 290, y: 290 });
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize once on initial render
    handleResize();

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="chart-container">
      <PieChart width={chartDimensions.width} height={chartDimensions.height}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={chartData}
        cx={chartPosition.x}
        cy={chartPosition.y}
        innerRadius={chartRadius.inner}
        outerRadius={chartRadius.outer}
        fill="#B0C887"
        dataKey="frequency"
        stroke="#242424"
        onMouseEnter={onPieEnter}
        strokeWidth={1}
      />
    </PieChart>
    </div>
  );
}
