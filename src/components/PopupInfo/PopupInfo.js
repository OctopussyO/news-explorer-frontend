import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import { OPEN_CLOSE_DELAY } from '../../utils/constants';
import delay from '../../utils/delay';
import joinCN from '../../utils/joinClassNames';
import Button from '../Button/Button';
import Popup from '../Popup/Popup';

const PopupInfo = ({
  isOpen,
  onClose,
  options,
}) => {
  
  const handleBtnClick = async () => {
    if (!!options.onBtnClick) {
      onClose();
      await delay(OPEN_CLOSE_DELAY);
      options.onBtnClick();
    }
  };

  // СТИЛИ
  const { robotoText, interText } = useContext(CommonPageStylesContext);

  const titleClassName = joinCN({ basic: ['popup__info-title', robotoText] });
  const textClassName = joinCN({ basic: ['popup__info-text', robotoText] });
  const linkClassName = joinCN({ basic: ['popup__link-button', interText] });

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <h4 className={titleClassName}>
        {!!options.infoTitle ? options.infoTitle : ''}
      </h4>
      { !!options.infoText && (
          <p className={textClassName}>
            {!!options.infoText ? options.infoText : ''}
          </p>
      )} 
      { !!options.onBtnClick && !! options.linkBtnTitle && (
          <Button outerClassName={linkClassName} onClick={handleBtnClick}>
            {options.linkBtnTitle}
          </Button>
      )}
    </Popup>
  );
};

export default PopupInfo;
