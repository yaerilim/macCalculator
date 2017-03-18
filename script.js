$(document).ready(function() {
   $('.key').click(audio_on);
});
function audio_on(){
    $('.sound').trigger('play');
}










































// $(document).ready(calculatorReady);
// var input_index = 0;
// var input = [''];
// var num1 = input[0];
// var operator = input[1];
// var num2 = input[2];
// var result = doMath(num1,num2,operator);
//
//
//
//
// function calculatorReady(){
//     console.log('calculator is ready');
//     $(".number").click(numberClick);
//     $(".operator").click(operatorClick);
//     $(".equal").click(equalClick);
//     $(".clear").click(clearClick);
//     $(".clearEntry").click(clearEntryClick);
// }
//
//
//
//
// function numberClick(){
//     console.log('number has been clicked');
//     var value = $(this).text();
//     if(value === "." && input[input_index].indexOf(".") !== -1){       //"multiple decimals"
//         return;
//     }
//     input[input_index] +=value;
//     return $('#displayArea').text(parseFloat(input[input_index]));
// }
//
//
//
//
//
// function operatorClick(){
//     console.log('operator has been clicked');
//     if(input.length === 3){
//         equalClick();
//     }
//     var value = $(this).text();
//     ++input_index;
//     input[input_index++] = value;
//     input[input_index] = '';
//     return $('#displayArea').text(value);
// }
//
//
//
//
//
//
//
//
// function equalClick(){
//     console.log('equal sign has been clicked');
//     if(input_index == 0){
//         if(input[0] === '') {          //"missing operands"
//             input_index = 0;
//             return $("#displayArea").text(0);
//         }
//         else if(input_index == 0 && input[0] === result){               //"operation repeat"
//             console.log('equal sign clicked more than once');
//             num1 = result;
//             num2 = result;
//             doMath();
//             return $("#displayArea").text(input[0]);
//         }
//         else{
//             input_index = 0;
//             return $("#displayArea").text(input[0]);         //"missing operation"
//         }
//     }
//     for (var i = 0; i < input.length; i++) {                        //"division by zero"
//         if (input[i] === "÷" && input[i + 1] === "0") {
//             return $("#displayArea").text("Error");
//         }
//     }
//     if(input[2]===''){               //"operation rollover" & "partial operand"
//             input[2] = input[0];
//         }
//         input.splice(0,2);
//         input[0] = result;
//         input_index = 0;
//         return $('#displayArea').text(input[input_index]);
//     }
//
//
//
//
//
//
//
//
//
// function doMath(num1, num2, operator) {
//     switch (operator) {
//         case '+':
//             return parseFloat(num1) + parseFloat(num2);
//             break;
//         case '-':
//             return parseFloat(num1) - parseFloat(num2);
//             break;
//         case 'x':
//             return parseFloat(num1) * parseFloat(num2);
//             break;
//         case '÷':
//             return parseFloat(num1) / parseFloat(num2);
//             break;
//     }
// }
//
//
//
//
//
//
//
//
// function clearClick() {
//     console.log('clear has been clicked');
//     input = [''];
//     input_index = 0;
//     $("#displayArea").text(input.join(""));
// }
//
//
//
//
//
//
//
//
//
//
// function clearEntryClick() {
//     console.log('clear has been clicked');
//     input = [''];
//     input_index = 0;
//     $("#displayArea").text(input.join(""));
// }