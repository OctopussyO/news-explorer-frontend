import Header from '../Header/Header';
import './SavedNews.css';

const SavedNews = ({
  isLoggedIn,
}) => {
  return (
    <div className="saved">
      <Header isMainPage={false} isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default SavedNews;
