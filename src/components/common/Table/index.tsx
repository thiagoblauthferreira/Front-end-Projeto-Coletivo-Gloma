import React from "react";
import { Loading } from "../Loading";
import { IPaginate, ITableProps } from "./interface";

const styleBtnPaginate = "join-item btn min-h-max h-full";

export function Table({
  columns,
  dataSource,
  rowKey = "id",
  requesting = false,
  limit = 10,
  total = 0,
  textNotFound,
  onPaginate,
  maxPagesToShow = 5,
}: ITableProps) {
  const defaultPage = {
    currentPage: 0,
    offset: 0,
    limit: limit,
  };

  const [pagination, setPagination] = React.useState<IPaginate>(defaultPage);
  const [startPage, setStartPage] = React.useState(1);

  const handlePages = () => {
    const pageCount = Math.ceil(total / limit);
    const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);
    return pageNumbers;
  };

  const handleStartPage = (page: number) => {
    if (
      totalPagesCount > maxPagesToShow &&
      totalPagesCount - Math.floor(maxPagesToShow / 2) >= page - 1
    ) {
      setStartPage(Math.max(1, page - Math.ceil(maxPagesToShow / 2)));
    }
  };

  const totalPages = handlePages();
  const totalPagesCount = totalPages.length;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPagesCount);

  const paginationPrev = () => {
    if (!requesting) {
      const currentPage = pagination.currentPage - 1;

      const currentPagination = {
        currentPage: currentPage,
        offset: currentPage * limit,
        limit: limit,
      };

      if (currentPage >= 0) {
        setPagination(currentPagination);
        onPaginate && onPaginate(currentPagination);
      }
    }
  };

  const paginationNext = () => {
    if (!requesting) {
      const currentPage = pagination.currentPage + 1;

      const currentPagination = {
        currentPage: currentPage,
        offset: currentPage * limit,
        limit: limit,
      };

      if (currentPage < totalPagesCount) {
        setPagination(currentPagination);
        onPaginate && onPaginate(currentPagination);
      }
    }
  };

  const selectPage = (page: number) => {
    if (!requesting) {
      const currentPagination = {
        currentPage: page,
        offset: page * limit,
        limit: limit,
      };

      if (page !== pagination.currentPage) {
        handleStartPage(page);
        setPagination(currentPagination);
        onPaginate && onPaginate(currentPagination);
      }
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    if (maxPagesToShow > 2 && totalPagesCount > maxPagesToShow) {
      if (startPage > 1) {
        pages.push(
          <button
            key="pagination-page-start"
            className={`
              ${styleBtnPaginate} 
              ${requesting ? "btn-disabled" : ""}
            `}
          >
            ...
          </button>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const index = i - 1;
      pages.push(
        <button
          key={`pagination-page-${index}`}
          className={`
            ${styleBtnPaginate} 
            ${requesting ? "btn-disabled" : ""}
            ${pagination.currentPage === index ? "btn-active" : ""}
          `}
          onClick={(event) => {
            event.preventDefault();
            selectPage(index);
          }}
        >
          {i}
        </button>
      );
    }

    if (maxPagesToShow > 2 && totalPagesCount > maxPagesToShow) {
      if (endPage < totalPagesCount) {
        pages.push(
          <button
            key="pagination-page-end"
            className={`
              ${styleBtnPaginate} 
              ${requesting ? "btn-disabled" : ""}
            `}
          >
            ...
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div>
      {!requesting ? (
        <div className="overflow-x-auto">
          <table className="table text-center">
            <thead>
              <tr>
                {columns.map((column, index) => {
                  if (column.disabled) {
                    return null;
                  }
                  return (
                    <th
                      key={`table-thead-${column.dataIndex}-${index}`}
                      className="text-sm"
                    >
                      {column.title}
                    </th>
                  );
                })}
              </tr>
            </thead>

            {dataSource.length > 0 && (
              <tbody>
                {dataSource.map((row) => {
                  return (
                    <tr key={`table-tbody-${row[rowKey]}`} className="odd:bg-gray-100">
                      {columns.map((column, index) => {
                        return (
                          <td
                            key={`table-tbody-td-${column.dataIndex || index}-${index}`}
                            className={`
                            align-middle
                          `}
                          >
                            <div className="flex justify-center">
                              {column.render(
                                column.dataIndex ? row[column.dataIndex] : row
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>

          {dataSource.length <= 0 && (
            <div className="text-nowrap p-2 py-3 text-center">
              <p className="font-semibold text-gray-400">
                {textNotFound ? textNotFound : "Nenhum valor encontrado"}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[100px]">
          <Loading />
        </div>
      )}

      {onPaginate && (
        <div className="flex justify-end mt-2">
          <div className="join rounded-lg h-[40px]">
            <button
              className={`
                ${styleBtnPaginate}  
                ${requesting && total > limit ? "btn-disabled" : ""}
       
              `}
              onClick={(event) => {
                event.preventDefault();
                paginationPrev();
              }}
            >
              «
            </button>
            {renderPageNumbers()}
            <button
              className={`
                ${styleBtnPaginate} 
                ${requesting && total > limit ? "btn-disabled" : ""}
              `}
              onClick={(event) => {
                event.preventDefault();
                paginationNext();
              }}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
