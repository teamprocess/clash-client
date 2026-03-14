const padRecordDate = (value: number) => String(value).padStart(2, "0");

export const formatRecordDate = (date: Date) =>
  `${date.getFullYear()}-${padRecordDate(date.getMonth() + 1)}-${padRecordDate(date.getDate())}`;

export const getLocalRecordDate = () => formatRecordDate(new Date());

export const shiftRecordDate = (date: string, amount: number) => {
  const [year, month, day] = date.split("-").map(Number);
  const nextDate = new Date(year, month - 1, day);
  nextDate.setDate(nextDate.getDate() + amount);
  return formatRecordDate(nextDate);
};
