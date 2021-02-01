import { useCallback, useContext, useEffect, useState } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinCN from '../../utils/joinClassNames';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import LogoutIcon from '../svg/LogoutIcon';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MenuIcon from '../svg/MenuIcon';
import CloseIcon from '../svg/CloseIcon';

const Header = ({
  isMainPage = false,
  onLogoutClick,
  onLoginClick,
}) => {
  const { isLoggedIn } = useContext(CurrentUserContext);

  const [isMenuOpen, setMenuState] = useState(false);

  const handleMenuClick = () => setMenuState(!isMenuOpen);

  const handleLoginClick = () => {
    setMenuState(false);
    onLoginClick();
  };

  const handleLogoutClick = () => {
    setMenuState(false);
    onLogoutClick();
  };

  const reduceHeader = useCallback(() => {
    console.log(window.scrollY)
    if (window.scrollY > 0) {
      setMenuState(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', reduceHeader);
    return () => window.removeEventListener('scroll', reduceHeader);
  }, [reduceHeader]);

  // СТИЛИ
  const { pageNarrowClassName, robotoText } = useContext(CommonPageStylesContext);

  const headerClassName = joinCN({
    basic: ['header', pageNarrowClassName],
    condition: {
      'header_type_main-page': isMainPage,
      'header_type_secondary-page': !isMainPage,
      'header_mobile_extended': isMenuOpen & isMainPage,
    },
  });
  const headerButtonClassName = joinCN({
    basic: ['header__button', robotoText],
    condition: {
      'header__button_type_main-page': isMainPage,
      'header__button_type_secondary-page': !isMainPage,
    },
  });
  const headerControlClassName = joinCN({
    basic: ['header__control'],
    condition: {
      'header__control_type_main-page': isMainPage,
      'header__control_type_secondary-page': !isMainPage,
      'header__control_mobile_opened': isMenuOpen,
      'header__control_mobile_closed': !isMenuOpen,
    },
  });

  return (
    <header className={headerClassName}>
      <Logo outerClassName="header__logo" />
      <Button outerClassName="header__menu-button" onClick={handleMenuClick}>
        { isMenuOpen
          ? <CloseIcon fill={isMainPage ? "#fff" : "#1A1B22"} />
          : <MenuIcon fill={isMainPage ? "#fff" : "#1A1B22"} />
        }
      </Button>
      { isMenuOpen && (
        <div className="overlay" />
      )}
      <div className={headerControlClassName}>
        <Navigation
          outerClassName="header__navigation"
          outerLinkClassName="header__link"
          outerActiveLinkClassName="header__link_active"
        />
        { isLoggedIn
          ? (
            <Button outerClassName={headerButtonClassName} onClick={handleLogoutClick}>
              Грета <LogoutIcon className="header__logout-icon" fill={isMainPage ? "#fff" : "#1A1B22"} />
            </Button>
          ) : (
            <Button outerClassName={headerButtonClassName} onClick={handleLoginClick}>
              Авторизоваться
            </Button>
          )
        }
      </div>
    </header>
  );
};

export default Header;
