import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import data from "./data";
// import config from './config'
import "./chart.css";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import { ReactComponent as DriveLogo } from "../../assets/steering-wheel.svg";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

// export default function MyResponsiveBar() {

  const CustomBarComponent = ({ x, y, width, height, color }) => (
    <circle cx={x + width / 2} cy={y + height / 2} r={Math.min(width, height) / 2} fill={color} />
)
export default function MyResponsiveBar() {
  return (
    <div class="chart">
      <ResponsiveBar
        data={data}
        keys={["hot dog", "burger", "sandwich", "kebab"]}
        indexBy="country"
        labelTextColor="inherit:darker(1)"
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        padding={0.3}
        innerPadding={1}
        layout="horizontal"
        colors={{ scheme: "nivo" }}
        barComponent={CustomBarComponent}
      
        labelTextColor="inherit:darker(1)"
        isInteractive={true}
        tooltipFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    
        defs={[
          {
            id: "dots",
            type: DriveLogo,
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 2,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderRadius={25}
        borderWidth={3}
        borderColor={{ from: "color", modifiers: [["darker", "0.5"]] }}
        axisTop={  null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 40,
          legend: "Ride Requests Today",
          legendPosition: "middle",
          legendOffset: 40,
        }}
        // axisLeft={{
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: "food",
        //   legendPosition: "middle",
        //   legendOffset: -40,
        // }}
        labelSkipWidth={5}
        labelSkipHeight={5}
        labelTextColor={{ from: "color", modifiers: [["darker", "1.4"]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: -9,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 24,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={30}
        motionDamping={37}
        tooltip={function(){}}
 
      />
    </div>
  );
}

