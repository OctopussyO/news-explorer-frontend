import { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { formatDateToNums, takeWeekAgoDate } from '../../utils/date';
import delay from '../../utils/delay';
import mainApi from '../../utils/mainApi';
import newsApi from '../../utils/newsApi';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedNews from '../SavedNews/SavedNews';
import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: null,
    name: '',
  });

  const clearLastSearch = () => {
    localStorage.removeItem('lastKeyword');
    localStorage.removeItem('lastFoundNews');
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
        // TODO -- уточнить, точно ли надо очищать поля в этом случае
        // clearLastSearch();
      });
  };

  const handleLogout = () => {
    setCurrentUser({
      isLoggedIn: false,
      name: '',
    });
    localStorage.removeItem('token');
    clearLastSearch();
  };

  const tokenCheck = () => {
    const token = localStorage.getItem('token');

    if (token) {
      mainApi.getOwnerInfo(token)
        .then((data) => {
          setCurrentUser({
            isLoggedIn: true,
            name: data.name,
          });
        })
        .catch((err) => {
          // Здесь ошибку пользователю не выводим, потому что в редких случаях она ему что-то даст.
          // Тот, кому это необходимо, найдёт её в консоли.
          // Вывод ошибки здесь выглядит странно, потому что пользователь даже не поймёт, в чём дело
          // -- зашёл на сайт, ещё ничего не сделал, а уже ошибка.
          console.error(err);
        });
    } else {
      setCurrentUser({
        isLoggedIn: false,
        name: '',
      });
    }
  };

  // При загрузке страницы проверяем, авторизован ли пользователь
  useEffect(() => {
    tokenCheck();
  }, [currentUser.isLoggedIn]);

  // Новости
  const [foundNews, setFoundNews] = useState([]);
  const [keyword, setKeyword] =useState('');
  
  // При загрузке страницы достаём из localStorage данные
  useEffect(() => {
    const lastKeyword = localStorage.getItem('lastKeyword');
    const lastFoundNews = localStorage.getItem('lastFoundNews');
    if (!!lastKeyword & !!lastFoundNews) {
      const emitLoading = async () => {
        await delay(500);
        setLoadingState(false);
      }

      setKeyword(lastKeyword);
      setFoundNews(JSON.parse(lastFoundNews));
      emitLoading();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lastKeyword', keyword);
    localStorage.setItem('lastFoundNews', JSON.stringify(foundNews));
  }, [keyword, foundNews]);
  
  // Поиск новостей
  const [isLoading, setLoadingState] = useState(true);
  
  const today = new Date();
  const dateNow = formatDateToNums(today);
  const dateWeekAgo = formatDateToNums(takeWeekAgoDate(today));

  const handleSearch = (keyword) => {
    setKeyword(keyword);
    setLoadingState(true);
    newsApi.getData({keyword: keyword, from:dateWeekAgo, to:dateNow})
    .then((data) => {
      const foundArticles = data.articles;
      if (foundArticles) {
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
      } else {
        setFoundNews([]);
        clearLastSearch();
      }
    })
    .catch((err) => {
      console.error(err);
      setFoundNews(null);
      clearLastSearch();
    })
    .finally(() => setLoadingState(false));
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
                />
              </Route>
              <ProtectedRoute
                path="/saved-news"
                loggedIn={currentUser.isLoggedIn}
                component={SavedNews}
                onLogout={handleLogout}
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
