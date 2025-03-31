import React, { useEffect, useState } from 'react';
import Axios from '../../common/AxiosWithCredentials';
import GridRowsPerPageSelector from './_GridRowsPerPageSelector';
import GridToolBar from './_GridToolBar';
import { TOOLBAR_ACTIONS as Toolbar } from './_GridToolBarActions';
import ToolBar from '../ToolBar';
import GridPaginator from './_GridPaginator';
import GridHeader from './_GridHeader';

const DEFAULT_ROWS_PER_PAGE = 20;
const LOAD_ONCE = 1;
const REMOTE_REFRESH = 2;
const REMOTE = 3;
const GRID_PATH = '/grid';
const SEARCH_PATH = '/search';

function RowToolBar({ data, rowToolBar }) {
  const newToolBar = rowToolBar.map(({ onClick, ...rest }) => ({ ...rest, onClick: () => onClick(data), iconSize: 14 }));
  return <ToolBar gap={1} buttons={newToolBar} />;
}

function getDataByName(name, dataObject) {
  let dotIndex = name.indexOf('.');
  let leftName = name.substring(0, dotIndex);
  if (dotIndex === -1 || !dataObject.hasOwnProperty(leftName)) {
    return dataObject[name];
  }
  return getDataByName(name.substring(dotIndex + 1), dataObject[leftName]);
}

function DataRow({ model, data, rowToolBar }) {
  return (
    <tr>
      {
        model.map(({ name, classes = '' }) => {

          return (
            <td key={name} className={classes}>
              {
                (rowToolBar && name === 'toolbar')
                  ? <RowToolBar data={data} rowToolBar={rowToolBar} />
                  : getDataByName(name, data)
              }
            </td>);
        })
      }

    </tr>
  );
}

function GridBody({ model, data, rowToolBar, idName }) {
  return (
    <tbody>
      {
        data.map((row, index) => <DataRow key={row[idName] + '_' + index || `row-${index}`} rowToolBar={rowToolBar} model={model} data={row} />)
      }
    </tbody>
  );
}

function searchAndFilterLocalData(data, searchValue, searchableColumns) {
  const checkForValue = (value, row) => {
    for (let column of searchableColumns) {
      if (row[column].toLowerCase().includes(value.toLowerCase())) return true;
    }
    return false;
  };
  return [...data].filter(row => checkForValue(searchValue, row));
}

function getCurrentPageData(data, rowsPerPage, currentPage) {
  let start = (currentPage - 1 < 0 ? 0 : currentPage - 1) * rowsPerPage;
  return [...data].slice(start, (start) + rowsPerPage);
}

function filterAllData(data, onFilter) {
  return [...data].filter(row => {
    onFilter = typeof onFilter === 'function' ? onFilter : row => row?.active;
    return onFilter(row);
  });
}

async function getRemoteData(api, activePage, rowsPerPage) {
  let response;
  try {
    response = await Axios.get(api.mode === REMOTE ? api.endpoint + GRID_PATH : api.endpoint);
  } catch (ex) {
    console.log(ex);
  }
  return response.data || [];
}

