import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinClassNames from '../../utils/joinClassNames';
import Link from '../Link/Link';
import './Logo.css';

const Logo = ({
  outerClassName,
}) => {
  const { robotoSlabText } = useContext(CommonPageStylesContext);
  const logoClassName = joinClassNames({ basicClasses: ['logo', robotoSlabText, outerClassName] });

  return (
    <Link path="/" outerClassName={logoClassName}>NewsExplorer</Link>
  );
};

export default Logo;
