import templateEngine from './lib/template-engine'
import Level from './script'
import LoseIcon from './img/loseicon.svg'
import WinIcon from './img/winicon.svg'

export default class Popup {
    parent: Element
    result: string
    popupBackground: Element
    popupPlayAgainButton: Element | undefined
    element: Element | undefined
    sec!: string
    min!: string
    constructor(body: Element, result: string, sec: string, min: string) {
        this.parent = body
        this.result = result
        this.sec = sec || ''
        this.min = min || ''
        this.popupBackground = templateEngine(Popup.PopupBackgroundTemplate())
        this.parent.appendChild(this.popupBackground)

        this.renderPopup.bind(this)
        this.renderPopup()
        if (this.element) {
            const playAgainButton = this.element.querySelector(
                '.popup_play-again-button'
            )
            if (playAgainButton) {
                this.popupPlayAgainButton = playAgainButton
            }
        }

        this.onRestartGameClick.bind(this)
        if (this.popupPlayAgainButton) {
            this.popupPlayAgainButton.addEventListener(
                'click',
                this.onRestartGameClick.bind(this)
            )
        }
    }
    static PopupBackgroundTemplate() {
        throw new Error('Method not implemented.')
    }

    onRestartGameClick() {
        const element = document.querySelector('.body')
        this.parent.replaceChildren()
        new Level(element)
    }

    renderPopup() {
        if (this.result === 'lose') {
            this.element = templateEngine(
                Popup.PopupLoseTemplate(
                    this.result,
                    'Вы проиграли!',
                    this.min,
                    this.sec
                )
            )
            if (this.element) {
                this.parent.appendChild(this.element)
            }
        } else if (this.result === 'win') {
            this.element = templateEngine(
                Popup.PopupWinTemplate(
                    this.result,
                    'Вы выиграли!',
                    this.min,
                    this.sec
                )
            )
            if (this.element) {
                this.parent.appendChild(this.element)
            }
        }
    }

    static PopupLoseTemplate(
        _result: string,
        _arg1: string,
        _min: string,
        _sec: string
    ) {
        throw new Error('Method not implemented.')
    }
    static PopupWinTemplate(
        _result: string,
        _arg1: string,
        _min: string,
        _sec: string
    ) {
        throw new Error('Method not implemented.')
    }
}

Popup.PopupBackgroundTemplate = () => ({
    tag: 'section',
    cls: 'result-background',
})

Popup.PopupWinTemplate = (
    resultTag: string,
    resultText: string,
    min: string,
    sec: string
) => ({
    tag: 'div',
    cls: `${resultTag}`,
    content: [
        {
            tag: 'img',
            cls: `${resultTag}__popup_icon`,
            attrs: {
                src: `${WinIcon}`,
            },
        },
        {
            tag: 'div',
            cls: `${resultTag}__popup_title`,
            content: resultText,
        },
        {
            tag: 'div',
            cls: `${resultTag}__popup_stopwath-title`,
            content: 'Затраченное время:',
        },
        {
            tag: 'div',
            cls: `${resultTag}__popup_stopwath-display`,
            content: `${min}.${sec}`,
        },
        {
            tag: 'button',
            cls: [
                'popup_play-again-button',
                `${resultTag}__popup_play-again-button`,
            ],
            content: 'Играть снова',
        },
    ],
})

Popup.PopupLoseTemplate = (
    resultTag: string,
    resultText: string,
    min: string,
    sec: string
) => ({
    tag: 'div',
    cls: `${resultTag}`,
    content: [
        {
            tag: 'img',
            cls: `${resultTag}__popup_icon`,
            attrs: {
                src: `${LoseIcon}`,
            },
        },
        {
            tag: 'div',
            cls: `${resultTag}__popup_title`,
            content: resultText,
        },
        {
            tag: 'div',
            cls: `${resultTag}__popup_stopwath-title`,
            content: 'Затраченное время:',
        },
        {
            tag: 'div',
            cls: `${resultTag}__popup_stopwath-display`,
            content: `${min}.${sec}`,
        },
        {
            tag: 'button',
            cls: [
                'popup_play-again-button',
                `${resultTag}__popup_play-again-button`,
            ],
            content: 'Играть снова',
        },
    ],
})
