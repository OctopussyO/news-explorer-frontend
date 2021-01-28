import { useContext, useRef, useState } from "react";
import { CommonPageStylesContext } from "../../contexts/CommonPageStylesContext";
import joinCN from "../../utils/joinClassNames";
import BookmarkIcon from "../svg/BookmarkIcon";
import Button from "../Button/Button";
import Link from "../Link/Link";
import TrashIcon from "../svg/TrashIcon";
import './NewsCard.css';

const NewsCard = ({
  card,
  isOwn = false,
}) => {
  const [isTooltipVisible, setTooltipState] = useState(false);
  const handleButtonHover = () => setTooltipState(!isTooltipVisible);

  const [isSaved, setSavedState] = useState(false);
  const handleOwnCardClick = () => setSavedState(!isSaved);

  const altText = `${card.keyword}, фотография`;
  const linkTitle = card.source.toUpperCase();

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
  const textClassName = joinCN({ basic: ['card__text', robotoText] });
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
  
  // TODO
  const isLoggedIn = true;

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
              <Button outerClassName="card__button" onClick={handleOwnCardClick}>
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
          <h3 className={titleClassName}>
            <Link isOuter={true} path={card.link} outerClassName={titleLinkClassName} >
              {card.title}
            </Link>
          </h3>
          <p className={textClassName}>
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
