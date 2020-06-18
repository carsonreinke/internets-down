import version from '../src/version';

test('version', async () => {
    expect(await version()).toMatch(/\d+\.\d+\.\d+/);
});