import avatarLink from '../images/avatar.jpg'; 

const author = {
  avatar: avatarLink,
  info: [
    {
      type: 'text',
      text: 'Привет! Меня зовут Юля, я начинающий фронтенд-разработчик.',
    },
    {
      type: 'text',
      text: 'Этот сайт является моим выпускным проектом по курсу "Веб-разработка" в Яндекс.Практикуме.',
    },
    {
      type: 'text',
      text: 'В процессе обучения я освоила следующие технологии:',
    },
    {
      type: 'list',
      text: 'HTML5, CSS3, JavaScript; фреймворк React.js; фреймворк Express.js; система контроля версий Git; Webpack; методология БЭМ; адаптивная кроссбраузерная вёрстка',
    },
    {
      type: 'text',
      text: 'Также параллельно я немного познакомилась с фреймфорками Vue.js и Nuxt.js, CSS-фреймворком VueTailwind, препроцессором SCSS, Nginx и Netlify.',
    },
  ],
};

export default author;
