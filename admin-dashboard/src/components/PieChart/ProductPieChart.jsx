import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

export const ProductPieChart = ({ products }) => {
  const calculateProductCategoryCount = (products) => {
    const statusCount = {
      CHICKEN: 0,
      CURRY: 0,
      RICE: 0,
      FISH: 0,
      ICE_CREAMS: 0,
      SOFT_DRINKS: 0,
    };

    if (products?.length > 0) {
      products.forEach((product) => {
        switch (product.category) {
          case "CHICKEN":
            statusCount.CHICKEN += 1;
            break;
          case "CURRY":
            statusCount.CURRY += 1;
            break;
          case "RICE":
            statusCount.RICE += 1;
            break;
          case "FISH":
            statusCount.FISH += 1;
            break;
          case "ICE_CREAMS":
            statusCount.ICE_CREAMS += 1;
            break;
          case "SOFT_DRINKS":
            statusCount.SOFT_DRINKS += 1;
            break;
          default:
            break;
        }
      });
    }
    return statusCount;
  };

  const categoryCount = calculateProductCategoryCount(products);

  const data = [
    {
      id: "CHICKEN",
      label: "CHICKEN",
      value: categoryCount?.CHICKEN || 0,
      color: "#FF8C00",
    },
    {
      id: "CURRY",
      label: "CURRY",
      value: categoryCount?.CURRY || 0,
      color: "#4CAF50",
    },
    {
      id: "RICE",
      label: "RICE",
      value: categoryCount?.RICE || 0,
      color: "#FFD700",
    },
    {
      id: "FISH",
      label: "FISH",
      value: categoryCount?.FISH || 0,
      color: "#1E90FF",
    },
    {
      id: "ICE_CREAMS",
      label: "ICE_CREAMS",
      value: categoryCount?.ICE_CREAMS || 0,
      color: "#FF69B4",
    },
    {
      id: "SOFT_DRINKS",
      label: "SOFT_DRINKS",
      value: categoryCount?.SOFT_DRINKS || 0,
      color: "#00CED1",
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
