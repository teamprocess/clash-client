import { useEffect, useState } from "react";
import { fallbackHelpContents, type HelpContentKey } from "../../../../../shared/helpContent";

export const useHelpContent = (key: HelpContentKey) => {
  const [content, setContent] = useState(fallbackHelpContents[key]);

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = window.api.onHelpContentUpdated(updatedContent => {
      if (updatedContent.key === key) {
        setContent(updatedContent.content);
      }
    });

    void window.api
      .getHelpContent(key)
      .then(savedContent => {
        if (isMounted) {
          setContent(savedContent);
        }
      })
      .catch(error => {
        console.warn(`도움말을 불러오지 못했습니다. key=${key}`, error);
      });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [key]);

  return content;
};
