import joinCN from '../../utils/joinClassNames';
import Link from '../Link/Link';
import './Logo.css';
import '../Typo/Typo.css';

const Logo = ({
  outerClassName,
}) => {
  const logoClassName = joinCN({
    basic: ['logo', 'typo', 'typo_font-family_roboto-slab', outerClassName],
  });

  return (
    <Link path="/" outerClassName={logoClassName}>NewsExplorer</Link>
  );
};

export default Logo;
