import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

const TechnologyFilter = ({ items, checkItem, setItemsSearcher }) => {
    
    const onSearchHandler = (event) => {
        setItemsSearcher(event.currentTarget.value);
    }

    return (
        <FormGroup>
            <FormLabel component="legend">Select technology</FormLabel>
            <TextField
                margin="normal"
                id="facetSearch"
                name="facetSearch"
                label="Search by..."
                onChange={onSearchHandler}
                sx={{ width: "150px" }}
            />
            {Object.entries(items).map((item) => {
                return (
                    <FormControlLabel key={item[0]} label={item[0]} control={<Checkbox name={item[0]} checked={item[1]} onChange={checkItem} />} />
                );
            })}
        </FormGroup>
    )
}

export default React.memo(TechnologyFilter);