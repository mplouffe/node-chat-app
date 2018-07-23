const expect = require('expect');

const {Users} = require('./users');

describe('USER TESTS', () => {
    let testUsers;
    beforeEach(() => {
        testUsers = new Users();
        testUsers.users = [{
            id: '1',
            name: 'User One',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'User Two',
            room: 'Chatbot Course'
        }, {
            id: '3',
            name: 'User Three',
            room: 'Node Course'
        }];
    });

    describe('Create...', () => {
        it('should add new user', () => {
            let users = new Users();
            let user = {
                id: '123',
                name: 'Matheu',
                room: 'Node Fans'
            };
            let resUser = users.addUser(user.id, user.name, user.room);
            expect(users.users.length).toBe(1);
            expect(resUser).toEqual(user);
        });
    });

    describe('Read...', () => {
        it('should return names for node course', () => {
            let userList = testUsers.getUserList('Node Course');
            expect(userList).toEqual([testUsers.users[0].name, testUsers.users[2].name]);
        });

        it('should find user', () => {
            let user = testUsers.getUser(testUsers.users[0].id);
            expect(user).toEqual(testUsers.users[0]);
        });
    
        it('should not find user', () => {
            let user = testUsers.getUser('invalid id');
            expect(user).toBeFalsy();
        });
    });

    describe('Delete...', () => {
        it('should remove a user', () => {
            let removedUser = testUsers.removeUser(testUsers.users[0].id);
            expect(testUsers.users.length).toEqual(2);
            expect(removedUser).toEqual({
                id: '1',
                name: 'User One',
                room: 'Node Course'         
            });
        });
    
        it('should not remove user', () => {
            let removedUser = testUsers.removeUser('invalid id');
            expect(testUsers.users.length).toEqual(3);
            expect(removedUser).toBeFalsy();
        });
    });
});