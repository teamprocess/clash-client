import { Dialog } from "@/shared/ui";
import * as S from "./AddRivals.style";
import { SearchInput } from "@/shared/ui/search-input";
import React from "react";
import { useRival } from "@/features/home/model/useRival";

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

  return (
    <Dialog
      title={"라이벌 추가"}
      width={21.625}
      height={25.175}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <SearchInput
          placeholder={"이름 또는 아이디 검색"}
          inputSize={"md"}
          variant={"light"}
          fullWidth={true}
          style={{ margin: "1rem 0" }}
          value={rival.searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => rival.setSearchText(e.target.value)}
        />

        <S.UserChoiceContainer>
          {rival.filteredUsers.map(user => (
            <S.UserChoiceBox
              key={user.id}
              $isSelected={rival.rivalSelectedId.includes(user.id)}
              onClick={() => rival.handleUserSelect(user.id)}
            >
              <S.ProfileContent style={{ height: "3rem" }}>
                <S.ProfileIcon />
                <S.ProfileTagBox>
                  <S.ProfileName>{user.name}</S.ProfileName>
                  <S.ProfileMention>@{user.username}</S.ProfileMention>
                </S.ProfileTagBox>
              </S.ProfileContent>

              {rival.rivalSelectedId.includes(user.id) ? <S.CheckedIcon /> : <S.UncheckedBox />}
            </S.UserChoiceBox>
          ))}
        </S.UserChoiceContainer>

        <S.BottomBox>
          <S.ButtonBox>
            <S.CloseButton onClick={rival.handleSelectClose}>초기화</S.CloseButton>

            <S.OkayButton onClick={rival.handleRivalCreate}>확인</S.OkayButton>
            {rival.error && <S.ErrorText>{rival.error}</S.ErrorText>}
          </S.ButtonBox>
        </S.BottomBox>
      </div>
    </Dialog>
  );
};
