import React, { Component } from "react";
import { CircularProgress, Box } from "@material-ui/core/";
import Geocode from "react-geocode";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);

class MapContainer extends Component {
  state = {
    coordinates: [],
    loading: false
  };

  async componentDidMount() {
    const coordinates = [];
    const { addresses } = this.props;
    this.setState({ loading: true });

    for (let i = 0; i < addresses.length; i++) {
      let coordinate = await Geocode.fromAddress(
        `${addresses[i].city} ${addresses[i].address}`
      ).then(response => response.results[0].geometry.location);
      coordinates.push(coordinate);
    }

    this.setState({
      coordinates,
      loading: false
    });
  }

  render() {
    const { coordinates, loading } = this.state;
    const { google, addresses } = this.props;

    const pendingIcon =
      "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|484848|40|_|%E2%80%A2";
    const currentIcon =
      "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FF2424|40|_|%E2%80%A2";
    const finishedIcon =
      "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|0091ff|40|_|%E2%80%A2";

    // const icon =

    if (loading) {
      return (
        <Box
          position="absolute"
          top="48px"
          left="0"
          right="0"
          bottom="0"
          bgcolor="#fff"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      );
    } else {
      const bounds = new google.maps.LatLngBounds();
      coordinates.forEach(coordinate => {
        bounds.extend(coordinate);
      });
      return (
        <Box
          position="absolute"
          top="48px"
          left="0"
          right="0"
          bottom="0"
        >
          <Map
            google={google}
            zoom={14}
            initialCenter={{ lat: 40.1872, lng: 44.5152 }}
            bounds={bounds}
          >
            {addresses.map((address, i) => {
              const isCurrent = i === this.props.currentStop;
              return (
                <Marker
                  onClick={this.onMarkerClick}
                  position={coordinates[i]}
                  key={address.barCode}
                  name={`${i + 1}`}
                  icon={{
                    url: isCurrent
                      ? currentIcon
                      : address.finished
                      ? finishedIcon
                      : pendingIcon, // url
                    scaledSize: new this.props.google.maps.Size(
                      21,
                      38
                    ) // scaled size
                  }}
                />
              );
            })}
          </Map>
        </Box>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API
})(MapContainer);
