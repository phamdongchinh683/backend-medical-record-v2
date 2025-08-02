import { ImageType } from "../utils/enum";

export interface IRecordImageUpdate {
  image_url?: string;
  type?: ImageType;
  description?: string;
}
