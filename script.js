//---------------------------------- CALCULATOR STARTS ----------------------------------
$(document).ready(function() {
    $('.key').click(audio_on);
    $('.key').click(key_display);
    $('.equal').click(calculation);
    $('.clear').click(clear);
    $('body').keypress(key_display);
    $('body').keyup(function(event){               //esc key works on 'keyup' not 'keypress'
        if(event.which === 27){
            clear();
        }
    });
    $('body').keypress(audio_on);
    $('body').keyup(audio_on);
});
//---------------------------------- KEY SOUND ----------------------------------
function audio_on(){
    $('.sound').trigger('play');
}
//---------------------------------- WHEN CLEAR BUTTON CLICKED ----------------------------------
function clear() {
    $('.display').val('0');
    display_arr = [];
    key_input_arr = [];
    $('.display').css('font-size', '3.5vh')
}
//---------------------------------- CREATING ARRAY FOR DISPLAY & AVOIDING MULTIPLE DECIMALS / OPERATION KEYS ----------------------------------
var display_arr = [];
var multiple_decimals = 0;
var multiple_operations = 0;
function key_display(){                 //taking keyboard input (keycode event)
    var value = $(this).text();
    switch(event.which) {
        case 48:
            value = 0;
            break;
        case 49:
            value = 1;
            break;
        case 50:
            value = 2;
            break;
        case 51:
            value = 3;
            break;
        case 52:
            value = 4;
            break;
        case 53:
            value = 5;
            break;
        case 54:
            value = 6;
            break;
        case 55:
            value = 7;
            break;
        case 56:
            value = 8;
            break;
        case 57:
            value = 9;
            break;
        case 46:
            value = '.';
            break;
        case 43:
            value = '+';
            break;
        case 45:
            value = '-';
            break;
        case 42:
            value = '*';
            break;
        case 47:
            value = '/';
            break;
        case 13:
            value = '=';
            calculation();
            break;
    }
    if(value === '.'){
        multiple_decimals++;
        if(multiple_decimals === 1){                  //checks for multiple decimals
            display_arr.push(value);
            $('.display').val(display_arr.join(''));
        }
    }else if(value === '+' || value === '-' || value === '*' || value === '/'){      //checks for multiple operation keys & changing operation keys
        multiple_operations++;
        display_arr.push(value);
        $('.display').val(display_arr.join(''));
        if(multiple_operations > 1){
            display_arr.splice(display_arr.length-2,1);
            $('.display').val(display_arr.join(''));
        }
    }else{
        if(value === '='){
            multiple_decimals = 0;
            multiple_operations = 0;
            $('.display').val(display_arr.join(''));
        }else{
            multiple_decimals = 0;
            multiple_operations = 0;
            display_arr.push(value);
            $('.display').val(display_arr.join(''));
        }
    }
    change_font_size();
}
//---------------------------------- CALCULATING WHEN EQUAL SIGN CLICKED & CREATING CALCULATION ARRAY USING DISPLAY ARRAY ----------------------------------
var key_input_arr = [];
function calculation() {
    var num = '';
    for(var i = 0; i <= display_arr.length ; i++){
        if(isNaN(display_arr[i]) === false || display_arr[i] === '.'){     //adding decimals with numbers
            num += display_arr[i].toString();
        }else{
            key_input_arr.push(Number(num));
            key_input_arr.push(display_arr[i]);
            num = '';
        }
    }
    key_input_arr.splice(i-1,1);
    $('.display').val(order_of_operation);
    var last_value = key_input_arr[0];
    display_arr = [];
    if(isNaN(last_value)){
        display_arr.push("ERROR");
    }else{
        display_arr.push(last_value);
    }
    key_input_arr = [];
}
//---------------------------------- BASIC OPERATIONS & SUCCESSIVE OPERATION & ORDER OF OPERATION ----------------------------------
function order_of_operation(){
    for(var i = 0; i<key_input_arr.length; i++){
        if(key_input_arr[i] === '*' || key_input_arr[i] === '/'){
            if(key_input_arr[i] === '*' ){
                var new_result = key_input_arr[i-1] * key_input_arr[i+1];
                key_input_arr.splice(i-1,3,new_result);
                i=0;
            }
            if(key_input_arr[i] === '/' ){
                var new_result = key_input_arr[i-1] / key_input_arr[i+1];
                key_input_arr.splice(i-1,3,new_result);
                i=0;
            }
        }
    }
    for(var j = 0; j<key_input_arr.length; j++){
        if(key_input_arr[j] === '+' || key_input_arr[j] === '-'){
            if(key_input_arr[j] === '+' ){
                var new_result = key_input_arr[j-1] + key_input_arr[j+1];
                key_input_arr.splice(j-1,3,new_result);
                j=0;
            }
            if(key_input_arr[j] === '-' ){
                var new_result = key_input_arr[j-1] - key_input_arr[j+1];
                key_input_arr.splice(j-1,3,new_result);
                j=0;
            }
        }
    }
    if(isFinite(key_input_arr[0])===false){          //division by zero = change infinity to error
        return "ERROR"
    }else{
        return key_input_arr[0];
    }
}
//---------------------------------- CHANGE THE FONT SIZE ON DISPLAY AREA ACCORDING TO THE LENGTH ----------------------------------
function change_font_size(){
    if(display_arr.length>8 || display_arr[0].length>8){
        $('.display').css('font-size', '2vh')
    }if(display_arr.length>14 || display_arr[0].length>14){
        $('.display').css('font-size', '1.5vh')
    }if(display_arr.length>18 || display_arr[0].length>18){
        $('.display').css('font-size', '1vh')
    }
}