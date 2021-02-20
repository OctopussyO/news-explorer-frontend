import { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  DEFAULT_IMAGE_URL,
  OPEN_CLOSE_DELAY,
  INTERNAL_SERVER_ERROR_POPUP_TITLE,
  INTERNAL_SERVER_ERROR_POPUP_MESSAGE,
  INVALID_DATA_POPUP_ERROR_MESSAGE,
} from '../../utils/constants';
import { formatDateToNums, takeWeekAgoDate } from '../../utils/date';
import delay from '../../utils/delay';
import mainApi from '../../utils/mainApi';
import newsApi from '../../utils/newsApi';
import { urlRegex } from '../../utils/regex';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import PopupInfo from '../PopupInfo/PopupInfo';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedNews from '../SavedNews/SavedNews';
import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: null,
    name: '',
    savedNews: [],
  });
  const [token, setToken] = useState('');

  // Новости
  const [foundNews, setFoundNews] = useState([]);
  const [keyword, setKeyword] =useState('');
  
  // Для обработки загрузки
  const [isLoading, setLoadingState] = useState(true);
  
  // Для вывода сообщений
  const [isInfoPopupOpen, setInfoPopupState] = useState(false);
  const [infoPopupOptions, setInfoPopupOptions] = useState({});

  const openInfoPopup = (options) => {
    setInfoPopupOptions(options);
    setInfoPopupState(true);
  };

  const closeInfoPopup = async () => {
    setInfoPopupState(false);
    await delay(OPEN_CLOSE_DELAY);
    setInfoPopupOptions({});
  };

  const openInfoPopupWithError = (err) => openInfoPopup({
    infoTitle: INTERNAL_SERVER_ERROR_POPUP_TITLE,
    infoText: !!err && err.status === 400
      ? INVALID_DATA_POPUP_ERROR_MESSAGE
      : INTERNAL_SERVER_ERROR_POPUP_MESSAGE,
  });
  
  // Для обработки дат при поиске
  const today = new Date();
  const dateNow = formatDateToNums(today);
  const dateWeekAgo = formatDateToNums(takeWeekAgoDate(today));

  // Обнуляет последний поиск
  const clearLastSearch = () => {
    localStorage.removeItem('lastKeyword');
    localStorage.removeItem('lastFoundNews');
  };

  // Обрабатывает регистрацию
  const handleRegister = (data) => {
    return mainApi.register(data);
  };

  // Обрабатывает  "логин", обновляет стейт текущего пользователя, токен, последний поиск
  const handleLogin = (data) => {
    return mainApi.login(data)
      .then((res) => {
        setCurrentUser({ 
          ...currentUser,
          isLoggedIn: true,
        });
        localStorage.setItem('token', res.token);
        setToken(res.token);
      });
  };

  // Обрабатывает  "выход", обнуляет стейт текущего пользователя, токен, последний поиск
  const handleLogout = () => {
    setCurrentUser({
      isLoggedIn: false,
      name: '',
      savedNews: [],
    });
    localStorage.removeItem('token');
    setToken('');
    clearLastSearch();
  };
  
  // Получает данные пользователя с сервера и устанавливает результаты в стейт текущего пользователя.
  // tokenParametr -- назван так, чтобы не было конфликта со стейтом token, который тоже используется в функции.
  const getUserData = (tokenParametr) => {
    Promise.all([mainApi.getOwnerInfo(tokenParametr), mainApi.getOwnerData(tokenParametr)])
    .then(([userInfo, userData]) => {
      if (!!userInfo & !!userData) {
        setCurrentUser({
          isLoggedIn: true,
          name: userInfo.name,
          savedNews: userData,
        });
      }
    })
    .catch((err) => {
      // Если данные запрашивались после авторизации и запрос выдал ошибку -- попап будет отрисован.
      // Если же данные запрашивались при загрузке страницы и сервер ответил ошибкой, то попап не будет показан, 
      // потому что это может смутить пользователя -- только вошёл, уже какая-то ошибка.
      if (!!token) openInfoPopupWithError();
      setCurrentUser({
        isLoggedIn: false,
        name: '',
        savedNews: [],
      });
      console.error(err);
    });
  };

  // Проверяет наличие токена и при необходимости запрашивает данные пользователя
  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    setToken(token);
    if (token) {
      getUserData(token);
    } else {
      setCurrentUser({
        isLoggedIn: false,
        name: '',
        savedNews: [],
      });
    }
  };

  // При загрузке страницы проверяем, авторизован ли пользователь, а также 
  // выполняем поиск по последнему введённому слову 
  // (проводим поиск по последнему слову, чтобы получать актуальные новости, 
  // даже если пользователь вернулся на сайт спустя несколько дней дней)
  useEffect(() => {
    tokenCheck();
    const lastKeyword = localStorage.getItem('lastKeyword');
    if (lastKeyword) handleSearch(lastKeyword);
  }, []);

  // При новом поиске обновляем сохранённое ключевое слово
  useEffect(() => {
    localStorage.setItem('lastKeyword', keyword);
  }, [keyword, foundNews]);

  // При логине запрашиваем данные пользователя
  useEffect(() => {
    if (currentUser.isLoggedIn && !!token) getUserData(token);
  }, [currentUser.isLoggedIn, token]);

  // Обрабатывает поиск по ключевому слову/фразе
  // keywordParametr -- назван так, чтобы не было конфликта со стейтом keyword, который тоже используется в функции.
  const handleSearch = async (keywordParametr) => {
    setLoadingState(true);
    await newsApi.getData({keyword: keywordParametr, from:dateWeekAgo, to:dateNow})
    .then((data) => {
      const foundNews = data.articles.map((article) => {
        const imageUrl = !!article.urlToImage && urlRegex.test(article.urlToImage)
          ? article.urlToImage
          : DEFAULT_IMAGE_URL;
        return {
          title: article.title,
          text: article.description,
          date: article.publishedAt,
          source: article.source.name,
          link: article.url,
          image: imageUrl,
        };
      });
      setFoundNews(foundNews);
      localStorage.setItem('lastFoundNews', JSON.stringify(foundNews));
    })
    .catch((err) => {
      console.error(err);
      // Если поиск выполнялся сразу при загрузке страницы и не дал результатов, то используем
      // последние найденные новости
      setFoundNews(!!keyword ? null : JSON.parse(localStorage.getItem('lastFoundNews')));
    })
    .finally(() => {
      setKeyword(keywordParametr);
      setLoadingState(false);
    });
  };
  
  const updateSavedCards = () => {
    mainApi.getOwnerData(token)
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          savedNews: data,
        });
      })
      .catch((err) => {
        openInfoPopupWithError();
        console.error(err);
      });
  };

  const handleSaveCard = (data) => {
    mainApi.saveItem(token, {...data, keyword})
      .then(() => {
        updateSavedCards();
      })
      .catch((err) => {
        openInfoPopupWithError(err);
        console.error(err)
      });
  };

  // Обрабатывает удаление карточки, принимает ассинхронных коллбэк для эффекта при удалении
  const handleDeleteCard = (id, callback) => {
    mainApi.deleteItem(token, id)
      .then(async() => {
        if (!!callback) {
          await callback();
        }
        updateSavedCards();
      })
      .catch((err) => {
        openInfoPopupWithError();
        console.error(err)
      });
  };

  // СТИЛИ
  const commonPageStyles = {
    pageNarrowClassName: 'page__narrow',
    pageListClassName: 'page__list',
    robotoText: 'roboto-text',
    robotoSlabText: 'roboto-slab-text',
    interText: 'inter-text',
    sourceSansText: 'source-sans-text',
    appearAnimation: 'appear-animation',
    disappearAnimation: 'disappear-animation',
  };
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CommonPageStylesContext.Provider value={commonPageStyles}>
        <div className="page">
          <div className="page__content">
            <Switch>
              <Route exact path="/">
                <Main
                  onLogin={handleLogin}
                  onLogout={handleLogout}
                  onRegister={handleRegister}
                  onSearch={handleSearch}
                  cards={foundNews}
                  lastKeyword={keyword}
                  isLoading={isLoading}
                  onSaveClick={handleSaveCard}
                  onDeleteClick={handleDeleteCard}
                  onOpenInfoPopup={openInfoPopup}
                />
              </Route>
              <ProtectedRoute
                path="/saved-news"
                loggedIn={currentUser.isLoggedIn}
                component={SavedNews}
                onLogout={handleLogout}
                onDeleteClick={handleDeleteCard}
              />
              <Route>
                <Redirect to={{ pathname: "/", state: {noAuthRedirected: true} }} />
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
        <PopupInfo
          isOpen={isInfoPopupOpen}
          onClose={closeInfoPopup}
          options={infoPopupOptions}
        />
      </CommonPageStylesContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
