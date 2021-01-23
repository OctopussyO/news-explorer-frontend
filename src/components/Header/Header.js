import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinClassNames from '../../utils/joinClassNames';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import './Header.css';

const Header = ({
  isMainPage = false,
  isLoggedIn,
}) => {
  const { pageNarrowClassName } = useContext(CommonPageStylesContext);

  const headerClassName = joinClassNames({
    basicClasses: ['header', pageNarrowClassName],
    conditionClasses: {
      'header_type_main-page': isMainPage,
      'header_type_secondary-page': !isMainPage,
    },
  });
  
  const headerButtonClassName = joinClassNames({
    basicClasses: ['header__button'],
    conditionClasses: {
      'header__button_type_main-page': isMainPage,
      'header__button_type_secondary-page': !isMainPage,
    },
  });

  return (
    <header className={headerClassName}>
      <Logo outerClassName="header__logo" />
      <div className="header__control">
        <Navigation
          isLoggedIn={isLoggedIn}
          outerClassName="header__navigation"
          outerLinkClassName="header__link"
          outerActiveLinkClassName="header__link_active"
        />
        <Button outerClassName={headerButtonClassName}>
          { isLoggedIn
            ? 'Грета'
            : 'Авторизоваться'
          }
        </Button>
      </div>
    </header>
  );
}

export default Header;
