import { PageComponent } from "../../../types/components";
import { Layout } from "../../common/layout/Layout";

export const Home: PageComponent = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>TEST1</p>
    </div>
  );
};

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
