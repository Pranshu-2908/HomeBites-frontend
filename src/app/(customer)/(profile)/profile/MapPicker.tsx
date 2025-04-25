/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapPickerProps {
  coordinates: { lat: number; lng: number };
  setCoordinates: (coords: { lat: number; lng: number }) => void;
}

const MapPicker = ({ coordinates, setCoordinates }: MapPickerProps) => {
  const [position, setPosition] = useState<LatLngExpression>([
    coordinates.lat,
    coordinates.lng,
  ]);

  useEffect(() => {
    setPosition([coordinates.lat, coordinates.lng]);
  }, [coordinates]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      className="h-60 w-full rounded-lg z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={position}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const latlng = (e.target as L.Marker).getLatLng();
            setCoordinates({ lat: latlng.lat, lng: latlng.lng });
          },
        }}
      />
    </MapContainer>
  );
};

export default MapPicker;
