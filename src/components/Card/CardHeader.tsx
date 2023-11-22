import React, { FC } from 'react';
import closeIcon from './../../assets/icon-close.svg';

interface ICardHeader {
  isin: string;
  label?: string;
  unsubscribe: React.MouseEventHandler<HTMLDivElement>;
}

const CardHeader: FC<ICardHeader> = ({ isin, label, unsubscribe }) => {
  return (
    <div className="card-head">
      <div>
        <span>{label}</span>
        <span className="card-head-id" data-testid="isin-test">
          {isin}
        </span>
      </div>
      <div data-testid="close-icon" className="tooltip" onClick={unsubscribe}>
        <img className="card-close-icon" src={closeIcon} alt="unsubscribe" />
        <span className="tooltiptext">Unsubscribe</span>
      </div>
    </div>
  );
};
CardHeader.defaultProps = {
  label: 'ISIN: ',
};
export default CardHeader;
