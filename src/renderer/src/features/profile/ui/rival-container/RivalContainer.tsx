import * as S from "./RivalContainer.style";
import { useRivalContainer } from "../../model/useRivalContainer";
import { RivalCard } from "./rival-card/RivalCard";

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
          appIconSrc={S.appIconMap[rival.appKey]}
        />
      ))}
    </S.Container>
  );
};
