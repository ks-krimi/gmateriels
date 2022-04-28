import React, { Children, useState } from "react";
import { Form, Formik } from "formik";
import {
    Button,
    Grid,
    makeStyles,
    Step,
    StepLabel,
    Stepper,
} from "@material-ui/core";
import ButtonWrapper from "../Button";
import { ArrowForward, ArrowBack } from "@material-ui/icons";

function FormikStepper({ children, ...props }) {
    const childrenArray = Children.toArray(children);
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    const [completed, setCompleted] = useState(false);
    const classes = useStyles();

    const handlePrevious = () => {
        setStep((current) => current - 1);
    };

    function isLastStep() {
        return step === childrenArray.length - 1;
    }

    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers);
                    setCompleted(true);
                    // helpers.resetForm();
                } else setStep((s) => s + 1);
            }}
        >
            {({ isSubmitting, isValid }) => (
                <Form autoComplete="off" className={classes.form}>
                    <Stepper
                        alternativeLabel
                        activeStep={step}
                        className={classes.stepper}
                    >
                        {childrenArray.map((child, index) => (
                            <Step
                                key={child.props.label}
                                completed={completed || step > index}
                            >
                                <StepLabel>{child.props.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {currentChild}
                    <Grid container justify="space-between">
                        {step > 0 && (
                            <Grid item>
                                <Button
                                    className={classes.submit}
                                    onClick={handlePrevious}
                                    variant="outlined"
                                    startIcon={<ArrowBack />}
                                    disabled={isSubmitting}
                                >
                                    Retour
                                </Button>
                            </Grid>
                        )}
                        <Grid item>
                            <ButtonWrapper
                                className={classes.submit}
                                endIcon={
                                    !isSubmitting &&
                                    !isLastStep() && <ArrowForward />
                                }
                            >
                                {isSubmitting
                                    ? "Submitting"
                                    : isLastStep()
                                    ? "S'inscrire"
                                    : "Suivant"}
                            </ButtonWrapper>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default FormikStepper;

export function FormikStep({ children }) {
    return <>{children}</>;
}

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(2, 0, 2, 0),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    stepper: {
        background: theme.palette.background.default,
    },
}));
