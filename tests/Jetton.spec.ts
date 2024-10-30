import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Jetton } from '../wrappers/Jetton';
import '@ton/test-utils';

describe('Jetton', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let jetton: SandboxContract<Jetton>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        jetton = blockchain.openContract(await Jetton.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await jetton.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: jetton.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and jetton are ready to use
    });
});
