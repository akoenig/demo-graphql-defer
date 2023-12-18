import { objectType } from "fuse";

type Order = {
  id: string;
  value: number;
};

export const Order = objectType<Order>({
  name: "Order",
  fields: (t) => ({
    id: t.exposeID("id"),
    value: t.exposeFloat("value"),
  }),
});
