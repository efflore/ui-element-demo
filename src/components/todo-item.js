import { UIElement, on, toggleClass } from '@efflore/ui-element'

import './todo-item.css'

class TodoItem extends UIElement {
    connectedCallback() {
        this.first('input').map(on('change', e => this.set('completed', e.target.checked)))
        this.self.map(toggleClass('completed'))
    }
}

TodoItem.define('todo-item')