import './table.css'

const Pagination = ({ page, totalPages, selectPage }) => {
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      selectPage(selectedPage);
    }
  };
  return (
    <div className="pagination">
      <span
        onClick={() => selectPageHandler(page - 1)}
        className={page > 1 ? "" : "pagination__disable"}
      >
        ◀️
      </span>

      {[...Array(totalPages)].map((_, i) => {
        return (
          <span
            key={i}
            className={page === i + 1 ? "pagination__selected" : ""}
            onClick={() => selectPageHandler(i + 1)}
          >
            {i + 1}
          </span>
        );
      })}

      <span
        onClick={() => selectPageHandler(page + 1)}
        className={page < totalPages ? "" : "pagination__disable"}
      >
        ▶️
      </span>
    </div>
  );
};

export default Pagination;
