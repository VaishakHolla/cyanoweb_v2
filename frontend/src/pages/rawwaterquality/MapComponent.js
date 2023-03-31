import React, { useRef } from "react";
import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import L from "leaflet";

const MapComponent = (props) => {
  const locations = props.locations;
  // console.log(locations);
  const mapRef = useRef();
  const defaultCenter = [40.5419444, -84.573333];
  const defaultZoom = 7;

  const icon = L.icon({
    iconRetinaUrl: iconRetina,
    iconUrl: iconMarker,
    // shadowUrl: iconShadow,
    iconSize: new L.Point(20, 20),
  });

  return (
    <div id="map">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((obj, id) => {
          return (
            <Marker
              key={id}
              position={[obj.long, obj.lat]}
              icon={icon}
              eventHandlers={{
                click: (e) => {
                  props.handleClick(obj)
                },
              }}
            >
              <Popup>{obj.name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
