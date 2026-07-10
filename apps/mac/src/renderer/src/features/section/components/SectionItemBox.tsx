import type { SyntheticEvent } from "react";
import * as S from "./SectionItemBox.style";
import type { Section } from "@/entities/roadmap";
import RoadmapIcon from "@/shared/ui/assets/roadmap.svg?url";

interface SectionItemBoxProps {
  category: number;
  sections: Section[];
  onItemClick: (item: Section) => void;
}

export const SectionItemBox = ({ category, sections, onItemClick }: SectionItemBoxProps) => {
  const handleIconError = (event: SyntheticEvent<HTMLImageElement>) => {
    if (event.currentTarget.src === RoadmapIcon) {
      return;
    }

    event.currentTarget.src = RoadmapIcon;
  };

  return (
    <S.SectionItemBox key={category}>
      {sections
        .filter(item => item.categoryId === category)
        .map(item => (
          <S.SectionItem key={item.id} style={{ opacity: item.locked ? 0.5 : 1 }}>
            <S.SectionIconWrapper
              type="button"
              aria-label={`${item.title}${item.completed ? ", 완료" : ""}${item.locked ? ", 잠김" : ""}`}
              disabled={item.locked}
              onClick={() => onItemClick(item)}
            >
              <S.SectionIcon
                src={item.categoryImageUrl || RoadmapIcon}
                alt=""
                onError={handleIconError}
              />
              {item.completed && <S.SectionComplete aria-hidden="true" focusable="false" />}
              {item.locked && <S.SectionLock aria-hidden="true" focusable="false" />}
            </S.SectionIconWrapper>
            <S.SectionTitle>{item.title}</S.SectionTitle>
          </S.SectionItem>
        ))}
    </S.SectionItemBox>
  );
};
