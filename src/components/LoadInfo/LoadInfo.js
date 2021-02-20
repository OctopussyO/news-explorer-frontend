import joinCN from '../../utils/joinClassNames';
import Preloader from '../Preloader/Preloader';
import NotFoundIcon from '../svg/NotFoundIcon';
import './LoadInfo.css';
import '../Typo/Typo.css';

const LoadInfo = ({
  isLoading = false,
  isNotFound = false,
  isError = false,
}) => {
  const titleClassName = joinCN({ basic: ['info__title', 'typo', 'typo_font-family_roboto-slab'] });
  const textClassName = joinCN({ basic: ['info__text', 'typo', 'typo_font-family_roboto'] });
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
            К сожалению, по вашему запросу ничего не&nbsp;найдено.
          </p>
        </>
      )}
      { isError && (
        <>
          <p className={textClassName}>
            Во&nbsp;время запроса произошла ошибка. 
          </p>
          <p className={textClassName}>
            Возможно, проблема с соединением или&nbsp;сервер недоступен.
          </p>
          <p className={textClassName}>
            Подождите немного и попробуйте ещё&nbsp;раз.
          </p>
        </>
      )}
    </div>
  );
};

export default LoadInfo;
