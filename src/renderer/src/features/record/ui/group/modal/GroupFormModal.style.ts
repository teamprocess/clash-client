import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  height: 100%;
  width: 100%;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

export const Tab = styled.button<{ $isActive: boolean }>`
  ${font.title1.medium};
  color: ${({ $isActive, theme }) => ($isActive ? theme.label.normal : theme.label.assistive)};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const Hr = styled.div`
  height: 4px;
  width: 100%;
  background-color: ${({ theme }) => theme.line.neutral};
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  height: 100%;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  height: 100%;
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.label.normal};
  ${font.headline2.medium};
`;

export const Input = styled.input`
  color: ${({ theme }) => theme.label.normal};
  background-color: ${({ theme }) => theme.label.disable};
  width: 100%;
  padding: 1rem;
  height: 3rem;
  ${font.body.medium};
  border: none;
  outline: none;
  border-radius: 0.5rem;

  &::placeholder {
    color: ${({ theme }) => theme.label.assistive};
  }
`;

export const SlideButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  height: 3rem;

  background-color: ${({ theme }) => theme.label.disable};
  border-radius: 0.5rem;
`;

export const SlideButton = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.line.normal : "transparent")};
  color: ${palette.neutral[97]};
  ${font.headline2.medium};
  min-width: 5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export const TextArea = styled.textarea`
  color: ${({ theme }) => theme.label.normal};
  background-color: ${({ theme }) => theme.label.disable};
  width: 100%;
  padding: 1rem;
  ${font.body.medium};
  border: none;
  outline: none;
  border-radius: 0.5rem;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.label.assistive};
  }
`;

export const ErrorText = styled.p`
  ${font.label.medium};
  color: ${palette.red[60]};
  margin-top: 0.25rem;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const Button = styled.button<{ $type: "CANCEL" | "SUBMIT" }>`
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  ${font.headline2.medium};
  cursor: pointer;
  background-color: ${({ theme, $type }) => {
    switch ($type) {
      case "CANCEL":
        return theme.line.normal;
      case "SUBMIT":
        return theme.primary.normal;
    }
  }};
  color: ${({ theme }) => theme.label.normal};
`;

export const Groups = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(8rem, 1fr));
  gap: 2rem;
  width: 100%;
  height: 100%;
`;

export const GroupContainer = styled.div<{ $isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 1rem;
  padding: 1rem;
  border: 3px solid
    ${({ theme, $isSelected }) => ($isSelected ? theme.primary.normal : "transparent")};
  background-color: ${({ theme }) => theme.label.disable};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.primary.normal};
  }
`;

export const GroupHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const GroupHeaderTextBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const GroupBadge = styled.span`
  ${font.body.medium};
  padding: 0.1rem 1rem;
  border-radius: 1rem;
  min-width: fit-content;
  background-color: ${({ theme }) => theme.label.alternative};
  color: ${({ theme }) => theme.label.disable};
  cursor: pointer;
`;

export const GroupName = styled.h3`
  ${font.headline1.medium};
  color: ${({ theme }) => theme.label.normal};
  margin: 0;
`;

export const GroupDescription = styled.p`
  ${font.body.regular};
  color: ${({ theme }) => theme.label.alternative};
  margin: 0.5rem 0 0 0;
`;

export const GroupFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

export const GroupMembers = styled.span`
  ${font.headline2.medium};
  color: ${({ theme }) => theme.label.alternative};

  span {
    color: ${({ theme }) => theme.primary.normal};
  }
`;

export const GroupJoinButton = styled.button`
  ${font.body.medium};
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.line.normal};
  color: ${({ theme }) => theme.label.normal};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.primary.normal};
  }
`;

export const CategoryFilters = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

export const CategoryButton = styled.button<{ $isActive?: boolean }>`
  ${font.body.medium};
  padding: 0.2rem 0.75rem;
  border-radius: 1rem;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.primary.normal : theme.fill.alternative};
  color: ${({ theme }) => theme.label.alternative};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.primary.normal};
  }
`;

export const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 1rem;
  padding: 0 1rem 1rem 1rem;
`;

export const GroupsWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const Pagination = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
`;

export const PageButton = styled.button<{ $isActive?: boolean }>`
  ${font.headline2.medium};
  padding: 0.25rem 0.625rem;
  border-radius: 0.5rem;
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.primary.normal : "transparent")};
  color: ${({ theme }) => theme.label.normal};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.primary.normal : theme.line.normal};
  }

  &:disabled {
    opacity: 0.5;
  }
`;
