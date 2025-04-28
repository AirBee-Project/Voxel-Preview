type VoxelDefinition = {
  Z: number;
  X: [number, number] | number;
  Y: [number, number] | number;
  F: [number, number] | number;
};

export type Voxel = {
  color: string;
  opacity: number;
  size: number;
  voxels: VoxelDefinition[];
};
