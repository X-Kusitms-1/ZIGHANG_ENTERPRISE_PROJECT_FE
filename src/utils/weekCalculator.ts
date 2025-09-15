/**
 * 주차 계산 관련 유틸리티 함수들
 */

export interface WeekInfo {
  year: number;
  month: number;
  week: number;
}

/**
 * 오늘 날짜를 기준으로 현재 주차 정보를 반환합니다.
 * 월요일을 기준으로 한 주차 계산을 사용합니다.
 */
export const getCurrentWeek = (): WeekInfo => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // getMonth()는 0부터 시작

  // 해당 월의 첫 번째 날
  const firstDay = new Date(year, today.getMonth(), 1);

  // 첫 번째 날이 무슨 요일인지 (0=일요일, 1=월요일, ...)
  const firstDayOfWeek = firstDay.getDay();

  // 첫 번째 주의 시작일 계산 (월요일 기준)
  const firstMonday =
    firstDayOfWeek === 0 ? 2 : firstDayOfWeek === 1 ? 1 : 9 - firstDayOfWeek;

  // 오늘이 몇 번째 주인지 계산
  const currentWeek = Math.ceil((today.getDate() - firstMonday + 1) / 7);

  return {
    year,
    month,
    week: currentWeek,
  };
};

/**
 * 특정 월의 첫 번째 월요일을 계산합니다.
 */
const getFirstMondayOfMonth = (year: number, month: number): number => {
  const firstDay = new Date(year, month - 1, 1);
  const firstDayOfWeek = firstDay.getDay();
  return firstDayOfWeek === 0
    ? 2
    : firstDayOfWeek === 1
      ? 1
      : 9 - firstDayOfWeek;
};

/**
 * 특정 월의 최대 주차 수를 계산합니다.
 */
const getMaxWeeksInMonth = (year: number, month: number): number => {
  const firstMonday = getFirstMondayOfMonth(year, month);
  const lastDay = new Date(year, month, 0).getDate();
  return Math.ceil((lastDay - firstMonday + 1) / 7);
};

/**
 * 현재 주차를 기준으로 이전 주, 현재 주, 다음 주의 정보를 반환합니다.
 */
export const generateWeekOptions = (): string[] => {
  const { year, month, week } = getCurrentWeek();
  const weeks: string[] = [];

  // 이전 주 계산
  let prevWeek = week - 1;
  let prevMonth = month;
  let prevYear = year;

  if (prevWeek <= 0) {
    prevMonth -= 1;
    if (prevMonth <= 0) {
      prevMonth = 12;
      prevYear -= 1;
    }
    // 이전 달의 마지막 주차 계산
    prevWeek = getMaxWeeksInMonth(prevYear, prevMonth);
  }

  weeks.push(`${prevMonth}월 ${prevWeek}주차`);

  // 현재 주
  weeks.push(`${month}월 ${week}주차`);

  // 다음 주 계산
  let nextWeek = week + 1;
  let nextMonth = month;

  const maxWeeksInCurrentMonth = getMaxWeeksInMonth(year, month);

  if (nextWeek > maxWeeksInCurrentMonth) {
    nextMonth += 1;
    if (nextMonth > 12) {
      nextMonth = 1;
    }
    nextWeek = 1;
  }

  weeks.push(`${nextMonth}월 ${nextWeek}주차`);

  return weeks;
};
