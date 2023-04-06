/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import Game from '../play'
const { it, expect, describe } = require("@jest/globals");

describe('Game', () => {
    describe('startTimer', () => {
        it('should start the timer and display the elapsed time', () => {

            const parent = document.createElement('div')
            const game = new Game(parent, [1, 2, 3])

            const timerMinutes = game.element.querySelector<HTMLElement>('.timer__minutes');
            const timerSeconds = game.element.querySelector<HTMLElement>('.timer__seconds');

            jest.useFakeTimers()
            game.startTimer()
            jest.advanceTimersByTime(3000)

            expect(timerMinutes?.textContent).toBe('00.')
            expect(timerSeconds?.textContent).toBe('03')

        })
    })
})
