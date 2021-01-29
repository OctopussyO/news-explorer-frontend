import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: false,
    name: 'Грета',
  });

  const handleLogin = () => {
    setCurrentUser({ ...currentUser, isLoggedIn: true });
    console.log('hi')
  };

  const handleLogout = () => {
    setCurrentUser({ ...currentUser, isLoggedIn: false });
  };

  const commonPageStyles = {
    pageNarrowClassName: 'page__narrow',
    pageListClassName: 'page__list',
    robotoText: 'roboto-text',
    robotoSlabText: 'roboto-slab-text',
    interText: 'inter-text',
    sourceSansText: 'source-sans-text',
  };
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CommonPageStylesContext.Provider value={commonPageStyles}>
        <div className="page">
          <div className="page__content">
            <Switch>
              <Route exact path="/">
                <Main onLogin={handleLogin} onLogout={handleLogout} />
              </Route>
              <Route path="/saved-news">
                <SavedNews onLogout={handleLogout} />
              </Route>
              <Route>
                <Redirect to="/" />
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </CommonPageStylesContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
