import React from 'react';
import "./button.css";

export enum ButtonType {
  Button = "button",
  Submit = "submit",
}
interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  dataTestId?: string;
  type?: ButtonType;
}

const Button: React.FC<ButtonProps> = ({ type = ButtonType.Button, onClick, label, className, dataTestId}) => {
  return (
    <div className="button-container">
      <button
        type={type}
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
