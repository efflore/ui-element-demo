import { UIElement, on, setAttribute } from '@efflore/ui-element'

import './todo-list.css'

class TodoList extends UIElement {

    connectedCallback() {

        // set defaults
        this.set('filter', 'all')
        this.updateList()

        // update count on each change
        this.set('count', () => {
            const tasks = this.get('tasks').map(({ target }) => target.signal('completed'))
            const completed = tasks.filter(signal => signal()).length
            const total = tasks.length
            return { active: total - completed, completed, total }
        })

        // event listener and attribute on own element
        this.self
            .map(on('click', e => {
                if (e.target.localName === 'button') this.removeItem(e.target)
            }))
            .map(setAttribute('filter'))
    }

    updateList() {
        this.set('tasks', this.all('todo-item'))
    }

    addItem = task => {
        const template = this.querySelector('template').content.cloneNode(true)
        template.querySelector('span').textContent = task
        this.querySelector('ul').appendChild(template)
        this.updateList()
    }

    removeItem = element => {
        element.closest('li').remove()
        this.updateList()
    }

    clearCompleted = () => {
        this.all('todo-item')
            .filter(({ target }) => target.get('completed'))
            .forEach(({ target }) => target.parentElement.remove())
        this.updateList()
    }

}

TodoList.define('todo-list')