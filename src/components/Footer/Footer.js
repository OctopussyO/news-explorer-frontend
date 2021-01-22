import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinClassNames from '../../utils/joinClassNames';
import Link from '../Link/Link';
import './Footer.css';

const Footer = () => {

  const {
    pageNarrowClassName,
    robotoText,
    pageListClassName,
  } = useContext(CommonPageStylesContext);

  const footerClassName = joinClassNames({ basicClasses: ['footer', pageNarrowClassName] });
  const footerCopyrightClassName = joinClassNames({ basicClasses: ['footer__copyright', robotoText] });
  const footerLinksListClassName = joinClassNames({ basicClasses: ['footer__list', pageListClassName] });
  const footerLinkClassName = joinClassNames({ basicClasses: ['footer__link', robotoText] });
  
  return (
    <footer className={footerClassName}>
      <p className={footerCopyrightClassName}>
        &copy; 2020 Supersite, Powered by News API
      </p>
      <div className="footer__links">
        <ul className={footerLinksListClassName}>
          <li className="footer__list-item">
            <Link to="/" outerClassName={footerLinkClassName}>
              Главная
            </Link>
          </li>
          <li className="footer__list-item">
            <Link isOuter={true} path="https://praktikum.yandex.ru/" outerClassName={footerLinkClassName}>
              Яндекс.Практикум
            </Link>
          </li>
        </ul>
        <ul className={footerLinksListClassName}>
          <li className="footer__list-item">
            <Link isOuter={true} path="" outerClassName={footerLinkClassName}>
              П
            </Link>
          </li>
          <li className="footer__list-item">
            <Link isOuter={true} path="" outerClassName={footerLinkClassName}>
              П
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
