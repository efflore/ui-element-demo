import { UIElement, setProperty } from '@efflore/ui-element'

class InputButton extends UIElement {
    connectedCallback() {
        this.set('disabled', false)
        this.first('button').map(setProperty('disabled'))
    }
}

InputButton.define('input-button')