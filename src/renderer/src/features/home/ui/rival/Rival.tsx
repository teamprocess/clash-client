import * as S from "./Rival.style";
import { RivalProps } from "@/features/home/model/useRival";
import { MyRivalUsers } from "@/features/home/ui/rival/myrival-users/MyRivalUsers";
import { Modal } from "@/shared/ui/modal/Modal";
import { Link } from "react-router-dom";

export const Rival = ({
  userList,
  rivalsData,
  getStatus,
  modalOpen,
  handleOpen,
  handleClose,
  rivalSelectedId,
  handleUserSelect,
  handleModalClose,
  handleRivalCreate,
}: RivalProps) => {
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
        {rivalsData?.myRivals.map(user => (
          <MyRivalUsers key={user.username} user={user} getStatus={getStatus} />
        ))}
        {(rivalsData?.myRivals.length ?? 0) < 4 && (
          <S.ProfileContainer onClick={handleOpen} style={{ cursor: "pointer" }}>
            <S.AddRivalBox>
              <S.PlusIcon />
              <S.AddRivalText>버튼을 눌러 라이벌을 추가할 수 있어요.</S.AddRivalText>
            </S.AddRivalBox>
          </S.ProfileContainer>
        )}
      </S.RivalBox>

      {modalOpen && (
        <Modal
          modalTitle={"라이벌 추가"}
          width={21.625}
          height={25.175}
          isOpen={modalOpen}
          onClose={handleClose}
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
                {userList?.users.map(user => (
                  <S.UserChoiceBox
                    key={user.userId}
                    $isSelected={rivalSelectedId.includes(user.userName)}
                    onClick={() => handleUserSelect(user.userName)}
                  >
                    <S.ProfileContent style={{ height: "3rem" }}>
                      <S.ProfileIcon />
                      <S.ProfileTagBox>
                        <S.ProfileName>{user.userName}</S.ProfileName>
                        <S.ProfileMention>@{user.gitHubId}</S.ProfileMention>
                      </S.ProfileTagBox>
                    </S.ProfileContent>

                    {rivalSelectedId.includes(user.userName) ? (
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
              <S.CloseButton onClick={handleModalClose}>취소</S.CloseButton>
              <S.OkayButton onClick={handleRivalCreate}>확인</S.OkayButton>
            </S.ButtonBox>
          </S.BottomBox>
        </Modal>
      )}
    </S.RivalContainer>
  );
};
