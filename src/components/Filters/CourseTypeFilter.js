import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";

const TechnologyFilter = ({ items, checkItem }) => {
    return (
        <FormGroup>
            <FormLabel component="legend">Select type</FormLabel>
            {Object.entries(items).map((item) => {
                return (
                    <FormControlLabel key={item[0]} label={item[0]} control={<Checkbox name={item[0]} checked={item[1]} onChange={checkItem}/>} />
                );
            })}
        </FormGroup>
    )
}

export default React.memo(TechnologyFilter);