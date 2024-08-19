import { UIElement, setAttribute } from '@efflore/ui-element'

import './todo-list.css'

class TodoList extends UIElement {

    connectedCallback() {

        // set filter state
        this.set('filter', 'all')
        this.self.map(setAttribute('filter'), this)

        // event listener
        this.addEventListener('click', e => {
            if (e.target.localName === 'input') this.updateCount()
            else if (e.target.localName === 'button') this.removeItem(e.target)
        })
    }

    addItem = task => {
        const template = this.querySelector('template').content.cloneNode(true)
        template.querySelector('span').textContent = task
        this.querySelector('ul').appendChild(template)
        this.updateCount()
        return true
    }

    removeItem = element => {
        element.closest('li').remove()
        this.updateCount()
        return true
    }

    updateCount = () => {
        setTimeout(() => { // push to end of call stack to allow child elements to update
            const items = this.all('todo-item')
            const completed = items.filter(el => el.get('completed')).length
            const count = {
                active: items.length - completed,
                completed,
                total: items.length
            }
            this.dispatchEvent(new CustomEvent('update-count', { bubbles: true, detail: count }))
        })
    }

    clearCompleted = () => {
        this.all('todo-item').filter(el => el.get('completed')).forEach(el => el.parentElement.remove())
        this.updateCount()
        return true
    }

}

TodoList.define("todo-list")