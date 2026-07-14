import { Skeleton } from "@/shared/ui";
import * as S from "./GroupPage.style";

const memberSkeletons = Array.from({ length: 10 }, (_, index) => (
  <S.MemberSkeleton key={index} aria-hidden="true">
    <Skeleton width="2.75rem" height="2.75rem" radius="999px" />
    <Skeleton width={index % 2 === 0 ? "3.5rem" : "3rem"} height="0.85rem" />
    <Skeleton width="4.25rem" height="0.7rem" />
  </S.MemberSkeleton>
));

const groupSkeletons = Array.from({ length: 5 }, (_, index) => (
  <S.GroupListItemSkeleton key={index} aria-hidden="true">
    <S.GroupListItemLeftSkeleton>
      <Skeleton width="1.5rem" height="1.5rem" radius="999px" />
      <Skeleton width={index % 2 === 0 ? "7rem" : "5.5rem"} height="1rem" />
    </S.GroupListItemLeftSkeleton>
    <S.GroupListItemRightSkeleton>
      <Skeleton width="3.25rem" height="0.85rem" />
      <Skeleton width="1.5rem" height="1.5rem" radius="0.375rem" />
    </S.GroupListItemRightSkeleton>
  </S.GroupListItemSkeleton>
));

export const GroupPageSkeleton = () => (
  <S.Content role="status" aria-live="polite" aria-label="그룹 페이지를 불러오는 중">
    <S.ActivitySkeleton>
      <S.ActivityHeaderSkeleton aria-hidden="true">
        <S.TimerSkeleton>
          <Skeleton width="7rem" height="1rem" />
          <Skeleton width="10rem" height="3rem" radius="0.75rem" />
        </S.TimerSkeleton>
        <S.StudySummarySkeleton>
          <Skeleton width="4rem" height="4rem" radius="999px" />
          <Skeleton width="6rem" height="1.25rem" />
        </S.StudySummarySkeleton>
      </S.ActivityHeaderSkeleton>

      <S.ActivityBodySkeleton>
        <S.GroupInfoSkeleton aria-hidden="true">
          <Skeleton width="9rem" height="1.25rem" />
          <S.GroupStatsSkeleton>
            <Skeleton width="6.5rem" height="1rem" />
            <Skeleton width="4rem" height="1rem" />
          </S.GroupStatsSkeleton>
        </S.GroupInfoSkeleton>
        <S.MemberGridSkeleton>{memberSkeletons}</S.MemberGridSkeleton>
      </S.ActivityBodySkeleton>
    </S.ActivitySkeleton>

    <S.GroupSideSkeleton>
      <S.GroupSideHeaderSkeleton aria-hidden="true">
        <Skeleton width="6rem" height="1.25rem" />
        <Skeleton width="1.5rem" height="1.5rem" radius="0.375rem" />
      </S.GroupSideHeaderSkeleton>
      <S.GroupListSkeleton>{groupSkeletons}</S.GroupListSkeleton>
    </S.GroupSideSkeleton>
  </S.Content>
);
