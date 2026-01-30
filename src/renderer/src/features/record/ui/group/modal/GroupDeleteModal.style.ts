import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  height: 100%;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Text = styled.p<{ $type?: "WARNING" }>`
  ${font.body.medium};
  color: ${({ theme, $type }) => ($type === "WARNING" ? palette.red[60] : theme.label.normal)};
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const Button = styled.button<{ $type: "CANCEL" | "DELETE" }>`
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  ${font.headline2.medium};
  cursor: pointer;
  background-color: ${({ theme, $type }) => {
    switch ($type) {
      case "CANCEL":
        return theme.line.normal;
      case "DELETE":
        return palette.red[60];
    }
  }};
  color: ${({ theme, $type }) => ($type === "DELETE" ? palette.neutral[99] : theme.label.normal)};
`;
