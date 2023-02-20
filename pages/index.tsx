import { useQuery, gql } from "@apollo/client";
import type { NextPage } from "next";
import ProductList from "../components/ProductList";
const GET_PRODUCTS = gql`
  query {
    getAllProducts {
      data {
        _id
        name
        description
        price
        imageUrl
        shop {
          _id
        }
      }
    }
  }
`;
const Home: NextPage = () => {
  const { data, loading } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;

  return <ProductList products={data?.getAllProducts?.data} />;
};

export default Home;
