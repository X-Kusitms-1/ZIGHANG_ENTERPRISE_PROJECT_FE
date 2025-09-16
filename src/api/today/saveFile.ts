import { getApiBaseUrl, serverApi } from "../axios";

export interface SaveFileRequest {
  originalFileName: string;
  objectUrl: string;
  recruitmentId: number;
}

export interface SaveFileResponse {
  id: number;
  originalFileName: string;
  objectUrl: string;
  recruitmentId: number;
  createdAt: string;
}

export const saveFileApi = async (
  request: SaveFileRequest
): Promise<SaveFileResponse> => {
  const url = `${getApiBaseUrl()}/api/post/resume/upload-complete`;

  const response = await serverApi.post<SaveFileResponse>(url, request);

  return response.data;
};

export const saveMultipleFilesApi = async (
  requests: SaveFileRequest[]
): Promise<SaveFileResponse[]> => {
  const url = `${getApiBaseUrl()}/api/post/resume/upload-complete`;


  const response = await serverApi.post<SaveFileResponse[]>(url, requests);

  return response.data;
};
