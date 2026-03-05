export const kstDate = {
  // kstData.parse(DateInfo) -> 로컬(KST) YYYY-MM-DD 계산
  parse(dateStr: string): Date {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  },
};
