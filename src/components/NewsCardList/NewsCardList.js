import { useContext, useEffect, useState } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinCN from '../../utils/joinClassNames';
import Button from '../Button/Button';
import LoadInfo from '../LoadInfo/LoadInfo';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

const NewsCardList = ({
  cards = [],
  isOwn = false,
  isLoading,
  onSaveClick,
  onDeleteClick,
}) => {
  const [renderingAmount, setRenderingAmount] = useState(isOwn ? null : 3);
  useEffect(() => {
    setRenderingAmount(3);
  }, [cards]);

  const handleLoadMoreClick = () => setRenderingAmount(renderingAmount + 3);
  
  // СТИЛИ
  const {
    pageNarrowClassName,
    pageListClassName,
    robotoText,
    robotoSlabText,
  } = useContext(CommonPageStylesContext);
  const titleClassName = joinCN({ basic: ['news-cards__title', robotoSlabText] });
  const sectionClassName = joinCN({
    basic: ['news-cards', pageNarrowClassName],
    condition: {
      'news-cards_type_saved': isOwn,
      'news-cards_type_search': !isOwn,
    },
  });
  const loadButtonClassName = joinCN({ basic: ['news-cards__button', robotoText] });
  const listClassName = joinCN({ basic: ['news-cards__list', pageListClassName] });  

  return (
    <section className={sectionClassName}>
      { isLoading
        ? (
          <LoadInfo isLoading={true} />
        ) : (
          Boolean(isOwn) ? (
            <ul className={listClassName}>
              { cards.map((card) => (
                <li className="news-cards__list-item" key={card._id}>
                  <NewsCard card={card} isOwn={true} onDeleteClick={onDeleteClick} />
                </li>
              )) }
            </ul>
          ) : (
            Boolean(cards === null)
            ? (
              <LoadInfo isError={true} />
            ) : (
              Boolean(cards.length > 0)
              ? (
                <>
                  <h2 className={titleClassName}>
                    Результаты поиска
                  </h2>
                  <ul className={listClassName}>
                    { cards.slice(0, renderingAmount).map((card) => (
                      <li className="news-cards__list-item" key={card.title} >
                        <NewsCard
                          card={card}
                          isOwn={false}
                          onSaveClick={onSaveClick}
                          onDeleteClick={onDeleteClick}
                        />
                      </li>
                    )) }
                  </ul>
                  { Boolean(renderingAmount !== null & renderingAmount < cards.length) &&
                    <Button outerClassName={loadButtonClassName} onClick={handleLoadMoreClick}>
                      Показать ещё
                    </Button>
                  }
                </>
              ) : (
                <LoadInfo isNotFound={true} />
              )
            )
          )
        )
      }
    </section>
  );
};

export default NewsCardList;
