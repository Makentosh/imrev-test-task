import { FC, PropsWithChildren } from 'react';
import './Container.css';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
      <div className={'container'}>
        { children }
      </div>
  );
};

export default Container;
