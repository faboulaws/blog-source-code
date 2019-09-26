const { expect } = require('chai');
const seedUsers = require('./fixtures/user-fixtures');
const { fetchUserByName } = require('../lib/repositories/user-repository');
describe('user fetching logic', () => {
let unseed, users;
    before(async () => {
        ({unseed, users} = await seedUsers())
    });
    after(() => unseed());
    it('must fetch a user by ID', async () => {
        const [userOne] = users;
        const  actualUser = await fetchUserByName(userOne.username);
        expect(actualUser).to.eql(userOne);
    });
});