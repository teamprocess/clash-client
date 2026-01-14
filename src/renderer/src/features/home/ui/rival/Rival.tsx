import * as S from "./Rival.style";
import { RivalProps } from "@/features/home/model/useHome"; // 전체 props
import { MyRivalUsers } from "@/features/home/ui/rival/myrival-users/MyRivalUsers";
import { Modal } from "@/shared/ui/modal/Modal";
import { useState } from "react";

export const Rival = ({
  RivalsData,
  getStatus,
  modalOpen,
  handleOpen,
  handleClose,
  userList,
}: RivalProps) => {
  const [rivalSelectedId, setRvalSelectedId] = useState<number | null>(null);

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
          $width={21.625}
          $height={25.175}
          isOpen={modalOpen}
          onClose={handleClose}
        >
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
                $isSelected={rivalSelectedId === user.name}
                onClick={() => setRvalSelectedId(user.name)}
              ></S.UserChoiceBox>
            ))}
          </S.UserChoiceContainer>
        </Modal>
      )}
    </S.RivalContainer>
  );
};
