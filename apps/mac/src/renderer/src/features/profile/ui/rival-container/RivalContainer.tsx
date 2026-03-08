import * as S from "./RivalContainer.style";
import { RivalCard } from "@/features/profile";
import { useRival } from "@/shared/lib";
import { PlusIcon } from "@/features/home/ui/rival/Rival.style";
import { RivalsManagementDialog } from "@/shared/ui";

export const RivalContainer = () => {
  const rival = useRival();
  const rivals = rival.rivalsData?.myRivals ?? [];
  const canAddMore = rivals.length < 4;

  return (
    <S.Container>
      {rivals.map(rivalUser => (
        <RivalCard
          key={rivalUser.id}
          name={rivalUser.name}
          status={rivalUser.status}
          activeTime={rivalUser.activeTime}
          usingApp={rivalUser.usingApp}
          isStudying={rivalUser.isStudying}
          profileSrc={S.profileSrcMap["default"]}
        />
      ))}

      {canAddMore && (
        <S.AddRivalButton type="button" onClick={rival.handleOpen}>
          <S.AddRivalBox>
            <PlusIcon />
          </S.AddRivalBox>
        </S.AddRivalButton>
      )}

      {rival.modalOpen && (
        <RivalsManagementDialog
          isOpen={rival.modalOpen}
          onClose={rival.handleClose}
          rival={rival}
        />
      )}
    </S.Container>
  );
};
