import { Layer, LayersList } from "deck.gl";
import { TileLayer } from "@deck.gl/geo-layers";
import { BitmapLayer, GeoJsonLayer } from "@deck.gl/layers";
import { Item } from "../types/Item";
import { GeoJSON } from "geojson";
import colorHexToRgba from "../utils/colorHexToRgba";
/**
 * StateであるItem[]を入れると、DeckglのLayerに変換し出力する関数
 */
export default function generateLayer(item: Item[]): LayersList {
  let pointItem: Item<"point">[] = item.filter(
    (e): e is Item<"point"> =>
      !e.isDeleted && !e.isVisible && e.type === "point"
  );
  let lineItem: Item<"line">[] = item.filter(
    (e): e is Item<"line"> => !e.isDeleted && !e.isVisible && e.type === "line"
  );

  //PointはまとめてGeoJsonLayerとして表示
  const pointGeoJsonLayer = new GeoJsonLayer({
    id: "GeoJsonLayer",
    data: generatePointGeoJson(pointItem),
    pickable: true,
    filled: true,
    pointRadiusUnits: "pixels",
    pointRadiusMinPixels: 1,
    pointRadiusScale: 1,
    getFillColor: (d) => d.properties.color, // 個別カラー
    getRadius: (d) => d.properties.radius, // 個別サイズ
  });

  //LineはまとめてGeoJsonLayerとして表示
  const lineGeoJsonLayer = new GeoJsonLayer({
    id: "geojson-lines",
    data: generateLineGeoJson(lineItem),
    pickable: true,
    stroked: true,
    filled: false,
    lineWidthUnits: "pixels",
    getLineColor: (d) => d.properties.color, // ← 色を個別設定
    getLineWidth: (d) => d.properties.width, // ← 太さを個別設定
  });

  //VoxelはPolygonLayerとしてまとめて出力

  //国土地理院から取得したTileMapを表示
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

  let reuslt: LayersList = [tileMapLayer, pointGeoJsonLayer, lineGeoJsonLayer];
  return reuslt;
}

function generatePointGeoJson(point: Item<"point">[]): GeoJSON {
  const result: GeoJSON = {
    type: "FeatureCollection",
    features: [],
  };

  for (let i = 0; i < point.length; i++) {
    result.features.push({
      type: "Feature",
      properties: {
        color: colorHexToRgba(point[i].data.color, point[i].data.opacity),
        radius: point[i].data.size,
      },
      geometry: {
        type: "Point",
        coordinates: [point[i].data.lon, point[i].data.lat], // 東京
      },
    });
  }

  return result;
}

function generateLineGeoJson(line: Item<"line">[]): GeoJSON {
  const result: GeoJSON = {
    type: "FeatureCollection",
    features: [],
  };
  for (let i = 0; i < line.length; i++) {
    result.features.push({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [line[i].data.lon1, line[i].data.lat1],
          [line[i].data.lon2, line[i].data.lat2],
        ],
      },
      properties: {
        color: colorHexToRgba(line[i].data.color, line[i].data.opacity), // 赤
        width: line[i].data.size,
      },
    });
  }
  return result;
}
