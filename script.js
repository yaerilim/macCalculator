//---------------------------------- CALCULATOR STARTS ----------------------------------
$(document).ready(function() {
   $('.key').click(audio_on);
   $('.key').click(key_display);
   $('.equal').click(calculation);
   $('.clear').click(clear);
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
}
//---------------------------------- CREATING ARRAY FOR DISPLAY & AVOIDING MULTIPLE DECIMALS / OPERATION KEYS ----------------------------------
var display_arr = [];
var multiple_decimals = 0;
var multiple_operations = 0;
function key_display(){
    var value = $(this).text();
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
    display_arr.push(last_value);
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
