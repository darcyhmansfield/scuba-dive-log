import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { mapsApiKey } from "../config/googleMapsClient";
import scuba from "../images/scuba.png"

export default function GMap({ results }) {

  const locations = [
    {id: '07d33287-48ab-45df-b87c-85c4d3b3a467', name: 'The Nice Spot', region: 'Melbourne, Victoria', lat: -38.30286995515003, lng: 144.60376739501956},
    {id: '1e335b64-623b-45f7-9e20-03e3c2eaa6bd', name: 'Point Franklin Reef', region: 'Melbourne, Victoria', lat: -38.31499288364285, lng: 144.7193813323975},
    {id: '2a0de902-a2ca-4786-922e-a6209fa8541d', name: 'Foggy Reef', region: 'Melbourne, Victoria', lat: -38.29182285617621, lng: 144.6248817443848}
  ]
  const containerStyle = {width:'700px', height:'500px'};
  let center = {lat: -25, lng: 135};
  const [markersArray, setMarkersArray] = useState([])
  let markers = []

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
    console.log("Array: ", markersArray)
    if (markersArray.length > 0) {
      // center = markersArray[0].position;
      center = {lat: markersArray[0].position.lat, lng: markersArray[0].position.lng}
    }
    console.log("center: ", center)
  }, [markersArray])

  const { isLoaded } = useJsApiLoader({
    id:'google-map-script',
    googleMapsApiKey: mapsApiKey
  });


      
return isLoaded && (markersArray.length) > 0 ? (
  <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat:markersArray[0].position.lat, lng:markersArray[0].position.lng}}
        zoom={10}
      >
        {markersArray.map((marker, index) => (
          <div>
            <Marker
            // icon={scuba}
            key={marker}
            // name={marker.name}
            position={{lat:marker.position.lat, lng:marker.position.lng}}
            />
          </div>
        ))}
      </GoogleMap>
  </div>
) : (
  <div>
    Loading
  </div>
  )
}