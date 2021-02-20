import { useContext, useEffect, useState } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import { RENDERING_AMOUNT } from '../../utils/constants';
import joinCN from '../../utils/joinClassNames';
import Button from '../Button/Button';
import LoadInfo from '../LoadInfo/LoadInfo';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';
import '../Typo/Typo.css';

const NewsCardList = ({
  cards = [],
  isOwn = false,
  isLoading,
  onSaveClick,
  onDeleteClick,
  onUnauthSaveClick,
  newSearchTrigger,
}) => {
  const [renderingAmount, setRenderingAmount] = useState(isOwn ? null : RENDERING_AMOUNT);
  useEffect(() => {
    setRenderingAmount(RENDERING_AMOUNT);
  }, [newSearchTrigger]);

  const handleLoadMoreClick = () => setRenderingAmount(renderingAmount + RENDERING_AMOUNT);
  
  // СТИЛИ
  const { pageNarrowClassName, pageListClassName } = useContext(CommonPageStylesContext);
  const sectionClassName = joinCN({
    basic: ['news-cards', pageNarrowClassName],
    condition: {
      'news-cards_type_saved': isOwn,
      'news-cards_type_search': !isOwn,
    },
  });
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
                  <h2 className="news-cards__title typo typo_font-family_roboto-slab">
                    Результаты поиска
                  </h2>
                  <ul className={listClassName}>
                    { cards.slice(0, renderingAmount).map((card) => (
                      <li className="news-cards__list-item" key={card.link} >
                        <NewsCard
                          card={card}
                          isOwn={false}
                          onSaveClick={onSaveClick}
                          onDeleteClick={onDeleteClick}
                          onUnauthSaveClick={onUnauthSaveClick}
                        />
                      </li>
                    )) }
                  </ul>
                  { Boolean(renderingAmount !== null & renderingAmount < cards.length) &&
                    <Button
                      outerClassName="news-cards__button typo typo_font-family_roboto"
                      onClick={handleLoadMoreClick}
                    >
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
