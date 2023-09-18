import * as React from "react";
import MaterialLink from "@mui/material/Link";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MaterialLink component={Link} color="inherit" to="/">
        Appointment Management System
      </MaterialLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
