import { VoxelDefinition } from "./VoxelDefinition";

export type Voxel = {
  color: string;
  opacity: number;
  size: number;
  voxels: VoxelDefinition[];
};
