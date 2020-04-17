import React from 'react'
import { animated } from 'react-spring'
import styled from 'styled-components/macro'
import Markdown from '../common/Markdown'
import Feedback from './Feedback'

export default function Answer({
  setPractice,
  needsPractice,
  style,
  bind,
  content,
  showPracticeButtons = true,
}) {
  return (
    <Outer style={style} {...bind}>
      <div css="margin: 20px;">
        <Markdown>{content}</Markdown>
        {showPracticeButtons && (
          <>
            <Feedback setPractice={setPractice} needsPractice={needsPractice} />
          </>
        )}
      </div>
    </Outer>
  )
}

const Outer = styled(animated.div)`
  word-break: break-word;
  background: #f2f2f2;
  margin: 10px -20px 10px;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
  }

  &::before {
    height: 8px;
    background: linear-gradient(#0002, #0000);
  }

  &::after {
    height: 8px;
    bottom: 0;
    background: linear-gradient(#0000, #0001);
  }
`
