# News-explorer

<img align="right" width="400px" src="https://downloader.disk.yandex.ru/preview/b681ce4148acf6c95f23909c48df2abd8908ef1ddad65c98eaec09e3128d7891/60314de8/46A899kYy3PWf3pkISNWvANgfgLjAcOFiY-aXf3k4YOuc7A4Etf4Pfp10PycasIxsa5epKcogKmStKMaxtGsdQ%3D%3D?uid=0&filename=news-explorer.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1920x913" alt="Иллюстрация к проекту">

Сервис, в котором можно найти новости по запросу и сохранить в личном кабинете.

Ознакомиться с приложением можно по [ссылке](https://wow-news.students.nomoredomains.icu/).
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
```
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

