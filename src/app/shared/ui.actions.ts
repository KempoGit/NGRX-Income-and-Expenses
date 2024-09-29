import { createAction } from '@ngrx/store';

export const isLoading = createAction(
    '[UI Component] Is Loading'
);

export const stopLoading = createAction(
    '[UI Component] Stop Loading'
);

export const isSidebar = createAction(
    '[UI Component] Is Sidebar'
);

export const stopSidebar = createAction(
    '[UI Component] Stop Sidebar'
);

