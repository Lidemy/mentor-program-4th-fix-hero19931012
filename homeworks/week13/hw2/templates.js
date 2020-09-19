export const cssTemplate = '.card { margin-top: 12px }';
export function getForm(addFormClassName, commentsClassName, loadMoreClassName) {
  return `
    <form class="${addFormClassName} mt-5">
      <div class="form-group">
        <label for="nickname">暱稱</label>
        <input name="nickname" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label for="content-textarea">留言內容</label>
        <textarea name="content" class="form-control" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <div class="${commentsClassName} mt-3">
    </div>
    <form class="${loadMoreClassName} mt-3 mb-5">
      <button type="submit" class="btn btn-primary btn-load-more">載入更多</button>
    </form>
  `;
}
