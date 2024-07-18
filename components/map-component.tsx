"use client";
import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { LatLngExpression, LatLngBounds } from "leaflet";
//import 'leaflet/dist/leaflet.css'
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import MapLegend from "./map-legend";
type MarkerType = {
    id:number,
    position: LatLngExpression
}
const initialMarkers: MarkerType[] = [
  { id: 1, position: [51.501, -0.08] },
  { id: 2, position: [51.511, -0.087] },
  { id: 3, position: [51.491, -0.082] },
];

const MyMap = () => {
  const [markers, setMarkers] = useState(initialMarkers);
  const [activeZoom, setActiveZoom] = useState(false);
  const [markerDetail, setMarkerDetail] = useState(false);
  

  type Center = {
    lat: number,
    lng:number
  }
  interface Bounds {
    _southWest: number[],
    _northEast: number[]
  }
  type LatLngBounds= {
    _southWest: number[],
    _northEast: number[]
  }
  

  const fetchMarkersForViewport = (center:Center, zoom:number) => {
    // Simulate fetching markers from an API
    const newMarkers:MarkerType[] = [
      { id: 4, position: [center.lat + 0.01, center.lng - 0.01] },
      { id: 5, position: [center.lat - 0.01, center.lng + 0.01] },
      { id: 6, position: [center.lat, center.lng] },
    ];
    return newMarkers;
  };
  // updateMarkers child component
  const UpdateMarkers = () => {
    //const map = useMap();
    const map = useMapEvents({
      click() {
       setMarkerDetail(false);
      },
      
    })

    useEffect(() => {
      
      const listener = () => {
        setActiveZoom(true);
        const center = map.getCenter();
        console.log("center", center);
        const zoom = map.getZoom();
        console.log("zoom", zoom);
        const bounds  = map.getBounds();
        console.log("bounds", bounds);
        console.log('southWest' , bounds.getSouthWest());
        console.log('northEast', bounds.getNorthEast());
        const newMarkers = fetchMarkersForViewport(center, zoom);
        setMarkers(newMarkers);
        if(zoom < 13) {
          setActiveZoom(true);
        } else {
          setActiveZoom(false);
        }
        
      };

      map.on("moveend", listener);
      map.on("zoomend", listener);

      return () => {
        map.off("moveend", listener);
        map.off("zoomend", listener);
      };
    }, [map]);

    return null;
  };

  return (
    <>
      <div>
        <div>
          {activeZoom && <p className="">You are too far out, please zoom in.</p>}
        </div>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={11}
          scrollWheelZoom={false}
          className="w-full h-full relative"
          //onClick={console.log("hello")}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              eventHandlers={{
                click: () => {
                  console.log(`marker id:${marker.id} clicked`);
                  setMarkerDetail(!markerDetail);
                },
              }}
            />
          ))}

          <UpdateMarkers />
          {/* <Tooltip className="absolute top-0 left-0">Tooltip for Marker</Tooltip> */}
          {markerDetail && <MapLegend position="bottomleft"/>}
        </MapContainer>
        <div className="mb-3">
          {markerDetail && <p>Marker Details</p>}
        </div>
      </div>
    </>
  );
};

export default MyMap;
