import React, {useState} from 'react';

const Filter = (input, index, list) => {
    const filteredList = [];

    list.map(item => {
        if (input.toUpperCase() === item[index].toUpperCase()) {
            filteredList.push(item);
        }
    });

    return filteredList;
};

export default Filter;
