/**
 * 로컬 스토리지에서 userName을 가져오는 함수
 * @returns userName 문자열 또는 null (값이 없는 경우)
 */
export const getUserName = (): string | null => {
  if (typeof window === "undefined") {
    // 서버 사이드 렌더링 환경에서는 null 반환
    return null;
  }

  try {
    return localStorage.getItem("userName");
  } catch (error) {
    console.error("로컬 스토리지에서 userName을 가져오는 중 오류 발생:", error);
    return null;
  }
};

/**
 * 로컬 스토리지에 userName을 저장하는 함수
 * @param userName 저장할 사용자 이름
 * @returns 저장 성공 여부
 */
export const setUserName = (userName: string): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    localStorage.setItem("userName", userName);
    return true;
  } catch (error) {
    console.error("로컬 스토리지에 userName을 저장하는 중 오류 발생:", error);
    return false;
  }
};

/**
 * 로컬 스토리지에서 userName을 제거하는 함수
 * @returns 제거 성공 여부
 */
export const removeUserName = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    localStorage.removeItem("userName");
    return true;
  } catch (error) {
    console.error("로컬 스토리지에서 userName을 제거하는 중 오류 발생:", error);
    return false;
  }
};
