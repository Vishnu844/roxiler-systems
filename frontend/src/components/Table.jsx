import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import "./table.css";

const HeaderCell = ({ column }) => {
  return (
    <th key={column} className="transactions-table-cell">
      {column}
    </th>
  );
};

const Header = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => {
          return <HeaderCell column={column} key={column} />;
        })}
      </tr>
    </thead>
  );
};

const Content = ({ entries, columns }) => {
  return (
    <tbody>
      {entries.map((entry) => {
        return (
          <tr key={entry.id}>
            {columns.map((column) => {
              return (
                <td key={column} className="transactions-table-cell">
                  {column === "image" ? (
                    <img
                      src={entry[column]}
                      alt="img"
                      className="transaction-image"
                    />
                  ) : column === "sold" ? (
                    entry[column] === true ? (
                      "Item sold"
                    ) : (
                      "Available"
                    )
                  ) : column === "price" ? (
                    `$ ${entry[column].toFixed(2)}`
                  ) : (
                    entry[column]
                  )}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

const Table = ({ searchValue, selectedMonth }) => {
  const columns = [
    "id",
    "title",
    "price",
    "description",
    "category",
    "sold",
    "image",
  ];

  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const selectPage = (newSelectPage) => {
    setPage(newSelectPage);
  };

  useEffect(() => {
    const url = `http://localhost:5000/api/transactions?search=${searchValue}&page=${page}&limit=10&month=${selectedMonth}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setTransactions(data.data);
          setTotalPages(data.totalPages);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, [searchValue, page, selectedMonth]);

  return (
    <>
      <div className="table-wrapper">
        <table className="transactions-table">
          <Header columns={columns} />
          {transactions.length !== 0 ? (
            <Content entries={transactions} columns={columns} />
          ) : (
            <div className="table-message">
              No Transactions available that are related to search criteria
            </div>
          )}
        </table>
        {transactions.length !== 0 ? (
          totalPages > 1 ? (
            <Pagination
              page={page}
              totalPages={totalPages}
              selectPage={selectPage}
            />
          ) : (
            <div className="table-footer">
              Fetched transactions are less than 10 - No pagination needed
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Table;
