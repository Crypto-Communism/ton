import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/crypto_communism.tact',
    options: {
        debug: true,
    },
};
