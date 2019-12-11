import FormView from '../views/FormVeiw.js'
import ResultView from '../views/ResultVeiw.js'
import SearchModel from '../models/SearchModel.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js' //.js필수...!!!!!!!!
import KeywordModel from '../models/KeywordModel.js'
import HistoryView from '../views/HistoryView.js'
import HistoryModel from '../models/HistoryModel.js'

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

    HistoryView.setup(document.querySelector('#search-history'))
      .on('@click',e=>this.onClickHistory(e.detail.keyword))
      .on('@remove',e=>this.onRemoveHistory(e.detail.keyword))

    ResultView.setup(document.querySelector('#search-result'))

    this.seletedTab = '추천 검색어';//this는 컨트롤?
    this.renderView()
    
  },
  
  renderView(){
    console.log(tag,'renderView()')
    TabView.setActiveTab(this.seletedTab)
    if(this.seletedTab === '추천 검색어'){
      this.fetchSearchKeyword()
      HistoryView.hide()
    }
    else{
      this.fetchSearchHistory()
      KeywordView.hide()
    }
    ResultView.hide()
  },

  fetchSearchKeyword(){
    KeywordModel.list().then(data=>{
      KeywordView.render(data)
    })
  },
  fetchSearchHistory(){
    HistoryModel.list().then(data=>{
      HistoryView.render(data).bindRemoveBtn()
    })
  },

  search(query){
    console.log(tag,'search()',query)
    FormView.setValue(query)
    HistoryModel.add(query)
    SearchModel.list(query).then(data=>{
      this.onSearchResult(data)
    })
  },
  onSearchResult(data){
    TabView.hide()
    KeywordView.hide()
    HistoryView.hide()
    ResultView.render(data)
  },

  onSubmit(input) {
    console.log(tag, 'onSubmit()', input)
    this.search(input)
  },

  onResetForm(){
    console.log(tag,'onReset()')
    ResultView.hide()//hide하고 다시 원상복귀가 안되는데?
    this.renderView() //초기화면 = 추천검색어로 가야함!
  },

  onChangeTab(tabName){
    this.seletedTab = tabName
    this.renderView()
  },//???

  onClickKeyword(keyword){
    this.search(keyword)
  },

  onClickHistory(keyword){
    this.search(keyword)
  },

  onRemoveHistory(keyword){
    HistoryModel.remove(keyword)
    this.renderView()
  }

}