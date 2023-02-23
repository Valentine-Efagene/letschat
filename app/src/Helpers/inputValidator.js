import { useState } from "react";

const inputValidator = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    cosnt[isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    return {
        value: enteredValue, hasError
    };
};

export default inputValidator;