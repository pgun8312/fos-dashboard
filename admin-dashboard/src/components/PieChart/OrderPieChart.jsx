import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

export const OrderPieChart = ({ orders }) => {
  const calculateOrderStatusCount = (orders) => {
    const statusCount = {
      CANCELED: 0,
      DELIVERED: 0,
      PROCESSING: 0,
    };

    if (orders?.length > 0) {
      orders.forEach((order) => {
        switch (order.orderStatus) {
          case "CANCELED":
            statusCount.CANCELED += 1;
            break;
          case "DELIVERED":
            statusCount.DELIVERED += 1;
            break;
          case "PROCESSING":
            statusCount.PROCESSING += 1;
            break;
          default:
            break;
        }
      });
    }
    return statusCount;
  };

  const statusCount = calculateOrderStatusCount(orders);

  const data = [
    {
      id: "Processing",
      label: "Processing",
      value: statusCount?.PROCESSING || 0,
      color: "hsl(229, 70%, 50%)",
    },
    {
      id: "Delivered",
      label: "Delivered",
      value: statusCount?.DELIVERED || 0,
      color: "hsl(162, 70%, 50%)",
    },
    {
      id: "Canceled",
      label: "Canceled",
      value: statusCount?.CANCELED || 0,
      color: "hsl(344, 70%, 50%)",
    },
  ];

  const theme = useTheme();

  return (
    <ResponsivePie
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.primary.main,
            },
          },
          legend: {
            text: {
              fill: theme.palette.primary.main,
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.primary.main,
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.primary.main,
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={theme.palette.primary.main}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: theme.palette.primary.main,
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: theme.palette.primary.main,
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: theme.palette.primary.main,
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};
