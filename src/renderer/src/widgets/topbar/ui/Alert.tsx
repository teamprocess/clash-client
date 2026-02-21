import { useRef, useState } from "react";
import { Popover } from "@/shared/ui";
import * as S from "./Alert.style";

type AnswerStatus = "YES" | "NO" | "YET";

interface AlertInfo {
  name: string;
  mention: string;
  message: string;
  answer: AnswerStatus;
}

const alertInfoList: AlertInfo[] = [
  {
    name: "멧돼지",
    mention: "seunga_418",
    message: "상대방이 라이벌을 신청했어요.",
    answer: "YES",
  },
  { name: "채근영", mention: "chaeyn", message: "상대방이 라이벌을 신청했어요.", answer: "YET" },
  { name: "한승환", mention: "h.7xn", message: "상대방이 라이벌을 신청했어요.", answer: "YES" },
  { name: "권대형", mention: "gorani", message: "상대방이 라이벌을 신청했어요.", answer: "NO" },
];

export const Alert = () => {
  const alertCount = alertInfoList.length;
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {};
  const handleDeny = () => {};
  const handleDelete = () => {};

  return (
    <>
      <S.AlertTriggerWrapper ref={anchorRef}>
        <S.AlertButton type="button" onClick={handleToggle}>
          {alertCount > 0 ? <S.AlertOnIcon /> : <S.AlertIcon />}
        </S.AlertButton>
      </S.AlertTriggerWrapper>
      <Popover
        isOpen={isOpen}
        onClose={handleClose}
        anchorRef={anchorRef}
        align="end"
        offset={14}
        alignOffset="2rem"
      >
        <S.AlertPanel>
          <S.AlertHeader>
            <S.AlertTitle>알림</S.AlertTitle>
            <S.CloseButton type="button" onClick={handleClose}>
              <S.CloseIcon />
            </S.CloseButton>
          </S.AlertHeader>
          {alertCount > 0 ? (
            <>
              <S.SearchBox>
                <S.SearchUsers placeholder="보낸 사람, 알림 내용으로 검색" />
                <S.SearchIconBox>
                  <S.SearchIcon />
                </S.SearchIconBox>
              </S.SearchBox>
              <S.AlertContainer>
                {alertInfoList.map(alert => (
                  <S.AlertBox key={alert.mention || alert.name || alert.message}>
                    <S.AlertProfileIcon />
                    <S.AlertTextWrapper>
                      <S.NameRow>
                        <S.AlertName>{alert.name}</S.AlertName>
                        <S.Mention>@{alert.mention}</S.Mention>
                      </S.NameRow>
                      <S.Explain>{alert.message}</S.Explain>
                    </S.AlertTextWrapper>
                    {alert.answer === "YET" ? (
                      <S.ChoiceBox>
                        <S.ChoiceButton type="button" onClick={handleConfirm}>
                          <S.ConfirmIcon />
                        </S.ChoiceButton>
                        <S.ChoiceButton type="button" onClick={handleDeny}>
                          <S.DenyIcon />
                        </S.ChoiceButton>
                      </S.ChoiceBox>
                    ) : (
                      <S.ChoiceBox>
                        <S.ChoiceButton type="button" onClick={handleDelete}>
                          <S.TrashIcon />
                        </S.ChoiceButton>
                      </S.ChoiceBox>
                    )}
                  </S.AlertBox>
                ))}
              </S.AlertContainer>
            </>
          ) : (
            <S.NoneAlert>
              <S.CryIcon />
              현재 도착한 알림이 없습니다.
            </S.NoneAlert>
          )}
        </S.AlertPanel>
      </Popover>
    </>
  );
};
