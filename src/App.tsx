import DeckGL from "@deck.gl/react";
import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer } from "@deck.gl/layers";
import PointObject from "./components/pointObject";
import LineObject from "./components/LIneObject";
import VoxelObject from "./components/VoxelObject";
import React, { useState, ReactElement } from "react";

const INITIAL_VIEW_STATE = {
  longitude: 139.6917,
  latitude: 35.6895,
  zoom: 15,
  pitch: 60,
  bearing: 0,
};

export default function App() {
  type ObjectComponet = {
    id: number;
    type: "point" | "line" | "voxel";
    component: ReactElement;
  };

  const [objectComponets, setObjectComponets] = useState<ObjectComponet[]>([]);

  function pushObject(type: "point" | "line" | "voxel") {
    let addObject: ObjectComponet;
    const lastObject = objectComponets[objectComponets.length - 1];

    addObject = {
      id: lastObject ? lastObject.id + 1 : 1,
      type: type,
      component:
        type === "point" ? (
          <PointObject
            key={lastObject ? lastObject.id + 1 : 1}
            id={lastObject ? lastObject.id + 1 : 1}
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
    };

    const newObjectComponets = [...objectComponets, addObject];
    setObjectComponets(newObjectComponets);
  }

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

  return (
    <div>
      <div className="w-[100%] flex">
        <div className="w-[25%] h-[100vh] flex-col overflow-y-scroll overflow-x-clip">
          <div className="bg-amber-200 flex justify-center p-[1.5%]">
            <h1>オブジェクトたち</h1>
          </div>
          {objectComponets.map((item) => (
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
