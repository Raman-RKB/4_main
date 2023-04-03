import templateEngine from './lib/template-engine'
import Popup from './popup'

import Face from './img/face.jpg'
import Level from './script'

export default class Game {
    parent: Element
    cardSet: number[]
    setPairCard: Element[]
    setArr: Element[]
    element: Element
    timerMinutes: Element
    timerSeconds: Element
    gameHeaderRestartButton: Element
    cardSetItem!: any
    timer: any

    constructor(parent: Element, cardSet: number[]) {
        this.parent = parent

        this.cardSet = cardSet

        this.setPairCard = []
        this.setArr = []
        // eslint-disable-next-line no-undef
        this.element = templateEngine(Game.startPlayTemplate())
        parent.appendChild(this.element)

        this.timerMinutes = this.element.querySelector(
            '.timer__minutes'
        ) as Element

        this.timerSeconds = this.element.querySelector(
            '.timer__seconds'
        ) as Element

        this.onStartTimer()

        this.gameHeaderRestartButton = this.element.querySelector(
            '.game__header_restart-button'
        ) as Element

        this.onRenderGameInterface.bind(this)
        this.onRenderGameInterface()

        this.onShowCards = this.onShowCards.bind(this)

        this.onCheckMatch = this.onCheckMatch.bind(this)

        this.gameHeaderRestartButton.addEventListener(
            'click',
            this.onRestartGameClick.bind(this)
        )
    }
    static startPlayTemplate() {
        throw new Error('Method not implemented.')
    }

    onRenderGameInterface() {
        this.cardSet.forEach((el: number) => {
            this.cardSetItem = templateEngine(Game.cardSetItemTemplate(el))
            this.element.appendChild(this.cardSetItem)
        })

        if (this.cardSet.length === 6) {
            this.element.classList.add('game-row-adapting-if-6-cards')
            const gameHeader = this.element.querySelector('.game__header')
            if (gameHeader !== null) {
                gameHeader.classList.add(
                    'game__header-span-adapting-if-6-cards'
                )
            }
        }

        if (this.cardSet.length === 12) {
            const element = this.element.childNodes[
                this.element.childNodes.length - 3
            ] as Element

            element.classList.add('second-row-centering-if-12-cards')

            const gameHeaderMinPointer = this.element.querySelector(
                '.game__header_min-pointer'
            )
            if (gameHeaderMinPointer !== null) {
                gameHeaderMinPointer.classList.add(
                    'game__header_min-display-adapting-if-12-cards'
                )
            }

            const gameHeaderSinPointer = this.element.querySelector(
                '.game__header_sec-pointer'
            )
            if (gameHeaderSinPointer !== null) {
                gameHeaderSinPointer.classList.add(
                    'game__header_sec-display-adapting-if-12-cards'
                )
            }
        }

        if (this.cardSet.length === 18) {
            const gameHeaderMinPointer = this.element.querySelector(
                '.game__header_min-pointer'
            )

            if (gameHeaderMinPointer !== null) {
                gameHeaderMinPointer.classList.add(
                    'game__header_min-display-adapting-if-12-cards'
                )
            }

            const gameHeaderSinPointer = this.element.querySelector(
                '.game__header_sec-pointer'
            )

            if (gameHeaderSinPointer !== null) {
                gameHeaderSinPointer.classList.add(
                    'game__header_sec-display-adapting-if-12-cards'
                )
            }
        }
        setTimeout(this.onHideCards.bind(this), 5000)
    }
    static cardSetItemTemplate(el: number) {
        throw new Error('Method not implemented.')
    }

    onRestartGameClick() {
        const element = document.querySelector('.body')
        this.element.remove()
        // eslint-disable-next-line no-undef
        new Level(element)
    }

    onCheckMatch() {
        if (this.setPairCard[0] !== this.setPairCard[1]) {
            new Popup(
                this.parent,
                'lose',
                `${this.timerMinutes.textContent}.${this.timerSeconds.textContent}`
            )
            this.onPauseTimer()
        }

        this.setPairCard = []
    }

    onShowCards(event: Event) {
        if (event.target instanceof Element) {
            const target = event.target as HTMLElement
            target.style.backgroundImage = ''

            if (this.setPairCard.length === 0) {
                this.setArr.push(target)
                this.setPairCard.push(target)
            } else if (
                this.setPairCard.length > 0 &&
                this.setArr.length < this.cardSet.length - 1
            ) {
                this.setArr.push(target)
                this.setPairCard.push(target)
                this.onCheckMatch()
            } else {
                new Popup(
                    this.parent,
                    'win',
                    `${this.timerMinutes.textContent}.${this.timerSeconds.textContent}`
                )
                this.onPauseTimer()
            }
        }
    }

    onHideCards() {
        for (let i = 1; i <= this.cardSet.length; i++) {
            const element = this.element.childNodes[
                this.element.childNodes.length - i
            ] as HTMLElement
            element.style.backgroundImage = `${Face}`
            this.element.addEventListener('click', this.onShowCards)
        }
    }

    onStartTimer(this: any) {
        this.timerMinutes.setAttribute('data-minutes', '')
        this.timerSeconds.setAttribute('data-seconds', '')

        this.timer.stopOnZero = false
    }

    onPauseTimer() {
        this.timer.pause = true
    }
}

Game.cardSetItemTemplate = (el) => ({
    tag: 'div',
    cls: ['game__container_item', `game__container_item-${el}`],
    attrs: {
        id: `${el}`,
    },
})

Game.startPlayTemplate = () => ({
    tag: 'section',
    cls: 'game',
    content: [
        {
            tag: 'div',
            cls: 'game__header',
            content: [
                {
                    tag: 'div',
                    cls: 'timer',
                    content: [
                        {
                            tag: 'div',
                            cls: 'timer__minutes',
                        },
                        {
                            tag: 'div',
                            //cls: 'timer__minutes',
                            content: '.',
                        },
                        {
                            tag: 'div',
                            cls: 'timer__seconds',
                            //content: '.'
                        },
                    ],
                },
                {
                    tag: 'div',
                    cls: 'game__header_min-pointer',
                    content: 'min',
                },
                {
                    tag: 'div',
                    cls: 'game__header_sec-pointer',
                    content: 'sek',
                },
                {
                    tag: 'button',
                    cls: 'game__header_restart-button',
                    content: 'Начать заново',
                },
            ],
        },
    ],
})
function timezz(timerElement: Element, arg1: { date: Date }): any {
    throw new Error('Function not implemented.')
}
