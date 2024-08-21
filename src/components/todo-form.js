import { UIElement, pass, on } from '@efflore/ui-element'

class TodoForm extends UIElement {

    connectedCallback() {
        this.set('valid', () => this.all('input-field').every(ui => ui.target.get('valid')))

        // prevent form submission when Enter is pressed
        this.first('form').map(on('submit', e => e.preventDefault()))

        // coordinate .submit button to be disabled until all fields are valid
        this.first('.submit')
            .map(on('click', () => this.submitForm()))
            .map(pass({ disabled: () => !this.get('valid') }))
    }

    submitForm = () => {
        setTimeout(() => { // push to end of call stack to allow children to update
            if (!this.get('valid')) return
            const input = this.querySelector('input-field')
            const task = input.get('value')
            this.dispatchEvent(new CustomEvent('add-task', {
                bubbles: true,
                detail: task
            }))
            input.clearField()
            input.focus()
        })
    }
}

TodoForm.define('todo-form')