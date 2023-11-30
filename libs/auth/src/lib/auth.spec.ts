import { auth } from './auth.module';

describe('auth', () => {
    it('should work', () => {
        expect(auth()).toEqual('auth');
    });
});
