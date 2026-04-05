import { ReactNode } from "react";
import * as S from "./NameTag.style";
import type { NameTagSize, NameTagTextAlign, NameTagWidth } from "./NameTag.style";

export interface NameTagProps {
  text?: string;
  children?: ReactNode;
  backgroundImage?: string | null;
  backgroundSize?: string;
  backgroundPosition?: string;
  size?: NameTagSize;
  width?: NameTagWidth;
  textAlign?: NameTagTextAlign;
  className?: string;
  title?: string;
}

export const NameTag = ({
  text,
  children,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  size = "regular",
  width = "content",
  textAlign = "center",
  className,
  title,
}: NameTagProps) => {
  return (
    <S.Wrapper
      className={className}
      $backgroundImage={backgroundImage ?? undefined}
      $backgroundSize={backgroundSize}
      $backgroundPosition={backgroundPosition}
      $size={size}
      $width={width}
      $textAlign={textAlign}
      title={title ?? text}
    >
      {children ?? (text ? <S.Text $textAlign={textAlign}>{text}</S.Text> : null)}
    </S.Wrapper>
  );
};
