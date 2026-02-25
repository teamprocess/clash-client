import * as S from "./SectionItemBox.style";
import { section } from "@/entities/roadmap/section/model/section.types";

interface SectionItemBoxProps {
  category: string;
  sections: section[];
  onItemClick: (item: section) => void;
}

export const SectionItemBox = ({ category, sections, onItemClick }: SectionItemBoxProps) => {
  return (
    <S.SectionItemBox key={category}>
      {sections
        .filter(item => item.category === category)
        .map(item => (
          <S.SectionItem key={item.id} style={{ opacity: item.locked ? 0.5 : 1 }}>
            <S.SectionIconWrapper onClick={() => onItemClick(item)}>
              {/*서버로부터 사진 연결 전 임시로 null*/}
              <S.SectionIcon src={"null"} />
              {item.completed && <S.SectionComplete />}
              {item.locked && <S.SectionLock />}
            </S.SectionIconWrapper>
            <S.SectionTitle>{item.title}</S.SectionTitle>
          </S.SectionItem>
        ))}
    </S.SectionItemBox>
  );
};
