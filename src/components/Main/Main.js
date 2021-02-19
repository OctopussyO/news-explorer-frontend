import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import { OPEN_CLOSE_DELAY, SUCCESS_REGISTRATION_MESSAGE } from '../../utils/constants';
import delay from '../../utils/delay';
import joinCN from '../../utils/joinClassNames';
import About from '../About/About';
import Header from '../Header/Header';
import NewsCardList from '../NewsCardList/NewsCardList';
import SearchForm from '../SearchForm/SearchForm';
import PopupLogin from '../PopupLogin/PopupLogin';
import PopupRegister from '../PopupRegister/PopupRegister';
import './Main.css';

const Main = ({
  onLogout,
  onLogin,
  onRegister,
  onSearch,
  cards = [],
  lastKeyword ='',
  isLoading = false,
  onSaveClick,
  onDeleteClick,
  onOpenInfoPopup,
}) => {
  const [isLoginPopupOpen, setLoginPopupState] = useState(false);
  const [isRegisterPopupOpen, setRegisterPopupState] = useState(false);  

  const openLoginPopup = () => setLoginPopupState(true);
  const openRegisterPopup = () => setRegisterPopupState(true);

  const closeAllPopups = () => {
    setLoginPopupState(false);
    setRegisterPopupState(false);
  };

  const handleRegister = (data) => {
    return onRegister(data)
      .then(async () => {
        closeAllPopups();
        await delay(OPEN_CLOSE_DELAY);
        onOpenInfoPopup({
          onBtnClick: openLoginPopup,
          infoTitle: SUCCESS_REGISTRATION_MESSAGE,
          linkBtnTitle: 'Войти',
        });
      });
  };

  const handleLogin = (data) => {
    return onLogin(data)
      .then(() => {
        closeAllPopups();
      });
  };

  const handleLogout = () => {
    onLogout();
    closeAllPopups();
  };

  const [isCardListVisible, setCardListState] = useState(false);

  useEffect(() => {
    if (!!lastKeyword) {
      setCardListState(true);
    }
  }, [lastKeyword]);

  const handleSearchClick = async (keyword) => {
    setCardListState(true);
    await onSearch(keyword);
  };

  const history = useHistory();

  // Открывает попап для "входа", если переход на страницу был в результате редиректа
  useEffect(() => {
    if (history.location.state && history.action === 'REPLACE') openLoginPopup();
  }, []);

  // СТИЛИ
  const { robotoText, robotoSlabText } = useContext(CommonPageStylesContext);

  const titleClassName = joinCN({ basic: ['cover__title', robotoSlabText] });
  const subtitleClassName = joinCN({ basic: ['cover__subtitle', robotoText] });

  return (
    <>
      <section className="cover">
        <Header isMainPage={true} onLogoutClick={handleLogout} onLoginClick={openLoginPopup} />
        <div className="cover__content">
          <div className="cover__text">
            <h2 className={titleClassName}>
              Что творится в мире?
            </h2>
            <p className={subtitleClassName}>
              Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.
            </p>
          </div>
          <SearchForm
            outerClassName="cover__search-form"
            onSearchClick={handleSearchClick}
            lastKeyword={lastKeyword}
          />
        </div>
      </section>
      { isCardListVisible &&
          <NewsCardList
          cards={cards}
          isLoading={isLoading}
          onSaveClick={onSaveClick}
          onDeleteClick={onDeleteClick}
          onUnauthSaveClick={openLoginPopup}
          newSearchTrigger={lastKeyword}
        />
      }
      <About />
      <PopupLogin
        isOpen={isLoginPopupOpen}
        onClose={closeAllPopups}
        onLogin={handleLogin}
        onChangePopup={openRegisterPopup}
      />
      <PopupRegister
        isOpen={isRegisterPopupOpen}
        onClose={closeAllPopups}
        onRegister={handleRegister}
        onChangePopup={openLoginPopup}
      />
    </>
  );
};

export default Main;
