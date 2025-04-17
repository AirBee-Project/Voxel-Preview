import { PureVoxel } from "../types/pureVoxel.types";
import { displayCube } from "../types/displaycube";

export default function toDisplayData(pureVoxels: PureVoxel[]): displayCube[] {
  const result: displayCube[] = [];

  for (let i = 0; i < pureVoxels.length; i++) {
    const voxel = pureVoxels[i];
    const zoom = voxel.Z;

    // ピクセル位置 → 緯度経度変換（メルカトル変換と仮定）
    const scale = Math.pow(2, zoom);

    const lon = (voxel.X / scale) * 360 - 180;
    const latRad = Math.atan(Math.sinh(Math.PI * (1 - (2 * voxel.Y) / scale)));
    const lat = (latRad * 180) / Math.PI;

    const voxelSize = getVoxelSize(lat, zoom);

    result.push({
      position: [lon, lat],
      altitude: 1, // 高度をそのまま使うか調整が必要
      scale: [
        voxelSize.metersPerPixelX,
        voxelSize.metersPerPixelY,
        100, // Z軸スケーリング（必要に応じて変える）
      ],
      color: [255, 0, 0, 255],
    });
  }
  console.log(result);
  return result;
}

function getVoxelSize(lat: number, zoom: number) {
  const EARTH_RADIUS = 6378137;
  const EARTH_CIRCUMFERENCE = 2 * Math.PI * EARTH_RADIUS;
  const TILE_SIZE = 256;

  const scale = TILE_SIZE * Math.pow(2, zoom);
  const metersPerPixelY = EARTH_CIRCUMFERENCE / scale;

  const latRad = (lat * Math.PI) / 180;
  const metersPerPixelX = metersPerPixelY * Math.cos(latRad);

  return {
    metersPerPixelX,
    metersPerPixelY,
  };
}
