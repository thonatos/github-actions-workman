import Debug from 'debug';

const debug = Debug('Github-Actions-Workman-Test');

const run = (command: string) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            debug('###', command);
            resolve();
        }, 2000);
    });
};

describe('util/index.ts', () => {
    test('init', async () => {

        const args = { _: ['check'] };

        const { _: commands } = args;
        const [command = '', ] = commands || [];

        switch (command) {
            case 'check':
                await run(command);
                break;

            case 'release':

                await run(command);
                break;

            default:
                debug('@@command', 'no command found');
                break;
        }
    });
});
