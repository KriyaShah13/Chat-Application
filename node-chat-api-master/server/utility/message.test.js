var expect=require('expect');
var {generateMessage,generateLocationMessage}=require('./message.js');
describe("generateMessage",()=>{
	it("should expect from and text",()=>{
		var from="heet";
		var text="hello everyone";
		var obj=generateMessage(from,text);
		
		expect(obj.text).toEqual(text);
		expect(obj.from).toEqual(from);

	})


});
describe("generate Location",()=>{
	it("should give correct location",()=>{
		var from="heet";
		var lat=1;
		var long=1;
		var obj=generateLocationMessage(from,lat,long);
		expect(obj.from).toEqual(from);
		expect(obj.url).toEqual("https://www.google.com/maps?q=1,1");


	});

});
