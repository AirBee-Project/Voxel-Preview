import { Layer, LayersList } from "deck.gl";
import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer, GeoJsonLayer } from "@deck.gl/layers";
import { Item } from "../types/Item";
/**
 * StateであるItem[]を入れると、DeckglのLayerに変換し出力する関数
 */
export default function generateLayer(item: Item[]): LayersList {
  let displayItem: Item[] = item.filter((e) => !e.isDeleted && !e.isVisible);

  let reuslt: LayersList = [];

  const geoJsonLayer = new GeoJsonLayer({
    id: "GeoJsonLayer",
    data:
  });

  const tileMapLayer = new TileLayer({
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
  reuslt.push(tileMapLayer);
  return reuslt;
}
