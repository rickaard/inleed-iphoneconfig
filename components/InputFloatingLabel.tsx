import React from 'react'

interface Props {
    inputValue: string;
    labelName: string;
    inputName: string;
    inputType: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFloatingLabel: React.FC<Props> = ({ inputValue, labelName, inputName, inputType, handleChange }) => {
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    const handleFocused = () => {
        setIsFocused(true);
    }

    const handleBlured = () => {
        setIsFocused(false);
    }



    return (
        <div className="input-wrapper">
            <label htmlFor={inputName} className={`label ${isFocused || inputValue.length > 0 ? 'focused' : ''}`}>
                {labelName}
            </label>
            <input 
                className="input"
                id={inputName}
                value={inputValue}
                name={inputName}
                onFocus={handleFocused}
                onBlur={handleBlured}
                onChange={handleChange}
                type={inputType}
            />
        </div>
    );
}

export default InputFloatingLabel