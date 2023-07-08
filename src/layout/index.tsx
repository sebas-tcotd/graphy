import { TopBar } from "../components";

export const Layout = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <>
      <TopBar />
      {children}
    </>
  );
};
