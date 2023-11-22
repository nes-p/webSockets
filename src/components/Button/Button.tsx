import { FC, MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';
import './styles.scss';

interface IButton {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: FC<IButton> = ({
  children,
  className,
  onClick,
  type,
  disabled,
}) => {
  return (
    <button
      type={type}
      className={classNames('button', className)}
      onClick={onClick}
      disabled={disabled}
      data-testid="btn-test-id"
    >
      <span className="button-content">{children}</span>
    </button>
  );
};

export default Button;
