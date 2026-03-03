import { useState } from "react";
import styled from "styled-components";
import { palette } from "@/shared/config/theme";

interface ToggleBoxProps {
  $isOn: boolean;
}

interface ToggleIconProps {
  $isOn: boolean;
}

const ToggleBox = styled.div<ToggleBoxProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme, $isOn }) => ($isOn ? theme.primary.normal : theme.line.normal)};
  width: 2.625rem;
  border-radius: 2rem;
  padding: 0.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const ToggleIcon = styled.div<ToggleIconProps>`
  background-color: ${palette.neutral["95"]};
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  transform: translateX(${({ $isOn }) => ($isOn ? "0.875rem" : "0")});
  transition: transform 0.2s ease;
`;

export interface ToggleProps {
  defaultValue?: boolean;
  onChange?: (isOn: boolean) => void;
}

export const Toggle = ({ defaultValue = false, onChange }: ToggleProps) => {
  const [isOn, setIsOn] = useState(defaultValue);

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onChange?.(newValue);
  };

  return (
    <ToggleBox $isOn={isOn} onClick={handleToggle}>
      <ToggleIcon $isOn={isOn} />
    </ToggleBox>
  );
};
