import * as pagination from "paginationjs";

const setPagination = ({paginationSelector} = {}) => {
  const paginationContainer = $(paginationSelector);

  paginationContainer.pagination({
    dataSource: [1, 2, 3, 4, 5]
  });
};

export default setPagination;