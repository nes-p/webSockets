import { FC, ReactNode } from 'react';
import './styles.scss';
import CardHeader from './CardHeader';

interface CardProps {
  children: ReactNode;
  unsubscribe: React.MouseEventHandler<HTMLDivElement>;
  stockId: string;
}

const Card: FC<CardProps> = ({ children, stockId, unsubscribe }) => {
  return (
    <div className="card" data-testid="card-test-id">
      <CardHeader isin={stockId} unsubscribe={unsubscribe} />
      {children}
      <div className="card-layer">
        <p className="toggle-subscription">
          <span className="value" onClick={unsubscribe}></span>
        </p>
      </div>
    </div>
  );
};

export default Card;
