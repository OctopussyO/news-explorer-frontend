import Header from '../Header/Header';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

const SavedNews = ({
  cards,
  onLogout,
  onDeleteClick,
}) => {
  return (
    <>
      <Header isMainPage={false} onLogoutClick={onLogout} />
      <SavedNewsHeader />
      <NewsCardList
        cards={cards}
        isOwn={true}
        onDeleteClick={onDeleteClick}
      />
    </>
  );
};

export default SavedNews;
