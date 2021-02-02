import joinCN from '../../utils/joinClassNames';
import './Preloader.css';

const Preloader = ({
  outerClassName = '',
}) => {
  const preloadeClassName = joinCN({ basic: ['circle-preloader', outerClassName] });
  return (
    <i className={preloadeClassName} />
  );
};

export default Preloader;
