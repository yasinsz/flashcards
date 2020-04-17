import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/macro'

Tag.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
}

export default function Tag({ text, color }) {
  return <TagStyled color={color}>{text}</TagStyled>
}

const TagStyled = styled.li`
  display: inline-block;
  font-size: 0.8em;
  padding: 0 6px;
  background: ${props => props.color || '#eee'};
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-right: 4px;
`
