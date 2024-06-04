const expect=require('expect');
var {realString}=require('./validate.js');
describe("should validate the input",()=>{
it("should reject empty string",()=>{
var eg="    ";
expect(realString(eg)).toBe(false); 
});
it("should accept string with spaces",()=>{
var eg="  lr  ";
expect(realString(eg)).toBe(true); 
});
it("should reject string with non char values",()=>{
var eg=12345;
expect(realString(eg)).toBe(false); 
});

});


