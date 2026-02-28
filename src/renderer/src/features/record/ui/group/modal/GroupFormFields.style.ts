import styled, { css } from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";

export const FieldsContainer = styled.div`
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

  &[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
  }

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const PasswordInputWrapper = styled.div<{ $hasAction?: boolean }>`
  position: relative;
  width: 100%;

  ${({ $hasAction }) =>
    $hasAction &&
    css`
      ${Input} {
        padding-right: 6.5rem;
      }
    `}
`;

export const PasswordChangeButtonInside = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  ${font.label.medium};
  color: ${({ theme }) => theme.label.normal};
  background: ${({ theme }) => theme.primary.normal};
  border: none;
  padding: 0.35rem 0.6rem;
  border-radius: 0.5rem;
  cursor: pointer;
  min-width: 4.5rem;

  &:disabled {
    cursor: default;
    background: ${({ theme }) => theme.line.normal};
    color: ${({ theme }) => theme.label.assistive};
  }
`;

export const SlideButtonBox = styled.div`
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  justify-content: stretch;
  padding: 0.25rem;
  height: 3rem;
  background-color: ${({ theme }) => theme.label.disable};
  border-radius: 0.5rem;
`;

export const SlideActiveIndicator = styled.span<{ $activeIndex: number; $count: number }>`
  position: absolute;
  top: 0.25rem;
  bottom: 0.25rem;
  left: 0.25rem;
  width: ${({ $count }) => `calc((100% - 0.5rem) / ${$count})`};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.line.normal};
  transform: translateX(${({ $activeIndex }) => `${$activeIndex * 100}%`});
  transition: transform 0.2s ease;
  z-index: 0;
`;

export const SlideButton = styled.button<{ $isActive?: boolean }>`
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: ${({ theme, $isActive }) => ($isActive ? theme.label.normal : theme.label.assistive)};
  ${font.headline2.medium};
  min-width: 0;
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
