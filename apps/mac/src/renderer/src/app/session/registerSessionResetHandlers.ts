import { resetRecordStore } from "@/features/record";
import { registerSessionResetHandler } from "@/shared/lib";

export const registerSessionResetHandlers = () => {
  registerSessionResetHandler("record-store", () => {
    resetRecordStore();
  });
};
