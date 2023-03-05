import { useContext } from "react";
import { Context } from "../context";

export default function Cart() {
  const { state, dispatch } = useContext(Context as any);
  const { cart } = state;
  let total = 0;

  for (const [key, value] of Object.entries(cart)) {
    total = total + cart[key].price * cart[key].qty;
  }

  return (
    <div className="flex-1 px-4 py-6">
      <ul role="list" className="my-6 divide-y divide-gray-200">
        {Object.entries(cart).map(([key, value]) => {
          return (
            <li className="flex py-6">
              <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md">
                <img src={cart[key].imageUrl} className="object-cover object-center w-full h-full" />
              </div>

              <div className="flex flex-col flex-1 ml-4">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>{cart[key].name}</h3>
                    <p className="ml-4">$ {cart[key].price}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{cart[key].description}</p>
                </div>
                <div className="flex items-end justify-between flex-1 text-sm">
                  <p className="text-gray-500">Qty {cart[key].qty}</p>

                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => {
                        dispatch({ type: "REMOVE_FROM_CART", payload: cart[key] });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-6">
        <div>Total $ {total}</div>
        <a
          onClick={() => {
            fetch("http://localhost:3000/api/create-checkout-session", {
              method: "POST",
              body: JSON.stringify({
                cart: cart,
              }),
            })
              .then((response) => response.json())
              .then((response) => {
                console.log(response);
                window.location.href = response.session.url;
              });
          }}
          className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md pointer"
        >
          Checkout
        </a>
      </div>
    </div>
  );
}
