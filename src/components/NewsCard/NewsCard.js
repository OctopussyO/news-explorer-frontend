import { useContext, useRef, useState } from "react";
import { CommonPageStylesContext } from "../../contexts/CommonPageStylesContext";
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

  
  const matched = savedNews.find((item) => item.link === card.link);
  card._id = matched ? matched._id : null;
    

  // const isSaved = card._id

  const handleCommonCardClick = async () => {
    if (isLoggedIn) {
      if (!card._id) {
        const temp = {...card};
        delete temp._id;
        onSaveClick(temp);
      } else {
        onDeleteClick(card._id);
        card._id = null;
      }
    } else onUnauthSaveClick();
  };

  // Для плавного исчезновения карточки при удалении
  const [isDeleted, setDeletedState] = useState(false);
  const disappear = async () => {
    setDeletedState(true);
    await delay(300);
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
  const {
    robotoText,
    robotoSlabText,
    sourceSansText,
    disappearAnimation,
    appearAnimation,
  } = useContext(CommonPageStylesContext);
  const cardClassName = joinCN({
    basic: ['card', appearAnimation],
    condition: {
      [disappearAnimation]: isDeleted,
    },
  });
  const saveIconClassName = joinCN({
    basic: ['card__icon', 'card__icon_act_save'],
    condition: {
      'card__icon_marked': card._id,
    },
  });
  const keywordClassName = joinCN({ basic: ['card__keyword', robotoText] });
  const tooltipClassName = joinCN({
    basic: ['card__tooltip', robotoText],
    condition: {
      'card__tooltip_for_delete': isOwn,
      'card__tooltip_for_auth': !isOwn,
      'card__tooltip_visible': isTooltipVisible,
    },
  });
  const dateClassName = joinCN({ basic: ['card__date', sourceSansText] });
  const titleClassName = joinCN({ basic: ['card__title', robotoSlabText] });
  const textClassName = joinCN({
    basic: ['card__text', robotoText],
    condition: {
      'card__text_truncated': isTextTruncateNeeded,
      'card__text_truncate_def': titleLinesAmount === 0 & isTextTruncateNeeded,
      'card__text_truncate_min': titleLinesAmount === 1 & isTextTruncateNeeded,
      'card__text_truncate_mid': titleLinesAmount === 2 & isTextTruncateNeeded,
      'card__text_truncate_max': titleLinesAmount === 3 & isTextTruncateNeeded,
    },
  });
  const sourcelinkClassName = joinCN({
    basic: ['card__link', 'card__link_content_source', robotoSlabText],
  });
  const titleLinkClassName = joinCN({
    basic: ['card__link', 'card__link_content_title', robotoSlabText],
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
        { isOwn && <span className={keywordClassName}>{card.keyword}</span> }
      </div>
      <img className="card__image" src={card.image} alt={altText} />
      <figcaption className=" card__text-content">
        <p className={dateClassName}>
          {date}
        </p>
        <div className="card__description">
          <h3 className={titleClassName} ref={titleRef}>
            <Link isOuter={true} path={card.link} outerClassName={titleLinkClassName} >
              {card.title}
            </Link>
          </h3>
          <p className={textClassName} ref={textRef}>
            {card.text}
          </p>
        </div>
        <Link isOuter={true} path={card.link} outerClassName={sourcelinkClassName} >
          {linkTitle}
        </Link>
      </figcaption>
    </figure>
  );
};

export default NewsCard;
