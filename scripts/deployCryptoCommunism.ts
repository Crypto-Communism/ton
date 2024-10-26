import { toNano } from '@ton/core';
import { CryptoCommunism } from '../wrappers/CryptoCommunism';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const cryptoCommunism = provider.open(await CryptoCommunism.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await cryptoCommunism.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(cryptoCommunism.address);

    console.log('ID', await cryptoCommunism.getId());
}
