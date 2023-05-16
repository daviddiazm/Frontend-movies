import React from 'react';

const listWithCommas = (elements, propertyStractor) => {

    if(elements.length === 1) 
        return propertyStractor(elements[0])

    return elements.map((e, i) => {
        // if is the last, just return the element
        if(i === elements.length-1)
            return propertyStractor(e)
        else propertyStractor(e) +", "
    })
};

export default listWithCommas;