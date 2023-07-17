import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { ResponsiveRadialBar } from "@nivo/radial-bar";
import { years } from "../../utils/years";
import { useTopCountries } from "../../hooks";
import { Loader } from "../../containers/Loader/Loader";
import "./TopCountries.css";
import { Error } from "../../containers/Error/Error";

export const TopCountries = () => {
  const { data, loading, error, getCountries } = useTopCountries();

  const [year, setYear] = useState("2020");

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  useEffect(() => {
    getCountries(year);
  }, [getCountries, year]);

  return (
    <div className="TopCountries" id="TopCountries">
      <h3>TopCountries</h3>

      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
      >
        <Grid item className="yearSelect">
          <Box>
            <FormControl sx={{ m: 1, width: 300 }} size="small">
              <InputLabel id="year-select">Year</InputLabel>
              <Select
                labelId="year-select"
                id="year"
                input={<OutlinedInput id="select" />}
                value={year}
                onChange={handleChangeYear}
              >
                {years
                  .filter((y) => y > 1989)
                  .map((y, i) => (
                    <MenuItem key={i} value={y}>
                      {y}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          width: "auto",
          height: "700px",
          margin: "auto",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <Error message={error} />
        ) : (
          <ResponsiveRadialBar
            data={data}
            valueFormat=">-.2f"
            padding={0.4}
            cornerRadius={2}
            margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
            colors={{ scheme: "pink_yellowGreen" }}
            radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
            circularAxisOuter={{
              tickSize: 5,
              tickPadding: 12,
              tickRotation: 0,
            }}
            legends={[
              {
                anchor: "right",
                direction: "column",
                justify: false,
                translateX: 80,
                translateY: 0,
                itemsSpacing: 6,
                itemDirection: "left-to-right",
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                symbolSize: 18,
                symbolShape: "square",
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
            theme={{
              background: "#181818",
              text: {
                fontSize: 15,
                fill: "#333333",
                outlineWidth: 0,
                outlineColor: "transparent",
              },
              axis: {
                domain: {
                  line: {
                    stroke: "#777777",
                    strokeWidth: 1,
                  },
                },
                legend: {
                  text: {
                    fontSize: 15,
                    fill: "#c2c1c1",
                    outlineWidth: 0,
                    outlineColor: "transparent",
                  },
                },
                ticks: {
                  line: {
                    stroke: "#777777",
                    strokeWidth: 1,
                  },
                  text: {
                    fontSize: 15,
                    fill: "#dbd7d7",
                    outlineWidth: 0,
                    outlineColor: "transparent",
                  },
                },
              },
              grid: {
                line: {
                  stroke: "#dddddd",
                  strokeWidth: 1,
                },
              },
              legends: {
                title: {
                  text: {
                    fontSize: 11,
                    fill: "#333333",
                    outlineWidth: 0,
                    outlineColor: "transparent",
                  },
                },
                text: {
                  fontSize: 15,
                  fill: "#d9d9d9",
                  outlineWidth: 0,
                  outlineColor: "transparent",
                },
                ticks: {
                  line: {},
                  text: {
                    fontSize: 10,
                    fill: "#333333",
                    outlineWidth: 0,
                    outlineColor: "transparent",
                  },
                },
              },
              annotations: {
                text: {
                  fontSize: 13,
                  fill: "#333333",
                  outlineWidth: 2,
                  outlineColor: "#ffffff",
                  outlineOpacity: 1,
                },
                link: {
                  stroke: "#000000",
                  strokeWidth: 1,
                  outlineWidth: 2,
                  outlineColor: "#ffffff",
                  outlineOpacity: 1,
                },
                outline: {
                  stroke: "#000000",
                  strokeWidth: 2,
                  outlineWidth: 2,
                  outlineColor: "#ffffff",
                  outlineOpacity: 1,
                },
                symbol: {
                  fill: "#000000",
                  outlineWidth: 2,
                  outlineColor: "#ffffff",
                  outlineOpacity: 1,
                },
              },
              tooltip: {
                container: {
                  background: "#303030",
                  fontSize: 15,
                },
                basic: {},
                chip: {},
                table: {},
                tableCell: {},
                tableCellValue: {},
              },
            }}
          />
        )}
      </Box>
    </div>
  );
};
