import FormView from '../views/FormVeiw.js'

const tag = '[MainController]'

export default{
  init(){
    FormView.setup(document.querySelector('form'))
      .on('@submit',e=>this.onSubmit(e.detail.input))//이건 나중에 구현?
      .on('@reset',e=>this.onResetForm())//이건 나중에 구현?
      
  },
  onSubmit(input) {
    console.log(tag, 'onSubmit()', input)
  },
  onResetForm(){
    console.log(tag,'onReset()')
  },

}