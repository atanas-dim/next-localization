import parse, { DOMNode, domToReact, HTMLReactParserOptions } from 'html-react-parser'
import { cloneElement, createElement, HTMLAttributes, isValidElement, ReactElement } from 'react'

export type Variables = {
  [key: string]: string | number
}

export type CustomElementProps = HTMLAttributes<HTMLElement>

export type CustomElements = {
  [tag: string]: ((props: CustomElementProps) => ReactElement<CustomElementProps, string>) | ReactElement
}

export const parseT = (copy: string, variables?: Variables, customElements?: CustomElements): React.ReactNode => {
  const filledTemplate = (copy as string).replace(/\{(\w+)\}/g, (_, variable) => String(variables?.[variable]) || '')

  const options: HTMLReactParserOptions = {
    replace: (node: DOMNode) => {
      if (node.type === 'tag' && customElements) {
        const { name, attribs, children } = node
        const customElement = customElements[name]

        // Check if customElement is a function or a React element
        if (typeof customElement === 'function') {
          // If it's a function, create it with attribs and children
          return createElement(customElement, {
            ...attribs,
            children: domToReact(children as DOMNode[]),
          } as CustomElementProps)
        } else if (isValidElement(customElement)) {
          // If it's a React element, clone it to apply attribs and children
          return cloneElement(customElement, attribs)
        }
      }
      // Return the original node if no replacement is needed
      return node
    },
  }

  return parse(filledTemplate, options)
}
