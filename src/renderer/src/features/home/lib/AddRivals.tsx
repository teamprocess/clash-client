import { Dialog } from "@/shared/ui";
import * as S from "./AddRivals.style";
import { useRival } from "@/features/home/model/useRival";
import { SearchInput } from "@/shared/ui/search-input";
import React from "react";

interface AddRivalsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  usingState?: "home" | "competition";
}

export const AddRivalsDialog = ({ isOpen, onClose, usingState }: AddRivalsDialogProps) => {
  const getRivalData = useRival();

  const handleClose = () => {
    getRivalData.handleClose();
    onClose();
  };

  return usingState === "home" ? (
    <Dialog
      title={"라이벌 추가"}
      width={21.625}
      height={25.175}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <SearchInput
            placeholder={"이름 또는 아이디 검색"}
            inputSize={"md"}
            variant={"light"}
            fullWidth={true}
            style={{ margin: "1rem 0" }}
            value={getRivalData.searchText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              getRivalData.setSearchText(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") getRivalData.applySearch();
            }}
          />
          <S.UserChoiceContainer>
            {getRivalData.filteredUsers.map(user => (
              <S.UserChoiceBox
                key={user.id}
                $isSelected={getRivalData.rivalSelectedId.includes(user.id)}
                onClick={() => getRivalData.handleUserSelect(user.id)}
              >
                <S.ProfileContent style={{ height: "3rem" }}>
                  <S.ProfileIcon />
                  <S.ProfileTagBox>
                    <S.ProfileName>{user.name}</S.ProfileName>
                    <S.ProfileMention>@{user.username}</S.ProfileMention>
                  </S.ProfileTagBox>
                </S.ProfileContent>

                {getRivalData.rivalSelectedId.includes(user.id) ? (
                  <S.CheckedIcon />
                ) : (
                  <S.UncheckedBox />
                )}
              </S.UserChoiceBox>
            ))}
          </S.UserChoiceContainer>
        </div>
      </div>

      <S.BottomBox>
        <S.ButtonBox>
          <S.CloseButton onClick={getRivalData.handleSelectClose}>취소</S.CloseButton>
          <S.OkayButton onClick={getRivalData.handleRivalCreate}>확인</S.OkayButton>
          {getRivalData.error && <S.ErrorText>{getRivalData.error}</S.ErrorText>}
        </S.ButtonBox>
      </S.BottomBox>
    </Dialog>
  ) : (
    <Dialog
      title={"라이벌 추가"}
      width={43.25}
      height={25.175}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <S.AddRivalsContainer style={{ paddingTop: "1rem" }}>
          <S.WarningContainer>
            <S.WarningText $state={1}>현재 라이벌이 존재하지 않습니다.</S.WarningText>
            <S.WarningText $state={2}>지금 바로 라이벌을 추가해보세요!</S.WarningText>
          </S.WarningContainer>
        </S.AddRivalsContainer>
        <S.AddRivalsContainer>
          <SearchInput
            placeholder={"이름 또는 아이디 검색"}
            inputSize={"md"}
            variant={"light"}
            fullWidth={true}
            style={{ margin: "1rem 0" }}
            value={getRivalData.searchText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              getRivalData.setSearchText(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") getRivalData.applySearch();
            }}
          />
          <S.UserChoiceContainer>
            {getRivalData.filteredUsers?.map(user => (
              <S.UserChoiceBox
                key={user.id}
                $isSelected={getRivalData.rivalSelectedId.includes(user.id)}
                onClick={() => getRivalData.handleUserSelect(user.id)}
              >
                <S.ProfileContent style={{ height: "3rem" }}>
                  <S.ProfileIcon />
                  <S.ProfileTagBox>
                    <S.ProfileName>{user.name}</S.ProfileName>
                    <S.ProfileMention>@{user.username}</S.ProfileMention>
                  </S.ProfileTagBox>
                </S.ProfileContent>

                {getRivalData.rivalSelectedId.includes(user.id) ? (
                  <S.CheckedIcon />
                ) : (
                  <S.UncheckedBox />
                )}
              </S.UserChoiceBox>
            ))}
          </S.UserChoiceContainer>
        </S.AddRivalsContainer>
      </div>

      <S.BottomBox>
        <S.ButtonBox>
          <S.CloseButton onClick={getRivalData.handleSelectClose}>취소</S.CloseButton>
          <S.OkayButton onClick={getRivalData.handleRivalCreate}>확인</S.OkayButton>
          {getRivalData.error && <S.ErrorText>{getRivalData.error}</S.ErrorText>}
        </S.ButtonBox>
      </S.BottomBox>
    </Dialog>
  );
};
