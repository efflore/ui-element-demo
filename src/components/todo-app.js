import { UIElement, on, pass } from '@efflore/ui-element'

class TodoApp extends UIElement {
    connectedCallback() {
        const host = this

        // default state of the app
        this.set('count', {
            active: 0,
            completed: 0,
            total: 0
        }, false)
        this.set('filter', 'all')

        // derived state
        this.set('zero-completed', () => this.get('count').completed === 0)

        // pass states to child elements and set event listener
        this.first('todo-count')
            .map(pass(this, { active: () => this.get('count').active }))
        this.first('todo-list')
            .map(pass(this, { filter: () => this.get('filter') }))
        this.first('.clear-completed')
            .map(el => {
                el.addEventListener('click', e =>
                    host.first('todo-list')
                        .map(list => list.clearCompleted())
                )
                return el
            })
            .map(pass(this, { disabled: 'zero-completed' }))
        
        // event listeners on own element
        this.self
            .map(el => {
                el.addEventListener('add-task', e =>
                    host.first('todo-list')
                        .map(list => list.addItem(e.detail))
                )
                return el
            })
            .map(on('update-count', 'count', e => e.detail), this)
            .map(on('update-filter', 'filter', e => e.detail), this)
    }
}

TodoApp.define('todo-app')