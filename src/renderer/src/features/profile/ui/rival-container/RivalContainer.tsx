import * as S from "./RivalContainer.style";
import { useRivalContainer } from "../../model/useRivalContainer";
import { RivalCard } from "@/features/profile";
import { VscodeIcon } from "./RivalContainer.style";

export const RivalContainer = () => {
  const { rivalsData } = useRivalContainer();
  const rivals = rivalsData?.myRivals ?? [];

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
    </S.Container>
  );
};
