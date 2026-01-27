import { useState } from "react";
import { Modal } from "@/shared/ui/modal/Modal";
import { GROUP_TYPE } from "@/features/record/model/useGroup";
import type { GroupFormModalProps } from "@/features/record/model/useGroup";
import * as S from "./GroupFormModal.style";

const MOCK_GROUPS = [
  {
    id: 1,
    name: "프로세스",
    description: "전국의 풍마들을 모아라!",
    category: "반",
    currentMembers: 32,
    maxMembers: 50,
  },
  {
    id: 2,
    name: "프로세스",
    description: "전국의 풍마들을 모아라!",
    category: "반",
    currentMembers: 32,
    maxMembers: 50,
  },
  {
    id: 3,
    name: "프로세스",
    description: "전국의 풍마들을 모아라!",
    category: "반",
    currentMembers: 32,
    maxMembers: 50,
  },
  {
    id: 4,
    name: "프로세스",
    description: "전국의 풍마들을 모아라!",
    category: "반",
    currentMembers: 32,
    maxMembers: 50,
  },
  {
    id: 5,
    name: "프로세스",
    description: "전국의 풍마들을 모아라!",
    category: "반",
    currentMembers: 32,
    maxMembers: 50,
  },
  {
    id: 6,
    name: "프로세스",
    description: "전국의 풍마들을 모아라!",
    category: "반",
    currentMembers: 32,
    maxMembers: 50,
  },
];

const CATEGORIES = ["전체", "반", "동아리", "팀", "나르샤"] as const;

