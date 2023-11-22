import { useEffect, useRef, useState } from 'react';

import './App.scss';
import Header from './components/Header';
import TextField from './components/TextField';
import Card from './components/Card';
import CardContent from './components/Card/CardContent';
import Button from './components/Button/Button';
import ContentContainer from './components/Card/ContentContainer';
import { rountToDoubles, validateStockId } from './helpers/utils';
import Notification from './components/Notification';
import { WS_URL } from './constants/utils';

export interface IStock {
  isin: string;
  price: number;
  bid: number;
  ask: number;
}

function App() {
  const connection = useRef<WebSocket | null>(null);
  const [stockId, setStockId] = useState('');
  const [isNumValid, setIsValid] = useState(true);
  const [stocksWatchList, setWatchList] = useState<IStock[]>([]);
  const DISCONNECT_NOTIFICATION = 'No connection';

  useEffect(() => {
    connection.current = connectWebSocket(WS_URL);
    return () => connection.current?.close();
  }, []);

  function connectWebSocket(WS_URL: string) {
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => {
      console.log('connected');
    };

    ws.onmessage = (evt) => {
      setWatchList((oldStocks) => {
        const serverStock = JSON.parse(evt.data);
        const stockIndex = oldStocks.findIndex(
          (stock) => stock.isin === serverStock.isin,
        );

        const newStocks =
          stockIndex === -1
            ? [...oldStocks, serverStock]
            : oldStocks.map((stock) =>
                stock.isin === serverStock.isin ? serverStock : stock,
              );

        return newStocks;
      });
    };

    ws.onclose = () => {
      console.log('disconnected');
      // automatically try to reconnect on connection loss
      setTimeout(function () {
        connectWebSocket(WS_URL);
      }, 0);
    };

    return ws;
  }

  const handleStockNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStockId(event.target.value);
  };

  const handleSubmitClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateStockId(stockId);
    if (isValid) {
      connection?.current?.OPEN &&
        connection?.current?.send(
          JSON.stringify({
            subscribe: stockId,
          }),
        );
    }

    setIsValid(isValid);
  };

  const unsubscribe = (stockId: string) => {
    if (connection?.current?.OPEN) {
      connection?.current?.send(
        JSON.stringify({
          unsubscribe: stockId,
        }),
      );
      setWatchList(stocksWatchList.filter((stock) => stock.isin !== stockId));
    }
  };

  return (
    <>
      <Header />
      <main className="main flex-column">
        <form
          onSubmit={handleSubmitClick}
          className="self-align-center flex-column"
        >
          <h1 className="heading1">Latest stock prices</h1>
          <TextField
            value={stockId}
            onChange={(e) => handleStockNumber(e)}
            clear={() => setStockId('')}
            isValid={isNumValid}
            className="max-width-5"
          />
          <Button
            className="mt-2 max-width-1"
            type="submit"
            disabled={!connection.current?.OPEN}
          >
            {connection.current?.OPEN ? 'Subscribe' : 'Connecting...'}
          </Button>
        </form>
        <div className="cards">
          {stocksWatchList.map((stock) => {
            return (
              <Card
                key={stock.isin}
                stockId={stock.isin}
                unsubscribe={() => unsubscribe(stock.isin)}
              >
                <ContentContainer>
                  <CardContent>
                    <span> PRICE:</span>
                    <span> {rountToDoubles(stock?.price)}</span>
                  </CardContent>
                  <CardContent>
                    <span> BID:</span>
                    <span> {rountToDoubles(stock?.bid)}</span>
                  </CardContent>
                  <CardContent>
                    <span> ASK:</span>
                    <span> {rountToDoubles(stock?.ask)}</span>
                  </CardContent>
                </ContentContainer>
              </Card>
            );
          })}
        </div>
        {!connection?.current?.OPEN && (
          <Notification className="self-align-center ">
            {DISCONNECT_NOTIFICATION}
          </Notification>
        )}
      </main>
    </>
  );
}

export default App;
