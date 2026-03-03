// 페이지네이션에 표시할 페이지 번호 배열을 생성
// 현재 페이지를 중심으로 앞뒤로 일정 범위의 페이지 번호를 반환
// ex) getPageNumbers(5, 10) -> [3, 4, 5, 6, 7]

export const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  range: number = 2 // 현재 페이지 앞뒤로 표시할 페이지 수
): number[] => {
  const startPage = Math.max(1, currentPage - range);
  const endPage = Math.min(totalPages, currentPage + range);

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
};
