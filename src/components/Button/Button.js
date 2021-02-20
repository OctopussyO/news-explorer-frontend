import joinCN from '../../utils/joinClassNames';
import './Button.css';
import '../Typo/Typo.css';

const Button = ({
  children,
  outerClassName,
  isSubmit = false,
  isActive = true,
  onClick,
  labelText = '',
}) => {
  const className = joinCN({
    basic: ['button', 'typo', 'typo_font-family_roboto', outerClassName],
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
