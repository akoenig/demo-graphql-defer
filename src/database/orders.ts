import { faker } from "@faker-js/faker";

export async function getOrdersByCustomerId(_customerId: string) {
  // Simulate sloooooooooow interaction
  await new Promise((resolve) =>
    setTimeout(resolve, faker.number.int({ min: 1000, max: 9000 })),
  );

  return Array.from({ length: Math.floor(Math.random() * 100) }).map(() =>
    getOrderById(faker.string.uuid()),
  );
}

export async function getOrderById(id: string) {
  return {
    id,
    value: faker.number.float({ min: 100, max: 1000, precision: 2 }),
  } as const;
}
