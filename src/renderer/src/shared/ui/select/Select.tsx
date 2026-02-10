import * as S from "./Select.styles";

interface SelectOption<T extends string> {
  key: T;
  label: string;
}

interface SelectProps<T extends string> {
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
}

export const Select = <T extends string>({ value, options, onChange }: SelectProps<T>) => {
  return (
    <S.SelectWrapper>
      <S.Select value={value} onChange={e => onChange(e.target.value as T)}>
        {options.map(option => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </S.Select>
      <S.ArrowIcon />
    </S.SelectWrapper>
  );
};
