import { UIElement, on } from '@efflore/ui-element'

class InputField extends UIElement {

    connectedCallback() {
        this.first('input')
            .map(el => {
                this.set('value', el.value)
                this.set('valid', el.validity.valid)
                return el
            })
            .map(on('change', 'value', e => e.target.value), this)
            .map(on('input', 'valid', e => e.target.validity.valid), this)
    }

    clearField = () => {
        this.querySelector('input').value = ''
    }
}

InputField.define('input-field')