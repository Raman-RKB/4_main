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
    gameHeaderRestartButton: Element
    cardSetItem!: HTMLElement
    timer: NodeJS.Timeout | null = null
    sec: string
    min: string

    constructor(parent: Element, cardSet: number[]) {
        this.parent = parent
        this.timer = null
        this.cardSet = cardSet
        this.sec = ''
        this.min = ''

        this.setPairCard = []
        this.setArr = []
        this.element = templateEngine(Game.startPlayTemplate())
        parent.appendChild(this.element)

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
        this.startTimer()
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

    static cardSetItemTemplate(_el: number) {
        throw new Error('Method not implemented.')
    }

    startTimer() {
        let seconds = 0
        const timerMinutes = this.element.querySelector(
            '.timer__minutes'
        ) as Element
        const timerSeconds = this.element.querySelector(
            '.timer__seconds'
        ) as Element

        this.timer = setInterval(() => {
            seconds++

            const minutes = Math.floor(seconds / 60)
            const remainingSeconds = seconds % 60

            const formattedMinutes = String(minutes).padStart(2, '0')
            const formattedSeconds = String(remainingSeconds).padStart(2, '0')

            timerMinutes.textContent = `${formattedMinutes}.`
            timerSeconds.textContent = formattedSeconds
            this.sec = formattedSeconds
            this.min = formattedMinutes
        }, 1000)
    }

    onRestartGameClick() {
        const element = document.querySelector('.body')
        this.element.remove()
        new Level(element)
    }

    onCheckMatch() {
        if (this.setPairCard[0].id !== this.setPairCard[1].id) {
            new Popup(this.parent, 'lose', this.sec, this.min)
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
                new Popup(this.parent, 'win', this.sec, this.min)
            }
        }
    }

    onHideCards() {
        for (let i = 0; i < this.cardSet.length; i++) {
            const element = this.element.childNodes[
                this.element.childNodes.length - i - 1
            ] as HTMLElement
            element.style.backgroundImage = `url(${Face})`

            this.element.addEventListener('click', this.onShowCards)
        }
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
                            content: '00.',
                        },
                        {
                            tag: 'div',
                            cls: 'timer__seconds',
                            content: '00',
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
