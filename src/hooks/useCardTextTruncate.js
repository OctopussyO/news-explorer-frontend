import { useEffect, useState } from "react";
import throttle from "../utils/throttle";

// Данные величины устанавливаются исходя из прописанных в стилях значений
// Можно получать динамически и рассчитывать максимальное кличество линий,
// если потребуется переиспользовать в другом проекте. В данном случае смысла
// в лишний вычислениях нет.
const TEXT_LINE_HEIGHT = 22;
const MAX_LINES_IN_CARD = 7;

const useCardTextTruncate = (titleRef, textRef) => {
  const [titleLinesAmount, setTitleLinesAmount] = useState(0);
  const [isTextTruncateNeeded, setTextTruncateState] = useState(false);
  
  
  const handleTruncateText = () => {
    const titleElement = titleRef.current;
    const titleLineHeight = window.innerWidth >= 1024 ? 30 : 24;
    console.log(titleLineHeight, window.innerWidth)
    const textElement = textRef.current;
    const titleLines = titleElement.offsetHeight / titleLineHeight;
    const textLines = textElement.scrollHeight / TEXT_LINE_HEIGHT;
    console.log(titleLines, textLines, titleElement.scrollHeight)
    setTitleLinesAmount(titleLines);
    if (titleLines + textLines > MAX_LINES_IN_CARD) {
      setTextTruncateState(true);
    } else {
      setTextTruncateState(false);
    }
  };

  const throttledHandleTruncateText = throttle(handleTruncateText, 500);
  
  useEffect(() => {
    handleTruncateText();
    console.log(isTextTruncateNeeded)
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
