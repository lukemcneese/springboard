const timeWord = require('./timeWord');
const data = [
  {input : "00:00", output: "midnight"},
  {input : "00:12", output: "twelve twelve am"},
  {input : "01:00", output: "one o'clock am"},
  {input : "06:01", output: "six oh one am"},
  {input : "06:10", output: "six ten am"},
  {input : "06:18", output: "six eighteen am"},
  {input : "06:30", output: "six thirty am"},
  {input : "10:34", output: "ten thirty four am"},
  {input : "12:00", output: "noon"},
  {input : "12:09", output: "twelve oh nine pm"},
  {input : "23:23", output: "eleven twenty three pm"}
]

describe('#timeword', () => {
  test('midnight',() =>{
    result = timeWord.convert(data[0].input)
    expect(result).toBe(data[0].output)
  })
  test(data[1].output,() =>{
    result = timeWord.convert(data[1].input)
    expect(result).toBe(data[1].output)
  })
  test(data[2].output,() =>{
    result = timeWord.convert(data[2].input)
    expect(result).toBe(data[2].output)
  })
  test(data[3].output,() =>{
    result = timeWord.convert(data[3].input)
    expect(result).toBe(data[3].output)
  })
  test(data[4].output,() =>{
    result = timeWord.convert(data[4].input)
    expect(result).toBe(data[4].output)
  })
  test(data[5].output,() =>{
    result = timeWord.convert(data[5].input)
    expect(result).toBe(data[5].output)
  })
  test(data[6].output,() =>{
    result = timeWord.convert(data[6].input)
    expect(result).toBe(data[6].output)
  })
  test(data[7].output,() =>{
    result = timeWord.convert(data[7].input)
    expect(result).toBe(data[7].output)
  })
  test(data[8].output,() =>{
    result = timeWord.convert(data[8].input)
    expect(result).toBe(data[8].output)
  })
  test(data[9].output,() =>{
    result = timeWord.convert(data[9].input)
    expect(result).toBe(data[9].output)
  })
  test(data[10].output,() =>{
    result = timeWord.convert(data[10].input)
    expect(result).toBe(data[10].output)
  })
});
