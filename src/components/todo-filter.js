import { UIElement, on, effect } from '@efflore/ui-element'

import './todo-filter.css'

class TodoFilter extends UIElement {
    connectedCallback() {

        // set filter state
        this.set('filter', this.first('input[checked]').value)
        this.all('input').map(on('change', 'filter', e => e.target.value), this)

        // effect
        effect(() => {
            this.dispatchEvent(new CustomEvent('update-filter', { detail: this.get('filter'), bubbles: true }))
        })
    }
}

TodoFilter.define('todo-filter')