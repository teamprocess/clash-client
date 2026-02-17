import * as S from "./Skeleton.style";

export const Skeleton = () => {
  return (
    <S.SkeletonContainer>
      <S.SkeletonBox $width={70} $height={20} />
      <S.SkeletonBox $width={70} $height={20} />
    </S.SkeletonContainer>
  );
};
