type PolygonData = {
  points: number[][];
  elevation: number;
};

import type { PureVoxel } from "../types/pureVoxel";

export default function pvoxelToPolygon(pvoxels: PureVoxel[]): PolygonData[] {
  let result: PolygonData[] = [];
  for (let i = 0; i < pvoxels.length; i++) {
    let points = pvoxelToCoordinates(pvoxels[i]);
    let altitude = getAltitude(pvoxels[i]);
    result.push({
      points: [
        [points.maxLon, points.maxLat, altitude],
        [points.minLon, points.maxLat, altitude],
        [points.minLon, points.minLat, altitude],
        [points.maxLon, points.minLat, altitude],
        [points.maxLon, points.maxLat, altitude],
      ],
      elevation: 33554432 / 2 ** (pvoxels[i].Z + 1),
    });
  }
  return result;
}

type PvoxleCoordinates = {
  maxLon: number;
  minLon: number;
  maxLat: number;
  minLat: number;
};

function pvoxelToCoordinates(item: PureVoxel): PvoxleCoordinates {
  const n = 2 ** item.Z;
  const lonDegPerTile = 360 / n;

  const minLon = -180 + lonDegPerTile * item.X;
  const maxLon = -180 + lonDegPerTile * (item.X + 1);

  const maxLat = mercatorYToLat((1 / 2 ** item.Z) * item.Y);
  const minLat = mercatorYToLat((1 / 2 ** item.Z) * (item.Y + 1));
  return {
    maxLon: maxLon,
    minLon: minLon,
    maxLat: maxLat,
    minLat: minLat,
  };
}

//y は 0〜1 の範囲で、地図の縦方向の位置（0 = 上端、1 = 下端）
function mercatorYToLat(y: number): number {
  const PI = Math.PI;
  const radToDeg = 180 / PI;

  // 逆メルカトル変換
  const latRad = Math.atan(Math.sinh(PI * (1 - 2 * y)));
  const latDeg = latRad * radToDeg;

  return latDeg;
}

function getAltitude(item: PureVoxel): number {
  let result = ((33554432 * 2) / 2 ** (item.Z + 2)) * item.F;
  return result;
}
