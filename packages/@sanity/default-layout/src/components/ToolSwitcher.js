import PropTypes from 'prop-types'
import React from 'react'
import {Tooltip} from 'react-tippy'
import PluginIcon from 'part:@sanity/base/plugin-icon'

import styles from './styles/ToolSwitcher.css'

function ToolSwitcher(props) {
  const {activeToolName, renderItem, showIcon, showLabel, tools} = props

  return (
    <ul className={styles.root}>
      {tools.map(tool => {
        const isActive = activeToolName === tool.name
        const itemClassName = isActive ? styles.activeItem : styles.item
        const Icon = tool.icon || PluginIcon

        const children = (
          <>
            {showIcon && (
              <span className={styles.toolIconContainer}>
                <Icon />
              </span>
            )}
            {showLabel && <span className={styles.toolLabel}>{tool.title || tool.name}</span>}
          </>
        )

        return (
          <li key={tool.name}>
            <Tooltip
              title={tool.title}
              arrow
              inertia
              theme="dark"
              distance="8"
              sticky
              size="small"
              disabled={showLabel}
            >
              {renderItem ? (
                renderItem({className: itemClassName, children, tool})
              ) : (
                <a className={itemClassName}>{children}</a>
              )}
            </Tooltip>
          </li>
        )
      })}
    </ul>
  )
}

ToolSwitcher.defaultProps = {
  activeToolName: undefined,
  renderItem: undefined,
  showIcon: true,
  showLabel: true,
  tools: []
}

ToolSwitcher.propTypes = {
  activeToolName: PropTypes.string,
  renderItem: PropTypes.func,
  showIcon: PropTypes.bool,
  showLabel: PropTypes.bool,
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string,
      icon: PropTypes.func
    })
  )
}

export default ToolSwitcher
