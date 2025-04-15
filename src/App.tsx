import DeckGL from "@deck.gl/react";
import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer } from "@deck.gl/layers";

export default function App() {
  const layers = [];
  const layer_1 = new TileLayer({
    id: "TileLayer",
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
  layers.push(layer_1);
  return (
    <div className="bg-black">
      <DeckGL
        initialViewState={{
          longitude: 139.2125,
          latitude: 35.725,
          zoom: 14,
        }}
        controller
        layers={[layers]}
        width="100%"
        height="100%"
      />
    </div>
  );
}
