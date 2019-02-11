

const {Users} = require('./users');
const expect = require('expect');
describe("Users" , ()=>{


  var users;

  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id:'1',
      name:'Mike',
      room:'Node Course'
    } , {
      id:'2',
      name:'Jen',
      room:'React Course'
    } , {
      id:'3',
      name:'Julie',
      room:'Node Course'
    }]
  });

  it('should return a user'  , ()=>{
    var users = new Users();
    var user = {
      id: "12344",
      name: "Jack",
      room: "any Room"
    };

    var resUser = users.addUser(user.id , user.name , user.room);
    expect(users.users).toEqual([user]);

  });

  it('should remove a user' , ()=>{
    var user = users.removeUser('2');
    expect(users.users).not.toContain(user);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user' , ()=>{
    var user = users.removeUser('8');
    expect(user).toBeFalsy();
      expect(users.users.length).toBe(3);
  });

  it('should find a user' , ()=>{
    var user = users.getUser('3');
    expect(user).toEqual(users.users[2]);
  });

  it('should not find a user' , ()=>{
    var user = users.getUser('4');
    expect(user).toBeFalsy();
  })

  it('should return all users of Node Course room' , ()=>{
    var names = users.getUsersList("Node Course");
    expect(names).toEqual(['Mike' , 'Julie']);
  });


  it('should return all users of React Course room' , ()=>{
    var names = users.getUsersList("React Course");
    expect(names).toEqual(['Jen']);
  });

})
