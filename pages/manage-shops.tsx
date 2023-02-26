import { getAccessToken } from "@auth0/nextjs-auth0";
import NewShopForm from "../components/NewShopForm";

export default function ManageShops(props: any) {
  return <NewShopForm accessToken={props.accessToken} />;
}

export async function getServerSideProps(ctx: any) {
  const { accessToken } = await getAccessToken(ctx.req, ctx.res);
  return {
    props: {
      accessToken,
    },
  };
}
