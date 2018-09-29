import TaskList from '../TaskList/TaskList';
import TasksAll from '../TaskList/TasksAll/TasksAll';
import TasksInProgress from '../TaskList/TasksInProgress/TasksInProgress';
import TasksCompleted from '../TaskList/TasksCompleted/TasksCompleted';

export default [
    {
        path: '/tasks',
        component: TaskList,
        children: [
            {
                path: '/all',
                component: TasksAll,
                exact: true,
            },
            {
                path: '/in_progress',
                component: TasksInProgress,
                exact: true,
            },
            {
                path: '/completed',
                component: TasksCompleted,
                exact: true,
            },
        ],
    },
];
