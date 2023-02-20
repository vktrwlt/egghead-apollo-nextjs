import { useQuery, gql } from "@apollo/client";
import type { NextPage } from "next";

const GET_SHOP = gql`
  query {
    findShopByID(id: "357220645887541848") {
      _id
      description
      name
      ownerId
      products {
        _id
      }
    }
  }
`;

const Home: NextPage = () => {
  const { data } = useQuery(GET_SHOP);

  console.log(data);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p>Hello World</p>
    </div>
  );
};

export default Home;
