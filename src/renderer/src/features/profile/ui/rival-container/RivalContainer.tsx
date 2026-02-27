import * as S from "./RivalContainer.style";
import { RivalCard } from "@/features/profile";
import { VscodeIcon } from "./RivalContainer.style";
import { useRival } from "@/shared/lib";
import { PlusIcon } from "@/features/home/ui/rival/Rival.style";
import { AddRivalsDialog } from "@/shared/ui";

export const RivalContainer = () => {
  const rival = useRival();
  const rivals = rival.rivalsData?.myRivals ?? [];
  const canAddMore = rivals.length < 4;

  return (
    <S.Container>
      {rivals.map(rival => (
        <RivalCard
          key={rival.id}
          name={rival.name}
          status={rival.status}
          time={rival.activeTime}
          appName={rival.usingApp}
          profileSrc={S.profileSrcMap["default"]}
          appIconSrc={VscodeIcon["vscode"]}
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
        <AddRivalsDialog isOpen={rival.modalOpen} onClose={rival.handleClose} rival={rival} />
      )}
    </S.Container>
  );
};
