# ToDo List.
## О проекте.
Данный проект представляет собой приложение списка дел (ToDo List) с серверной и клиентской частями.

* [Клиентская часть](https://github.com/vasilii-kovalev/ITMO_practice_3/tree/master);
* [Серверная часть](https://github.com/vasilii-kovalev/ITMO_practice_3/tree/dist).

## Технологии.
На клиентской стороне используются такие технологии и библиотеки, как:
* React;
* React-Router;
* Material UI;
* Lodash;
* Babel;
* Webpack;
* Jest;
* Enzyme;
* ESLint;
* Stylelint.

На серверной стороне используются такие технологии и библиотеки, как:
* Node.js;
* Express;
* EJS;
* MongoDB;
* dayjs.

Сам сайт размещён [здесь](https://vasilii-kovalev-todo-list.herokuapp.com/).
<br />
База данных — MongoDB — размещается [на DBaaS mLab](https://mlab.com/).

## Доступные маршруты сайта:
* [/tasks/all](https://vasilii-kovalev-todo-list.herokuapp.com/tasks/all) — список всех дел.
* [/tasks/in_progress](https://vasilii-kovalev-todo-list.herokuapp.com/tasks/in_progress) — список незавершённых дел.
* [/tasks/completed](https://vasilii-kovalev-todo-list.herokuapp.com/tasks/completed) — список завершённых дел.
* [/{any-other-URL}](https://vasilii-kovalev-todo-list.herokuapp.com/any-other-URL) — страница ошибки 404.

## Описание публичного API:
* [/api/tasks/all](https://vasilii-kovalev-todo-list.herokuapp.com/api/tasks/all) (`GET`) — возвращает список всех дел;
* [/api/tasks/in_progress](https://vasilii-kovalev-todo-list.herokuapp.com/api/tasks/in_progress) (`GET`) — возвращает список незавершённых дел;
* [/api/tasks/completed](https://vasilii-kovalev-todo-list.herokuapp.com/api/tasks/completed) (`GET`) — возвращает список завершённых дел;
* [/api/tasks/add](https://vasilii-kovalev-todo-list.herokuapp.com/api/tasks/add) (`POST`) — добавляет дело в список дел.
<br />
__Пример запроса__:
```JSON
{
    "text": "New task"
}
```
__Пример ответа__:
```JSON
{
    "created": "19:02 10.12.2018",
    "isInProgress": true,
    "text": "New task",
    "_id": "5c0eb8552bcad700154757d4"
}
```
* [/api/tasks/:id](https://vasilii-kovalev-todo-list.herokuapp.com/api/tasks/5c0eb8552bcad700154757d4) (`PUT`) — обновляет дело в списке дел по id.
<br />
__Пример запроса__:
```JSON
{
    "id": "5c0eb8552bcad700154757d4",
    "text": "New task #2",
    "isInProgress": true,
    "created": "19:02 10.12.2018"
}
```
__Пример ответа__:
```JSON
{
    "text": "New task #2",
    "isInProgress": true,
    "lastUpdate": "19:05 10.12.2018"
}
```
* [/api/tasks/:id](https://vasilii-kovalev-todo-list.herokuapp.com/api/tasks/5c0eb8552bcad700154757d4) (`DELETE`) — удаляет дело в списке дел по id.
<br />
__Пример ответа__:
```
Post with id 5c0eb8552bcad700154757d4 deleted!
```
