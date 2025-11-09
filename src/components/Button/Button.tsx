import './Button.css'

interface ButtonProps {
    title: string;
    typeButton?: 'button' | 'submit';
    classItem?: string;
    handleClick: () => void;
    isDisabled?: boolean;

}

export default function Button({title, typeButton = 'button', handleClick, classItem, isDisabled = false} : ButtonProps) {

    return (
        <button onClick={handleClick}
                className={`button button_action 
                ${classItem !== undefined ? ` ${classItem}` : ''}`}
                type={typeButton}
                disabled={isDisabled}
        >
            {title}
        </button>
    )
}