export default function Grid({
  name = '_grid',
  localData = true,
  model = [],
  data = [],
  idName = 'id',
  classes = '',
  pagination,
  currentPage,
  height = '40vh',
  rowToolBar = {},
  labelRowsPerPageSelector,
  optionsRowsPerPageSelector,
  toolbar: _toolbar,
  api,      // api configuration
  endpoint, // api endpoint to use, rest of configuration is default +/grid, +/search
  url,      // load once url
  ...rest
}) {
  const _tableClass = 'table w-auto bg-white shadow ' + classes;
  if (!api) {
    if (endpoint) {
      api = {
        endpoint,
        mode: REMOTE,
        localData: false
      };
    } else if (url) {
      api = {
        endpoint: url,
        mode: LOAD_ONCE,
        localData: false
      };
    } else {
      api = { localData };
    }
  }
  const filteredModel = model.filter(col => !col.hidden);
  const [domReady, setDomReady] = useState(false);
  const [currentActivePage, setCurrentActivePage] = useState(currentPage);
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(pagination?.rowsPerPage || DEFAULT_ROWS_PER_PAGE);
  const [currentData, setCurrentData] = useState(data);
  const [toolbar, setToolbar] = useState(_toolbar);
  const [showPagination, setShowPagination] = useState(!!pagination);
  const [apiData, setApiData] = useState(api);

  useEffect(() => { // wait for DOM to be ready for the toolbar
    setDomReady(true);
    if (!apiData.localData) {
      const response = getRemoteData(apiData, currentActivePage, currentRowsPerPage);
      response.then(data => setCurrentData(data));
    }
  }, [apiData, currentActivePage, currentRowsPerPage]);

  const toggleButton = (target, newButton) => {
    let _toolbar = { ...toolbar };
    let indexTarget = _toolbar?.buttons
      .findIndex(button => typeof button === 'string' ? button === target : button?.name === target) || -1;
    if (indexTarget !== -1) {
      _toolbar.buttons[indexTarget] = newButton;
      setToolbar(_toolbar);
    }
  };
  // toolbar handler
  const handleToolBarActions = (action, value) => {
    console.log('Action: ', action, value);
    switch (action) {
      case Toolbar.SEARCH:
        if (api.localData) {
          if (value === null || value.trim() === '') {
            setCurrentData(data);
            return;
          }
          const searchableColumns = model.filter(column => column.searchable)
            .map(({ name }) => name);
          setCurrentData(searchAndFilterLocalData(currentData, value, searchableColumns));
        }
        break;
      case Toolbar.REFRESH:
        if (api.localData) {
          setCurrentData(data);
          return;
        }
        break;
      case Toolbar.FILTER:
        // const allButton = Toolbar.SHOW_ALL;
        const allButton = typeof value === 'function' ? { name: Toolbar.SHOW_ALL, filter: value } : Toolbar.SHOW_ALL;
        toggleButton(action, allButton);
        if (api.localData) {
          setCurrentData(filterAllData(data, value));
        }
        break;
      case Toolbar.SHOW_ALL:
        // const filterButton = Toolbar.FILTER;
        const filterButton = typeof value === 'function' ? { name: Toolbar.FILTER, filter: value } : Toolbar.FILTER;
        toggleButton(action, filterButton);
        if (api.localData) {
          setCurrentData(data);
        }
        break;
      case Toolbar.PAGINATION:
        toggleButton(action, Toolbar.TABLE);
        setShowPagination(true);
        break;
      case Toolbar.TABLE:
        toggleButton(action, Toolbar.PAGINATION);
        setShowPagination(false);
        break;
      default: //
    }
  };

  const handleRowsPerPageChange = value => {
    setCurrentRowsPerPage(Number(value));
    setCurrentActivePage(1);

  };

  const handlePageChange = value => setCurrentActivePage(value);

  if (showPagination && toolbar.buttons.includes(Toolbar.PAGINATION))
    toggleButton(Toolbar.PAGINATION, Toolbar.TABLE);

  const handleOnSort = ({ name, type, sortFunction }, state) => {
    let sortedData = [...currentData];
    const getSortDirection = () => (!state ? -1 : 1);
    if (typeof sortFunction !== 'function') {
      switch (type) {
        case 'number':
          sortFunction = (a, b) => getSortDirection() * (getDataByName(name, a) - getDataByName(name, b));
          break;
        case 'string':
        default:
          sortFunction = (a, b) => getSortDirection() * String(getDataByName(name, a)).localeCompare(getDataByName(name, b));
      }
    } else {
      sortFunction = (a, b) => getSortDirection * sortFunction(a, b);
    }
    setCurrentData(sortedData.sort(sortFunction));
  };

  return (
    <div className='vstack gap-3' style={{ height }}>
      {
        domReady && toolbar?.containerId &&
        <GridToolBar {...toolbar} onToolBarAction={handleToolBarActions} />
      }
      <div className="d-flex p-0 w-100 overflow-auto" style={{ backgroundColor: 'darkgray', }}>
        <table className={_tableClass} {...rest}>
          <GridHeader model={filteredModel} onSort={handleOnSort} />
          {
            currentData.length > 0 &&
            <GridBody
              data={showPagination
                ? getCurrentPageData(currentData, currentRowsPerPage, currentActivePage)
                : currentData}
              model={filteredModel}
              rowToolBar={rowToolBar}
              idName={idName}
            />
          }
        </table>
      </div>
      {
        showPagination &&
        <div className='d-flex align-items-center'>
          <GridRowsPerPageSelector
            gridName={name}
            selectedValue={currentRowsPerPage}
            label={pagination?.selector?.label}
            options={pagination?.selector?.options}
            customOnChangeHandler={pagination?.selector?.onChange}
            onChange={handleRowsPerPageChange}
          />
          <div className='ms-3'>
            <strong>{new Intl.NumberFormat().format(currentData.length)}</strong> Records
          </div>
          <GridPaginator
            pagesShown={pagination?.maxPagesShown}
            currentPage={currentActivePage}
            totalRows={data.length}
            rowsPerPage={currentRowsPerPage}
            onClick={handlePageChange}
          />
        </div>
      }
    </div>
  );
}
