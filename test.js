const should = require('should');
const nextnDate = require('./nextnDate');
const xlsx = require('node-xlsx');

describe('nextnDate', function() {

  const testcases = xlsx.parse(`${__dirname}/test.xlsx`)[0]['data'];

  describe('next n days', function() {
    testcases.forEach((data, index) => {
      if(data.length) {
        let days = data[1];
        let inputDate = data[0].split('/');
        let outputDate = data[2].split('/');
        let input = {
          year: parseInt(inputDate[0]),
          month: parseInt(inputDate[1]),
          day: parseInt(inputDate[2])
        };
        let output = {
          year: parseInt(outputDate[0]),
          month: parseInt(outputDate[1]),
          day: parseInt(outputDate[2])
        };

        it(`test case ${index + 1}: ${data[0]} 的 (${days}) 天后为 ${data[2]}`, function() {
          nextnDate(input.year, input.month, input.day, days).should.eql(output);
        });
      }
    });
  })
});
