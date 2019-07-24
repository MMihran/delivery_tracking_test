import React from "react";
import { AppBar, Tabs, CssBaseline } from "@material-ui/core/";
import { makeStyles, ThemeProvider } from "@material-ui/styles";

import LinkTab from "./components/layout/LinkTab";
import TabPanel from "./components/layout/TabPanel";

import Stops from "./components/stops/Stops";
import MapContainer from "./components/map/Map";

import theme from "./theme/Theme";
import data from "./data/addresses.json";

const useStyles = makeStyles(theme => ({
  stopsWrapper: {
    backgroundColor: "#53676D",
    minHeight: "calc(100vh - 48px)"
  },
  mapContainer: {
    padding: 0
  }
}));

function App() {
  const classes = useStyles();

  const [currentStop, setCurrentStop] = React.useState(0);
  const [currentTab, setCurrentTab] = React.useState(0);
  const [addresses, setAddresses] = React.useState(data);

  function handleTabChange(event, newValue) {
    setCurrentTab(newValue);
  }

  function finishStop(index) {
    setAddresses(
      addresses.map((stop, i) => {
        return i === index
          ? { ...stop, finished: true }
          : { ...stop };
      })
    );
    setCurrentStop(currentStop + 1);
  }

  function openMapWithDirection(index) {
    const destination =
      addresses[index].address + " " + addresses[index].city;
    const link =
      "https://www.google.com/maps?saddr=My+Location&daddr=" +
      destination.replace(/ /g, "+");
    window.open(link, "_blank");
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" style={{ backgroundColor: "#000" }}>
        <Tabs
          variant="fullWidth"
          value={currentTab}
          onChange={handleTabChange}
          aria-label="Nav tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#fff"
            }
          }}
        >
          <LinkTab label={`Stops (${addresses.length})`} />
          <LinkTab label="Map" />
        </Tabs>
      </AppBar>
      <TabPanel
        value={currentTab}
        index={0}
        padding={1}
        className={classes.stopsWrapper}
      >
        <Stops
          addresses={addresses}
          currentStop={currentStop}
          finishStop={finishStop}
          openMapWithDirection={openMapWithDirection}
        />
      </TabPanel>
      <TabPanel value={currentTab} index={1} padding={0}>
        <MapContainer
          addresses={addresses}
          currentStop={currentStop}
        />
      </TabPanel>
    </ThemeProvider>
  );
}

export default App;
