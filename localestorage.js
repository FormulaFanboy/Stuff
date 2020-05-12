// Core, Team, and Official extensions can `require` VM code:
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');

class SomeBlocks {
    // ...
    getInfo () {
        return {
            id: 'someBlocks',
            name: 'Some Blocks',
            [
			['r', '%s', 'readLocalStorage', 'highscore'],
			[' ', 'set %s to %s', 'setLocalStorage', 'highscore', '12'],
		]
        };
    }
    // ...
}
