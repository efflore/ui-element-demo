import { UIElement, pass, effect } from '@efflore/ui-element'

class TodoForm extends UIElement {

    connectedCallback() {
        this.set('valid', () => this.all('input-field').every(el => el.get('valid')))
        this.all('input-field')
            .map(el => {
                el.addEventListener('keypress', e => {
                    if (e.key === 'Enter') {
                        el.blur()
                        this.submitForm()
                    }
                })
                return el
            })
        this.first('.submit')
            .map(el => {
                el.addEventListener('click', this.submitForm)
                return el
            })
            .map(pass(this, {
                disabled: () => !this.get('valid')
            }))
    }

    submitForm = () => {
        setTimeout(() => { // push to end of call stack to allow child elements to update
            if (!this.get('valid')) return
            const task = this.querySelector('input-field').get('value')
            this.dispatchEvent(new CustomEvent('add-task', {
                bubbles: true,
                detail: task
            }))
            this.querySelector('input-field').clearField()
        })
    }
}

TodoForm.define('todo-form')