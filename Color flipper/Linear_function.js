/* Utility variables for Linear gradient color flipper */

/* Color code values stored in array */
const hexa_decimar_values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

/* Array to store the generated colors */
let lin_colors_arr = []

let colors_count_lin = document.getElementById('colors-count-lin')
let lin_err_msg_1 = document.getElementById('lin-err-msg-1')
let colors_order_lin = document.getElementById('colors-order-lin')
let lin_err_msg_2 = document.getElementById('lin-err-msg-2')
let Change_btn_lin = document.getElementById('Change-btn-lin')
let bg_lin_display = document.getElementById('bg-lin-display')
let view_btn_lin = document.getElementById('view-btn-lin')
let display_codes_lin = document.getElementById('display-codes-lin')
let close_btn_lin = document.getElementById('close-btn-lin')
let codes_div_lin = document.getElementById('codes-div-lin')
let colors_count_lin_success = false
let colors_order_lin_success = false
let lin_color_code_available_to_display = false

/* Utility function for Linear gradient color flipper */

/* Authenticates the color count */
function colors_count_lin_err_check() {
    if (colors_count_lin.value < 2 || colors_count_lin.value > 20) {
        lin_err_msg_1.innerText = 'Enter number 2 - 20'
        colors_count_lin_success = false
    }
    else if (colors_count_lin.value >= 2 || colors_count_lin.value <= 20) {
        lin_err_msg_1.innerText = ''
        colors_count_lin_success = true
    }
}

/* Authenticates the colors order */
function colors_order_lin_err_check() {
    if (colors_order_lin.value === '') {
        lin_err_msg_2.innerText = 'Enter the correct order'
        colors_order_lin_success = false
    }
    else {
        lin_err_msg_2.innerText = ''
        colors_order_lin_success = true
    }
}

/* Authentication during key up */
colors_count_lin.addEventListener("keyup", function () {
    colors_count_lin_err_check()
})

/* Authentication during mouse up */
colors_order_lin.addEventListener("mouseup", function () {
    colors_order_lin_err_check()
})

/* Generate number from 0 - 15 */
function random_color_code_generate() {
    return Math.floor(Math.random() * hexa_decimar_values.length)
}

/* Changes the Linear gradient color on click */
Change_btn_lin.addEventListener("click", function () {
    if (colors_count_lin_success && colors_order_lin_success) {
        lin_colors_arr = []
        let lin_color_generated = `linear-gradient(${colors_order_lin.value}`
        for (let i = 1; i <= colors_count_lin.value; i++) {
            let color_generated = ', #'
            let temp = '#'
            for (let j = 0; j < 6; j++) {
                let a = random_color_code_generate()
                color_generated += hexa_decimar_values[a]
                temp += hexa_decimar_values[a]
            }
            lin_colors_arr.push(temp)
            lin_color_generated += color_generated
        }
        lin_color_generated += ')'

        bg_lin_display.style.background = lin_color_generated
        lin_color_code_available_to_display = true
    }
    else {
        colors_count_lin_err_check()
        colors_order_lin_err_check()
        lin_color_code_available_to_display = false
    }
})

/* Displays the color codes generated on click */
view_btn_lin.addEventListener("click", function () {
    display_codes_lin.style.display = 'flex'

    if (lin_color_code_available_to_display) {
        let temp = ``
        for (let i = 0; i < lin_colors_arr.length; i++) {
            temp += `<span>${lin_colors_arr[i]}&nbsp<div style="background-color: ${lin_colors_arr[i]};"></div></span>`
        }
        codes_div_lin.innerHTML = temp
    }
    else {
        codes_div_lin.innerHTML = `<span>None</span>`
    }
})

/* Closes the color codes display */
close_btn_lin.addEventListener("click", function () {
    display_codes_lin.style.display = 'none'

})