import * as S from "./Topbar.style";
import { useState } from "react";
import { Explain } from "./Topbar.style";
import { useUser } from "@/entities/user";

interface TopbarProps {
  onToggleSidebar: () => void;
}

type AnswerStatus = "YES" | "NO" | "YET";

interface AlamProps {
  name: string;
  mention: string;
  message: string;
  answer: AnswerStatus;
}

const alarmInfo: AlamProps[] = [
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

export const Topbar = ({ onToggleSidebar }: TopbarProps) => {
  const alarmCnt = alarmInfo.length;
  const [isAlamOpen, setIsAlamOpen] = useState(false);
  const { data: user } = useUser();

  const handleOpen = () => {
    setIsAlamOpen(prev => !prev);
  };
  const handleConfirm = () => {};
  const handleDeny = () => {};
  const handleDelete = () => {};

  return (
    <S.TopbarContainer>
      <S.LeftMenu>
        <S.MenuButton onClick={onToggleSidebar}>
          <S.MenuIcon />
        </S.MenuButton>
        <S.LogoWrapper to="/">
          <S.Logo />
        </S.LogoWrapper>
      </S.LeftMenu>
      <S.RightMenu>
        <S.AlamDoor onClick={handleOpen}>
          {alarmCnt > 0 ? <S.AlarmOnIcon /> : <S.AlarmIcon />}
        </S.AlamDoor>
        {isAlamOpen && alarmCnt > 0 ? (
          <S.ModalOverlay>
            <S.ModalContainer>
              <S.ModalHeader>
                <S.ModalTitle>알림</S.ModalTitle>
                <S.CloseButton onClick={handleOpen}>
                  <S.CloseIcon />
                </S.CloseButton>
              </S.ModalHeader>
              <S.SearchBox>
                <S.SearchUsers placeholder={"보낸 사람, 알림 내용으로 검색"} />
                <S.SearchIconBox>
                  <S.SearchIcon />
                </S.SearchIconBox>
              </S.SearchBox>
              <S.AlarmContainer>
                {alarmInfo.map(alarm => (
                  <S.AlarmBox key={alarm.mention || alarm.name || alarm.message}>
                    <S.ProfileIcon />
                    <S.AlarmTextWrapper>
                      <S.NameDiv>
                        <S.AlarmName>{alarm.name}</S.AlarmName>
                        <S.Mention>@{alarm.mention}</S.Mention>
                      </S.NameDiv>
                      <Explain>{alarm.message}</Explain>
                    </S.AlarmTextWrapper>
                    {alarm.answer === "YET" ? (
                      <S.ChoiceBox>
                        <S.ChoiceButton onClick={handleConfirm}>
                          <S.ConfirmIcon />
                        </S.ChoiceButton>
                        <S.ChoiceButton onClick={handleDeny}>
                          <S.DenyIcon />
                        </S.ChoiceButton>
                      </S.ChoiceBox>
                    ) : (
                      <S.ChoiceBox>
                        <S.ChoiceButton onClick={handleDelete}>
                          <S.TrashIcon />
                        </S.ChoiceButton>
                      </S.ChoiceBox>
                    )}
                  </S.AlarmBox>
                ))}
              </S.AlarmContainer>
            </S.ModalContainer>
          </S.ModalOverlay>
        ) : isAlamOpen && alarmCnt === 0 ? (
          <S.ModalOverlay>
            <S.ModalContainer>
              <S.ModalHeader>
                <S.ModalTitle>알림</S.ModalTitle>
                <S.CloseButton onClick={handleOpen}>
                  <S.CloseIcon />
                </S.CloseButton>
              </S.ModalHeader>
              <S.NoneAlarm>
                <S.CryIcon />
                현재 도착한 알림이 없습니다.
              </S.NoneAlarm>
            </S.ModalContainer>
          </S.ModalOverlay>
        ) : null}
        <S.ProfileBox to="/profile">
          <S.ProfileIcon />
          <S.NameBox>
            <S.Name>{user?.name}</S.Name>
            <S.Username>@{user?.username}</S.Username>
          </S.NameBox>
        </S.ProfileBox>
      </S.RightMenu>
    </S.TopbarContainer>
  );
};
