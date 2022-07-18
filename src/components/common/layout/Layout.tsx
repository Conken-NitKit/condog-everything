import { PropsWithChildren } from "react";

type Props = {};

export const Layout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};
