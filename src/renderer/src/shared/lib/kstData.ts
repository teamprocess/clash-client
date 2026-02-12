export const kstDate = {
  // kstData.parse(DateInfo) -> 로컬(KST) 00:00 계산
  parse(dateStr: string): Date {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  },

  // 로컬 날짜 계산 → "YYYY-MM-DD" 문자열 변환
  // 현재 필요가 없어 사용 안하는 중
  //
  // formatDate(date: Date): string {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // },
};
