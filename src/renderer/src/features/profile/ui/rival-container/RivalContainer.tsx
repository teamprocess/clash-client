import * as S from "./RivalContainer.style";
import { useRivalContainer } from "../../model/useRivalContainer";
import { RivalCard } from "./rival-card/RivalCard";
import { VscodeIcon } from "./RivalContainer.style";

export const RivalContainer = () => {
  const { rivals, maxRivals } = useRivalContainer();
  const viewRivals = rivals.slice(0, maxRivals);

  return (
    <S.Container>
      {viewRivals.map(rival => (
        <RivalCard
          key={rival.id}
          name={rival.name}
          status={rival.status}
          time={rival.time}
          appName={rival.appName}
          profileSrc={S.profileSrcMap[rival.profileKey]}
          appIconSrc={VscodeIcon[rival.appKey]}
        />
      ))}
    </S.Container>
  );
};
