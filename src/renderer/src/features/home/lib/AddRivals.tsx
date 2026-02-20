import { Dialog } from "@/shared/ui";
import * as S from "./AddRivals.style";
import { useRival } from "@/features/home/model/useRival";
import { SearchInput } from "@/shared/ui/search-input";

interface AddRivalsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddRivalsDialog = ({ isOpen, onClose }: AddRivalsDialogProps) => {
  const getRivalData = useRival();

  const handleClose = () => {
    getRivalData.handleClose();
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
        <div>
          <SearchInput
            placeholder={"이름 또는 아이디 검색"}
            inputSize={"md"}
            variant={"light"}
            fullWidth={true}
            style={{ margin: "1rem 0" }}
          />
          <S.UserChoiceContainer>
            {getRivalData.userList?.users.map(user => (
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
          <S.CloseButton onClick={handleClose}>취소</S.CloseButton>
          <S.OkayButton onClick={getRivalData.handleRivalCreate}>확인</S.OkayButton>
          {getRivalData.error && <S.ErrorText>{getRivalData.error}</S.ErrorText>}
        </S.ButtonBox>
      </S.BottomBox>
    </Dialog>
  );
};
