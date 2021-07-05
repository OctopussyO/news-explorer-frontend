# News-explorer

<img align="right" width="400px" src="https://raw.githubusercontent.com/OctopussyO/news-explorer-frontend/master/public/preview.png" alt="Иллюстрация к проекту">

Сервис, в котором можно найти новости по запросу и сохранить в личном кабинете.

Ознакомиться с приложением можно по [ссылке](https://wow-news.nomoredomains.club/).
Бэкенд приложения расположен в [этом](https://github.com/OctopussyO/news-explorer-api) репозитории.

### Функциональность

Пользователь вводит в строку поиска ключевые слова и нажимает кнопку «Искать». После этого приложение выполняет  запрос к сервису NewsAPI, найти все подходящие материалы за последнюю неделю и отобразить карточки с ними. Когда пользователь сохраняет понравившиеся новости, они отображаются в специальном разделе на сайте.

Сайт состоит из двух страниц:
- Главная. Содержит только окно поиска.
- Страница с сохранёнными новостями. На ней отображаются материалы, которые пользователь добавил в избранное.

Кроме них на сайте есть всплывающие окна с формой регистрации (чтобы пользователь мог сохранить новости в личном кабинете) и с формой входа.

### Используемый стек

[![JavaScript](https://img.shields.io/badge/-JavaScript-464646??style=flat-square&logo=javascript)](https://www.javascript.com/)
[![React.js](https://img.shields.io/badge/-React.js-464646??style=flat-square&logo=react.js)](https://ru.reactjs.org/)
[![CSS](https://img.shields.io/badge/-CSS-464646??style=flat-square&logo=css3)](https://www.w3.org/Style/CSS/specs.ru.html)
[![HTML](https://img.shields.io/badge/-HTML-464646??style=flat-square&logo=HTML5)](https://www.w3.org/TR/html52/introduction.html#introduction)
[![Nginx](https://img.shields.io/badge/-Nginx-464646??style=flat-square&logo=nginx)](https://https://www.netlify.com/)

### Инструкция по разрёртыванию проекта:
```bash
# клонирование репозитория
$ git clone https://github.com/OctopussyO/news-explorer-frontend.git

# установка зависимостей
$ npm install

# запуск приложения в режиме разработчика
$ npm run start

# сборка проекта
$ npm run build

# сборка и деплой проекта на сервер
$ npm run deploy
```

