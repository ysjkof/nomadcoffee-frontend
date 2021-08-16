import { Link } from "react-router-dom";
import { logUserOut } from "../apollo";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

function Home() {
  return (
    <>
      <PageTitle title="HOME" />
      <h1>home</h1>
      <Link to={routes.login}>Login</Link>
      <button onClick={() => logUserOut()}>Logout</button>
    </>
  );
}
export default Home;
