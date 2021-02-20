import { OPEN_CLOSE_DELAY } from '../../utils/constants';
import delay from '../../utils/delay';
import Button from '../Button/Button';
import Popup from '../Popup/Popup';
import '../Typo/Typo.css';

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

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <h4 className="popup__info-title typo typo_font-family_roboto">
        {!!options.infoTitle ? options.infoTitle : ''}
      </h4>
      { !!options.infoText && (
          <p className="popup__info-text typo typo_font-family_roboto">
            {!!options.infoText ? options.infoText : ''}
          </p>
      )} 
      { !!options.onBtnClick && !! options.linkBtnTitle && (
          <Button
            outerClassName="popup__link-button typo typo_font-family_inter"
            onClick={handleBtnClick}
          >
            {options.linkBtnTitle}
          </Button>
      )}
    </Popup>
  );
};

export default PopupInfo;
