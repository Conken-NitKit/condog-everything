import { Home } from "../components/pages/Home";
import { PATH } from "../constants/path";
import { withAuthUserSSR } from "../utils/firebase-backend/withAuthUserSSR"
import { redirectActions } from "../utils/redirects";

export const getServerSideProps = withAuthUserSSR({
  whenUnauthed: redirectActions.REDIRECT_TO_APP,
  appPageURL: PATH.ROOT,
});

export default Home;
