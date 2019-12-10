import FormView from '../views/FormVeiw.js'
import ResultView from '../views/ResultVeiw.js'
import SearchModel from '../models/SearchModel.js'

const tag = '[MainController]'

export default{
  init(){
    FormView.setup(document.querySelector('form'))
      .on('@submit',e=>this.onSubmit(e.detail.input))//이건 나중에 구현?
      .on('@reset',e=>this.onResetForm())//이건 나중에 구현?
      
    ResultView.setup(document.querySelector('#search-result'))

  },
  search(query){
    console.log(tag,'search()',query)
    SearchModel.list(query).then(data=>{
      this.onSearchResult(data)
    })
  },
  onSearchResult(data){
    ResultView.render(data)
  },

  onSubmit(input) {
    console.log(tag, 'onSubmit()', input)
    this.search(input)
  },
  onResetForm(){
    console.log(tag,'onReset()')
  },

}