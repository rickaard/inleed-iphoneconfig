import React from 'react'

interface Props {
    textHeader: string;
    textParagraph: string;
    img: string;
    imgAlt: string;
}

const InstructionContainer: React.FC<Props> = ({ img, imgAlt, textHeader, textParagraph }) => {
    return (
        <div className="instruction-container">
            <div className="instruction--img">
                <img src={img} alt={imgAlt} />
            </div>
            <div className="instruction--text">
                <h4>{textHeader}</h4>
                <p>{textParagraph}</p>
            </div>
        </div>
    );
}

export default InstructionContainer