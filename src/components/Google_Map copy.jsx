import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { mapsApiKey } from "../config/googleMapsClient";

export default function GMap({ results }) {

  const containerStyle = {width:'100%', height:'500px'};
  let center = {lat: -25, lng: 135};
  let markers = []

  results.data.map((location, index) => {
    markers[index] = {name:location.name.replace('&#039;',''), 'position':{lat:+location.lat.slice(0,8), lng:+location.lng.slice(0,8)}}
  })

  console.log('Markers:', markers)

  const { isLoaded } = useJsApiLoader({
    id:'google-map-script',
    googleMapsApiKey: mapsApiKey
  });


  return isLoaded && (markers.length) > 0 ? (
    <div className="Gmap">
      { markers !== [] ? 
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{lat:markers[0].position.lat, lng:markers[0].position.lng}}
          zoom={10}
        >
          {markers.map((marker, index) => (
            <div key={index}>
              <MarkerF 
              // icon={scuba}
              key={index} 
              name={marker.name} 
              position={{lat:marker.position.lat, lng:marker.position.lng}}
              />
            </div>
          ))}
        </GoogleMap>
        :
        <p></p>
      } 
    </div>
  ) : (
    <div>
      <p>No search results, please enter another search term above.</p>
    </div>
  )
}