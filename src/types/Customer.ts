import { getAllCustomers, getCustomersByIds } from "@/database/customers";
import { getOrdersByCustomerId } from "@/database/orders";
import { addQueryFields, node, objectType } from "fuse";
import { Order } from "./Order";

type CustomerSource = {
  id: string;
  name: string;
  avatar_url: string;
};

export const CustomerNode = objectType<CustomerSource>({
  name: "Customer",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    avatarUrl: t.exposeString("avatar_url"),
    orders: t.list({
      type: Order,
      nullable: false,

      resolve: async (customer) => {
        const orders = await getOrdersByCustomerId(customer.id);

        return {
          nodes: orders,
          totalCount: orders.length,
        };
      },
    }),
  }),
});

addQueryFields((t) => ({
  customers: t.field({
    type: [CustomerNode],
    nullable: false,
    resolve: getAllCustomers,
  }),
}));
