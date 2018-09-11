const outWindow=document.getElementById('mainOutputWindow');
const secondWindow=document.getElementById('secondaryWindow');
const allCalcArea=document.getElementById('calculatorArea');
let result=0;
let cashResult=0;


allCalcArea.onfocus;
allCalcArea.addEventListener('keydown',filtrInputKey);
allCalcArea.addEventListener('click',buttonEvent);


function filtrInputKey(event) {
    // console.log('code='+event.code);
    // console.log('event.key', event.key);
     let inputValue=!isNaN(parseInt(event.code)) ? parseInt(event.code) : event.key;
    //  console.log('inputValue='+inputValue);
    // console.log('outWindow.value='+outWindow.value);
    switch (true) {
        case (((inputValue>=0 && inputValue <=9) && (String(outWindow.value).length<=8))):
                        // console.log('digit');
                        if ((inputValue==0) && (outWindow.value.length==0)) {console.log('zerofirst');break};
                        outWindow.value +=event.key;
                        break;
        case (inputValue == 'Backspace') :
                        outWindow.value = outWindow.value.slice(0,-1);
                        break;
        case ((inputValue == '.') || (inputValue ==',')):
                        if (/[\.,]/.test(outWindow.value)) {
                            // console.log('there is dot');
                            break;
                        } else if (outWindow.value.length==0) {
                            outWindow.value += '0.';
                            break;
                        } else {
                            outWindow.value += '.';
                            break;
                        }

        case (inputValue=='-') :
                        if (outWindow.value.length==0) {
                            outWindow.value +='-';
                        } else if ((/-/.test(outWindow.value)) && outWindow.value.length>1) {
                            totalResult(outWindow.value);
                            secondWindow.value+=outWindow.value;
                            outWindow.value='-';
                            break;
                        } else if ((/[+*/]/.test(outWindow.value) && outWindow.value.length ==1 )){
                            outWindow.value='-';
                            break;
                        }
                        else if (!(/-/.test(outWindow.value)) && outWindow.value.length !=0 ) {
                            totalResult(outWindow.value);
                            secondWindow.value+=outWindow.value;
                            outWindow.value='-';
                        }
                        break;
        case (inputValue=='+') :
                        if (outWindow.value.length==0) {
                            outWindow.value +='+';
                        } else if ((/\+/.test(outWindow.value)) && outWindow.value.length>1) {
                            totalResult(outWindow.value);
                            secondWindow.value+=outWindow.value;
                            outWindow.value='+';
                            break;
                        } else if ((/[-*\/]/.test(outWindow.value) && outWindow.value.length ==1 )){
                            outWindow.value='+';
                            break;
                        }
                        else if (!(/\+/.test(outWindow.value)) && outWindow.value.length !=0 ) {
                            totalResult(outWindow.value);
                            secondWindow.value+=outWindow.value;
                            outWindow.value='+';
                        }
                        break;
        case (inputValue=='*') :
                    if (outWindow.value.length==0) {
                        break;
                    } else if ((/\*/.test(outWindow.value)) && outWindow.value.length>1) {

                        totalResult(outWindow.value);
                        secondWindow.value+=outWindow.value;
                        outWindow.value='*';
                        break;
                    } else if ((/[-\+\/]/.test(outWindow.value) && outWindow.value.length ==1 )){
                        outWindow.value='*';
                        break;
                    }
                    else if (!(/\*/.test(outWindow.value)) && outWindow.value.length !=0 ) {
                        totalResult(outWindow.value);
                        secondWindow.value+=outWindow.value;
                        outWindow.value='*';
                    }
                    break;
        case (inputValue=='/') :
                    if (outWindow.value.length==0) {
                        break;
                    } else if ((/\//.test(outWindow.value)) && outWindow.value.length>1) {
                        totalResult(outWindow.value);
                        secondWindow.value+=outWindow.value;
                        outWindow.value='/';
                        break;
                    } else if ((/[-\+\*]/.test(outWindow.value) && outWindow.value.length ==1 )){
                        outWindow.value='/';
                        break;
                    }
                    else if (!(/\//.test(outWindow.value)) && outWindow.value.length !=0 ) {
                        totalResult(outWindow.value);
                        secondWindow.value+=outWindow.value;
                        outWindow.value='/';
                    }
                    break;
        case (inputValue=='Equal') || (inputValue=='=') :

                    if ((/[-\+\*\/]/.test(outWindow.value)) && outWindow.value.length==1)  {
                        outWindow.value='';
                    } else {totalResult(outWindow.value)};
                    outWindow.value=result;
                    secondWindow.value='';
                    result=0;
                    break;
        case (inputValue=='C') :
                        outWindow.value='';
                        secondWindow.value='';
                        break;
        default : //console.log('not a digit');
                        // event.value +='*';
                        break;
    }
}



function totalResult(inputValue) {
    console.log('res'+inputValue);
    if (/[\*\/]/.test(inputValue)) {
        let operation=inputValue.slice(0,1);
        console.log('oper'+operation);
        inputValue=inputValue.substring(1);
        console.log(inputValue);
        result-=inputValue;
        if (operation=='*') {
            cashResult*=inputValue;
        } else {
            cashResult/=inputValue;
        };
    } else {cashResult=inputValue};
    console.log('cash'+cashResult);
    let localResult=parseFloat(cashResult);
    result+=localResult;
}

function buttonEvent(event) {
    const makeKeyboardEvent = new KeyboardEvent('keydown',{
        code : event.target.getAttribute('data-code'),
        key : event.target.getAttribute('value'),
    })
    allCalcArea.dispatchEvent(makeKeyboardEvent);
}

