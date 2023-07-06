import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { mapsApiKey } from "../config/googleMapsClient";

export default function GMap({ results }) {
  const containerStyle = { width: '400px', height: '400px' };

  const center = { lat: 44, lng: -80 };
  console.log(center);
  
  const { isLoaded } = useJsApiLoader({
    id:'google-map-script',
    googleMapsApiKey: mapsApiKey
  });

  console.log(isLoaded);

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (results.data) {
      results.data.map((location, index) => {
        markers[index] = {name:location.name.replace('&#039;',''), 'position':{lat:+location.lat.slice(0,8), lng:+location.lng.slice(0,8)}}
      })
    } else {
      console.log(typeof results.data)
    }
    console.log("Markers: ", markers)
    setMarkersArray(markers);
    console.log(markersArray)
  }, [results]);

  useEffect(() => {
    if (results && results.data) {
      const diveSites = results.data;
      console.log(diveSites);

      // Create an array of markers based on the dive sites
      const markersArray = diveSites.map(diveSite => ({
        position: { lat: diveSite.latitude, lng: diveSite.longitude },
        name: diveSite.name
      }));

      setMarkers(markersArray);
    }
  }, [results]);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
    console.log(bounds);
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markers.map(marker => (
        <Marker key={marker.name} position={marker.position} />
      ))}
    </GoogleMap>
  ) : null;
}