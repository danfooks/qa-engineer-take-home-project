import React from 'react';
import "./button.css";

interface ButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
  dataTestId?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, className, dataTestId}) => {
  return (
    <div className="button-container">
      <button
        type="button"
        onClick={onClick}
        className={className}
        data-testid={dataTestId}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
