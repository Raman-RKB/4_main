/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */

const { describe, it, expect } = require('@jest/globals');
const { Game } = require ('./src/play');
const { Popup } = require ('./src/popup');

jest.mock('./src/popup');

describe('Game', () => {
    describe('onCheckMatch()', () => {
        it('should show lose popup if the cards do not match', () => {
            const parent = document.createElement('div');
            const card1 = document.createElement('div');
            card1.setAttribute('data-id', '1');
            const card2 = document.createElement('div');
            card2.setAttribute('data-id', '2');
            const cardPair = [];
            cardPair.push(card1, card2);
            const cardSet = [1, 2]
            const game = new Game(parent, cardSet);

            game.setPairCard = cardPair;
            game.onCheckMatch();

            expect(Popup).toHaveBeenCalledWith(parent, 'lose', game.sec, game.min);
            expect(game.setPairCard).toEqual([]);
        });

        // it('should not show popup if the cards match', () => {
        //     const parent = document.createElement('div');
        //     const cards = [{ id: 1, value: 'A' }, { id: 1, value: 'A' }];
        //     const game = new Game(parent, cards);

        //     game.setPairCard = cards;
        //     game.onCheckMatch();

        //     expect(Popup).not.toHaveBeenCalled();
        //     expect(game.setPairCard).toEqual([]);
        // });
    });
});

