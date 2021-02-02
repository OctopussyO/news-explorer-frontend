import { useEffect, useState } from "react";
import throttle from "../utils/throttle";

// Данные величины устанавливаются исходя из прописанных в стилях значений
const TEXT_LINE_HEIGHT = 22;

const useCardTextTruncate = (titleRef, textRef) => {
  const [titleLinesAmount, setTitleLinesAmount] = useState(0);
  const [isTextTruncateNeeded, setTextTruncateState] = useState(false);
  
  
  const handleTruncateText = () => {
    const titleElement = titleRef.current;
    // Данные величины устанавливаются исходя из прописанных в стилях значений
    const titleLineHeight = window.innerWidth <= 1024 ? 24 : 30;
    const maxLinesInCard = window.innerWidth <= 600 ? 6 : 7;
    const textElement = textRef.current;
    const titleLines = Math.round(titleElement.offsetHeight / titleLineHeight);
    const textLines = Math.round(textElement.scrollHeight / TEXT_LINE_HEIGHT);
    setTitleLinesAmount(titleLines);
    if (titleLines + textLines > maxLinesInCard) {
      setTextTruncateState(true);
    } else {
      setTextTruncateState(false);
    }
  };

  const throttledHandleTruncateText = throttle(handleTruncateText, 500);
  
  useEffect(() => {
    handleTruncateText();
    window.addEventListener('resize', throttledHandleTruncateText);
    return () => {
      window.removeEventListener('resize', throttledHandleTruncateText);
    }    
  }, []);

  return {
    titleLinesAmount,
    isTextTruncateNeeded,
  }
};

export default useCardTextTruncate;
