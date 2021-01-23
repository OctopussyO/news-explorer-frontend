import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';

const SavedNews = ({
  isLoggedIn,
}) => {
  return (
    <div className="saved">
      <Header isMainPage={false} isLoggedIn={isLoggedIn} />
      <SavedNewsHeader />
    </div>
  );
}

export default SavedNews;
