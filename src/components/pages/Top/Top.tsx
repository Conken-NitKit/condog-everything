import { PageComponent } from "../../../types/components";
import { Layout } from "../../common/layout/Layout";

export const Top: PageComponent = () => {
  return (
    <div>
      <h1>Top</h1>
      <p>TEST2</p>
    </div>
  );
};

Top.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
