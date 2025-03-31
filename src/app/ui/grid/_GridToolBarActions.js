const TOOLBAR_ACTIONS = {
  REFRESH: 'refresh',
  FILTER: 'filter',
  SHOW_ALL: 'showAll',
  SEARCH: 'search',
  PAGINATION: 'pagination',
  TABLE: 'table',
};

const TOOLBAR_BUTTONS = {
  refresh: {
    id: '_refreshButton',
    classes: 'btn-sm btn-secondary',
    icon: 'ArrowClockwise',
    message: 'Reload data',
  },
  filter: {
    id: '_filterButton',
    classes: 'btn-sm btn-secondary',
    icon: 'Filter',
    message: 'Show only active',
  },
  showAll: {
    id: '_showAllButton',
    classes: 'btn-sm btn-secondary',
    icon: 'List',
    message: 'Show all',
  },
  pagination: {
    id: '_paginationButton',
    classes: 'btn-sm btn-secondary',
    icon: 'Book',
    message: 'Show pagination',
  },
  table: {
    id: '_tableButton',
    classes: 'btn-sm btn-secondary',
    icon: 'Grid3x3',
    message: 'Show continuos table',
  },
};

export { TOOLBAR_BUTTONS, TOOLBAR_ACTIONS };
