import { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { DEFAULT_IMAGE_URL, ALT_DEFAULT_IMAGE_URL } from '../../utils/constants';
import { formatDateToNums, takeWeekAgoDate } from '../../utils/date';
import mainApi from '../../utils/mainApi';
import newsApi from '../../utils/newsApi';
import { urlRegex } from '../../utils/regex';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
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

  const [isRateLimited, setRateState] = useState(false);

  // Новости
  const [foundNews, setFoundNews] = useState([]);
  const [keyword, setKeyword] =useState('');

  const [isLoading, setLoadingState] = useState(true);
  
  const today = new Date();
  const dateNow = formatDateToNums(today);
  const dateWeekAgo = formatDateToNums(takeWeekAgoDate(today));

  const clearLastSearch = () => {
    localStorage.removeItem('lastKeyword');
  };

  const handleRegister = (data) => {
    return mainApi.register(data)
  };

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

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    setToken(token);
    // TODO -- Запустить прелоадер
    setRateState(false);
    if (token) {
      Promise.all([mainApi.getOwnerInfo(token), mainApi.getOwnerData(token)])
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
          if (err.name === 'TypeError') {
            // TODO -- сделать заглушку на этот случай и увеличить количество запросов на бэке
            // setRateState(true);
            console.log('Превышен лимит');
          }
          setCurrentUser({
            isLoggedIn: false,
            name: '',
            savedNews: [],
          });
          console.log(err);
        })
        .finally(() => {
          // TODO -- Остановить прелоадер
        });
    } else {
      setCurrentUser({
        isLoggedIn: false,
        name: '',
        savedNews: [],
      });
    }
  };

  // При загрузке страницы проверяем, авторизован ли пользователь
  useEffect(() => {
    tokenCheck();
    const lastKeyword = localStorage.getItem('lastKeyword');
    if (lastKeyword) handleSearch(lastKeyword);

  }, [currentUser.isLoggedIn]);
  
  // При загрузке страницы достаём из localStorage данные
  useEffect(() => {
  }, [currentUser.isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('lastKeyword', keyword);
  }, [keyword, foundNews]);

  const handleSearch = (keyword) => {
    setKeyword(keyword);
    setLoadingState(true);
    newsApi.getData({keyword: keyword, from:dateWeekAgo, to:dateNow})
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
    })
    .catch((err) => {
      console.error(err);
      setFoundNews(null);
      clearLastSearch();
    })
    .finally(() => setLoadingState(false));
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
        // TODO -- дорисовать попап с ошибкой
        console.error(err)
      });
  };

  const handleSaveCard = (data) => {
    mainApi.saveItem(token, {...data, keyword})
      .then(async () => {
        // TODO -- дорисовать прелоадер какой-нибудь
        updateSavedCards();
      })
      .catch((err) => console.log(err));
  };

  // Функция для удаления карточки, принимает ассинхронных коллбэк для эффекта при удалении
  const handleDeleteCard = (id, callback) => {
    mainApi.deleteItem(token, id)
      .then(async() => {
        if (callback) {
          await callback();
        }
        updateSavedCards();
      })
      .catch((err) => console.log(err));
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
                />
              </Route>
              <ProtectedRoute
                path="/saved-news"
                loggedIn={currentUser.isLoggedIn}
                component={SavedNews}
                // cards={savedNews}
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
      </CommonPageStylesContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
