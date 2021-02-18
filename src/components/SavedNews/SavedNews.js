import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

const SavedNews = ({
  onLogout,
  onDeleteClick,
}) => {
  const { savedNews } = useContext(CurrentUserContext);

  return (
    <>
      <Header isMainPage={false} onLogoutClick={onLogout} />
      <SavedNewsHeader />
      <NewsCardList
        cards={savedNews}
        isOwn={true}
        onDeleteClick={onDeleteClick}
      />
    </>
  );
};

export default SavedNews;
