import React from "react";
import Course from "../Course/Course";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useHits } from 'react-instantsearch-hooks-web';
import { useEffect, useState, useCallback } from "react";

const Results = (props) => {
  const { hits } = useHits(props);
  const [algoliaResults, setAlgoliaResults] = useState([]);
  const [areResults, setAreResults] = useState(true);

  const fetchAlgoliaResults = useCallback(() => {
    const temp = [];
    hits.forEach((course) => {
      if (course.approved === true) {
        temp.push({
          id: course.id,
          title: course.title,
          author: course.author,
          rating: course.rating,
          ratingVotes: course.ratingVotes,
          tags: course.tags,
          photoUrl: course.photoUrl
        });
      }
    })
    setAlgoliaResults((oldState) => {
      return temp
    });
    temp.length > 0 ? setAreResults(true) : setAreResults(false);
  }, [hits])

  useEffect(() => {
    fetchAlgoliaResults();
  }, [hits, fetchAlgoliaResults])

  return (
    <>
      {areResults && <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xl: "repeat(4, 1fr)",
            lg: "repeat(3, 1fr)",
            sm: "repeat(2, 1fr)",
            xs: "repeat(1, 1fr)"
          },
          justifyItems: 'center'
        }}
      >
        {algoliaResults.map(result => {
          return <Course key={result.id} {...result} />;
        })}
      </Box>}
      {!areResults && <Typography>Nothing found...</Typography>}
    </>
  );
};

export default Results;
