import { useContext, useEffect, useState } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import joinCN from '../../utils/joinClassNames';
import './SavedNewsHeader.css';
import '../Typo/Typo.css';

const SavedNewsHeader = () => {
  const { name, savedNews } = useContext(CurrentUserContext);

  const [keywords, setKeywords] = useState([]);
  const [sortedKeywords, setSortedKeywords] = useState([]);
  const [savedNewsNumber, setSavedNewsNumber] = useState(0);

  useEffect(() => {
      setKeywords(
        !!savedNews.length
          ? savedNews.map((item) => item.keyword)
          .reduce((prevVal, item) => {
            !prevVal[item] ? prevVal[item] = 1 : prevVal[item]++;
            return prevVal;
          }, {})
          : []
      );
      setSavedNewsNumber(savedNews.length);
  }, [savedNews]);

  useEffect(() => {
    setSortedKeywords(
      !!keywords 
      ? Object.keys(keywords).sort((a, b) => keywords[b] - keywords[a])
      : []
    );
  }, [keywords]);
    
  const renderSavedNewsNumber = () => {
    return !!savedNewsNumber ? savedNewsNumber : 'пока нет';
  }

  const renderSavedArticleWithEnding = () => {
    const switcher = savedNewsNumber % 10;
    switch (true) {
      case switcher === 1:
        return 'сохранённая статья';
      case switcher > 1 && switcher < 5:
        return 'сохранённые статьи';
      default:
        return 'сохранённых статей';
    }; 
  };

  const renderRestKeywordsNumberWithEnding = () => {
    const restKeywordsNumber = sortedKeywords.length - 2;
    const switcher = restKeywordsNumber % 10;
    switch (true) {
      case switcher === 1:
        return `${restKeywordsNumber}-му другому`;
      case switcher > 1 && switcher < 5:
        return `${restKeywordsNumber}-м другим`;
      default:
        return `${restKeywordsNumber}-ти другим`;
    };
  };
  
  const renderKeyword = (keyword) => {
    return (
      <span className="saved-news-header__span-accent">{keyword}</span>
    );
  };

  const renderKeywords = () => {
    if (!!sortedKeywords) {
      switch (sortedKeywords.length) {
        case 1: return (<>
          {renderKeyword(sortedKeywords[0])}
        </>);
        case 2: return (<>
          {renderKeyword(sortedKeywords[0])} и {renderKeyword(sortedKeywords[1])}
        </>);
        case 3: return (<>
          {renderKeyword(sortedKeywords[0])}, {renderKeyword(sortedKeywords[1])}
          {" и "}{renderKeyword(sortedKeywords[2])}
        </>);
        default: return (<>
          {renderKeyword(sortedKeywords[0])}, {renderKeyword(sortedKeywords[1])}
          {" и "}{renderKeyword(renderRestKeywordsNumberWithEnding())}
        </>);
      }
    } else return null;
  };

  // СТИЛИ
  const { pageNarrowClassName } = useContext(CommonPageStylesContext);
  const sectionClassName = joinCN({ basic: ['saved-news-header', pageNarrowClassName] });
  
  return (
    <section className={sectionClassName}>
      <h2 className="saved-news-header__title typo typo_font-family_roboto">
        Сохранённые статьи
      </h2>
      <p className={"saved-news-header__subtitle typo typo_font-family_roboto-slab"}>
        {name}, у вас {`${renderSavedNewsNumber()} ${renderSavedArticleWithEnding()}`}
      </p>
      { !!savedNewsNumber &&
        <p className="saved-news-header__keywords typo typo_font-family_roboto">
          По ключевым словам: {renderKeywords()}
        </p>
      }
    </section>
  );
};

export default SavedNewsHeader;
