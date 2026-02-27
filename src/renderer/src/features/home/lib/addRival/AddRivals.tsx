import { Dialog } from "@/shared/ui";
import * as S from "./AddRivals.style";
import { SearchInput } from "@/shared/ui/search-input";
import React from "react";
import { useRival } from "@/shared/lib/useRival";

interface AddRivalsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  usingState?: "home" | "competition";
  rival: ReturnType<typeof useRival>;
}

export const AddRivalsDialog = ({ isOpen, onClose, rival }: AddRivalsDialogProps) => {
  const handleClose = () => {
    rival.handleClose();
    onClose();
  };

  const users = rival.filteredUsers ?? [];

  return (
    <Dialog
      title={"라이벌 추가"}
      width={21.625}
      height={25.175}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <S.DialogLayout>
        <S.TopSection>
          <S.SearchInputBox>
            <SearchInput
              placeholder={"이름 또는 아이디 검색"}
              inputSize={"md"}
              variant={"light"}
              fullWidth={true}
              value={rival.searchText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                rival.setSearchText(e.target.value)
              }
            />
          </S.SearchInputBox>

          <S.UserChoiceContainer>
            {users.map(user => {
              const isSelected = rival.rivalSelectedId.includes(user.id);

              return (
                <S.UserChoiceBox
                  key={user.id}
                  $isSelected={isSelected}
                  onClick={() => rival.handleUserSelect(user.id)}
                >
                  <S.ProfileContent $height="3rem">
                    <S.ProfileIcon />
                    <S.ProfileTagBox>
                      <S.ProfileName>{user.name}</S.ProfileName>
                      <S.ProfileMention>@{user.username}</S.ProfileMention>
                    </S.ProfileTagBox>
                  </S.ProfileContent>

                  {isSelected ? <S.CheckedIcon /> : <S.UncheckedBox />}
                </S.UserChoiceBox>
              );
            })}
          </S.UserChoiceContainer>
        </S.TopSection>

        <S.BottomRow>
          {rival.error && <S.ErrorText>{rival.error}</S.ErrorText>}
          <S.ButtonBox>
            <S.CloseButton onClick={rival.handleSelectClose}>초기화</S.CloseButton>
            <S.OkayButton onClick={rival.handleRivalCreate}>확인</S.OkayButton>
          </S.ButtonBox>
        </S.BottomRow>
      </S.DialogLayout>
    </Dialog>
  );
};