export const GroupFormModal = ({
  isOpen,
  onClose,
  onCreateSubmit,
  onJoinSubmit,
  createRegister,
  createErrors,
  isCreating,
  isJoining,
  selectedType,
  onTypeSelect,
}: GroupFormModalProps) => {
  const [activeTab, setActiveTab] = useState<"join" | "create">("create");
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  return (
    <Modal width={64} height={42} isOpen={isOpen} onClose={onClose} gap={3}>
      <S.ModalContent>
        <S.Tabs>
          <S.Tab $isActive={activeTab === "join"} onClick={() => setActiveTab("join")}>
            그룹 참여
          </S.Tab>
          <S.Tab $isActive={activeTab === "create"} onClick={() => setActiveTab("create")}>
            그룹 생성
          </S.Tab>
        </S.Tabs>
        <S.Hr />

        {activeTab === "join" ? (
          <S.JoinContainer>
            <S.CategoryFilters>
              {CATEGORIES.map(category => (
                <S.CategoryButton
                  key={category}
                  $isActive={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </S.CategoryButton>
              ))}
            </S.CategoryFilters>

            <S.GroupsWrapper>
              <S.Groups>
                {MOCK_GROUPS.map(group => (
                  <S.GroupContainer
                    key={group.id}
                    $isSelected={selectedGroupId === group.id}
                    onClick={() => setSelectedGroupId(group.id)}
                  >
                    <S.GroupHeader>
                      <S.GroupHeaderTextBox>
                        <S.GroupBadge>{group.category}</S.GroupBadge>
                        <S.GroupName>{group.name}</S.GroupName>
                      </S.GroupHeaderTextBox>
                      <S.GroupDescription>{group.description}</S.GroupDescription>
                    </S.GroupHeader>
                    <S.GroupFooter>
                      <S.GroupMembers>
                        <span>{group.currentMembers}</span> / {group.maxMembers}
                      </S.GroupMembers>
                      <S.GroupJoinButton
                        onClick={e => {
                          e.stopPropagation();
                          onJoinSubmit();
                        }}
                        disabled={isJoining}
                      >
                        {isJoining ? "가입 중..." : "가입"}
                      </S.GroupJoinButton>
                    </S.GroupFooter>
                  </S.GroupContainer>
                ))}
              </S.Groups>
            </S.GroupsWrapper>

            <S.Pagination>
              <S.PageButton disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                ◀
              </S.PageButton>
              {[1, 2, 3, 4, 5].map(page => (
                <S.PageButton
                  key={page}
                  $isActive={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </S.PageButton>
              ))}
              <S.PageButton disabled={currentPage === 5} onClick={() => setCurrentPage(p => p + 1)}>
                ▶
              </S.PageButton>
            </S.Pagination>
          </S.JoinContainer>
        ) : (
          <S.FormContainer as="form" onSubmit={onCreateSubmit}>
            <S.InputContainer>
              <S.InputWrapper>
                <S.InputBox>
                  <S.Label htmlFor="group-name-input">그룹 이름</S.Label>
                  <S.Input
                    id="group-name-input"
                    type="text"
                    placeholder="그룹 이름을 입력하세요."
                    {...createRegister("name")}
                  />
                  {createErrors.name && <S.ErrorText>{createErrors.name.message}</S.ErrorText>}
                </S.InputBox>
                <S.InputBox>
                  <S.Label htmlFor="group-password-input">비밀번호 (선택사항)</S.Label>
                  <S.Input
                    id="group-password-input"
                    type="password"
                    placeholder="그룹 비밀번호를 입력하세요."
                    {...createRegister("password")}
                  />
                  {createErrors.password && (
                    <S.ErrorText>{createErrors.password.message}</S.ErrorText>
                  )}
                </S.InputBox>
              </S.InputWrapper>
              <S.InputWrapper>
                <S.InputBox>
                  <S.Label htmlFor="group-type">카테고리</S.Label>
                  <S.SlideButtonBox>
                    <S.SlideButton
                      type="button"
                      $isActive={selectedType === GROUP_TYPE.CLUB}
                      onClick={() => onTypeSelect(GROUP_TYPE.CLUB)}
                    >
                      {GROUP_TYPE.CLUB}
                    </S.SlideButton>
                    <S.SlideButton
                      type="button"
                      $isActive={selectedType === GROUP_TYPE.CLASS}
                      onClick={() => onTypeSelect(GROUP_TYPE.CLASS)}
                    >
                      {GROUP_TYPE.CLASS}
                    </S.SlideButton>
                    <S.SlideButton
                      type="button"
                      $isActive={selectedType === GROUP_TYPE.TEAM}
                      onClick={() => onTypeSelect(GROUP_TYPE.TEAM)}
                    >
                      {GROUP_TYPE.TEAM}
                    </S.SlideButton>
                    <S.SlideButton
                      type="button"
                      $isActive={selectedType === GROUP_TYPE.NARSHA}
                      onClick={() => onTypeSelect(GROUP_TYPE.NARSHA)}
                    >
                      {GROUP_TYPE.NARSHA}
                    </S.SlideButton>
                    <S.SlideButton
                      type="button"
                      $isActive={selectedType === GROUP_TYPE.ETC}
                      onClick={() => onTypeSelect(GROUP_TYPE.ETC)}
                    >
                      {GROUP_TYPE.ETC}
                    </S.SlideButton>
                  </S.SlideButtonBox>
                  {createErrors.type && <S.ErrorText>{createErrors.type.message}</S.ErrorText>}
                </S.InputBox>
                <S.InputBox>
                  <S.Label htmlFor="group-max-members">최대 인원</S.Label>
                  <S.Input
                    id="group-max-members"
                    type="number"
                    placeholder="최대 인원을 입력하세요."
                    {...createRegister("maxMembers", { valueAsNumber: true })}
                  />
                  {createErrors.maxMembers && (
                    <S.ErrorText>{createErrors.maxMembers.message}</S.ErrorText>
                  )}
                </S.InputBox>
              </S.InputWrapper>
              <S.InputBox>
                <S.Label htmlFor="group-description">그룹 설명</S.Label>
                <S.TextArea
                  id="group-description"
                  rows={5}
                  placeholder="어떤 그룹인지 설명해주세요"
                  {...createRegister("description")}
                />
                {createErrors.description && (
                  <S.ErrorText>{createErrors.description.message}</S.ErrorText>
                )}
              </S.InputBox>
            </S.InputContainer>
            <S.ButtonBox>
              <S.Button type="button" $type="CANCEL" onClick={onClose}>
                취소
              </S.Button>
              <S.Button type="submit" $type="SUBMIT" disabled={isCreating}>
                {isCreating ? "생성 중..." : "저장"}
              </S.Button>
            </S.ButtonBox>
          </S.FormContainer>
        )}
      </S.ModalContent>
    </Modal>
  );
};
