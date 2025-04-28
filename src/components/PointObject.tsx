import { IconTrash, IconEye } from "@tabler/icons-react";
import React, { useState, ReactElement } from "react";
import { Layer } from "deck.gl";

type LayerState = {
  id: number;
  type: "point" | "line" | "voxel" | "Tile";
  component: ReactElement | undefined;
  layer: Layer | undefined;
};

type Props = {
  id: number;
  state: LayerState[];
  stateFunction: React.Dispatch<React.SetStateAction<LayerState[]>>;
};

type PointObjectState = {
  id: number;
  color: string;
  opacity: number;
  size: number;
  lat: number;
  lon: number;
  deleted: false;
};

export default function PointObject({ id, stateFunction, state }: Props) {
  const [pointValue, setPointValue] = useState<PointObjectState>({
    id: id,
    color: "#FF0000",
    opacity: 100,
    size: 100,
    lat: 0,
    lon: 0,
    deleted: false,
  });
  function updateLayerState(item: PointObjectState) {
    setPointValue(item);
    const newState: LayerState[] = state.map((e) => {
      if (e.id === id) {
        if (e.layer == undefined) {
          return {
            ...e,
            type: "point",
            component: undefined,
            layer: undefined,
          };
        } else {
          return {
            ...e,
            type: "point",
            component: undefined,
            layer: undefined,
          };
        }
      } else {
        return e;
      }
    });
    stateFunction(newState);
  }
  return (
    <div className="m-[1.5vh] p-[3%] border-0 border-blue-400 rounded-[4px] bg-[#ececec]">
      <div className="flex items-center">
        <p className="bg-amber-200 p-[1%]">Point</p>
        <input
          type="text"
          placeholder="色"
          value={pointValue.color}
          onChange={(e) => {
            setPointValue({ ...pointValue, color: e.target.value });
          }}
          className="w-[20%] border-gray-500 border-1 mx-[2%] bg-[#FFFFFF]"
        />
        <input
          type="number"
          placeholder="不透明度"
          min={0}
          max={100}
          value={pointValue.opacity}
          onChange={(e) => {
            setPointValue({
              ...pointValue,
              opacity: parseFloat(e.target.value),
            });
          }}
          className="w-[20%] border-gray-500 border-1 mx-[2%] bg-[#FFFFFF]"
        />
        <input
          type="number"
          placeholder="サイズ"
          value={pointValue.size}
          min={0}
          onChange={(e) => {
            setPointValue({
              ...pointValue,
              size: parseFloat(e.target.value),
            });
          }}
          className="w-[20%] border-gray-500 border-1 mx-[2%] bg-[#FFFFFF]"
        />
        <p>ID:{id}</p>

        <IconTrash className="mx-[3%]" />
        <IconEye className="mx-[3%]" />
      </div>
      <div>
        <div className="flex mt-[2%]">
          <p>経度</p>
          <input
            type="number"
            placeholder="経度"
            value={pointValue.lon}
            max={180}
            min={-180}
            onChange={(e) => {
              setPointValue({
                ...pointValue,
                lon: parseFloat(e.target.value),
              });
            }}
            className="border-gray-500 border-1 mx-[2%] bg-[#FFFFFF]"
          />
          <p>緯度</p>
          <input
            type="number"
            placeholder="緯度"
            value={pointValue.lat}
            max={90}
            min={-90}
            onChange={(e) => {
              setPointValue({
                ...pointValue,
                lat: parseFloat(e.target.value),
              });
            }}
            className="border-gray-500 border-1 mx-[2%] bg-[#FFFFFF] ml-[3%]"
          />
        </div>
      </div>
    </div>
  );
}
