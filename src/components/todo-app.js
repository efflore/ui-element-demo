import { UIElement, on, pass } from '@efflore/ui-element'

class TodoApp extends UIElement {
    connectedCallback() {
        const todoList = this.querySelector('todo-list')
        const todoFilter = this.querySelector('todo-filter')
        
        // coordinate todo-count
        this.first('todo-count')
            .map(pass({ active: () => todoList?.get('count').active }))

        // coordinate todo-list
        this.first('todo-list')
            .map(pass({ filter: () => todoFilter?.get('selected') }))

        // coordinate .clear-completed button
        this.first('.clear-completed')
            .map(on('click', () => todoList?.clearCompleted()))
            .map(pass({ disabled: () => todoList?.get('count').completed === 0 }))
        
        // event listener on own element
        this.self
            .map(on('add-task', e => todoList?.addItem(e.detail)))
    }
}

TodoApp.define('todo-app')