import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinCN from '../../utils/joinClassNames';
import Link from '../Link/Link';
import './Logo.css';

const Logo = ({
  outerClassName,
}) => {
  const { robotoSlabText } = useContext(CommonPageStylesContext);
  const logoClassName = joinCN({ basic: ['logo', robotoSlabText, outerClassName] });

  return (
    <Link path="/" outerClassName={logoClassName}>NewsExplorer</Link>
  );
};

export default Logo;
