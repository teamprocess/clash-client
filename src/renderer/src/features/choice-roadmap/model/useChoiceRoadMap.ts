import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Item = "WEB" | "APP" | "SERVER" | "AI" | "GAME" | null;

export const useChoiceRoadMap = () => {
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
