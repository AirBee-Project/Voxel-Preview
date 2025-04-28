import DeckGL from "@deck.gl/react";
import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer } from "@deck.gl/layers";
import PointObject from "./components/PointObject";
import LineObject from "./components/LineObject";
import VoxelObject from "./components/VoxelObject";
import React, { useState, ReactElement, createContext } from "react";
import { Layer, LayersList } from "@deck.gl/core"; // Deck.glのLayer型をインポート

const INITIAL_VIEW_STATE = {
  longitude: 139.6917,
  latitude: 35.6895,
  zoom: 15,
  pitch: 60,
  bearing: 0,
};

const TileMapLayer = new TileLayer({
  id: "TileMapLayer",
  data: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
  maxZoom: 18,
  minZoom: 0,
  renderSubLayers: (props) => {
    const { boundingBox } = props.tile;
    return new BitmapLayer(props, {
      data: undefined,
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

export default function App() {
  type LayerState = {
    id: number;
    type: "point" | "line" | "voxel" | "Tile";
    component: ReactElement | undefined;
    layer: Layer | undefined;
    deleted: boolean;
  };

  const [layers, setLayers] = useState<LayerState[]>([
    {
      id: 0,
      type: "Tile",
      component: undefined,
      layer: TileMapLayer,
      deleted: false,
    },
  ]);

  function pushObject(type: "point" | "line" | "voxel") {
    let addObject: LayerState;
    const lastObject = layers[layers.length - 1];

    addObject = {
      id: lastObject ? lastObject.id + 1 : 1,
      type: type,
      component:
        type === "point" ? (
          <PointObject
            key={lastObject ? lastObject.id + 1 : 1}
            id={lastObject ? lastObject.id + 1 : 1}
            stateFunction={setLayers}
          />
        ) : type === "line" ? (
          <LineObject
            key={lastObject ? lastObject.id + 1 : 1}
            id={lastObject ? lastObject.id + 1 : 1}
          />
        ) : (
          <VoxelObject
            key={lastObject ? lastObject.id + 1 : 1}
            id={lastObject ? lastObject.id + 1 : 1}
          />
        ),
      layer: undefined,
      deleted: false,
    };

    const newObject = [...layers, addObject];
    setLayers(newObject);
  }

  return (
    <div>
      <div className="w-[100%] flex">
        <div className="w-[25%] h-[100vh] flex-col overflow-y-scroll overflow-x-clip">
          <div className="bg-amber-200 flex justify-center p-[1.5%]">
            <h1>オブジェクトたち</h1>
          </div>
          {layers.map((item) => (
            <div key={item.id}>
              {item.component} {/* JSX要素として表示 */}
            </div>
          ))}
          <div className="flex justify-between p-[4%] px-[10%]">
            <button
              onClick={() => pushObject("point")}
              className="bg-[#eaeaea] border-1 border-gray-300 rounded-[4px] p-[3%] hover:bg-amber-400 transition duration-300"
            >
              <span className="bg-amber-200">Point</span>を追加
            </button>
            <button
              onClick={() => pushObject("line")}
              className="bg-[#eaeaea] border-1 border-gray-300 rounded-[4px] p-[3%] hover:bg-blue-400 transition duration-300"
            >
              <span className="bg-blue-200">Line</span>を追加
            </button>
            <button
              onClick={() => pushObject("voxel")}
              className="bg-[#eaeaea] border-1 border-gray-300 rounded-[4px] p-[3%] hover:bg-green-400 transition duration-300"
            >
              <span className="bg-green-200">Voxel</span>を追加
            </button>
          </div>
        </div>
        <div className="w-[75%] h-[100vh] relative">
          <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            controller
            width="75vw"
            layers={layers.map((item) => {
              return item.layer;
            })}
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
