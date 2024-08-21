import { UIElement, on } from '@efflore/ui-element'

class InputField extends UIElement {
    
    connectedCallback() {
        this.first('input')
            .map(ui => {
                this.set('value', ui.target.value)
                this.set('valid', ui.target.validity.valid)
                return ui
            })
            .map(on('change', e => this.set('value', e.target.value)))
            .map(on('input', e => this.set('valid', e.target.validity.valid)))
    }

    clearField = () => {
        this.querySelector('input').value = ''
    }
}

InputField.define('input-field')