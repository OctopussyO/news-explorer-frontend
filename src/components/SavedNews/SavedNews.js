import Header from '../Header/Header';
import NewsCardList from '../NewsCardList/NewsCardList';
import { savedCards } from '../../utils/testCards';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';

const SavedNews = ({
  onLogout,
}) => {
  return (
    <>
      <Header isMainPage={false} onLogoutClick={onLogout} />
      <SavedNewsHeader />
      <NewsCardList cards={savedCards} isOwn={true} />
    </>
  );
}

export default SavedNews;
