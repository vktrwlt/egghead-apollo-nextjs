import Link from "next/link";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { httpLink, setAuthToken } from "../gqlClient";

const DELETE_SHOP = gql`
  mutation DeleteShopAndProducts($shopId: ID!) {
    deleteShopAndProducts(shopID: $shopId)
  }
`;

export default function ShopsList({ shops, accessToken }: { shops: any; accessToken: string }) {
  const [deleteShop, { client, data }] = useMutation(DELETE_SHOP);
  return (
    <div className="p-16">
      <h1>Your Shops List</h1>
      {shops.map((shop: any) => (
        <div key={shop._id} className="mb-1 bg-white rounded-lg shadow">
          <ul className="divide-y divide-gray-100">
            <li className="flex justify-between p-3">
              <Link className={"underline p-1"} href={`shops/${shop._id}/details`}>
                {shop.name}
              </Link>
              <div>
                <Link className={btnClass} href={`shops/${shop._id}/products`}>
                  Add Product
                </Link>
                <button
                  className={deleteBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    client.setLink(setAuthToken(accessToken).concat(httpLink));
                    deleteShop({ variables: { shopId: shop._id } }).then((res) => {
                      window.location.reload();
                    });
                  }}
                >
                  Delete Shop
                </button>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

const btnClass = `rounded-full border border-transparent bg-indigo-600 px-3.5 py-2 text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-1`;
const deleteBtn = `ml-2 rounded-full border border-transparent bg-pink-600 px-3.5 py-2 text-white shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2`;
