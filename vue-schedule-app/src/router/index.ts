import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CalendarView from '../views/CalendarView.vue';
import Settings from '../views/Settings.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: CalendarView,
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;