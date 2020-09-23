/*eslint-disable*/
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import React from "react";

export default function Footer(props) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.twzeef.com">
        Twzeef
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
