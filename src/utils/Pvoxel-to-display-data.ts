import { PureVoxel } from "../types/pureVoxel";
import { DisplayData } from "../types/displayData";

export default function pvoxelToDisplayData(
  pureVoxels: PureVoxel[]
): DisplayData[] {
  const result: DisplayData[] = [];
  for (let i = 0; i < pureVoxels.length; i++) {
    let pvoxel = pureVoxels[i];
    let coordinates = pvoxelToCoordinates(pvoxel);

    let xScale = 40075016.68 / 8;
    let yScale = lonDistance_m(
      coordinates.maxLon,
      coordinates.minLon,
      coordinates.maxLat,
      coordinates.minLat
    );
    let fScale = 33554432 / 2 ** (pvoxel.Z + 1);
    result.push({
      position: coordinates.center,
      altitude: 0,
      scale: [xScale, yScale, fScale],
      color: [255, 0, 0, 125],
    });
  }
  return result;
}

type PvoxleCoordinates = {
  maxLon: number;
  minLon: number;
  maxLat: number;
  minLat: number;
  center: [number, number];
};

function pvoxelToCoordinates(item: PureVoxel): PvoxleCoordinates {
  let minLon = 180 - (360 / 2 ** item.Z) * (item.X + 1);
  let maxLon = 180 - (360 / 2 ** item.Z) * item.X;
  let minLat = 85.0511 - (170.1022 / 2 ** item.Z) * (item.Y + 1);
  let maxLat = 85.0511 - (170.1022 / 2 ** item.Z) * item.Y;
  return {
    maxLon: maxLon,
    minLon: minLon,
    maxLat: maxLat,
    minLat: minLat,
    center: [-(maxLon + minLon) / 2, (maxLat + minLat) / 2],
  };
}

function latDistance_m(lat1: number, lat2: number): number {
  const R = 6378137; // 地球半径（m）
  const rad = Math.PI / 180;
  return R * Math.abs(lat2 - lat1) * rad;
}

function lonDistance_m(
  lon1: number,
  lon2: number,
  lat1: number,
  lat2: number
): number {
  const R = 6378137; // 地球半径（m）

  const rad = Math.PI / 180;

  const avgLatRad = ((lat1 + lat2) / 2) * rad;
  const deltaLon = Math.abs(lon2 - lon1) * rad;

  return R * deltaLon * Math.cos(avgLatRad);
}
