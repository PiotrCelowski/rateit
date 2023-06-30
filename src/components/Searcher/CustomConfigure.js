import React from 'react';
import { Configure } from 'react-instantsearch-hooks-web';

const CustomConfig = (props) => {
    return (
        <>
            {props.isApproved && <Configure filters="approved:true"/>}
            {!props.isApproved && <Configure filters="approved:false"/>}
        </>

    )
}

export default CustomConfig;