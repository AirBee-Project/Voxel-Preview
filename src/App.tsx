import DeckGL from "@deck.gl/react";
import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer } from "@deck.gl/layers";
import { SimpleMeshLayer } from "@deck.gl/mesh-layers";
import { OBJLoader } from "@loaders.gl/obj";

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

  const layer = new SimpleMeshLayer({
    id: "box-geometry",
    data: [{ position: [139.6917, 35.6895] }],
    getPosition: (d) => d.position,
    getColor: [0, 200, 255],
    mesh: "https://raw.githubusercontent.com/AirBee-Project/Voxel-Preview/refs/heads/main/src/Box.obj?token=GHSAT0AAAAAAC74XFWPNDICQBCGUM27DVAAZ77FM5Q",
    sizeScale: 100,
    getOrientation: [0, 0, 0],
    getTranslation: [0, 0, 1], // 直方体の底を地面に合わせるなら高さの半分
    pickable: true,
    getScale: [1, 1, 1],
    loaders: [OBJLoader],
  });
  return (
    <div className="bg-black">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller
        layers={[TileMapLayer, layer]}
        width="100%"
        height="100%"
      />
    </div>
  );
}
