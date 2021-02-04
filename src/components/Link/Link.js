import { Link as InnerLink, NavLink } from 'react-router-dom';
import joinCN from '../../utils/joinClassNames';
import './Link.css';

const Link = ({
  children,
  outerClassName,
  activeClassName,
  isOuter = false,
  isNav = false,
  exact = false,
  path,
  labelText = '',
}) => {
  const className = joinCN({ basic: ['link', outerClassName] });

  return (
    <>
      { isOuter ? (
        <a href={path} className={className} target="_blank" rel="noreferrer" aria-label={labelText}>
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
