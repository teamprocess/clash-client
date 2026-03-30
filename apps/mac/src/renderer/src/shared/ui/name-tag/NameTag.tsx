import * as S from "./NameTag.style";
import type { NameTagSize } from "./NameTag.style";

export interface NameTagProps {
  text: string;
  backgroundImage?: string | null;
  size?: NameTagSize;
  className?: string;
  title?: string;
}

export const NameTag = ({
  text,
  backgroundImage,
  size = "regular",
  className,
  title,
}: NameTagProps) => {
  return (
    <S.Wrapper
      className={className}
      $backgroundImage={backgroundImage ?? undefined}
      $size={size}
      title={title ?? text}
    >
      <S.Text>{text}</S.Text>
    </S.Wrapper>
  );
};
