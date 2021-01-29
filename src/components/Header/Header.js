import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinCN from '../../utils/joinClassNames';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import LogoutIcon from '../svg/LogoutIcon';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Header = ({
  isMainPage = false,
  onLogoutClick,
  onLoginClick,
}) => {
  const { isLoggedIn } = useContext(CurrentUserContext);

  // СТИЛИ
  const { pageNarrowClassName, robotoText } = useContext(CommonPageStylesContext);

  const headerClassName = joinCN({
    basic: ['header', pageNarrowClassName],
    condition: {
      'header_type_main-page': isMainPage,
      'header_type_secondary-page': !isMainPage,
    },
  });
  const headerButtonClassName = joinCN({
    basic: ['header__button', robotoText],
    condition: {
      'header__button_type_main-page': isMainPage,
      'header__button_type_secondary-page': !isMainPage,
    },
  });

  return (
    <header className={headerClassName}>
      <Logo outerClassName="header__logo" />
      <div className="header__control">
        <Navigation
          outerClassName="header__navigation"
          outerLinkClassName="header__link"
          outerActiveLinkClassName="header__link_active"
        />
        { isLoggedIn
          ? (
            <Button outerClassName={headerButtonClassName} onClick={onLogoutClick}>
              Грета <LogoutIcon className="header__logout-icon" fill={isMainPage ? "#fff" : "#1A1B22"} />
            </Button>
          ) : (
            <Button outerClassName={headerButtonClassName} onClick={onLoginClick}>
              Авторизоваться
            </Button>
          )
        }
      </div>
    </header>
  );
}

export default Header;
