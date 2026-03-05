"use client";
import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix para el icono del marker (Leaflet + Webpack)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Props = {
  initialPosition: [number, number];
  onChange?: (coords: [number, number]) => void;
};

export default function MapaLeafletClient({ initialPosition, onChange }: Props) {
  const [position, setPosition] = useState<[number, number]>(initialPosition);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    console.log("MapaLeafletClient - initialPosition:", initialPosition);
    console.log("MapaLeafletClient - position state:", position);
  }, [initialPosition, position]);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        console.log("Map clicked:", e.latlng);
        setPosition([e.latlng.lat, e.latlng.lng]);
        onChange && onChange([e.latlng.lat, e.latlng.lng]);
      },
    });
    return <Marker position={position} />;
  }

  return (
    <MapContainer
      center={position}
      zoom={16}
      style={{ height: 350, width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
} 