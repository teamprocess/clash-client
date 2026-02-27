import { Button, Dialog } from "@/shared/ui";
import * as S from "./DeleteRivals.style";
import { useRival } from "@/shared/lib";

interface DeleteRivalsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  usingState?: "home" | "competition";
  rival: ReturnType<typeof useRival>;
}

export const DeleteRivalsDialog = ({ isOpen, onClose, rival }: DeleteRivalsDialogProps) => {
  const rivals = rival.rivalsData?.myRivals ?? [];

  return (
    <Dialog title={"라이벌 삭제"} width={21.625} height={25.175} isOpen={isOpen} onClose={onClose}>
      <S.DialogBody>
        <S.UserChoiceContainer>
          {rivals.map(user => {
            const isSelected = rival.rivalSelectedId.includes(user.rivalId);

            return (
              <S.UserChoiceBox
                key={user.rivalId}
                $isSelected={isSelected}
                onClick={() => rival.handleDeleteUserSelect(user.rivalId)}
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

        <S.ButtonBox>
          <Button fullWidth={true} variant={"primary"} onClick={rival.handleRivalDelete}>
            라이벌 끊기
          </Button>
          {rival.error && <S.ErrorText>{rival.error}</S.ErrorText>}
        </S.ButtonBox>
      </S.DialogBody>
    </Dialog>
  );
};
