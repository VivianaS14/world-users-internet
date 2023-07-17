import { useState, useMemo, useEffect } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { useUsersXYear } from "../../hooks/useUsersXYear";
import { formatValue } from "../../utils/formatValue";
import { Loader } from "../../containers/Loader/Loader";
import { Error } from "../../containers/Error/Error";
import TrackVisibility from "react-on-screen";
import "./UsersXYear.css";

export const UsersXYear = () => {
  const years = useMemo(
    () => [
      [
        "1990",
        "1991",
        "1992",
        "1993",
        "1994",
        "1995",
        "1996",
        "1997",
        "1998",
        "1999",
      ],
      [
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
      ],
      [
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
      ],
      ["2020"],
    ],
    []
  );

  const [yearsSelected, setYearsSelected] = useState(0);
  const { getUsersXYear, data, loading, error } = useUsersXYear();

  const handleChange = (event) => {
    setYearsSelected(event.target.value);
    getUsersXYear(years[event.target.value]);
  };

  useEffect(() => {
    getUsersXYear(years[0]);
  }, [getUsersXYear, years]);

  return (
    <div>
      <TrackVisibility>
        {({ isVisible }) => (
          <div
            className={`usersxyear ${
              isVisible ? "animate__animated animate__bounceInLeft" : ""
            }`}
            id="UsersXYear"
          >
            <h3>Internet Users Per Year</h3>

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} md={8}>
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
                    <ResponsivePie
                      data={data || []}
                      animate
                      margin={{ top: 20, right: 180, bottom: 80, left: 80 }}
                      innerRadius={0.5}
                      padAngle={0.7}
                      cornerRadius={3}
                      activeOuterRadiusOffset={8}
                      valueFormat={(value) => formatValue(value)}
                      borderWidth={1}
                      borderColor={{
                        from: "color",
                        modifiers: [["darker", 0.2]],
                      }}
                      arcLinkLabelsSkipAngle={10}
                      arcLinkLabelsTextColor="#f9eae6"
                      arcLinkLabelsThickness={2}
                      arcLinkLabelsColor={{ from: "color", modifiers: [] }}
                      arcLabelsSkipAngle={10}
                      arcLabelsTextColor={{
                        from: "color",
                        modifiers: [["darker", 6]],
                      }}
                      tooltip={({ datum: { id, value, color } }) => (
                        <div
                          style={{
                            padding: 12,
                            color,
                            background: "#222222",
                            borderRadius: 10,
                          }}
                        >
                          <strong>
                            {id}: {formatValue(value)}
                          </strong>
                        </div>
                      )}
                      theme={{
                        tooltip: {
                          container: {
                            background: "#333",
                          },
                        },
                      }}
                      defs={[
                        {
                          id: "dots",
                          type: "patternDots",
                          background: "inherit",
                          color: "rgba(255, 255, 255, 0.3)",
                          size: 4,
                          padding: 1,
                          stagger: true,
                        },
                        {
                          id: "lines",
                          type: "patternLines",
                          background: "inherit",
                          color: "rgba(255, 255, 255, 0.3)",
                          rotation: -45,
                          lineWidth: 6,
                          spacing: 10,
                        },
                      ]}
                      legends={[
                        {
                          anchor: "top-right",
                          direction: "column",
                          justify: false,
                          translateX: 160,
                          translateY: 56,
                          itemsSpacing: 0,
                          itemWidth: 100,
                          itemHeight: 18,
                          itemTextColor: "#999",
                          itemDirection: "left-to-right",
                          itemOpacity: 1,
                          symbolSize: 18,
                          symbolShape: "circle",
                          effects: [
                            {
                              on: "hover",
                              style: {
                                itemTextColor: "#f9eae6",
                              },
                            },
                          ],
                        },
                      ]}
                    />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={3} textAlign={"center"}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={yearsSelected}
                    name="radio-buttons-group"
                    value={yearsSelected}
                    onChange={handleChange}
                  >
                    {years.map((y, i) => (
                      <FormControlLabel
                        key={i}
                        value={i}
                        control={<Radio color="secondary" />}
                        label={`${y[0]} - ${y[9] ? y[9] : "..."}`}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        )}
      </TrackVisibility>
    </div>
  );
};
