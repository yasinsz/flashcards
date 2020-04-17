import MarkdownIt from 'markdown-it'
import React from 'react'
import styled from 'styled-components/macro'
import * as hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

export default function Markdown({ children }) {
  return (
    <Wrapper
      dangerouslySetInnerHTML={{ __html: md.render(children) }}
    ></Wrapper>
  )
}

const md = new MarkdownIt({
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (_) {}
    }

    return '' // use external default escaping
  },
})

const Wrapper = styled.div`
  pre {
    word-break: break-word;
    white-space: pre-line;
  }
`
