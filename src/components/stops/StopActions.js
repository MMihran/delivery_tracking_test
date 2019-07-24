import React from "react";
import { makeStyles } from "@material-ui/core";
import { Button, Typography } from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles(theme => ({
  actionButton: {
    display: "block",
    "&+ $actionButton": {
      marginLeft: "30px"
    }
  },
  buttonText: {
    fontSize: "0.625rem",
    lineHeight: 1.1
  },
  buttonsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1)
  }
}));

function StopActions({ openMapWithDirection, finishStop, index }) {
  const classes = useStyles();

  return (
    <div className={classes.buttonsWrapper}>
      <Button
        color="primary"
        className={classes.actionButton}
        onClick={() => openMapWithDirection(index)}
      >
        <NavigationIcon
          className={classes.extendedIcon}
          color="primary"
        />
        <Typography component="p" className={classes.buttonText}>
          Navigate
        </Typography>
      </Button>
      <Button
        color="primary"
        className={classes.actionButton}
        onClick={() => finishStop(index)}
      >
        <CheckIcon color="primary" />
        <Typography component="p" className={classes.buttonText}>
          Finish
        </Typography>
      </Button>
    </div>
  );
}

export default StopActions;
