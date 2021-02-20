import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import FBIcon from '../svg/FBIcon';
import GHIcon from '../svg/GHIcon';
import joinCN from '../../utils/joinClassNames';
import Link from '../Link/Link';
import './Footer.css';
import '../Typo/Typo.css';

const Footer = () => {
  const {
    pageNarrowClassName,
    pageListClassName,
  } = useContext(CommonPageStylesContext);

  const footerClassName = joinCN({ basic: ['footer', pageNarrowClassName] });
  const footerLinksListClassName = joinCN({
    basic: ['footer__list', 'footer__list_content_text', pageListClassName],
  });
  const footerIconsListClassName = joinCN({
    basic: ['footer__list', 'footer__list_content_icon', pageListClassName],
  });
  const footerLinkClassName = joinCN({ basic: ['footer__link', 'typo', 'typo_font-family_roboto'] });
  
  return (
    <footer className={footerClassName}>
      <p className="footer__copyright typo typo_font-family_roboto">
        &copy; 2020 Supersite, Powered by News API
      </p>
      <div className="footer__links">
        <ul className={footerLinksListClassName}>
          <li className="footer__list-item">
            <Link path="/" outerClassName={footerLinkClassName}>
              Главная
            </Link>
          </li>
          <li className="footer__list-item">
            <Link isOuter={true} path="https://praktikum.yandex.ru/" outerClassName={footerLinkClassName}>
              Яндекс.Практикум
            </Link>
          </li>
        </ul>
        <ul className={footerIconsListClassName}>
          <li className="footer__icon-list-item">
            <Link
              isOuter={true}
              path="https://github.com/OctopussyO"
              outerClassName={footerLinkClassName}
              labelText="Гитхаб"
            >
              <GHIcon pathClassName="footer__icon" />
            </Link>
          </li>
          <li className="footer__icon-list-item">
            <Link
              isOuter={true}
              path="https://www.facebook.com/vosmikiska"
              outerClassName={footerLinkClassName}
              labelText="Фейсбук"
            >
              <FBIcon pathClassName="footer__icon" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
