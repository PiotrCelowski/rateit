import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useAutocomplete } from "../../algolia/CustomAlgoliaHooks";
import CustomConfig from "./CustomConfigure";

const Searcher = (props) => {
  const { indices, refine } = useAutocomplete(props);
  const [hints, setHints] = useState([]);
  const [searchedString, setSearchedString] = useState("");

  const queryHandler = (event, value) => {
    setSearchedString(value);
  }

  useEffect(() => {
    const indexData = setTimeout(() => {
      const temp = [];
      indices.find(index => index.indexId === "courses").hits.forEach(hint => {
        temp.push(hint.title);
      });
      setHints((oldState) => {
        return [...new Set(temp)];
      });
    }, 100)
    return () => clearTimeout(indexData)
  }, [indices]);

  useEffect(() => {
    const searchData = setTimeout(() => {
      refine(searchedString);
    }, 100)
    return () => clearTimeout(searchData)
  }, [searchedString, refine]);

  return (
    <>
      <CustomConfig isApproved={props.isApproved} />
      <Autocomplete
        freeSolo
        id="searcher"
        disableClearable
        autoComplete={true}
        options={hints}
        onInputChange={queryHandler}
        renderInput={(params) => (
          <TextField {...params} label="What would you like to learn?" />
        )}
      />
    </>
  );
};

export default Searcher;
