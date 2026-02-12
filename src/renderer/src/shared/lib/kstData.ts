export const kstDate = {
  // 로컬(KST) 00:00 계산
  parse(dateStr: string): Date {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  },

  // 로컬 날짜 계산 → "YYYY-MM-DD" 문자열 변환
  format(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  },

  // 시,분,초 제거
  normalize(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  },

  // 시작일 포함해서 총 날짜 개수 계산
  diffInclusive(start: Date, end: Date): number {
    const DAY = 1000 * 60 * 60 * 24;
    return Math.floor((end.getTime() - start.getTime()) / DAY) + 1;
  },

  // Array.from으로 시작날짜~끝날짜들을 담는 배열 생성
  buildRange(startStr: string, endStr: string): string[] {
    const start = this.normalize(this.parse(startStr));
    const end = this.normalize(this.parse(endStr));

    const length = this.diffInclusive(start, end);

    return Array.from({ length }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return this.format(date);
    });
  },
};
