import {mutations as core_mutations} from "../mutations"

export class mutations extends core_mutations{
  setModal = (state,{template , data , show }:{template : string , data : {any} , show : boolean}) =>{
    state.template = template;
    state.data = data;
  }
  toggleModal = (state) =>{
    if(!state.show){
      state.close = true;
    }
    state.show = ( state.show ) ? false : true; 
  }

  closeModal = (state) => {
    state.show = false;                                                                                                                                                                                              
  }

  openModal = (state) => {
    state.show = true;                                                                                                                                                                                              
  }

}