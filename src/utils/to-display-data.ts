import { PureVoxel } from "../types/pureVoxel.types";
import { displayCube } from "../types/displaycube";

export default function toDisplayData(pureVoxels: PureVoxel[]): displayCube[] {
  const result: displayCube[] = [];

  for (let i = 0; i < pureVoxels.length; i++) {
    const voxel = pureVoxels[i];
    const zoom = voxel.Z;

    // ズームに応じたスケール（全体を 2^Z グリッドとして扱う）
    const scale = Math.pow(2, zoom);
    const tileSize = 256;

    // X/Y をピクセル座標と見なし、緯度経度に変換（Webメルカトル）
    const lon = (voxel.X / scale) * 360 - 180;
    const latRad = Math.atan(Math.sinh(Math.PI * (1 - (2 * voxel.Y) / scale)));
    const lat = (latRad * 180) / Math.PI;

    const voxelSize = getVoxelSize(lat, zoom);

    // 仮にZスケールも metersPerPixelY に合わせる（用途に応じて調整可能）
    const zScale = voxelSize.metersPerPixelY;

    result.push({
      position: [lon, lat], // 緯度経度
      altitude: voxel.Z * zScale, // 高さ（例：Z軸に高さを与える場合）
      scale: [
        voxelSize.metersPerPixelX, // 横幅（m）
        voxelSize.metersPerPixelY, // 高さ（m）
        zScale, // 奥行き（m）仮に高さと同じに
      ],
      color: [255, 125, 125, 100], // RGBA
    });
  }

  return result;
}

function getVoxelSize(lat: number, zoom: number) {
  const EARTH_RADIUS = 6378137; // m
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
