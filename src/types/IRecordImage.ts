import { ImageType } from "../utils/enum";

export interface IRecordImage {
  nft_token: number;
  image_url: string;
  type: ImageType;
  description: string;
}
