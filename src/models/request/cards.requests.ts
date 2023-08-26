export interface IGetCardsRequest {
  page: number;
  size: number;
  user_id?: string;
  // TODO: add sort: string asc/desc
}
