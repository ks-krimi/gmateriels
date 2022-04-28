import React from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";

function DateTimePicker({ name, ...otherProps }) {
    const [field, metadata] = useField(name);

    const configDateTimePicker = {
        type: "date",
        variant: "outlined",
        fullWidth: true,
        InputLabelProps: {
            shrink: true,
        },
        ...field,
        ...otherProps,
    };

    if (metadata && metadata.error && metadata.touched) {
        configDateTimePicker.error = true;
        configDateTimePicker.helperText = metadata.error;
    }

    return <TextField {...configDateTimePicker} />;
}

export default DateTimePicker;
