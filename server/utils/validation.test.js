

const expect = require('expect');
const { isRealString} = require('./validation');

describe("is real string" , ()=>{
it('should reject non-string value' , ()=>{
  expect(isRealString(98)).toBe(false);
});


it('should reject empty string spaces value' , ()=>{
  expect(isRealString("      ")).toBe(false);
});

it('should accept the string spaces value' , ()=>{
  expect(isRealString(" Hey There are you")).toBe(true);
});


});
