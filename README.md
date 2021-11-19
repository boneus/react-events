README на русском: https://github.com/boneus/react-events/blob/main/README-RU.md

# ReactJS app example

## Stack

There are four branches in the project:

* `main`: React 17, PropTypes 15, Redux 4.1 + Redux Thunk 2.4, React Router 6, Ant Design 4.17.
* `rtk`: React 17, PropTypes 15, Redux Toolkit 1.6, React Router 6, Ant Design 4.17.
* `typescript`: React 17, TypeScript 4.4, Redux 4.1 + Redux Thunk 2.4, React Router 6, Ant Design 4.17.
* `rtk-typescript`: React 17, TypeScript 4.4, Redux Toolkit 1.6, React Router 6, Ant Design 4.17.

## Key moments

* App was initialised using [ViteJS](https://vitejs.dev/) and [@vitejs/plugin-react](https://github.com/vitejs/vite/tree/main/packages/plugin-react) plugin.
* I added ability to run the app inside a Docker container using Docker Compose:
    * Development mode: `npm run docker:dev`
    * Production mode: `npm run docker:start`
* I use path aliases `@pages`, `@components`, `@router`, `@store` and so on, to avoid the relative paths' hell.
* I'm using the [**json-server**](https://github.com/typicode/json-server) as an API server.
* In my router I'm using the **React Router 6**, **layouts**, **module lazy loading** (which leads to the **code splitting**), and **React.Suspense** to show a loading indicator.
* **The Redux DevTools are connected**.
* The Redux store is organized according to the [**ducks**](https://redux.js.org/style-guide/style-guide#structure-files-as-feature-folders-with-single-file-logic) pattern. **One module - one file** that includes all the action types and creators, reducers, middlewares, thunks, selectors, and hooks related to the module.
* The Redux modules use the `bindActionCreators` to call actions without the `dispatch`.
* The UI Redux module shows notifications using a middleware, that reacts to the action types with `setError` or `setNotifications` strings in it.

## Description

There are **three users in the system: `admin`, `user`, `timur`**. All of them has **the same password - `123`**.

After logging in, the events page with the calendar will be opened. The calendar **shows the events that were added by the current user, or events to which the current user is invited**. You can add a new event by clicking on the date in the calendar:

* `Event description` sets a name of the event
* `Event date` sets a date of the event
* `Guest` sets a user invited to the event
