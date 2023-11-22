import React, { FC, ReactNode } from 'react';

interface ICardContent {
  className?: string;
  children?: ReactNode;
}

const CardContent: FC<ICardContent> = ({ className, children }) => {
  return (
    <div className={`card-content ${className ? className : ''}`}>
      {children}
    </div>
  );
};

export default CardContent;
