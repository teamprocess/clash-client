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

    void window.api.getHelpContent(key).then(savedContent => {
      if (isMounted) {
        setContent(savedContent);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [key]);

  return content;
};
