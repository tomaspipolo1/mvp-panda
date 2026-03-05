"use client";
import dynamic from "next/dynamic";

type Props = {
  initialPosition: [number, number];
  onChange?: (coords: [number, number]) => void;
};

const MapaLeafletClient = dynamic(() => import("./mapa-leaflet-client"), { ssr: false });

export function MapaSelector(props: Props) {
  return <MapaLeafletClient {...props} />;
} 