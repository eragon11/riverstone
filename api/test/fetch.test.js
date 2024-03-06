jest.mock('node-fetch');

const {fetch, Response} = require('node-fetch');
var {createUser} = require("../server/modules/commonServices/fetch");

test('createUser calls fetch with the right args and returns the user id', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('4')));

  const userId = createUser();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('https://website.com/users', {
    method: 'POST',
  });
  expect(userId).toBe('4');
});