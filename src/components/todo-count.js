import { UIElement, setText, toggleClass } from '@efflore/ui-element'

class TodoCount extends UIElement {
    connectedCallback() {
        this.set('active', 0, false) // default state

        // derived states
        this.set('zero-active', () => this.get('active') === 0)
        this.set('has-active', () => this.get('active') !== 0)

        // effects
        this.first('span').map(setText('active'))
        this.first('.all-done').map(toggleClass('hidden', 'has-active'))
        this.first('.remaining').map(toggleClass('hidden', 'zero-active'))
    }
}

TodoCount.define('todo-count')