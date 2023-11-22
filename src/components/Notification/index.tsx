import { FC, ReactNode } from 'react';
import './styles.scss';
import classNames from 'classnames';

interface INotification {
  children?: ReactNode;
  className?: string;
}

const Notification: FC<INotification> = ({ children, className }) => {
  return (
    <div className={classNames('notification', className)}>{children}</div>
  );
};

export default Notification;
