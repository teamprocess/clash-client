import * as S from "./Skeleton.style";

export const Skeleton = () => {
  return (
    <S.SkeletonContainer>
      <S.SkeletonBox $width={80} $height={15} />
      <S.SkeletonBox $width={40} $height={15} />
    </S.SkeletonContainer>
  );
};
