import { getApiBaseUrl, serverApi } from "../axios";
import { UserReportResponse } from "../type/today";

export const PostUserReport = async (report: {
  year: string;
  month: string;
  weekOfMonth: string;
}): Promise<UserReportResponse> => {
  const url = `${getApiBaseUrl()}/v1/user/weekly-report`;
  const response = await serverApi.post(url, report);

  return response.data.data;
};

export const GetUserReport = async (
  year: string,
  month: string,
  weekOfMonth: string
): Promise<UserReportResponse> => {
  const url = `${getApiBaseUrl()}/v1/user/weekly-report/exists`;
  const params = { year, month, weekOfMonth };
  const response = await serverApi.get(url, { params });

  return response.data.data;
};
