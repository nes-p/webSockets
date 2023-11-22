import React, { FC, ReactNode } from 'react';

interface IContentContainer {
  children?: ReactNode;
  className?: string;
}

const ContentContainer: FC<IContentContainer> = ({ className, children }) => {
  return (
    <div className={`card-content-container${className ? className : ''}`}>
      {children}
    </div>
  );
};

export default ContentContainer;
