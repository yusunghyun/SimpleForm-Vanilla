import View from './View.js'

const tag='[FormView]'

const FormView = Object.create(View)

FormView.setup = function(el){
  this.init(el)
  this.inputEL = el.querySelector('[type=text]')
  this.resetEL = el.querySelector('[type=reset')
  this.showResetBtn(false)
  this.bindEvents()
  return this
}

FormView.showResetBtn = function(show=true){
  this.resetEL.style.display = show ? 'block':'none';
}

FormView.bindEvents = function(){
  this.on('submit', e => e.preventDefault() )
  this.inputEL.addEventListener('keyup', e => this.onKeyup(e))
  this.resetEL.addEventListener('click',e=>this.onClickReset())
}

FormView.onKeyup = function(e){
  const enter = 13
  this.showResetBtn(this.inputEL.value.length)
  if(!this.inputEL.value.length) this.emit('@reset')
  if(e.keyCode === enter) return this.emit('@submit',{input: this.inputEL.value}) 
}

FormView.onClickReset = function(){
  this.emit('@reset')
  this.showResetBtn(false)
}


export default FormView