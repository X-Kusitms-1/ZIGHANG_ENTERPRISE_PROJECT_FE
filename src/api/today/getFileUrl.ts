// utils/fileUploader.ts
import { getPresignedUrlApi } from "./getPresignedUrl";
import { saveFileApi } from "./saveFile";

export async function handleSingleFileUpload(
  file: File,
  recruitmentId: number
): Promise<string | null> {
  try {
    // 1. 백엔드에 pre-signed URL 요청
    const prefix = "resume";
    const response = await getPresignedUrlApi({ prefix, fileName: file.name });
    const { preSignedUrl, objectUrl } = response.data;

    // 2. preSignedUrl로 파일 업로드
    const uploadResponse = await fetch(preSignedUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error(`'${file.name}' 파일 업로드 실패`);
    }

    // 3. 업로드 성공 시, DB에 파일 정보 저장
    try {
      const savedFile = await saveFileApi({
        originalFileName: file.name,
        objectUrl,
        recruitmentId,
      });
      console.log("파일 DB 저장 성공:", savedFile);
    } catch (saveError) {
      console.error("파일 DB 저장 실패:", saveError);
      // DB 저장 실패해도 업로드는 성공으로 간주
    }

    // 4. objectUrl 반환
    return objectUrl;
  } catch (error) {
    console.error(`${file.name} 업로드 중 오류:`, error);
    return null; // 실패 시 null 반환
  }
}
