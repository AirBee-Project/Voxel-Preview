import { PureVoxel } from "../types/pureVoxel";

type PointData = {
  position: number[];
  icon: string;
};

export default function PvoxelToPointData(
  pureVoxels: PureVoxel[]
): PointData[] {
  let result: PointData[] = [];
  for (let i = 0; i < pureVoxels.length; i++) {
    let e = pvoxelToCoordinates(pureVoxels[i]);
    result.push({
      position: [e.maxLon, e.maxLat],
      icon: "marker",
    });
    result.push({
      position: [e.minLon, e.maxLat],
      icon: "marker",
    });
    result.push({
      position: [e.maxLon, e.minLat],
      icon: "marker",
    });
    result.push({
      position: [e.minLon, e.minLat],
      icon: "marker",
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
