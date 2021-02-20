import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinCN from '../../utils/joinClassNames';
import authorConfig from '../../configs/author';
import './About.css';
import '../Typo/Typo.css';

const About = () => {
  const { pageNarrowClassName } = useContext(CommonPageStylesContext);
  const sectionClassName = joinCN({ basic: ['about', pageNarrowClassName] });

  const renderInfo = () => {
    return authorConfig.info.map((el, i) => {
      if (el.type === 'text') {
        return (
          <p className='about__paragraph about__text typo typo_font-family_roboto' key={i}>
            { el.text }
          </p>
        );
      } else if (el.type === 'list') {
        return (
          <ul className='about__list about__text typo typo_font-family_roboto' key={i}>
            { el.text.split(';').map((el, i, arr) => (
              <li key={el}>{el}{i !== arr.length - 1 ? ',' : '.'}</li>
            )) }
          </ul>
        );
      } else return null;
    });
  };

  return (
    <section className={sectionClassName}>
      <img className="about__avatar" src={authorConfig.avatar} alt="Фотография автора" />
      <div className="about__description">
        <h3 className="about__title typo typo_font-family_roboto-slab">
          Об авторе
        </h3>
        { renderInfo() }
      </div>
    </section>
  );
};

export default About;
