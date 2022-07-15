 weight=document.getElementById('weight');
 height=document.getElementById('height');
 screen=document.getElementById('bmi');
 button=document.getElementById('button');

button.addEventListener('click', ()=>{
    let value1=weight.value;
    let value2=height.value;
    let value3=Math.pow(value2,2);
    let bmi=Math.round(value1/value3);
    let status="";
    if(bmi<18.5){
      status="(underweight)";
    }
    else if(bmi>18.5 && bmi<25){
        status="(normal)";
    }
    else if(bmi>25 && bmi<30){
        status="(over-weight)";
    }
    else if(bmi>30){
        status="(obese)";
    }
    else{
        status="(the values are not proper)";
    }
    screen.innerHTML=bmi+status;
})
