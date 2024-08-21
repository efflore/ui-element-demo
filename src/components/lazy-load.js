import { UIElement, effect } from '@efflore/ui-element'

class LazyLoad extends UIElement {
    connectedCallback() {
        this.set('error', '')
        this.set('content', () => {
            fetch(this.getAttribute('src')) // TODO ensure 'src' attribute is a valid URL from a trusted source
                .then(async response => response.ok
                    ? this.set('content', await response.text())
                    : this.set('error', response.statusText)
                )
                .catch(error => this.set('error', error))
            return // we don't return a fallback value
        })

        effect(() => {
            const error = this.get('error')
            if (!error) return
            this.querySelector('.loading').remove() // remove placeholder for pending state
            this.querySelector('.error').textContent = error
        })

        effect(() => {
            const content = this.get('content')
            if (content) this.innerHTML = content // UNSAFE!, use only trusted sources in 'src' attribute
        })
    }
}

LazyLoad.define('lazy-load')