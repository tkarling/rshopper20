import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "calc(100%--16px)",
    margin: 8,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    position: "fixed",
    bottom: 0,
    backgroundColor: "white",
  },
}));

export const useErrors = () => {
  const [errors, setErrors] = React.useState([] as Error[]);
  const onError = useCallback((err: Error[]) => {
    setErrors((prevErrors: Error[]) => [...err, ...prevErrors]);
  }, []);
  const onCloseError = useCallback(() => {
    setErrors((prevErrors: Error[]) => prevErrors.slice(1));
  }, []);
  return { errors, onError, onCloseError };
};

export default function Error({
  errors,
  onCloseError,
}: {
  errors: Error[];
  onCloseError: () => void;
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {!!errors.length && (
        <Alert
          severity="error"
          variant="outlined"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onCloseError}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {errors[0].message}
        </Alert>
      )}
    </div>
  );
}
