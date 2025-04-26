import DeckGL from "@deck.gl/react";
import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer } from "@deck.gl/layers";
import { useState } from "react";
import { PureVoxel } from "./types/pureVoxel";
import pureVoxelToString from "./utils/Pvoxel-to-string";
import hyperVoxelParse from "./utils/Hvoxel-parse";
import hvoxelsToPvoxels from "./utils/Hvoxel-to-Pvoxel";
import pvoxelToPolygon from "./utils/Pvoxel-to-polygon";
import { COORDINATE_SYSTEM } from "@deck.gl/core";
import { invoke } from "@tauri-apps/api/core";

const INITIAL_VIEW_STATE = {
  longitude: 139.6917,
  latitude: 35.6895,
  zoom: 15,
  pitch: 60,
  bearing: 0,
};

export default function App() {
  const TileMapLayer = new TileLayer({
    id: "TileMapLayer",
    data: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
    maxZoom: 18,
    minZoom: 0,
    renderSubLayers: (props) => {
      // eslint-disable-next-line react/prop-types
      const { boundingBox } = props.tile;
      return new BitmapLayer(props, {
        data: undefined,
        // eslint-disable-next-line react/prop-types
        image: props.data,
        bounds: [
          boundingBox[0][0],
          boundingBox[0][1],
          boundingBox[1][0],
          boundingBox[1][1],
        ],
      });
    },
    pickable: true,
  });

  return (
    <div>
      <div className="w-[100%] flex">
        <div className="w-[25%] bg-amber-300 h-[100vh]"></div>
        <div className="w-[75%] bg-black h-[100vh] relative">
          <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            controller
            width="75vw"
            layers={[TileMapLayer]}
            getTooltip={({ object }) =>
              object && {
                text: `${object.voxelID}`,
              }
            }
          />
        </div>
      </div>
    </div>
  );
}
