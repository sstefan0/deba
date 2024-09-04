export interface AddSpotDto {
  name: string;
  description: string;
  potentialTypeId: string;
  lat: number;
  lon: number;
  webSite: string;
}

export interface AddVideosDto {
  tourismPotentialId: string;
  videos: string[];
}
export interface AddCoordinatesDto {
  tourismPotentialId: string;
  coordinates: { lat: number; lon: number }[];
}

export interface IdQueryDto {
  id: string;
}

export interface UpdateSpotDto {
  name: string;
  description: string;
  potentialTypeId: string;
  lat: number;
  lon: number;
  webSite: string;
}
