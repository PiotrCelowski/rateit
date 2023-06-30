import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { usePagination } from 'react-instantsearch-hooks-web';

const CustomPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    nbPages,
    refine,
  } = usePagination({totalPages: 10, padding: 1});

  const onChangeHandler = (event, page) => {
    setCurrentPage(page);
  }

  useEffect(() => {
    refine(currentPage-1);
  }, [currentPage, refine])

  return (
    <Stack alignItems="center" marginTop={5} marginBottom={5}>
      <Pagination count={nbPages} page={currentPage} onChange={onChangeHandler} color="primary" />
    </Stack>
  );
};

export default CustomPagination;
