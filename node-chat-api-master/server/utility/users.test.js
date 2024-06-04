const expect=require('expect');
var {Users}=require('./users.js');

describe("User function",()=>{
	var users;
	beforeEach(()=>{
		users=new Users();
		users.users=[
		{
			id:1234,name:"Heet",room:"Developer"
		},
		{
			id:12,name:"Mike",room:"Developer"
		},
		{
			id:1,name:"Jon",room:"The Office Fan"
		}

		];
	});

	it("should add user and return",()=>{
		var user={id:1234,name:"Heet",room:"Developer"};
		var users = new Users();
		var res=users.addUser(user.id,user.name,user.room);
		expect(users.users).toEqual([res]);

	});
	it("should get the list of user",()=>{
		var ulist=users.getUsersList('Developer');
        expect(ulist).toEqual(['Heet','Mike']);

	});
		it("should remove the user",()=>{
		var user=users.removeUser(1234);
		var user2=users.removeUser(345345);

		expect(user).toEqual({
			id:1234,name:"Heet",room:"Developer"
		});
		expect(user2).toEqual({});



	});
		it("should return the user id",()=>{
		var user=users.getUser(1234);
		var user2=users.getUser(23345);		
		expect(user).toEqual(["Heet"]);
		expect(user2).toEqual([]);

	});


});