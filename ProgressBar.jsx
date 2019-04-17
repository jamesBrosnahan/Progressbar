class ProgressBar extends HTMLElement{
  static get observedAttributes(){
    return ['percent'];
  }
  constructor(){
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = '<link rel="stylesheet" type="text/css" href="./ProgressBar.css">';
    let main = document.createElement('div');
    main.classList.add("ProgressBarMain");
    this.progress = document.createElement('span');
    this.progress.classList.add('progress');
    this.progress.classList.add('progressing');
    //
    
    main.appendChild(this.progress);
    shadowRoot.appendChild(main);
    
    this.prev = 0;
    this.cur = 88;
    
  }
  connectedCallback(){
    this.progress.addEventListener("animationiteration", this.update());
    this.progress.addEventListener("animationend", this.overwrite());
  }
  disconnectedCallback(){
    
  }
  update(){
    this.style.setProperty('--x-prev', this.prev + "%");
    this.style.setProperty('--x-new', this.cur + "%");
    this.prev = this.cur;
    this.style.setProperty('--x-prev', this.prev + "%");
  }
  overwrite(){
    if(this.prev != this.cur){
      this.prev = this.cur;
    }
    console.log("Green progressbar updating animation has ended.");
  }
  attributeChangedCallback(attribute, oldVal, newVal) {
    if(attribute === "percent"){
      if(oldVal === null){
        oldVal = 0;
      }
      if(isNaN(newVal)){
        newVal = oldVal;
      }
      if(newVal > 100){
        newVal = 100;
      }
      
      this.prev = oldVal;
      this.cur = newVal;
      
      this.update();
      //setTimeout(() => this.style.setProperty('--x-prev', newVal + "%"), 1000);
    }
  }
}

class ProgressBarTestForm extends HTMLElement{
  constructor(){
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = '<link rel="stylesheet" type="text/css" href="./ProgressBar.css">';
    let main = document.createElement('div');
    main.classList.add("ProgressBarMain");
    let progressBar = document.createElement('progress-bar');
    main.appendChild(progressBar);
    let input = document.createElement('input');
    input.type = 'text';
    let update = document.createElement('button');
    update.classList.add('updateButton');
    update.addEventListener("click", function(e){
      progressBar.setAttribute('percent', input.value);
      console.log();
    });
    
    main.appendChild(input);
    main.appendChild(update);
    shadowRoot.appendChild(main);
  }
}

customElements.define('progress-bar', ProgressBar);
customElements.define('progress-bar-test', ProgressBarTestForm);