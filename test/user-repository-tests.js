const { expect } = require('chai');
const createUsers = require('./fixtures/user-fixtures');
const { fetchUserByName } = require('../lib/repositories/user-repository');
describe('user fetching logic', () => {
    let deleteUsers, users;
    before(async () => {
        ({ cleanup: deleteUsers, entities: users } = await createUsers())
    });
    after(() => deleteUsers());
    it('must fetch a user by username', async () => {
        const [userOne] = users;
        const actualUser = await fetchUserByName(userOne.username);
        expect(actualUser).to.eql(userOne);
    });
});