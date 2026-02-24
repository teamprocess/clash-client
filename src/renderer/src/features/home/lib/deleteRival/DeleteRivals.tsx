import { Button, Dialog } from "@/shared/ui";
import * as S from "./DeleteRivals.style";
import { useRival } from "@/features/home/model/useRival";

interface DeleteRivalsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  usingState?: "home" | "competition";
  rival: ReturnType<typeof useRival>;
}

export const DeleteRivalsDialog = ({ isOpen, onClose, rival }: DeleteRivalsDialogProps) => {
  return (
    <Dialog title={"라이벌 삭제"} width={21.625} height={25.175} isOpen={isOpen} onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
        <S.UserChoiceContainer>
          {rival.rivalsData?.myRivals.map(user => (
            <S.UserChoiceBox
              key={user.username}
              $isSelected={rival.rivalSelectedId.includes(user.id)}
              onClick={() => rival.handleDeleteUserSelect(user.id)}
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
            <Button fullWidth={true} variant={"primary"} onClick={rival.handleRivalDelete}>
              라이벌 끊기
            </Button>
            {rival.error && <S.ErrorText>{rival.error}</S.ErrorText>}
          </S.ButtonBox>
        </S.BottomBox>
      </div>
    </Dialog>
  );
};
