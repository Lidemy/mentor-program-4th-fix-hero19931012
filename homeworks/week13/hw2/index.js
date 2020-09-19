/* eslint-disable */
import { cssTemplate, getForm } from './templates.js'
import { getComments, addComments } from './api'
import $ from 'jquery'

export function init(options) {

  // declare variables inside function
  // 如果同一個 html 呼叫 2 次以上 init()，變數才不會被覆蓋
  let siteKey = ''
  let apiUrl = ''
  let containerElement = null
  let commentsDOM = null
  let offset = 0
  let commentsClassName = ''
  let addFormClassName = ''
  let loadMoreClassName = ''

  siteKey = options.siteKey
  apiUrl = options.apiUrl

  //setting unique class names
  commentsClassName = `${siteKey}-comments`
  addFormClassName = `${siteKey}-add-comment-form`
  loadMoreClassName = `${siteKey}-load-more-form`

  containerElement = $(options.containerSelector)
  containerElement.append(getForm(addFormClassName, commentsClassName, loadMoreClassName))

  // import css
  const styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  styleElement.appendChild(document.createTextNode(cssTemplate));
  document.head.appendChild(styleElement)

  commentsDOM = $(`.${commentsClassName}`)

  // first load
  getComments(apiUrl, siteKey, offset, commentsDOM)

  // add comment
  $(`.${addFormClassName}`).submit((e) => {
    e.preventDefault()
    addComments(apiUrl, siteKey, commentsDOM)
  })

  // load more
  $(`.${loadMoreClassName}`).submit((e) => {
    e.preventDefault()
    getComments(apiUrl, siteKey, offset += 5, commentsDOM)
  })
}
