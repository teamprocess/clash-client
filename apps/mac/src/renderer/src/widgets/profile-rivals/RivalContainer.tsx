import * as S from "./RivalContainer.style";
import { RivalCard } from "./rival-card/RivalCard";
import { RivalsManagementDialog, useRival } from "@/features/rival-management";

export const RivalContainer = () => {
  const rival = useRival();
  const rivals = rival.rivalsData?.myRivals ?? [];
  const canAddMore = rivals.length < 4;

  return (
    <S.Wrapper>
      <S.Container>
        {rivals.map(rivalUser => (
          <RivalCard
            key={rivalUser.id}
            name={rivalUser.name}
            status={rivalUser.status}
            activeTime={rivalUser.activeTime}
            usingApp={rivalUser.usingApp}
            isStudying={rivalUser.isStudying}
            profileSrc={rivalUser.profileImage}
            username={rivalUser.username}
            tier={rivalUser.tier}
          />
        ))}

        {canAddMore && (
          <S.AddRivalButton type="button" onClick={rival.handleOpen}>
            <S.AddRivalBox>
              <S.PlusIcon />
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
    </S.Wrapper>
  );
};
