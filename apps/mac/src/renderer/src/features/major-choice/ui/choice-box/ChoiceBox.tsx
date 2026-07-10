import type { ButtonHTMLAttributes, ReactNode } from "react";
import * as S from "./ChoiceBox.style";
import type { ChoiceBoxSize } from "./ChoiceBox.style";

export interface ChoiceBoxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  type = "button",
  ...props
}: ChoiceBoxProps) => {
  return (
    <S.ChoiceBox type={type} aria-pressed={selected} $isSelected={selected} $size={size} {...props}>
      <S.ChoiceItem>
        {selected ? (
          <S.CheckedIcon aria-hidden="true" focusable="false" />
        ) : (
          <S.NotCheckedIcon aria-hidden="true" focusable="false" />
        )}
        {icon}
        <S.ChoiceText>{label}</S.ChoiceText>
      </S.ChoiceItem>
    </S.ChoiceBox>
  );
};
