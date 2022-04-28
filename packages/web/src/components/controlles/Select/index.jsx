import React from "react";
import { MenuItem, TextField } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

function SelectWrapper({ name, options, ...otherProps }) {
    const { setFieldValue } = useFormikContext;
    const [field, metadata] = useField(name);
    const handleChange = (e) => {
        const { value } = e.target;
        setFieldValue(name, value);
    };
    const configSelect = {
        variant: "outlined",
        fullWidth: true,
        select: true,
        onChange: handleChange,
        ...field,
        ...otherProps,
    };

    if (metadata && metadata.error && metadata.touched) {
        configSelect.error = true;
        configSelect.helperText = metadata.error;
    }

    return (
        <TextField {...configSelect}>
            {options &&
                options.map((option) => {
                    return (
                        <MenuItem key={option.id} value={option.id}>
                            {option.value}
                        </MenuItem>
                    );
                })}
        </TextField>
    );
}

export default SelectWrapper;
