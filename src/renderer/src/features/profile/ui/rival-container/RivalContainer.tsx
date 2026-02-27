import * as S from "./RivalContainer.style";
import { RivalCard } from "@/features/profile";
import { VscodeIcon } from "./RivalContainer.style";
import { useRival } from "@/features/home/model/useRival";
import { PlusIcon } from "@/features/home/ui/rival/Rival.style";

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
    </S.Container>
  );
};
