import { attendanceQueryKeys } from "@/entities/attendance";
import { announcementQueryKeys } from "@/entities/announcement";
import {
  activeQueryKeys,
  battleQueryKeys,
  compareQueryKeys,
  compareRivalsQueryKeys,
  transitionQueryKeys,
} from "@/entities/competition";
import { groupQueryKeys } from "@/entities/group";
import { noticeQueryKeys } from "@/entities/notice";
import { recordQueryKeys } from "@/entities/record";
import { rivalQueryKeys } from "@/entities/rival";
import { userQueryKeys } from "@/entities/user";
import { queryClient } from "@/shared/lib";

const invalidateAnnouncementQueries = async () => {
  await queryClient.invalidateQueries({ queryKey: announcementQueryKeys.all });
};

const invalidateAttendanceQueries = async () => {
  await queryClient.invalidateQueries({ queryKey: attendanceQueryKeys.all });
};

const invalidateGroupQueries = async () => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.allGroups }),
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.myGroups }),
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.groupActivity }),
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.groupDetail }),
  ]);
};

const invalidateCompeteQueries = async () => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: rivalQueryKeys.myRivals }),
    queryClient.invalidateQueries({ queryKey: rivalQueryKeys.available }),
    queryClient.invalidateQueries({ queryKey: rivalQueryKeys.requests }),
    queryClient.invalidateQueries({ queryKey: compareRivalsQueryKeys.all }),
    queryClient.invalidateQueries({ queryKey: battleQueryKeys.info }),
    queryClient.invalidateQueries({ queryKey: battleQueryKeys.details }),
    queryClient.invalidateQueries({ queryKey: battleQueryKeys.analyses }),
    queryClient.invalidateQueries({ queryKey: battleQueryKeys.list }),
    queryClient.invalidateQueries({ queryKey: battleQueryKeys.applications }),
    queryClient.invalidateQueries({ queryKey: activeQueryKeys.all }),
    queryClient.invalidateQueries({ queryKey: compareQueryKeys.all }),
    queryClient.invalidateQueries({ queryKey: transitionQueryKeys.all }),
  ]);
};

const invalidateUserQueries = async () => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: userQueryKeys.all }),
    queryClient.invalidateQueries({ queryKey: noticeQueryKeys.all }),
  ]);
};

const invalidateRecordQueries = async () => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: recordQueryKeys.today }),
    queryClient.invalidateQueries({ queryKey: recordQueryKeys.subjects }),
    queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks }),
  ]);
};

export const invalidateRealtimeQueries = async () => {
  await Promise.all([
    invalidateAttendanceQueries(),
    invalidateAnnouncementQueries(),
    invalidateRecordQueries(),
    invalidateGroupQueries(),
    invalidateCompeteQueries(),
    invalidateUserQueries(),
  ]);
};

export const invalidateByDomain = async (domain?: string) => {
  if (domain === "GROUP") {
    await invalidateGroupQueries();
    return;
  }

  if (domain === "COMPETE") {
    await invalidateCompeteQueries();
    return;
  }

  if (domain === "USER") {
    await Promise.all([invalidateUserQueries(), invalidateCompeteQueries()]);
    return;
  }

  if (domain === "RECORD") {
    await Promise.all([invalidateRecordQueries(), invalidateCompeteQueries()]);
    return;
  }

  if (domain === "ANNOUNCEMENT") {
    await invalidateAnnouncementQueries();
    return;
  }

  if (domain === "ATTENDANCE") {
    await invalidateAttendanceQueries();
  }
};
