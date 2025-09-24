const button = document.querySelector('button');

button.addEventListener('click' , ()=>{


    // Read the data
//  -------
// accessing the data or tag
const input1 = document.getElementById('first');
const number1 = Number(input1.value);

const input2 = document.getElementById('sec');
const number2 = Number(input2.value);
    // output the result

    const result = number1+number2;
    const re =  document.getElementById('result');
    re.textContent = "Result:    " +  result;
    document.getElementById("result").style.textDecoration = "underline wavy black";

    const plus = number1+number2;
    const pl =  document.getElementById('plus');


    


} )