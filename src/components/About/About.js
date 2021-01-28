import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinCN from '../../utils/joinClassNames';
import authorConfig from '../../configs/author';
import './About.css';

const About = () => {
  const { pageNarrowClassName, robotoSlabText, robotoText } = useContext(CommonPageStylesContext);
  const sectionClassName = joinCN({ basic: ['about', pageNarrowClassName] });
  const titleClassName = joinCN({ basic: ['about__title', robotoSlabText] });
  const paragraphClassName = joinCN({ basic: ['about__paragraph', robotoText] });

  return (
    <section className={sectionClassName}>
      <img className="about__avatar" src={authorConfig.avatar} alt="Фотография автора" />
      <div className="about__description">
        <h3 className={titleClassName}>
          Об авторе
        </h3>
        { authorConfig.info.map((el, i) => (
          <p className={paragraphClassName} key={i}>
            { el }
          </p>
        )) }
      </div>
    </section>
  );
}

export default About;
