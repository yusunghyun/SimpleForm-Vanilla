import View from './View.js'

const tag='[FormView]'

const FormView = Object.create(View)

FormView.setup = function(el){
  this.init(el)
  this.inputEL = el.querySelector('[type=text]')
  this.resetEL = el.querySelector('[type=reset]')
  this.showResetBtn(false)
}

FormView.showResetBtn = function(show=true){
  this.resetEL.style.display = show ? 'block':'none';
}

export default FormView