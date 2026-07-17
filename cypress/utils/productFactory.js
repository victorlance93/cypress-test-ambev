import { faker } from '@faker-js/faker';

export function createProduct() {
  return {
    name: `${faker.commerce.productName()} ${faker.string.alphanumeric(6)}`,
    price: String(faker.number.int({ min: 100, max: 1000 })),
    quantity: String(faker.number.int({ min: 10, max: 100 })),
  };
}
