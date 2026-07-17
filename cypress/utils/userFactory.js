import { fakerPT_BR as faker } from '@faker-js/faker';

export function createUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: '123456',
  };
}

export function createApiUser(administrator = 'false') {
  const user = createUser();

  return {
    nome: user.name,
    email: user.email,
    password: user.password,
    administrador: administrator,
  };
}
