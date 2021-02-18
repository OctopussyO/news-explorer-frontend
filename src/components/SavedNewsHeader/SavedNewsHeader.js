import { useContext, useEffect, useState } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import joinCN from '../../utils/joinClassNames';
import './SavedNewsHeader.css';

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

  // const keywords = !!savedNews.length ? savedNews
  //   .map((item) => item.keyword)
  //   .reduce((prevVal, item) => {
  //     if (!prevVal[item]) prevVal[item] = 1;
  //     else prevVal[item]++;
  //     return prevVal;
  //   }, {})
  //   : null;
    
  // const sortedKeywords = !!keywords ? Object.keys(keywords).sort((a, b) => {
  //   return keywords[b] - keywords[a];
  // })
  // : null;

  // const savedNewsNumber = savedNews.length;
    
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
        case 1:
          return (<>
            {renderKeyword(sortedKeywords[0])}
          </>);
        case 2:
          return (<>
            {renderKeyword(sortedKeywords[0])} и {renderKeyword(sortedKeywords[1])}
          </>);
        case 3:
          return (<>
            {renderKeyword(sortedKeywords[0])}, {renderKeyword(sortedKeywords[1])}
            {" и "}{renderKeyword(sortedKeywords[2])}
          </>);
        default:
          return (<>
            {renderKeyword(sortedKeywords[0])}, {renderKeyword(sortedKeywords[1])}
            {" и "}{renderKeyword(renderRestKeywordsNumberWithEnding())}
          </>);
      }
    } else return null;
  };

  const { pageNarrowClassName, robotoText, robotoSlabText } = useContext(CommonPageStylesContext);
  const sectionClassName = joinCN({ basic: ['saved-news-header', pageNarrowClassName] });
  const titleClassName = joinCN({ basic: ['saved-news-header__title', robotoText] });
  const subtitleClassName = joinCN({ basic: ['saved-news-header__subtitle', robotoSlabText] });
  const keywordsClassname = joinCN({ basic: ['saved-news-header__keywords', robotoText] });
  
  return (
    <section className={sectionClassName}>
      <h2 className={titleClassName}>
        Сохранённые статьи
      </h2>
      <p className={subtitleClassName}>
        {name}, у вас {`${renderSavedNewsNumber()} ${renderSavedArticleWithEnding()}`}
      </p>
      { !!savedNewsNumber &&
        <p className={keywordsClassname}>
          По ключевым словам: {renderKeywords()}
        </p>
      }
    </section>
  );
};

export default SavedNewsHeader;
