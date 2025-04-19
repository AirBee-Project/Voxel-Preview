import { Color } from "deck.gl";
export type DisplayData = {
  position: [number, number];
  altitude: number;
  scale: [number, number, number];
  color: Color;
};
