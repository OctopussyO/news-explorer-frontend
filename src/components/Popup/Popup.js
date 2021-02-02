import { useEffect } from 'react';
import joinCN from '../../utils/joinClassNames';
import Button from '../Button/Button';
import CloseIcon from '../svg/CloseIcon';
import './Popup.css';

const Popup = ({
  children,
  isOpen,
  onClose,
}) => {
  const handleOverlayClick = (e) => {
    if (!e.target.closest('.popup__content')) {
      onClose();
    } 
  };

  const handleEscClick = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', handleEscClick);
    return () => {
      document.body.removeEventListener('keydown', handleEscClick);
    }
  }, []);

  // СТИЛИ
  const popupClassName = joinCN({
    basic: ['popup'],
    condition: {
      'popup_visible': isOpen,
      'popup_hidden': !isOpen,
    },
  });

  return (
    <div className={popupClassName} onMouseDown={handleOverlayClick}>
      <div className="popup__content">
        <Button outerClassName="popup__close-btn" onClick={onClose} labelText="Закрыть">
          <CloseIcon className="popup__close-icon" />
        </Button>
        {children}
      </div>
    </div>
  )
};

export default Popup;
