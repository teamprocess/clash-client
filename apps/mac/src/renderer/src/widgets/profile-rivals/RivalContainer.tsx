import * as S from "./RivalContainer.style";
import { RivalCard } from "./rival-card/RivalCard";
import { RivalsManagementDialog, useRival } from "@/features/rival-management";
import { Button } from "@/shared/ui";
import { getErrorMessage } from "@/shared/lib";

export const RivalContainer = () => {
  const rival = useRival();
  const rivals = rival.rivalsData?.myRivals ?? [];
  const canAddMore = rivals.length < 4;

  return (
    <S.Wrapper>
      {rival.queries.myRivals.isError && rival.rivalsData && (
        <S.RefreshNotice role="alert">
          <span>새 라이벌 정보를 불러오지 못해 이전 결과를 표시해요.</span>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => void rival.queries.myRivals.refetch()}
          >
            다시 시도
          </Button>
        </S.RefreshNotice>
      )}
      <S.Container>
        {rival.queries.myRivals.isPending ? (
          <S.State role="status" aria-live="polite">
            라이벌을 불러오는 중이에요.
          </S.State>
        ) : rival.queries.myRivals.isError && !rival.rivalsData ? (
          <S.State role="alert">
            <span>
              {getErrorMessage(rival.queries.myRivals.error, "라이벌을 불러오지 못했어요.")}
            </span>
            <Button
              type="button"
              size="sm"
              variant="primary"
              onClick={() => void rival.queries.myRivals.refetch()}
            >
              다시 시도
            </Button>
          </S.State>
        ) : (
          <>
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
              <S.AddRivalButton type="button" onClick={rival.handleOpen} aria-label="라이벌 추가">
                <S.AddRivalBox>
                  <S.PlusIcon aria-hidden />
                </S.AddRivalBox>
              </S.AddRivalButton>
            )}
          </>
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
