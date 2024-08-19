import { UIElement, on, toggleClass } from '@efflore/ui-element'

import './todo-item.css'

class TodoItem extends UIElement {
    connectedCallback() {
        this.first('input').map(on('change', 'completed', e => e.target.checked), this)
        this.self.map(toggleClass('completed'), this)
    }
}

TodoItem.define('todo-item')