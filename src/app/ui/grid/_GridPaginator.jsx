import React from 'react';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';

function getPageItem(value, onClick, active, key) {
  return (
    <li key={key || value} className={`page-item${active ? ' active' : ''}`} >
      <button className="page-link" onClick={onClick}>{value}</button>
    </li>
  );
}


export default function GridPaginator({
  pagesShown = 3,
  totalRows,
  rowsPerPage,
  currentPage,
  onClick,
  ...rest
}) {
  //TODO: Restructure the pagination buttons calculation
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  if (currentPage < 1) currentPage = 1;
  else if (currentPage > totalPages) currentPage = totalPages;
  const handleClickGoto = () => true;
  const handleClickNavigation = value => onClick(currentPage + value);
  const leftSidePages = Math.ceil(pagesShown / 2) - 1;
  const rightSidePages = Math.floor(pagesShown / 2);
  let pages = [getPageItem(1, () => onClick(1), currentPage === 1)];
  if (totalPages > 1) {
    let startShownPage = currentPage === 1 ? 1 : (currentPage - leftSidePages);
    let endShownPage = currentPage === totalPages ? totalPages : (currentPage + rightSidePages);
    if (startShownPage <= 1) {
      startShownPage = 2;
      endShownPage = startShownPage + rightSidePages;
    }
    if (endShownPage >= totalPages) {
      endShownPage = totalPages - 1;
      startShownPage = endShownPage - leftSidePages;
    }
    if (startShownPage > 2) {
      pages.push(getPageItem("...", handleClickGoto, null, '1_'));
    }
    else if (startShownPage <= 1) startShownPage = 2;
    for (let i = startShownPage; i <= endShownPage; i++) {
      pages.push(getPageItem(i, () => onClick(i), currentPage === i));
    }
    if (endShownPage < totalPages - 1) {
      pages.push(getPageItem("...", handleClickGoto, null, '_5'));
    }
    pages.push(getPageItem(totalPages, () => onClick(totalPages), currentPage === totalPages));
  }

  return (
    <nav aria-label="Page navigation example" className='ms-auto'>
      <ul className="pagination mb-0">
        <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handleClickNavigation(-1)}
            title="Previous page"
          >
            <ArrowLeft />
          </button>
        </li>
        {
          pages
        }
        <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handleClickNavigation(1)}
            title="Next page"
          >
            <ArrowRight />
          </button>
        </li>
      </ul>
    </nav>
  );
}
