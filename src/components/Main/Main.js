import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import delay from '../../utils/delay';
import joinCN from '../../utils/joinClassNames';
import About from '../About/About';
import Header from '../Header/Header';
import NewsCardList from '../NewsCardList/NewsCardList';
import SearchForm from '../SearchForm/SearchForm';
import PopupLogin from '../PopupLogin/PopupLogin';
import PopupRegister from '../PopupRegister/PopupRegister';
import PopupInfo from '../PopupInfo/PopupInfo';
import { SUCCESS_REGISTRATION_MESSAGE } from '../../utils/constants';
import './Main.css';

const Main = ({
  onLogout,
  onLogin,
  onRegister,
  onSearch,
}) => {
  const [isLoginPopupOpen, setLoginPopupState] = useState(false);
  const [isRegisterPopupOpen, setRegisterPopupState] = useState(false);
  const [isInfoPopupOpen, setInfoPopupState] = useState(false);

  const openLoginPopup = () => setLoginPopupState(true);
  const openRegisterPopup = () => setRegisterPopupState(true);
  const openInfoPopup = () => setInfoPopupState(true);

  const closeAllPopups = () => {
    setLoginPopupState(false);
    setRegisterPopupState(false);
    setInfoPopupState(false);
  };

  const handleRegister = (data) => {
    return onRegister(data)
      .then(async () => {
        closeAllPopups();
        await delay(500);
        openInfoPopup();
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
  const [isLoading, setLoadingState] = useState(true);
  const [foundNews, setFoundNews] = useState([]);
  const [keyword, setKeyword] =useState('');

  const handleSearchClick = (keyword) => {
    setKeyword(keyword);
    setLoadingState(true);
    setCardListState(true);
    onSearch(keyword)
      .then((data) => {
        if (data) {
          setFoundNews(data.articles.map((article) => {
            return {
              title: article.title,
              text: article.description,
              date: article.publishedAt,
              source: article.source.name,
              link: article.url,
              image: article.urlToImage,
            };
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        setFoundNews(null);
      })
      .finally(() => setLoadingState(false));
  };

  // Чтобы при переадресации неавторизованного пользователя на главную открывался попап авторизации
  const history = useHistory();

  useEffect(() => {
    if (history.location.state && history.action === 'REPLACE') {
      openLoginPopup();
    }
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
          <SearchForm outerClassName="cover__search-form" onSearchClick={handleSearchClick} />
        </div>
      </section>
      { isCardListVisible &&
        <NewsCardList cards={foundNews} isLoading={isLoading} />
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
      <PopupInfo
        isOpen={isInfoPopupOpen}
        onClose={closeAllPopups}
        onBtnClick={openLoginPopup}
        infoText={SUCCESS_REGISTRATION_MESSAGE}
        linkBtnTitle="Войти"
      />
    </>
  );
};

export default Main;
