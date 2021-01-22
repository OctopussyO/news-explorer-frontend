import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import './App.css';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(true);

  const commonPageStyles = {
    pageNarrowClassName: 'page__narrow',
    pageListClassName: 'page__list',
    robotoText: 'roboto-text',
    robotoSlabText: 'roboto-slab-text',
    interText: 'inter-text',
    sourceSansText: 'source-sans-text',
  };
  
  return (
    <CommonPageStylesContext.Provider value={commonPageStyles}>
      <div className="page">
        <div className="page__content">
          <Switch>
            <Route exact path="/">
              <Main isLoggedIn={isLoggedIn} />
            </Route>
            <Route path="/saved-news">
              <SavedNews isLoggedIn={isLoggedIn} />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </CommonPageStylesContext.Provider>
  );
}

export default App;
