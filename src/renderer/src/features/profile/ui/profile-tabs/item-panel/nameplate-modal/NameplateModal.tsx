import React from "react";
import * as S from "./NameplateModal.style";

interface NameplateModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
  children?: React.ReactNode;
}

type TopRanker = {
  id: number;
  rank: 1 | 2 | 3;
  name: string;
  completed: number;
};

type Ranker = {
  id: number;
  rank: number;
  name: string;
  completed: number;
};

const TOP3: TopRanker[] = [
  { id: 1, rank: 2, name: "조상철", completed: 3 },
  { id: 2, rank: 1, name: "조상철", completed: 4 },
  { id: 3, rank: 3, name: "조상철", completed: 2 },
];

const LIST: Ranker[] = [
  { id: 4, rank: 4, name: "박승아", completed: 4 },
  { id: 5, rank: 5, name: "박승아", completed: 4 },
  { id: 6, rank: 6, name: "박승아", completed: 4 },
  { id: 7, rank: 7, name: "박승아", completed: 4 },
];

type NameplateModalContentProps = {
  onClose: () => void;
  onSave?: () => void;
};

export const NameplateModalContent = ({ onClose, onSave }: NameplateModalContentProps) => {
  const handleCancel = () => onClose();
  const handleSave = () => {
    onSave?.();
    onClose();
  };

  return (
    <S.Root>
      <S.Left>
        <S.Top3Row>
          {TOP3.map(u => (
            <S.Top3Card key={u.id}>
              <S.FrameWrap $rank={u.rank}>
                <S.FrameImg $rank={u.rank} alt="" />
                <S.Top3Profile $rank={u.rank} alt="profile" />
              </S.FrameWrap>

              <S.Top3Info>
                <S.Top3Name>{u.name}</S.Top3Name>
                <S.Top3Sub>
                  <S.Top3Count $rank={u.rank}>{u.completed}</S.Top3Count>개 완료
                </S.Top3Sub>
              </S.Top3Info>
            </S.Top3Card>
          ))}
        </S.Top3Row>

        <S.List>
          {LIST.map(u => (
            <S.ListItem key={u.id}>
              <S.ListLeft>
                <S.RankNum>{u.rank}</S.RankNum>
                <S.UserAvatar alt="profile" />
                <S.UserPill>
                  <S.UserName>{u.name}</S.UserName>
                  <S.ListRight>
                    <S.DoneCount>{u.completed}</S.DoneCount>개 완료
                  </S.ListRight>
                </S.UserPill>
              </S.ListLeft>
            </S.ListItem>
          ))}
        </S.List>
      </S.Left>

      <S.Right>
        <S.RightTop>
          <S.RightRow>
            <S.SmallAvatarImg alt="profile" $dim />
            <S.LongPill $dim />
          </S.RightRow>

          <S.RightMainRow>
            <S.MainCard>
              <S.BigAvatarImg alt="profile" />
              <S.MainPill />
            </S.MainCard>
          </S.RightMainRow>

          <S.RightRow>
            <S.SmallAvatarImg alt="profile" $dim />
            <S.ShortPill $dim />
          </S.RightRow>
        </S.RightTop>

        <S.ProductName>상품명입니다.</S.ProductName>

        <S.Actions>
          <S.GhostBtn type="button" onClick={handleCancel}>
            취소
          </S.GhostBtn>
          <S.PrimaryBtn type="button" onClick={handleSave}>
            저장
          </S.PrimaryBtn>
        </S.Actions>
      </S.Right>
    </S.Root>
  );
};

export const NameplateModal = ({ open, onClose, onSave, children }: NameplateModalProps) => {
  if (!open) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={e => e.stopPropagation()}>
        <S.CloseBtn type="button" onClick={onClose} aria-label="닫기">
          <S.CloseIconImg alt="닫기" />
        </S.CloseBtn>

        <S.Content>
          {children ?? <NameplateModalContent onClose={onClose} onSave={onSave} />}
        </S.Content>
      </S.Modal>
    </S.Overlay>
  );
};
