import { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { formatDateToNums, takeWeekAgoDate } from '../../utils/date';
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
      });
  };

  const handleLogout = () => {
    setCurrentUser({
      isLoggedIn: false,
      name: '',
    });
    localStorage.removeItem('token');
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

  // При загрузке страницы сразу проверяем, авторизован ли пользователь
  useEffect(() => {
    tokenCheck();
  }, [currentUser.isLoggedIn]);

  const today = new Date();
  const dateNow = formatDateToNums(today);
  const dateWeekAgo = formatDateToNums(takeWeekAgoDate(today));

  const handleSearch = (keyword) => {
    return newsApi.getData({keyword: keyword, from:dateWeekAgo, to:dateNow});
  }

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
