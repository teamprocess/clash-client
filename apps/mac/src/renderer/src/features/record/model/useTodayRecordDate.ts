import { useRecordTodayQuery } from "@/entities/record";
import { getLocalRecordDate } from "./recordDate";

export const useTodayRecordDate = () => {
  const { data: todayResponse } = useRecordTodayQuery();

  if (todayResponse?.success && todayResponse.data?.date) {
    return todayResponse.data.date;
  }

  return getLocalRecordDate();
};
