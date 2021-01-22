import { Link as InnerLink, NavLink } from 'react-router-dom';
import joinClassNames from '../../utils/joinClassNames';
import './Link.css';

const Link = ({
  children,
  outerClassName,
  activeClassName,
  isOuter = false,
  isNav = false,
  exact = false,
  path,
}) => {
  const className = joinClassNames({ basicClasses: ['link', outerClassName] });

  return (
    <>
      { isOuter ? (
        <a href={path} className={className} target="_blank" rel="noreferrer">
          {children}
        </a>
        ) : isNav ? (
          <NavLink exact={exact} to={path} className={className} activeClassName={activeClassName}>
            {children}
          </NavLink>
        ) : (
          <InnerLink to={path} className={className}>
            {children}
          </InnerLink>
        )
      }
    </>
  );
};

export default Link;
