import Header from '../Header/Header';
import NewsCardList from '../NewsCardList/NewsCardList';
import { savedCards } from '../../utils/testCards';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';

const SavedNews = ({
  isLoggedIn,
}) => {
  return (
    <div className="saved">
      <Header isMainPage={false} isLoggedIn={isLoggedIn} />
      <SavedNewsHeader />
      <NewsCardList cards={savedCards} isOwn={true} />
    </div>
  );
}

export default SavedNews;
