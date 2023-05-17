import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { mapsApiKey } from "../config/googleMapsClient";

export default function GMap(props) {

  console.log(mapsApiKey);
  console.log(props);
  
  const containerStyle = {width:'100vw', height:'400px'};
  const center = { lat: 44, lng: -80 };
  console.log(center)

  const { isLoaded } = useJsApiLoader({
    id:'google-map-script',
    googleMapsApiKey: mapsApiKey
  });

  console.log(isLoaded);

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
    ><>      </>
    </GoogleMap>
  ) : <></>
}