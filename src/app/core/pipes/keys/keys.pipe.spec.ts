import { KeysPipe } from './keys.pipe';

describe('Pipe: KeysPipe', () => {
    let pipe = new KeysPipe();
    let mockInput = {
        'English' : 'en-us',
        'English (UK)' : 'en-gb'
      },
      mockOutput = [{
        key: 'English', value: 'en-us'
      }, {
        key: 'English (UK)', value: 'en-gb'
      }];

    it('transforms object to key value array', () => {
        expect(pipe.transform(mockInput)).toEqual(mockOutput);
    });

});
