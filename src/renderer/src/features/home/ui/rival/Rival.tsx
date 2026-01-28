import * as S from "./Rival.style";
import { MyRivalUsers } from "@/features/home/ui/rival/myrival-users/MyRivalUsers";
import { Modal } from "@/shared/ui/modal/Modal";
import { Link } from "react-router-dom";
import { useRival } from "@/features/home/model/useRival";

export const Rival = () => {
  const getRivalData = useRival();

  return (
    <S.RivalContainer>
      <S.TitleBox>
        <S.Title>내 라이벌</S.Title>
        <Link to="/competition">
          <S.ArrowBox style={{ cursor: "pointer" }}>
            자세히보기
            <S.DetailArrowIcon />
          </S.ArrowBox>
        </Link>
      </S.TitleBox>

      <S.RivalBox>
        {getRivalData.rivalsData?.myRivals.map(user => (
          <MyRivalUsers key={user.username} user={user} getStatus={getRivalData.getStatus} />
        ))}
        {(getRivalData.rivalsData?.myRivals.length ?? 0) < 4 && (
          <S.ProfileContainer onClick={getRivalData.handleOpen} style={{ cursor: "pointer" }}>
            <S.AddRivalBox>
              <S.PlusIcon />
              <S.AddRivalText>버튼을 눌러 라이벌을 추가할 수 있어요.</S.AddRivalText>
            </S.AddRivalBox>
          </S.ProfileContainer>
        )}
      </S.RivalBox>

      {getRivalData.modalOpen && (
        <Modal
          modalTitle={"라이벌 추가"}
          width={21.625}
          height={25.175}
          isOpen={getRivalData.modalOpen}
          onClose={getRivalData.handleClose}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <S.SearchBox>
                <S.SearchUsers placeholder={"이름 또는 아이디 검색"} />
                <S.SearchIconBox>
                  <S.SearchIcon />
                </S.SearchIconBox>
              </S.SearchBox>
              <S.UserChoiceContainer>
                {getRivalData.userList?.users.map(user => (
                  <S.UserChoiceBox
                    key={user.userId}
                    $isSelected={getRivalData.rivalSelectedId.includes(user.userId)}
                    onClick={() => getRivalData.handleUserSelect(user.userId)}
                  >
                    <S.ProfileContent style={{ height: "3rem" }}>
                      <S.ProfileIcon />
                      <S.ProfileTagBox>
                        <S.ProfileName>{user.userName}</S.ProfileName>
                        <S.ProfileMention>@{user.gitHubId}</S.ProfileMention>
                      </S.ProfileTagBox>
                    </S.ProfileContent>

                    {getRivalData.rivalSelectedId.includes(user.userId) ? (
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
              <S.CloseButton onClick={getRivalData.handleModalClose}>취소</S.CloseButton>
              <S.OkayButton onClick={getRivalData.handleRivalCreate}>확인</S.OkayButton>
            </S.ButtonBox>
          </S.BottomBox>
        </Modal>
      )}
    </S.RivalContainer>
  );
};
