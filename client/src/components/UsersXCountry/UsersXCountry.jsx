import { useEffect, useState } from "react";
import {
  Box,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { useCountries, useUsersXCountry } from "../../hooks";
import { Loader } from "../../containers/Loader/Loader";
import { Error } from "../../containers/Error/Error";
import { formatValue } from "../../utils/formatValue";
import { years } from "../../utils/years";
import Visibility from "react-on-screen";
import "./UsersXCountry.css";

export const UsersXCountry = () => {
  const { countries, getCountries, loadingCountries, errorCountries } =
    useCountries();
  const { getUsersXCountry, data, error, loading } = useUsersXCountry();

  const [countryName, setCountryName] = useState("Colombia");
  const [yearsList, setYearsList] = useState(["2000", "2020"]);

  const handleChangeCountry = (event) => {
    setCountryName(event.target.value);
  };

  const handleChangeYear = (event) => {
    const {
      target: { value },
    } = event;
    setYearsList(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  useEffect(() => {
    getUsersXCountry(countryName, yearsList);
  }, [countryName, getUsersXCountry, yearsList]);

  return (
    <div>
      <Visibility>
        {({ isVisible }) => (
          <div
            className={`UsersXCountry ${
              isVisible ? "animate__animated animate__bounceInRight" : ""
            }`}
            id="UsersXCountry"
          >
            <h3>UsersXCountry</h3>

            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              spacing={2}
            >
              <Grid item className="countrySelect">
                <Box>
                  <FormControl sx={{ m: 1, width: 300 }} size="small">
                    <InputLabel id="multiple-country-label">Country</InputLabel>
                    <Select
                      labelId="multiple-country-label"
                      id="multiple-country"
                      value={countryName}
                      onChange={handleChangeCountry}
                      input={<OutlinedInput label="Country" />}
                    >
                      {loadingCountries ? (
                        <MenuItem>Loading...</MenuItem>
                      ) : errorCountries ? (
                        <MenuItem>{errorCountries}</MenuItem>
                      ) : (
                        countries.map((country, i) => (
                          <MenuItem key={i} value={country}>
                            {country}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item className="yearSelect">
                <Box>
                  <FormControl sx={{ m: 1, width: 300 }} size="small">
                    <InputLabel id="multiple-year-label">Year</InputLabel>
                    <Select
                      labelId="multiple-year-label"
                      id="multiple-year"
                      multiple
                      value={yearsList}
                      onChange={handleChangeYear}
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
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
                <>
                  <ResponsiveBar
                    data={data}
                    keys={yearsList}
                    indexBy="country"
                    valueFormat={(value) => formatValue(value)}
                    margin={{ top: 30, right: 180, bottom: 60, left: 200 }}
                    padding={0.3}
                    valueScale={{ type: "linear" }}
                    indexScale={{ type: "band", round: true }}
                    colors={{ scheme: "pastel2" }}
                    borderColor={{
                      from: "color",
                      modifiers: [["darker", 1.6]],
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "",
                      legendPosition: "middle",
                      legendOffset: 45,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Users",
                      legendPosition: "middle",
                      legendOffset: -120,
                    }}
                    enableGridX={true}
                    labelSkipWidth={15}
                    labelSkipHeight={12}
                    labelTextColor={{
                      from: "color",
                      modifiers: [["darker", 1.6]],
                    }}
                    legends={[
                      {
                        dataFrom: "keys",
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: "left-to-right",
                        itemOpacity: 0.85,
                        symbolSize: 20,
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
                    role="application"
                    ariaLabel="Nivo bar chart demo"
                    barAriaLabel={(e) =>
                      e.id +
                      ": " +
                      e.formattedValue +
                      " in country: " +
                      e.indexValue
                    }
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
                </>
              )}
            </Box>
          </div>
        )}
      </Visibility>
    </div>
  );
};
