import { Block } from '../core';
import { validateBlock } from './block';
import { compare } from '../utils';

export class ChainError extends Error {}

/**
 * Validate chain.
 */
export const validateChain = (blocks: Block[]): void | never => {
    // fail if the first block in the chain is not matching
    // against the genesis block in string comparison
    if (compare(blocks[0], Block.GENESIS)) {
        throw new ChainError('Invalid genesis block');
    }

    // verify whether the hash of every block has been tampered with
    // starting from the first block created, till the last block
    // loop over the entire chain and check for its validity.
    blocks.slice(1).forEach((block, index) => {
        // get parent block to compare against
        const parentBlock = blocks[index - 1];

        // fail if index not following the parent block
        if (block.index !== parentBlock.index + 1) {
            throw new ChainError(`Invalid block index: ${block.index}`);
        }

        // fail if parent hash not matching the parent block
        if (block.parentHash != parentBlock.hash) {
            throw new ChainError(`Invalid parent hash: ${block.parentHash}`);
        }

        // validate block
        validateBlock(block);
    });
};
