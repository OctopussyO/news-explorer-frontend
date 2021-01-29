import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import delay from '../../utils/delay';
import joinCN from '../../utils/joinClassNames';
import Button from '../Button/Button';
import Popup from '../Popup/Popup';

const PopupInfo = ({
  isOpen,
  onClose,
  infoText,
  linkBtnTitle,
  onBtnClick,
}) => {
  
  const handleBtnClick = async () => {
    onClose();
    await delay(500);
    onBtnClick();
  };

  // СТИЛИ
  const { robotoText, interText } = useContext(CommonPageStylesContext);

  const textClassName = joinCN({ basic: ['popup__info-text', robotoText] });
  const linkClassName = joinCN({ basic: ['popup__link-button', interText] });

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <p className={textClassName}>
        {infoText}
      </p>
      <Button outerClassName={linkClassName} onClick={handleBtnClick}>
        {linkBtnTitle}
      </Button>
    </Popup>
  )
};

export default PopupInfo;
