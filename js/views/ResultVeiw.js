import View from './View.js'

const tag = "[ResultView]"

const ResultView = Object.create(View)

ResultView.setup = function (el){
  this.init(el)
}

ResultView.render = function(data = [] ){
  console.log(tag,'render()',data);
  this.el.innerHTML = data.length ? this.getSearchResultHtml(data) : "검생결과가 없습니다"
}

ResultView.getSearchResultHtml = function(data){
  debugger
}

export default ResultView