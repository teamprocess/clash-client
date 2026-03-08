import { groupQueryKeys } from "@/entities/group";
import { noticeQueryKeys } from "@/entities/notice";
import { recordQueryKeys } from "@/entities/record";
import { queryClient } from "@/shared/lib";

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
    queryClient.invalidateQueries({ queryKey: ["myRivals"] }),
    queryClient.invalidateQueries({ queryKey: ["compareRivals"] }),
    queryClient.invalidateQueries({ queryKey: ["battleInfo"] }),
    queryClient.invalidateQueries({ queryKey: ["battleDetail"] }),
    queryClient.invalidateQueries({ queryKey: ["battleAnalyze"] }),
    queryClient.invalidateQueries({ queryKey: ["battleList"] }),
    queryClient.invalidateQueries({ queryKey: ["active"] }),
    queryClient.invalidateQueries({ queryKey: ["compare"] }),
    queryClient.invalidateQueries({ queryKey: ["transition"] }),
    queryClient.invalidateQueries({ queryKey: ["myCompare"] }),
    queryClient.invalidateQueries({ queryKey: ["myGrowthRate"] }),
    queryClient.invalidateQueries({ queryKey: ["rivalList"] }),
  ]);
};

const invalidateUserQueries = async () => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ["user"] }),
    queryClient.invalidateQueries({ queryKey: noticeQueryKeys.all }),
  ]);
};

const invalidateRecordQueries = async () => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: recordQueryKeys.today }),
    queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks }),
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
  }
};
