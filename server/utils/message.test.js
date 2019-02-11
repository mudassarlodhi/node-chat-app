


const expect = require('expect');
const {generateMessage , generateLocationMessage} = require('./message');

describe('generateMessage' , ()=>{

  it("should generate correct message object" , ()=>{
    var from = "mudasser";
    var text = "this is a text";
    var object = generateMessage(from , text);
    // expect(object.from).toBe(from);
    expect(object).toMatchObject({from , text});
    // expect(object.text).toBe(text);
    expect(typeof object.createdAt).toBe('number');
  })
});




describe('generateLocationMessage' , ()=>{

  it("should generate correct location message object" , ()=>{
      var from = "mudasser";
      var latitude = 39.9367117;
      var longitude = -75.1708349;
      var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      var result = generateLocationMessage(from , latitude , longitude);

      expect(result).toMatchObject({from , url});
    // expect(object.text).toBe(text);
    // expect(typeof object.createdAt).toBe('number');
  })
});
