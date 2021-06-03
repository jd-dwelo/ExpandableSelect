export interface InstallLocationsByType {
  unit?: InstallLocations;
  community?: InstallLocations;
  all?: InstallLocations;
}

export type InstallLocations = string[];
