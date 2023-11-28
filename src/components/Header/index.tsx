import { FC } from 'react';
import './styles.scss';

interface IHeader {
  title?: string;
}

const Header: FC<IHeader> = ({ title }) => {
  return (
    <header className="header fixed">
      <a href="/">
        <svg
          className="header-logo self-align-center"
          viewBox="0 0 74 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>{title}</title>
        </svg>
      </a>
    </header>
  );
};
Header.defaultProps = {
  title: 'Web sockets',
};
export default Header;
