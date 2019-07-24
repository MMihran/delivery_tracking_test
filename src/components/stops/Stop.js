import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  CardContent,
  Avatar,
  Divider,
  Box
} from "@material-ui/core/";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/Error";

import StopActions from "./StopActions";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1, 0),
    backgroundColor: "rgba(255,255,255,.82)",
    transition: "box-shadow 0",
    "&:first-child": {
      marginTop: 0
    }
  },
  rootCurrent: {
    backgroundColor: "#fff",
    margin: theme.spacing(1, -1),
    padding: theme.spacing(0, 1),
    borderRadius: 0
  },
  rootFinished: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: theme.spacing(0.5, 0, 1)
  },
  contentWrapper: {
    display: "flex"
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  content: {
    flexGrow: 1
  },
  exactTime: {
    color: "#51B561"
  },
  lateTime: {
    color: theme.palette.error.light
  },
  errorIcon: {
    margin: theme.spacing(-0.2, 0.4, 0, 0)
  },
  cardContent: {
    paddingLeft: 0,
    paddingBottom: "10px",
    "&:last-child": {
      paddingBottom: "10px"
    }
  },
  textSmall: {
    fontSize: "0.8125rem"
  },
  finishedText: {
    color: "#DEDEDE"
  },
  timeRange: {
    whiteSpace: "nowrap",
    marginLeft: theme.spacing(2)
  },
  fab: {
    alignSelf: "center",
    margin: theme.spacing(2.5, 2.5),
    backgroundColor: "#DEDEDE",
    fontSize: "1rem",
    color: theme.palette.text.primary
  },
  fabCurrent: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
  fabFinished: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  divider: {
    marginRight: theme.spacing(-1)
  }
}));

function Stop({
  stopData,
  index,
  currentStop,
  finishStop,
  openMapWithDirection
}) {
  const classes = useStyles();
  const isCurrent = index === currentStop;
  const isFinished = stopData.finished;

  // check if expected date passed time range
  const isLate =
    new Date().setHours(...stopData.exactTime.split(":")) >
    new Date().setHours(
      ...stopData.timeRange.split("-")[1].split(":")
    );

  return (
    <Card
      className={`
      ${classes.root} 
      ${isCurrent ? classes.rootCurrent : ""}
      ${isFinished ? classes.rootFinished : ""}`}
    >
      <div className={classes.contentWrapper}>
        <Avatar
          className={`
          ${classes.fab} 
          ${isCurrent ? classes.fabCurrent : ""} 
          ${isFinished ? classes.fabFinished : ""}`}
          color="secondary"
        >
          {!isFinished ? index + 1 : <CheckIcon />}
        </Avatar>
        <div className={classes.content}>
          <CardContent className={classes.cardContent}>
            <div className={classes.details}>
              <Typography
                variant="body1"
                component="h3"
                className={isFinished ? classes.finishedText : ""}
              >
                {stopData.barCode}
              </Typography>
              {!isFinished && (
                <Box display="flex" alignItems="center">
                  {isLate && (
                    <ErrorIcon
                      color="error"
                      className={classes.errorIcon}
                    />
                  )}

                  <Typography
                    variant="body1"
                    component="h3"
                    className={`
                    ${isLate ? classes.lateTime : classes.exactTime}
                  `}
                  >
                    {stopData.exactTime}
                  </Typography>
                </Box>
              )}
            </div>
            <div className={classes.details}>
              <Typography
                className={`
                ${classes.textSmall} 
                ${isFinished ? classes.finishedText : ""}`}
                color="textSecondary"
              >
                {stopData.address} <br />
                {`${stopData.postal} ${stopData.city}`}
              </Typography>
              {!isFinished && (
                <Typography
                  className={
                    classes.timeRange + " " + classes.textSmall
                  }
                  color="textSecondary"
                >
                  {stopData.timeRange}
                </Typography>
              )}
            </div>
          </CardContent>
          {isCurrent && <Divider className={classes.divider} />}
        </div>
      </div>

      {isCurrent && (
        <StopActions
          openMapWithDirection={openMapWithDirection}
          finishStop={finishStop}
          index={index}
        />
      )}
    </Card>
  );
}

export default Stop;
