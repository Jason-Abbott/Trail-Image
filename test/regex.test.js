const mocha = require('mocha');
const expect = require('chai').expect;
const re = require('../lib/regex').default;
const text = `some
text on more
than

one line`;

describe('Patterns', ()=> {
   it('matches quote characters', ()=> {
      expect('"say"“'.replace(re.quote.any, '')).equals('say');
   });

   it('matches line breaks', ()=> {
      expect(text.replace(re.lineBreak, '-')).equals('some-text on more-than--one line');
   });

   it('identifies numbers', ()=> {
      expect(re.numeric.test("1.3")).is.true;
      expect(re.numeric.test(-26.36)).is.true;
      expect(re.numeric.test(".1.3")).is.false;
      expect(re.numeric.test("1.3654654654")).is.true;
      expect(re.numeric.test("1555553")).is.true;
   });
});