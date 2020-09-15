/* eslint-disable */
import { addCommentToDOM } from './utils.js'

export function getComments(apiUrl, siteKey, offset, commentsDOM) {
  $.ajax({
    url: `${apiUrl}/api_comments.php?site_key=${siteKey}&offset=${offset}`,
    success: (data) => {
      if (!data.ok) {
        alert(data.message)
      }
  
      const comments = data.comments
      for (let i = 0; i < comments.length; i++) {
        addCommentToDOM(commentsDOM, comments[i], false)
      }
      if (offset !== 0 && comments.length < 5) {
        console.log('less than 5', true);
        $(`form.${siteKey}-load-more-form .btn-load-more`).hide()
      }
    }
  })
}

export function addComments(apiUrl, siteKey, commentsDOM) {
  const commentData = {
    'site_key': siteKey,
    'nickname': $(`form.${siteKey}-add-comment-form input[name=nickname`).val(),
    'content': $(`form.${siteKey}-add-comment-form textarea[name=content]`).val(),
  }
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comment.php`,
    data: commentData,
    success: (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      addCommentToDOM(commentsDOM, commentData, true)
      $(`form.${siteKey}-add-comment-form input[name=nickname`).val('')
      $(`form.${siteKey}-add-comment-form textarea[name=content]`).val('')
    }
  })
}