import DeckGL from "@deck.gl/react";
import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer } from "@deck.gl/layers";
import { SimpleMeshLayer } from "@deck.gl/mesh-layers";
import { OBJLoader } from "@loaders.gl/obj";
import { useState } from "react";
import { DisplayData } from "./types/displayData";
import { ScatterplotLayer } from "@deck.gl/layers";
import { PureVoxel } from "./types/pureVoxel";
import pureVoxelToString from "./utils/Pvoxel-to-string";
import hyperVoxelParse from "./utils/Hvoxel-parse";
import hvoxelsToPvoxels from "./utils/Hvoxel-to-Pvoxel";
import pvoxelToDisplayData from "./utils/Pvoxel-to-display-data";
import PvoxelToPointData from "./utils/Pvoxel-to-point-data";

const INITIAL_VIEW_STATE = {
  longitude: 139.6917,
  latitude: 35.6895,
  zoom: 15,
  pitch: 60,
  bearing: 0,
};

export default function App() {
  const [inputHvoxels, setInputHvoxels] = useState<string>("");
  const [pvoxels, setPvoxels] = useState<PureVoxel[]>([]);

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

  const layer = new SimpleMeshLayer({
    id: "box-geometry",
    data: pvoxelToDisplayData(pvoxels),
    getPosition: (d) => d.position,
    getColor: (d) => d.color,
    mesh: "https://raw.githubusercontent.com/Tomoro0726/filehost/refs/heads/main/Box.obj",
    sizeScale: 1,
    getOrientation: [0, 0, 0],
    getTranslation: (d) => [0, 0, d.altitude],
    getScale: (d) => d.scale,
    pickable: true,
    loaders: [OBJLoader],
  });
  const pointData = PvoxelToPointData(pvoxels);

  const scatterLayer = new ScatterplotLayer({
    id: "scatter",
    data: pointData,
    getPosition: (d) => d.position,
    getRadius: (d) => d.radius,
    getFillColor: (d) => d.color,
    radiusUnits: "meters",
    pickable: true,
  });

  return (
    <div>
      <div>
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller
          layers={[TileMapLayer, scatterLayer]}
          width="100%"
          height="75%"
        />
      </div>
      <div className="mt-[75vh] w-[100%] h-[25vh] bg-amber-300">
        <h1>コンマ区切りでボクセルを入力</h1>
        <input
          type="text"
          value={inputHvoxels}
          className="w-[100%] h-[7vh] border-2"
          placeholder="ここにボクセルを入力"
          onChange={(e) => {
            const newValue = e.target.value;
            setInputHvoxels(newValue);

            //入力された値からHyperVoxleの型に当てはめる
            const hvoxels = hyperVoxelParse(newValue);
            //HyperVoxelsをさらにPureVoxelに変換
            const pvoxels = hvoxelsToPvoxels(hvoxels);

            //計算した値を各ステートに受け渡し
            setPvoxels(pvoxels);
          }}
        />
        <input
          type="text"
          name="渡す"
          //PureVoxelをテキストの形に変換
          value={pureVoxelToString(pvoxels)}
          className="w-[100%] h-[7vh] border-2 mt-[1vh]"
          placeholder="パース済みのボクセルの値"
        />
      </div>
    </div>
  );
}
