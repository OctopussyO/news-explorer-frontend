import { useContext, useState } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinCN from '../../utils/joinClassNames';
import Button from '../Button/Button';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

const NewsCardList = ({
  cards = [],
  isOwn = false,
  isVisible = false,
}) => {
  const {
    pageNarrowClassName,
    pageListClassName,
    robotoText,
    robotoSlabText
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

  const [renderingAmount, setRenderingAmount] = useState(isOwn ? null : 3);

  const handleLoadMoreClick = () => setRenderingAmount(renderingAmount + 3);
  

  return (
    <>
    {/* Сохранённые карточки */}
      {
        Boolean(isOwn & cards.length > 0) && (
          <section className={sectionClassName}>
            <ul className={listClassName}>
              { cards.map((card) => (
                <li className="news-cards__list-item" key={card.id}>
                  <NewsCard card={card} isOwn={true} />
                </li>
              )) }
            </ul>
          </section>
        )
      }
      {/* Найденные карточки */}
      {
        Boolean(!isOwn & isVisible) && (
          <section className={sectionClassName}>
            <h2 className={titleClassName}>
              Результаты поиска
            </h2>
            <ul className={listClassName}>
              { cards.slice(0, renderingAmount).map((card) => (
                <li className="news-cards__list-item" key={card.id} >
                  <NewsCard card={card} isOwn={false} />
                </li>
              )) }
            </ul>
            { Boolean(renderingAmount !== null & renderingAmount < cards.length) &&
              <Button outerClassName={loadButtonClassName} onClick={handleLoadMoreClick}>
                Показать ещё
              </Button>
            }
          </section>
        )
      }
    </>
  )
};

export default NewsCardList;
