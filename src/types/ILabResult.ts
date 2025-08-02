import { TestType } from "../utils/enum";

export interface ILabResult {
  nft_token: number;
  doctor_id: string;
  testType: TestType;
  result: string;
  test_date: Date;
}
