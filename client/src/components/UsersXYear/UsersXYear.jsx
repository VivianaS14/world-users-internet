import { useMemo, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import data from "../../mocks/datapie.json";
import "./UsersXYear.css";

export const UsersXYear = () => {
  const [yearSelected, setYearSelected] = useState("");

  const years = useMemo(
    () => ["1980 - 1989", "1990 - 1999", "2000 - 2009", "2010 - 2020"],
    []
  );

  const handleChange = (event) => {
    setYearSelected(event.target.value);
  };

  return (
    <div className="usersxyear">
      <h3>Internet Users Per Year</h3>

      <Grid
        container
        direction="row"
        justifyContent="center"
        // alignItems="center"
      >
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              width: "auto",
              height: "600px",
              margin: "auto",
              boxSizing: "border-box",
            }}
          >
            <ResponsivePie
              data={data}
              margin={{ top: 5, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              colors={{ scheme: "pink_yellowGreen" }}
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
                modifiers: [["darker", 5]],
              }}
              tooltip={({ datum: { id, value, color } }) => (
                <div
                  style={{
                    padding: 12,
                    color,
                    background: "#222222",
                  }}
                >
                  <strong>
                    {id}: {value}
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
              fill={[
                {
                  match: {
                    id: "ruby",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "c",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "go",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "python",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "scala",
                  },
                  id: "lines",
                },
                {
                  match: {
                    id: "lisp",
                  },
                  id: "lines",
                },
                {
                  match: {
                    id: "elixir",
                  },
                  id: "lines",
                },
                {
                  match: {
                    id: "javascript",
                  },
                  id: "lines",
                },
              ]}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4} textAlign={"center"}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="2010 - 2020"
              name="radio-buttons-group"
              value={yearSelected}
              onChange={handleChange}
            >
              {years.map((y, i) => (
                <FormControlLabel
                  key={i}
                  value={y}
                  control={<Radio color="secondary" />}
                  label={y}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};
