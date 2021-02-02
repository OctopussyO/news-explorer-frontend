import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinCN from '../../utils/joinClassNames';
import Preloader from '../Preloader/Preloader';
import NotFoundIcon from '../svg/NotFoundIcon';
import './LoadInfo.css';

const LoadInfo = ({
  isLoading = false,
  isNotFound = false,
}) => {
  const { robotoSlabText, robotoText } = useContext(CommonPageStylesContext);
  const titleClassName = joinCN({ basic: ['info__title', robotoSlabText] });
  const textClassName = joinCN({ basic: ['info__text', robotoText] });
  return (
    <div className="info">
      { isLoading && (
        <>
          <Preloader outerClassName="info__image" />
          <p className={textClassName}>
            Идет поиск новостей...
          </p>
        </>
      )}
      { isNotFound && (
        <>
          <NotFoundIcon className="info__image" />
          <h4 className={titleClassName}>
            Ничего не найдено
          </h4>
          <p className={textClassName}>
            К сожалению по вашему запросу ничего не найдено.
          </p>
        </>
      )}
    </div>
  );
};

export default LoadInfo;
