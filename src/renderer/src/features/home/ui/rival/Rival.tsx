import * as S from "./Rival.style";
import { RivalProps } from "@/features/home/model/useHome"; // 전체 props
import { MyRivalUsers } from "@/features/home/ui/rival/myrival-users/MyRivalUsers";
import { Modal } from "@/shared/ui/modal/Modal";

export const Rival = ({
  RivalsData,
  getStatus,
  modalOpen,
  handleOpen,
  handleClose,
  userList,
  rivalSelectedId,
  handleUserSelect,
  handleModalClose,
  handleRivalCreate,
}: RivalProps) => {
  return (
    <S.RivalContainer>
      <S.TitleBox>
        <S.Title>내 라이벌</S.Title>
        <S.ArrowBox onClick={handleOpen} style={{ cursor: "pointer" }}>
          자세히보기
          <S.DetailArrowIcon />
        </S.ArrowBox>
      </S.TitleBox>

      <S.RivalBox>
        {RivalsData.data.my_rivals.map(user => (
          <MyRivalUsers key={user.username} user={user} getStatus={getStatus} />
        ))}
        {RivalsData.data.my_rivals.length < 4 && (
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
                {userList.map(user => (
                  <S.UserChoiceBox
                    key={user.name}
                    $isSelected={rivalSelectedId.includes(user.name)}
                    onClick={() => handleUserSelect(user.name)}
                  >
                    <S.ProfileContent style={{ height: "3rem" }}>
                      <S.ProfileIcon />
                      <S.ProfileTagBox>
                        <S.ProfileName>{user.name}</S.ProfileName>
                        <S.ProfileMention>@{user.mention}</S.ProfileMention>
                      </S.ProfileTagBox>
                    </S.ProfileContent>

                    {rivalSelectedId.includes(user.name) ? <S.CheckedIcon /> : <S.UncheckedBox />}
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
