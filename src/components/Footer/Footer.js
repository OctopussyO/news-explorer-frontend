import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinCN from '../../utils/joinClassNames';
import Link from '../Link/Link';
import './Footer.css';

const Footer = () => {

  const {
    pageNarrowClassName,
    robotoText,
    pageListClassName,
  } = useContext(CommonPageStylesContext);

  const footerClassName = joinCN({ basic: ['footer', pageNarrowClassName] });
  const footerCopyrightClassName = joinCN({ basic: ['footer__copyright', robotoText] });
  const footerLinksListClassName = joinCN({ basic: ['footer__list', pageListClassName] });
  const footerLinkClassName = joinCN({ basic: ['footer__link', robotoText] });
  
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
