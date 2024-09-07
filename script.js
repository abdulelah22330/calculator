class Calculator{
    constructor(prevOpTextElement, currentOpTextElement){
        this.prevOpTextElement=prevOpTextElement;
        this.currentOpTextElement=currentOpTextElement;
        this.clear();

    }
    clear(){
        this.currentOp=''
        this.prevOp=''
        this.operation=undefined
        this.afterEquals= false;
    }

    delete(){
        this.currentOp=this.currentOp.toString().slice(0,-1)
    }

    chooseOperation(operation){
        if(this.currentOp==='') return
        if(this.prevOp!==''){
            this.compute()
        }
        this.operation= operation
        this.prevOp= this.currentOp
        this.currentOp='';
    }
    appendNumber(number){
        if(number==='.' && this.currentOp.includes('.')){
            return
        }
        else if(this.afterEquals){
            this.currentOp= number.toString();
            this.afterEquals=false;
        }
        else{
            this.currentOp=this.currentOp.toString()+ number.toString();
        }
        console.log(this.afterEquals)

    }

    compute(afterEquals){
        let computation
        const prev= parseFloat(this.prevOp)
        const current= parseFloat(this.currentOp)
        if(isNaN(prev)|| isNaN(current)) return;

        switch(this.operation){
            case '+':
                computation= prev+current;
                break;
            case '×':
                computation= prev*current;
                break;
            case '÷':
                computation= prev/current;
                break;
            case '−':
                computation= prev-current;
                break;
            default:
                return

        }
        this.currentOp= computation
        this.operation=undefined
        this.prevOp=''
        this.afterEquals=afterEquals

    }
    updateDisplay(){
        this.currentOpTextElement.innerText=this.currentOp;
        if(this.operation!=null){
            this.prevOpTextElement.innerText= `${this.prevOp} ${this.operation}`
        }
        else{
            this.prevOpTextElement.innerText= this.prevOp;

        }


    }
}



const numberButtons= document.querySelectorAll('[data-number]')
const operationButtons= document.querySelectorAll('[data-operation]')
const equalsButton= document.querySelector('[data-equals]')
const delButton= document.querySelector('[data-delete]')
const allClearButton= document.querySelector('[data-all-clear]')

const prevOpTextElement= document.querySelector('[data-prev-op]')
const currentOpTextElement= document.querySelector('[data-current-op]')

calculator= new Calculator(prevOpTextElement, currentOpTextElement)
numberButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        console.log(button.innerText)
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button=>{
    calculator.compute(true);
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button=>{
    calculator.clear();
    calculator.updateDisplay();
})

delButton.addEventListener('click', button=>{
    calculator.delete();
    calculator.updateDisplay();
})