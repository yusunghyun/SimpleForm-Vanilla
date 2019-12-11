import FormView from '../views/FormVeiw.js'
import ResultView from '../views/ResultVeiw.js'
import SearchModel from '../models/SearchModel.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js' //.js필수...!!!!!!!!
import KeywordModel from '../models/KeywordModel.js'

const tag = '[MainController]'

export default{
  init(){//여기는 수신하는 곳
    FormView.setup(document.querySelector('form'))
      .on('@submit',e=>this.onSubmit(e.detail.input))//이건 나중에 구현?
      .on('@reset',e=>this.onResetForm())//이건 나중에 구현?
      
    TabView.setup(document.querySelector('#tabs'))
      .on('@change', e => this.onChangeTab(e.detail.tabName));

    KeywordView.setup(document.querySelector('#search-keyword'))
      .on('@click',e=>this.onClickKeyword(e.detail.keyword))

    ResultView.setup(document.querySelector('#search-result'))

    this.seletedTab = '추천 검색어';//this는 컨트롤?
    this.renderView()
    
  },
  
  renderView(){
    console.log(tag,'renderView()')
    TabView.setActiveTab(this.seletedTab)
    if(this.seletedTab === '추천 검색어'){
      this.fetchSearchKeyword()
    }
    else{

    }
    ResultView.hide()
  },

  fetchSearchKeyword(){
    KeywordModel.list().then(data=>{
      KeywordView.render(data)
    })
  },

  search(query){
    console.log(tag,'search()',query)
    SearchModel.list(query).then(data=>{
      this.onSearchResult(data)
    })
  },
  onSearchResult(data){
    TabView.hide()
    KeywordView.hide()
    ResultView.render(data)
  },

  onSubmit(input) {
    console.log(tag, 'onSubmit()', input)
    this.search(input)
  },
  onResetForm(){
    console.log(tag,'onReset()')
    ResultView.hide()//hide하고 다시 원상복귀가 안되는데?
  },

  onChangeTab(tabName){
    debugger
  },

  onClickKeyword(keyword){
    this.search(keyword)
  },

}