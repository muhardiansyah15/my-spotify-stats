import { React, useState, useEffect } from "react";
import ChartRace from "react-chart-race";

function SpotifyBarChart({ data }) {
  const [barWidth, setBarWidth] = useState(760);
  const [barHeight, setBarHeight] = useState(40);
  const colors = [
    "#FF5733",
    "#33FF57",
    "#5733FF",
    "#33A5FF",
    "#FF33D1",
    "#FFDA33",
    "#33FFDA",
    "#9933FF",
    "#FFC733",
    "#33FF8F",
  ];

  // Assign a color to each object in the data array
  const coloredData = data.map((item, index) => ({
    ...item,
    color: colors[index % colors.length],
    title: item.title.toUpperCase()
  }));
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth/ window.devicePixelRatio;
      if (screenWidth <= 480) {
        setBarWidth(200);
        setBarHeight(30);
      } else {
        setBarWidth(760);
        setBarHeight(40);
      }
    };

    // Call handleResize once on initial render
    handleResize();

    // Add event listener for window resize and remove it on unmount
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <ChartRace
        data={coloredData} // Use the coloredData instead of the original data
        backgroundColor="#242424"
        width={barWidth}
        padding={12}
        itemHeight={barHeight}
        gap={12}
        titleStyle={{ font: "normal 400 13px Arial", color: "#fff" }}
        valueStyle={{
          font: "normal 400 11px Arial",
          color: "rgba(255,255,255, 0.42)"
        }}
      />
    </div>
  );
}

export default SpotifyBarChart;
