import type { HTMLAttributes, ReactNode } from "react";
import * as S from "./ChocieBox.style";
import type { ChoiceBoxSize } from "./ChocieBox.style";

export interface ChoiceBoxProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  icon: ReactNode;
  label: string;
  size?: ChoiceBoxSize;
}

export const ChoiceBox = ({
  selected = false,
  icon,
  label,
  size = "md",
  ...props
}: ChoiceBoxProps) => {
  return (
    <S.ChoiceBox $isSelected={selected} $size={size} {...props}>
      <S.ChoiceItem>
        {selected ? <S.CheckedIcon /> : <S.NotCheckedIcon />}
        {icon}
        <S.ChoiceText>{label}</S.ChoiceText>
      </S.ChoiceItem>
    </S.ChoiceBox>
  );
};
