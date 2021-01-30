import { useContext, useRef, useState } from "react";
import { CommonPageStylesContext } from "../../contexts/CommonPageStylesContext";
import joinCN from "../../utils/joinClassNames";
import BookmarkIcon from "../svg/BookmarkIcon";
import Button from "../Button/Button";
import Link from "../Link/Link";
import TrashIcon from "../svg/TrashIcon";
import './NewsCard.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useCardTextTruncate from "../../hooks/useCardTextTruncate";

const NewsCard = ({
  card,
  isOwn = false,
}) => {
  const { isLoggedIn } = useContext(CurrentUserContext);

  const [isTooltipVisible, setTooltipState] = useState(false);
  const handleButtonHover = () => setTooltipState(!isTooltipVisible);

  const [isSaved, setSavedState] = useState(false);
  const handleCommonCardClick = () => {
    if (isLoggedIn) {
      setSavedState(!isSaved);
    }
  };

  const altText = `${card.keyword}, фотография`;
  const linkTitle = card.source.toUpperCase();

  const titleRef = useRef(null);
  const textRef = useRef(null);

  const { titleLinesAmount, isTextTruncateNeeded } = useCardTextTruncate(titleRef, textRef);

  // СТИЛИ
  const { robotoText, robotoSlabText, sourceSansText } = useContext(CommonPageStylesContext);
  const keywordClassName = joinCN({ basic: ['card__keyword', robotoText] });
  const tooltipClassName = joinCN({
    basic: ['card__tooltip', robotoText],
    condition: {
      'card__tooltip_for_delete': isOwn,
      'card__tooltip_for_auth': !isOwn,
      'card__tooltip_visible': isTooltipVisible,
    }
  });
  const dateClassName = joinCN({ basic: ['card__date', sourceSansText] });
  const titleClassName = joinCN({ basic: ['card__title', robotoSlabText] });
  // TODO --- подумать, как расставлять классы. сейчас работает немного не так, как нужно
  // либо truncated  перенести в стили основные, а расставлять только модификаторы,
  // либо продумать правильно условия
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
  const saveIconClassName = joinCN({
    basic: ['card__icon', 'card__icon_act_save'],
    condition: {
      'card__icon_marked': isSaved,
    },
  });

  return (
    <figure className="card">
      <div className="card__over-elements">
        <span className={keywordClassName}>{card.keyword}</span>
        <div
          className="card__control"
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonHover}
        >
          { isOwn 
            ? (
              <Button outerClassName="card__button">
                <TrashIcon pathClassName="card__icon card__icon_act_delete" /> 
              </Button>
            ) : (
              <Button outerClassName="card__button" onClick={handleCommonCardClick}>
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
      </div>
      <img className="card__image" src={card.image} alt={altText} />
      <figcaption className=" card__text-content">
        <p className={dateClassName}>
          {card.date}
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
  )
};

export default NewsCard;
