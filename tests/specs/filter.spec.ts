import { swagLabs as test } from '../fixtures/swagLabs.fixtures';
import { type FilterOption } from '../data/test.data';

// Parameterize tests

[
  { name: 'Name (descending)', filter: 'za' },
  { name: 'Name (ascending)', filter: 'az' },
].forEach(({ name, filter }) => {
  test(
    `Should be able to filter products by ${name}`,
    { tag: ['@regression', '@P1'] },
    async ({ login, inventory }) => {
      const options = filter as FilterOption;
      await inventory.filterBy(options);
      await inventory.assertFilteredByName(options);
    }
  );
});

[
  { name: 'Price (descending)', filter: 'hilo' },
  { name: 'Price (ascending)', filter: 'lohi' },
].forEach(({ name, filter }) => {
  test(
    `Should be able to filter products by ${name}`,
    { tag: ['@regression', '@P1'] },
    async ({ login, inventory }) => {
      const options = filter as FilterOption;
      await inventory.filterBy(options);
      await inventory.assertFilteredByPrice(options);
    }
  );
});
