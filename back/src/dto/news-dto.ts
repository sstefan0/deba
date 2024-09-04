export interface AddNewsDto {
  title: string;
  description: string;
}
export interface GetNewsDto {
  page: number;
  limit: number;
}
export interface UpdateNewsDto {
  id: string;
  title: string;
  description: string;
}
