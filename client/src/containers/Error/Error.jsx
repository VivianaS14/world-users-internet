import { Box } from "@mui/material";

// eslint-disable-next-line react/prop-types
export const Error = ({ message }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p style={{ color: "#F53844" }}>{message}</p>
    </Box>
  );
};
