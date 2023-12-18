import { faker } from "@faker-js/faker";

export async function getCustomersByIds(ids: string[]) {
  return Promise.all(ids.map(getCustomerById));
}

export async function getCustomerById(id: string) {
  return {
    id,
    name: faker.person.fullName(),
    avatar_url: faker.internet.avatar(),
  } as const;
}

export async function getAllCustomers() {
  const length = faker.number.int({ min: 5, max: 100 });

  return Promise.all(
    Array.from({ length }).map(() =>
      getCustomerById(faker.string.nanoid({ min: 3, max: 5 })),
    ),
  );
}
