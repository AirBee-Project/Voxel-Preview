import DeckGL from "@deck.gl/react";
import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer, GeoJsonLayer } from "@deck.gl/layers";
import { ColumnLayer } from "@deck.gl/layers";

const INITIAL_VIEW_STATE = {
  longitude: 139.767,
  latitude: 35.6812,
  zoom: 15,
  pitch: 60,
  bearing: 0,
};

// 立方体のデータ
const data = [
  {
    position: [139.767, 35.6812], // 東京駅あたり
    elevation: 100, // 地面からの浮遊高さ（メートル）
    radius: 20, // 立方体の横幅
    height: 50, // 立方体の高さ
  },
];

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
  const Cube = [
    new ColumnLayer({
      id: "floating-cube",
      data,
      diskResolution: 4, // 円柱 → 四角柱に近づける
      radius: data[0].radius,
      extruded: true,
      elevationScale: 1,
      getPosition: (d) => d.position,
      getFillColor: [255, 0, 0, 200],
      getElevation: (d) => d.height,
      elevationOffset: (d) => d.elevation, // 👈 浮かせるために使う
    }),
  ];
  return (
    <div className="bg-black">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller
        layers={[TileMapLayer, Cube]}
        width="100%"
        height="100%"
      />
    </div>
  );
}
