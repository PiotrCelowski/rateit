import React from "react";
import Box from "@mui/material/Box";
import PendingCourse from "../PendingCourse/PendingCourse";
import Typography from "@mui/material/Typography";
import { useHits } from 'react-instantsearch-hooks-web';
import { useEffect, useState, useCallback } from "react";

const PendingResults = (props) => {
  const { hits } = useHits(props);
  const [algoliaResults, setAlgoliaResults] = useState([]);
  const [areResults, setAreResults] = useState(true);

  const fetchAlgoliaResults = useCallback(() => {
    const temp = [];
    hits.forEach((course) => {
      temp.push({
        id: course.id,
        title: course.title,
        author: course.author,
        rating: course.rating,
        ratingVotes: course.ratingVotes,
        tags: course.tags,
        photoUrl: course.photoUrl
      });
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
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
        }}
      >
        {algoliaResults.map(result => {
          return <PendingCourse key={result.id} {...result} />;
        })}
      </Box>}
      {!areResults && <Typography>Nothing found...</Typography>}
    </>
  );
};

export default PendingResults;
