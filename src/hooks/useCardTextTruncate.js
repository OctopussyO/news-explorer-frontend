import { useEffect, useState } from "react";
import { 
  TEXT_LINE_HEIGHT,
  TITLE_LINE_HEIGHT_SM,
  TITLE_LINE_HEIGHT_L,
  MAX_LINES_IN_CARD_S,
  MAX_LINES_IN_CARD_ML,
  WINDOW_MAX_WIDTH_S,
  WINDOW_MAX_WIDTH_M,
} from '../utils/constants';
import throttle from "../utils/throttle";

const useCardTextTruncate = (titleRef, textRef) => {
  const [titleLinesAmount, setTitleLinesAmount] = useState(0);
  const [isTextTruncateNeeded, setTextTruncateState] = useState(false);
  
  
  const handleTruncateText = () => {
    const titleElement = titleRef.current;
    const titleLineHeight = window.innerWidth <= WINDOW_MAX_WIDTH_M 
      ? TITLE_LINE_HEIGHT_SM
      : TITLE_LINE_HEIGHT_L;
    const maxLinesInCard = window.innerWidth <= WINDOW_MAX_WIDTH_S
      ? MAX_LINES_IN_CARD_S
      : MAX_LINES_IN_CARD_ML;
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
