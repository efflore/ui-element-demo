import { UIElement, on, off, effect } from '@efflore/ui-element'

class PageRouter extends UIElement {
    static providedContexts = ['route']

    connectedCallback() {
        const outlet = this.querySelector(this.getAttribute('outlet') || 'main')
        if (!outlet) throw new Error('Outlet element not found')
        this.set('route', this.getAttribute('route') || '/')
        this.set('content', '')
        
        // Prevent server navigation for internal pages
        this.all('a[href^="/"]').forEach(on('click', this.handleLinkClick))
        window.addEventListener('popstate', this.handlePopState)

        effect(() => {
            const route = this.get('route')
            window.history.pushState({}, '', route)
            this.querySelectorAll('a[aria-current="page"]')
                .forEach(el => el.setAttribute('aria-current', 'false'))
            this.querySelectorAll(`a[href="${route}"]`)
                .forEach(el => el.setAttribute('aria-current', 'page'))
        })

        effect(() => {
            const content = this.get('content')
            if (content) outlet.innerHTML = content
        })

        effect(() => {
            const error = this.get('error')
            if (error) outlet.innerHTML = `<error-message>${error}</error-message>`
        })
    }

    disconnectedCallback() {
        window.removeEventListener('popstate', this.handlePopState)
        this.all('a[href^="/"]').forEach(off('click', this.handleLinkClick))
    }

    navigateTo = route => {
        this.set('route', route)
        this.set('content', () => {
            fetch(route)
                .then(async response => response.ok
                    ? this.set('content', await response.text())
                    : this.set('error', response.statusText)
                )
                .catch(error => this.set('error', error))
            return ''
        })
    }

    handlePopState = () => this.navigateTo(window.location.pathname)

    handleLinkClick = e => {
        e.preventDefault()
        this.navigateTo(e.target.getAttribute('href'))
    }
}

PageRouter.define('page-router')