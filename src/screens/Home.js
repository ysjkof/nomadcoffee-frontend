import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { logUserOut } from "../apollo";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

const SEE_COFFEE_SHOPS = gql`
  query seeCoffeeShops($lastId: Int!) {
    seeCoffeeShops(lastId: $lastId) {
      name
      latitude
      longitude
      user {
        name
      }
      categories {
        name
        slug
        totalShops
      }
      photos {
        url
      }
      createdAt
      updatedAt
    }
  }
`;

function Home() {
  const { data } = useQuery(SEE_COFFEE_SHOPS, { variables: { lastId: 5 } });
  console.log(data);
  return (
    <>
      <PageTitle title="HOME" />
      <h1>home</h1>
      <Link to={routes.login}>Login</Link>
      <Link to={routes.add}>add</Link>
      <Link to={routes.shop}>shop</Link>
      <button onClick={() => logUserOut()}>Logout</button>
    </>
  );
}
export default Home;
