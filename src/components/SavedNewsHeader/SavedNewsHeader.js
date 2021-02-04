import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinCN from '../../utils/joinClassNames';
import './SavedNewsHeader.css';

const SavedNewsHeader = () => {
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
        Грета, у вас 5 сохранённых статей
      </p>
      <p className={keywordsClassname}>
        По ключевым словам: 
        <span className="saved-news-header__span-accent"> Природа</span>, 
        <span className="saved-news-header__span-accent"> Тайга</span> и 
        <span className="saved-news-header__span-accent"> 2-м другим</span>
      </p>
    </section>
  );
};

export default SavedNewsHeader;
