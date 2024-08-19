import { describe, it, expect } from 'vitest';

describe('InputField Component', () => {
    it('should create an input element', () => {
        const element = document.createElement('input-field');
        expect(element).toBeTruthy();
        expect(element.tagName.toLowerCase()).toBe('input-field');
    });

    /* it('should have a mutable value state', async () => {
        const element = document.createElement('input-field');
        await customElements.whenDefined('input-field');
        element.set('value', 'Hello, World!');
        expect(element.has('value')).toBeTruthy();
        expect(element.get('value')).toBe('Hello, World!');
    });

    it('should get default value from value of input element', async () => {
        const input = document.createElement('input');
        input.value = 'Hello, World!';
        expect(input.value).toBe('Hello, World!');
        const element = document.createElement('input-field');
        element.appendChild(input);
        await customElements.whenDefined('input-field');
        expect(element.first('input')[0]).toBe(element.querySelector('input'));
        // expect(element.has('value')).toBeTruthy();
        // expect(element.get('value')).toBe('Hello, World!');
    }); */
});