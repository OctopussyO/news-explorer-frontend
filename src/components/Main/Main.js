import Header from '../Header/Header';
import './Main.css';

const Main = ({
  isLoggedIn,
}) => {
  return (
    <>
      <section className="cover">
        <Header isMainPage={true} isLoggedIn={isLoggedIn} />
      </section>

    </>
  );
}

export default Main;
