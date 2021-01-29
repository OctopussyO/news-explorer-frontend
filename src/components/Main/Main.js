import { useContext, useState } from 'react';
import { сards } from '../../utils/testCards';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinCN from '../../utils/joinClassNames';
import About from '../About/About';
import Header from '../Header/Header';
import NewsCardList from '../NewsCardList/NewsCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Main.css';
import PopupLogin from '../PopupLogin/PopupLogin';

const Main = ({
  onLogout,
  onLogin,
}) => {
  const [isLoginPopupOpen, setLoginPopupState] = useState(false);
  const [isRegisterPopupOpen, setRegisterPopupState] = useState(false);
  const [isInfoPopupOpen, setInfoPopupState] = useState(false);

  const openLoginPopup = () => setLoginPopupState(true);
  const openRegisterPopup= () => setRegisterPopupState(true);
  const openInfoPopup = () => setInfoPopupState(true);

  const closeAllPopups = () => {
    setLoginPopupState(false);
    setRegisterPopupState(false);
    setInfoPopupState(false);
  };

  const handleLogin = () => {
    onLogin();
    closeAllPopups();
  };

  const handleLogout = () => {
    onLogout();
    closeAllPopups();
  }

  // СТИЛИ
  const { robotoText, robotoSlabText } = useContext(CommonPageStylesContext);

  const titleClassName = joinCN({ basic: ['cover__title', robotoSlabText] });
  const subtitleClassName = joinCN({ basic: ['cover__subtitle', robotoText] });

  return (
    <>
      <section className="cover">
        <Header isMainPage={true} onLogoutClick={handleLogout} onLoginClick={openLoginPopup} />
        <div className="cover__content">
          <h2 className={titleClassName}>
            Что творится в мире?
          </h2>
          <p className={subtitleClassName}>
            Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.
          </p>
          <SearchForm outerClassName="cover__search-form" />
        </div>
      </section>
      <NewsCardList cards={сards} isVisible={true} />
      <About />
      <PopupLogin isOpen={isLoginPopupOpen} onClose={closeAllPopups} onLogin={handleLogin} />
    </>
  );
}

export default Main;
