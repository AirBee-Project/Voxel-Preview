import DeckGL from "@deck.gl/react";
import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer } from "@deck.gl/layers";
import { useState } from "react";
import { Item } from "./types/Item";
import Point from "./components/Point";
import Line from "./components/Line";
import Voxel from "./components/Voxel";

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
  const [item, setItem] = useState<Item[]>([]);

  function addObject(type: "point" | "line" | "voxel") {
    let newObject: Item = {
      id: item.length + 1,
      type: type,
      isDeleted: false,
      isVisible: false,
      data:
        type === "point"
          ? {
              color: "#FF0000",
              opacity: 80,
              size: 200,
              lat: 0,
              lon: 0,
            }
          : type === "line"
          ? {
              color: "#FF0000",
              opacity: 80,
              size: 200,
              lat1: 0,
              lon1: 0,
              lat2: 90,
              lon2: 90,
            }
          : {
              color: "#FF0000",
              opacity: 80,
              size: 200,
              voxels: [],
            },
    };
    setItem([...item, newObject]);
  }

  return (
    <div>
      <div className="w-[100%] flex">
        <div className="w-[25%] h-[100vh] flex-col overflow-y-scroll overflow-x-clip">
          <div className="bg-amber-200 flex justify-center p-[1.5%]">
            <h1>オブジェクトたち</h1>
          </div>
          <div>
            {item.map((e) => {
              switch (e.type) {
                case "point":
                  return <Point id={e.id} item={item} setItem={setItem} />;
                case "line":
                  return <Line id={e.id} item={item} setItem={setItem} />;
                case "voxel":
                  return <Voxel id={e.id} item={item} setItem={setItem} />;
              }
            })}
          </div>
          <div className="flex justify-between p-[4%] px-[10%]">
            <button
              className="bg-[#eaeaea] border-1 border-gray-300 rounded-[4px] p-[3%] hover:bg-amber-400 transition duration-300"
              onClick={(e) => {
                addObject("point");
              }}
            >
              <span className="bg-amber-200">Point</span>を追加
            </button>
            <button
              className="bg-[#eaeaea] border-1 border-gray-300 rounded-[4px] p-[3%] hover:bg-blue-400 transition duration-300"
              onClick={(e) => {
                addObject("line");
              }}
            >
              <span className="bg-blue-200">Line</span>を追加
            </button>
            <button
              className="bg-[#eaeaea] border-1 border-gray-300 rounded-[4px] p-[3%] hover:bg-green-400 transition duration-300"
              onClick={(e) => {
                addObject("voxel");
              }}
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
