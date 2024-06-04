import React from "react";
import { Box } from "@mui/material";

const DetailBox = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#F0F8FF", // Alice blue background color
        padding: "5px",
        marginBottom: "5px",
        borderRadius: "5px", // Optional: to add some border radius
      }}
    >
      {children}
    </Box>
  );
};

export default DetailBox;
