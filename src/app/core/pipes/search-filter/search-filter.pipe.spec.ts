import { SearchFilterPipe } from './search-filter.pipe';

describe('Pipe: SearchFilterPipe', () => {
    let pipe = new SearchFilterPipe(),
        mockInput = [
            { name: 'alpha' },
            { name: 'beta' },
            { name: 'gamma' },
            { name: 'delta' },
            { name: 'epsilon' },
            { name: 'iota' },
            { name: 'pi' }
        ],
        mockOutput;

    it('should return original list with no arguments', () => {
        expect(pipe.transform(mockInput, '')).toEqual(mockInput);
    });

    it('should return only results with "i"', () => {
        let mockResponse = [
            { name: 'epsilon' },
            { name: 'iota' },
            { name: 'pi' }
        ];
        expect(pipe.transform(mockInput, 'i')).toEqual(mockResponse);
    });
});
