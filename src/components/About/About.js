import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinCN from '../../utils/joinClassNames';
import authorConfig from '../../configs/author';
import './About.css';
import '../Typo/Typo.css';

const About = () => {
  const { pageNarrowClassName } = useContext(CommonPageStylesContext);
  const sectionClassName = joinCN({ basic: ['about', pageNarrowClassName] });

  return (
    <section className={sectionClassName}>
      <img className="about__avatar" src={authorConfig.avatar} alt="Фотография автора" />
      <div className="about__description">
        <h3 className="about__title typo typo_font-family_roboto-slab">
          Об авторе
        </h3>
        { authorConfig.info.map((el, i) => (
          <p className="about__paragraph typo typo_font-family_roboto" key={i}>
            { el }
          </p>
        )) }
      </div>
    </section>
  );
};

export default About;
