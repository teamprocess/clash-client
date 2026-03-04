import { forwardRef, type InputHTMLAttributes } from "react";
import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...props }, ref) => {
    return (
      <Container>
        <StyledInput ref={ref} {...props} />
        {error && <ErrorText>{error}</ErrorText>}
      </Container>
    );
  }
);

Input.displayName = "Input";

const Container = styled.div`
  width: 100%;
`;

const StyledInput = styled.input`
  border-radius: 1rem;
  width: 100%;
  height: 3.5rem;
  padding: 0 1.5rem;
  ${font.body.medium}
  color: ${({ theme }) => theme.label.neutral};
  background-color: ${({ theme }) => theme.background.alternative};
  border: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.label.assistive};
  }

  &:focus {
    background-color: ${({ theme }) => theme.background.neutral};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  ${font.caption.medium};
  color: ${palette.red[60]};
  margin-top: 0.5rem;
  display: block;
`;
