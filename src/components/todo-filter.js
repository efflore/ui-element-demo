import { UIElement, on } from '@efflore/ui-element'

import './todo-filter.css'

class TodoFilter extends UIElement {
    connectedCallback() {
        this.set('selected', this.querySelector('input[checked]')?.value)
        this.all('input')
            .map(on('change', e => this.set('selected', e.target.value)))
    }
}

TodoFilter.define('todo-filter')