import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Item = "TEST" | "CHOICE" | null;

export const useSelectPath = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Item>(null);

  const select = (path: Item) => setSelected(path);

  const submit = () => {
    if (selected) {
      navigate(`/roadmap/${selected.toLocaleLowerCase()}`);
    }
  };

  return {
    selected,
    select,
    submit,
    isValid: selected !== null,
  };
};
