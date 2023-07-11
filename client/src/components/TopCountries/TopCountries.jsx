import { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { years } from "../../utils/years";
import "./TopCountries.css";

export const TopCountries = () => {
  const [year, setYear] = useState("2020");

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  return (
    <div className="TopCountries">
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
                {years.map((y, i) => (
                  <MenuItem key={i} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
