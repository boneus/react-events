# Пример ReactJS приложения

## Стек

В проекте 4 ветки:

* `master`: React 17, PropTypes 15, Redux 4.1 + Redux Thunk 2.4, React Router 6, Ant Design 4.17.
* `rtk`: React 17, PropTypes 15, Redux Toolkit 1.6, React Router 6, Ant Design 4.17.
* `typescript`: React 17, TypeScript 4.4, Redux 4.1 + Redux Thunk 2.4, React Router 6, Ant Design 4.17.
* `rtk-typescript`: React 17, TypeScript 4.4, Redux Toolkit 1.6, React Router 6, Ant Design 4.17.

## Ключевые моменты

* Инициализация приложения сделана при помощи [ViteJS](https://vitejs.dev/) и плагина [@vitejs/plugin-react](https://github.com/vitejs/vite/tree/main/packages/plugin-react).
* Добавил возможность запустить в Docker-контейнере с помощью Docker Compose.
    * Dev-режим: `npm run docker:dev`
    * Prod-режим: `npm run docker:start`
* Использую алиасы `@pages`, `@components`, `@router`, `@store` и т.д., чтобы не было ада из относительных путей.
* В качестве сервера с базой данных использую файл `users.json` в папке public. Добавленные мероприятия храню в **localStorage**.
* В роутере использую **React Router 6**, **layouts**, **lazy подгрузку страниц** (что приводит к **code splitting**'у) и **React.Suspense** для индикатора загрузки.
* **Подключил Redux DevTools**.
* Redux store организовал по паттерну [**ducks**](https://redux.js.org/style-guide/style-guide#structure-files-as-feature-folders-with-single-file-logic). **Один модуль - один файл**, включающий в себя все action types, action creators, reducers, middlewares, thunks, selectors и hooks, которые относятся к этому модулю.
* В Redux модулях используется `bindActionCreators`, чтобы в компонентах можно было вызывать экшены напрямую, не используя `dispatch`.
* В модуле UI оповещения показываю при помощи **middleware**, которая реагирует на типы экшенов, в которых есть строка `setError` или `setNotification`.

## Описание

Для логина используются **3 пользователя: `admin`, `user`, `timur`**. У всех пользователей **пароль один и тот же - `123`**.

После логина откроется страница с календарем. В нем **отображаются мероприятия, которые были добавлены текущим пользователем или на которые он был приглашен**. Кликнув на дату можно добавить мероприятие для любого пользователя в системе:

* `Event description` задает название мероприятия
* `Event date` задает дату мероприятия
* `Guest` задает пользователя, приглашенного на мероприятие
