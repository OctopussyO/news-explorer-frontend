import { useContext, useEffect, useRef, useState } from "react";
import { CommonPageStylesContext } from "../../contexts/CommonPageStylesContext";
import { APPEAR_DISAPPEAR_DELAY } from "../../utils/constants";
import joinCN from "../../utils/joinClassNames";
import BookmarkIcon from "../svg/BookmarkIcon";
import Button from "../Button/Button";
import Link from "../Link/Link";
import TrashIcon from "../svg/TrashIcon";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useCardTextTruncate from "../../hooks/useCardTextTruncate";
import { formatDateToStr } from "../../utils/date";
import delay from "../../utils/delay";
import './NewsCard.css';
import '../Typo/Typo.css';

const NewsCard = ({
  card,
  isOwn = false,
  onSaveClick,
  onDeleteClick,
  onUnauthSaveClick,
}) => {
  const { isLoggedIn, savedNews } = useContext(CurrentUserContext);

  const [isTooltipVisible, setTooltipState] = useState(false);
  const handleButtonHover = () => setTooltipState(!isTooltipVisible);

  const [matched, setMatched] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    setMatched(!!savedNews.length ? savedNews.find((item) => item.link === card.link) : null);
  }, [card, savedNews]);

  useEffect(() => {
    setIsSaved(!!matched ? true : false);
  }, [matched]);

  const handleCommonCardClick = async () => {
    if (isLoggedIn) {
      if (!isSaved) {
        const temp = {...card};
        delete temp._id;
        onSaveClick(temp);
      } else onDeleteClick(matched._id);
    } else onUnauthSaveClick();
  };

  // Для плавного исчезновения карточки при удалении
  const [isDeleted, setDeletedState] = useState(false);
  const disappear = async () => {
    setDeletedState(true);
    await delay(APPEAR_DISAPPEAR_DELAY);
  };

  const handleDeleteCardClick = () => {
    onDeleteClick(card._id, disappear);
  };

  const altText = `${card.keyword}, фотография`;
  const linkTitle = card.source.toUpperCase();
  const date = formatDateToStr(new Date(card.date));

  const titleRef = useRef(null);
  const textRef = useRef(null);

  const { titleLinesAmount, isTextTruncateNeeded } = useCardTextTruncate(titleRef, textRef);

  // СТИЛИ
  const { disappearAnimation, appearAnimation } = useContext(CommonPageStylesContext);
  const cardClassName = joinCN({
    basic: ['card'],
    condition: {
      [appearAnimation]: !isDeleted,
      [disappearAnimation]: isDeleted,
    },
  });
  const saveIconClassName = joinCN({
    basic: ['card__icon', 'card__icon_act_save'],
    condition: {
      'card__icon_marked': isSaved,
    },
  });
  const tooltipClassName = joinCN({
    basic: ['card__tooltip', 'typo', 'typo_font-family_roboto'],
    condition: {
      'card__tooltip_for_delete': isOwn,
      'card__tooltip_for_auth': !isOwn,
      'card__tooltip_visible': isTooltipVisible,
    },
  });
  const textClassName = joinCN({
    basic: ['card__text', 'typo', 'typo_font-family_roboto'],
    condition: {
      'card__text_truncated': isTextTruncateNeeded,
      'card__text_truncate_def': titleLinesAmount === 0 & isTextTruncateNeeded,
      'card__text_truncate_min': titleLinesAmount === 1 & isTextTruncateNeeded,
      'card__text_truncate_mid': titleLinesAmount === 2 & isTextTruncateNeeded,
      'card__text_truncate_max': titleLinesAmount === 3 & isTextTruncateNeeded,
    },
  });  

  return (
    <figure className={cardClassName}>
      <div className="card__over-elements">
        <div
          className="card__control"
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonHover}
        >
          { isOwn 
            ? (
              <Button outerClassName="card__button" onClick={handleDeleteCardClick} labelText="Удалить">
                <TrashIcon pathClassName="card__icon card__icon_act_delete" /> 
              </Button>
            ) : (
              <Button outerClassName="card__button" onClick={handleCommonCardClick} labelText="Сохранить">
                <BookmarkIcon pathClassName={saveIconClassName} />
              </Button>
            )
          }          
          { isOwn
            ? (
              <span className={tooltipClassName}>
                Убрать из сохранённых
              </span>
            ) : !isLoggedIn && (
              <span className={tooltipClassName}>
                Войдите, чтобы сохранять статьи
              </span>
            )
          }
        </div>
        { isOwn && 
          <span className="card__keyword typo typo_font-family_roboto">
            {card.keyword}
          </span> 
        }
      </div>
      <img className="card__image" src={card.image} alt={altText} />
      <figcaption className=" card__text-content">
        <p className="card__date typo typo_font-family_source-sans">
          {date}
        </p>
        <div className="card__description">
          <h3 className="card__title typo typo_font-family_roboto-slab" ref={titleRef}>
            <Link
              isOuter={true}
              path={card.link}
              outerClassName="card__link card__link_content_title typo typo_font-family_roboto-slab"
            >
              {card.title}
            </Link>
          </h3>
          <p className={textClassName} ref={textRef}>
            {card.text}
          </p>
        </div>
        <Link
          isOuter={true}
          path={card.link}
          outerClassName="card__link card__link_content_source typo typo_font-family_roboto-slab"
        >
          {linkTitle}
        </Link>
      </figcaption>
    </figure>
  );
};

export default NewsCard;
