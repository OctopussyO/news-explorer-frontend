import { useContext } from "react";
import { CommonPageStylesContext } from "../../contexts/CommonPageStylesContext";
import joinClassNames from "../../utils/joinClassNames";
import Link from "../Link/Link";
import './Navigation.css';

const Navigation = ({
  isLoggedIn,
  outerClassName,
  outerLinkClassName,
  outerActiveLinkClassName,
}) => {
  const {
    robotoText,
    pageListClassName,
  } = useContext(CommonPageStylesContext);

  const navClassName = joinClassNames({ basicClasses: ['navigation', outerClassName] });
  const navLinkClassName = joinClassNames({ basicClasses: ['navigation__link', outerLinkClassName, robotoText] });
  const navLinkActiveClassName = joinClassNames({
    basicClasses: ['navigation__link_active', outerActiveLinkClassName],
  });
  const navListClassName = joinClassNames({ basicClasses: ['navigation__list', pageListClassName] });

  return (
    <nav className={navClassName}>
      <ul className={navListClassName}>
        <li className="navigation__list-item">
          <Link
            exact={true}
            path="/"
            isNav={true}
            outerClassName={navLinkClassName}
            activeClassName={navLinkActiveClassName}
          >
            Главная
          </Link>
        </li>
        { isLoggedIn && (
          <li className="navigation__list-item">
            <Link
              path="/saved-news"
              isNav={true}
              outerClassName={navLinkClassName}
              activeClassName={navLinkActiveClassName}
            >
              Сохранённые статьи
            </Link>
          </li>
        ) }
      </ul>
    </nav>
  );
}

export default Navigation;
