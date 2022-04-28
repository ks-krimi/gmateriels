import React from "react";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
} from "@material-ui/core";
import { useField, useFormikContext } from "formik";

function CheckBoxWrapper({ name, legend, label, ...otherProps }) {
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = (e) => {
        const { checked } = e.target;
        setFieldValue(name, checked);
    };

    const CheckboxConfig = {
        onChange: handleChange,
        ...field,
        ...otherProps,
    };
    const formControlConfig = {};

    if (meta && meta.touched && meta.error) {
        formControlConfig.error = true;
    }

    return (
        <FormControl {...formControlConfig}>
            <FormLabel component="legend">{legend}</FormLabel>
            <FormControlLabel
                label={label}
                control={<Checkbox {...CheckboxConfig} />}
            />
        </FormControl>
    );
}

export default CheckBoxWrapper;
