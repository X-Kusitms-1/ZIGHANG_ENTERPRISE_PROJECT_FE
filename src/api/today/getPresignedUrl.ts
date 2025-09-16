import { getApiBaseUrl, serverApi } from "../axios";

export interface PresignedUrlRequest {
  prefix: string;
  fileName: string;
}

export interface PresignedUrlResponse {
  preSignedUrl: string;
  objectUrl: string;
}

export const getPresignedUrlApi = async (
  request: PresignedUrlRequest
): Promise<{ data: PresignedUrlResponse }> => {
  const url = `${getApiBaseUrl()}/v1/image/presigned-url`;
  const params = {
    prefix: request.prefix,
    fileName: request.fileName,
  };

  const response = await serverApi.get<PresignedUrlResponse>(url, { params });
  console.log("presigned url 받아오기",response.data);

  return { data: response.data };
};
