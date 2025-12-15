import type { RouteNode } from '../core/types/types';

import MiniBudgetRoutes from '../modules/miniBudget/routes'

const appRoot: RouteNode = {
    path: '',
    optionsNavigator: {
        type: 'stack',
        options: {
            headerShown: false,
        }
    },
    children: [
        MiniBudgetRoutes,
    ]
};

export default appRoot;