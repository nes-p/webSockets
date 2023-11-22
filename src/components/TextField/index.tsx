import { FC } from 'react';
import closeIcon from '../../assets/icon-close.svg';
import './styles.scss';

interface ITextField {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  textLabel?: string;
  isValid?: boolean;
  validationMessage?: string;
  className?: string;
  clear: React.MouseEventHandler;
}

const TextField: FC<ITextField> = ({
  placeholder,
  textLabel,
  value,
  onChange,
  clear,
  isValid,
  validationMessage,
  className,
}) => (
  <div className={className}>
    <label className="text-label">
      {textLabel}
      <span>
        <input
          className="text-field"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-live="polite"
        />
        {value && (
          <img
            className="clear-icon"
            src={closeIcon}
            alt="clear"
            onClick={clear}
          />
        )}
      </span>
    </label>
    {!isValid && (
      <span data-testid="error-message-text-field">
        {validationMessage && validationMessage}
      </span>
    )}
  </div>
);
TextField.defaultProps = {
  placeholder: 'Please enter the ISIN',
  isValid: true,
  validationMessage: 'Please insert valid stock number',
};

export default TextField;
