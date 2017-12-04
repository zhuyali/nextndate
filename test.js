const should = require('should');
const nextnDate = require('./nextnDate');
const xlsx = require('node-xlsx');

describe('nextnDate', function() {

  const testcases = xlsx.parse(`${__dirname}/test-wq.xlsx`)[0]['data'];

  describe('next n days', function() {
    testcases.forEach((data, index) => {
      if(data.length) {
        let days = data[1] !== 'null' ? data[1] : null;
        let inputDate = data[0] !== 'null' ? data[0].split('/') : null;
        let outputDate = data[2] !== 'null' ? data[2].split('/') : null;
        let input = inputDate ? {
          year: parseInt(inputDate[0]),
          month: parseInt(inputDate[1]),
          day: parseInt(inputDate[2])
        } : null;
        let output = outputDate ? {
          year: parseInt(outputDate[0]),
          month: parseInt(outputDate[1]),
          day: parseInt(outputDate[2])
        } : null;

        if (days !== null && output && input) {
          it(`test case ${index + 1}: ${data[0]} 的 (${days}) 天后为 ${data[2]}`, function() {
            nextnDate(input.year, input.month, input.day, days, true).should.eql(output);
          });
        } else {
          it(`test case ${index + 1}: ${data[0]} 的 (${days}) 天后为 ${data[2]}`, function() {
            should(nextnDate(input ? input.year : null, input ? input.month : null, input ? input.day : null, days, true)).be.exactly(null);
          });
        }
      }
    });
  })
});
