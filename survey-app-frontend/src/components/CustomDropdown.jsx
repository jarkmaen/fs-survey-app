// https://react-bootstrap.netlify.app/docs/components/dropdowns/#custom-dropdown-components

import React from 'react'

const CustomMenu = React.forwardRef(({ 'aria-labelledby': labeledBy, children, className, style }, ref) => (
    <div aria-labelledby={labeledBy} className={className} ref={ref} style={style}>
        <ul style={{ marginBottom: 0, paddingLeft: 0 }}>{React.Children.toArray(children)}</ul>
    </div>
))

CustomMenu.displayName = 'CustomMenu'

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        onClick={(e) => {
            e.preventDefault()
            onClick(e)
        }}
        ref={ref}
    >
        {children} &#x25bc;
    </a>
))

CustomToggle.displayName = 'CustomToggle'

export { CustomToggle, CustomMenu }
