import type { SelectHTMLAttributes } from "react";
import * as S from "./Select.style";

interface SelectOption<T extends string> {
  key: T;
  label: string;
}

interface SelectProps<T extends string> extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children" | "onChange" | "value"
> {
  value: T;
  options: SelectOption<T>[];
  width?: number;
  onChange: (value: T) => void;
}

export const Select = <T extends string>({
  value,
  options,
  width = 7.5,
  onChange,
  ...selectProps
}: SelectProps<T>) => {
  return (
    <S.SelectWrapper>
      <S.Select
        {...selectProps}
        $width={width}
        value={value}
        onChange={event => onChange(event.target.value as T)}
      >
        {options.map(option => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </S.Select>
      <S.ArrowIcon aria-hidden focusable="false" />
    </S.SelectWrapper>
  );
};
