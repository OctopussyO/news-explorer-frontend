import { useContext } from "react";
import { CommonPageStylesContext } from "../../contexts/CommonPageStylesContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import joinCN from "../../utils/joinClassNames";
import Link from "../Link/Link";
import './Navigation.css';
import '../Typo/Typo.css';

const Navigation = ({
  outerClassName,
  outerLinkClassName,
  outerActiveLinkClassName,
}) => {
  const { isLoggedIn } = useContext(CurrentUserContext);
  const { pageListClassName } = useContext(CommonPageStylesContext);

  const navClassName = joinCN({ basic: ['navigation', outerClassName] });
  const navLinkClassName = joinCN({
    basic: ['navigation__link', outerLinkClassName, 'typo', 'typo_font-family_roboto'],
  });
  const navLinkActiveClassName = joinCN({
    basic: ['navigation__link_active', outerActiveLinkClassName],
  });
  const navListClassName = joinCN({ basic: ['navigation__list', pageListClassName] });

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
