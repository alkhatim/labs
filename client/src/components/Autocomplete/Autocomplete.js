import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";

export default function ComboBox(props) {
  const { label, data, property } = props;

  return (
    <Autocomplete
      {...props}
      options={data}
      getOptionLabel={(option) => option[property] || option.name || ""}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
}
