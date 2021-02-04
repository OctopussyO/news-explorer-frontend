import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinCN from '../../utils/joinClassNames';
import './Button.css';

const Button = ({
  children,
  outerClassName,
  isSubmit = false,
  isActive = true,
  onClick,
  labelText = '',
}) => {
  const { robotoText } = useContext(CommonPageStylesContext);
  const className = joinCN({
    basic: ['button', robotoText, outerClassName],
    condition: {
      'button_type_submit': isSubmit,
      'button_active': isSubmit & isActive,
      'button_inactive': isSubmit & !isActive,
    },
  });
  const type = isSubmit ? 'submit' : 'button';

  return (
    <button
      type={type}
      className={className}
      disabled={!isActive}
      onClick={onClick}
      aria-label={labelText}
    >
      {children}
    </button>
  );
};

export default Button;
