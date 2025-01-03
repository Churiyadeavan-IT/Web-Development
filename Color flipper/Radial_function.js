/* Utility variables for Radial gradient color flipper */

/* Color code values stored in array */
const hexa_decimar_values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

/* Array to store the generated colors */
let rad_colors_arr = []

let colors_count_rad = document.getElementById('colors-count-rad')
let rad_err_msg_1 = document.getElementById('rad-err-msg-1')

let colors_shape_rad = document.getElementById('colors-shape-rad')
let rad_err_msg_2 = document.getElementById('rad-err-msg-2')

let colors_size_rad = document.getElementById('colors-size-rad')
let rad_err_msg_3 = document.getElementById('rad-err-msg-3')

let colors_position_rad = document.getElementById('colors-position-rad')
let rad_err_msg_4 = document.getElementById('rad-err-msg-4')

let Change_btn_rad = document.getElementById('Change-btn-rad')
let bg_rad_display = document.getElementById('bg-rad-display')
let view_btn_rad = document.getElementById('view-btn-rad')
let display_codes_rad = document.getElementById('display-codes-rad')
let close_btn_rad = document.getElementById('close-btn-rad')
let codes_div_rad = document.getElementById('codes-div-rad')

let colors_count_rad_success = false
let colors_shape_rad_success = false
let colors_size_rad_success = false
let colors_position_rad_success = false
let color_code_available_to_display_rad = false

/* Utility function for Radial gradient color flipper */

/* Authenticates the color count */
function colors_count_rad_err_check() {
    if (colors_count_rad.value < 2 || colors_count_rad.value > 20) {
        rad_err_msg_1.innerText = 'Enter number 2 - 20'
        colors_count_rad_success = false
    }
    else if (colors_count_rad.value >= 2 || colors_count_rad.value <= 20) {
        rad_err_msg_1.innerText = ''
        colors_count_rad_success = true
    }
}

/* Authenticates the gradient shape */
function colors_shape_rad_err_check() {
    if (colors_shape_rad.value === '') {
        rad_err_msg_2.innerText = 'Enter the correct shape'
        colors_shape_rad_success = false
    }
    else {
        rad_err_msg_2.innerText = ''
        colors_shape_rad_success = true
    }
}

/* Authenticates the gradient size */
function colors_size_rad_err_check() {
    if (colors_size_rad.value === '') {
        rad_err_msg_3.innerText = 'Enter the correct size'
        colors_size_rad_success = false
    }
    else {
        rad_err_msg_3.innerText = ''
        colors_size_rad_success = true
    }
}

/* Authenticates the gradient position */
function colors_position_rad_err_check() {
    if (colors_position_rad.value === '') {
        rad_err_msg_4.innerText = 'Enter the correct position'
        colors_position_rad_success = false
    }
    else {
        rad_err_msg_4.innerText = ''
        colors_position_rad_success = true
    }
}

/* Authentication during key up */
colors_count_rad.addEventListener("keyup", function () {
    colors_count_rad_err_check()
})

/* Authentication during mouse up */
colors_shape_rad.addEventListener("mouseup", function () {
    colors_shape_rad_err_check()
})

/* Authentication during mouse up */
colors_size_rad.addEventListener("mouseup", function () {
    colors_size_rad_err_check()
})

/* Authentication during mouse up */
colors_position_rad.addEventListener("mouseup", function () {
    colors_position_rad_err_check()
})

/* Generate number from 0 - 15 */
function random_color_code_generate() {
    return Math.floor(Math.random() * hexa_decimar_values.length)
}

/* Changes the Radial gradient color on click */
Change_btn_rad.addEventListener("click", function () {
    if (colors_count_rad_success && colors_shape_rad_success && colors_size_rad_success && colors_position_rad_success) {
        rad_colors_arr = []
        let rad_color_generated = `radial-gradient(${colors_shape_rad.value} ${colors_size_rad.value} ${colors_position_rad.value}`
        for (let i = 1; i <= colors_count_rad.value; i++) {
            let color_generated = ', #'
            let temp = '#'
            for (let j = 0; j < 6; j++) {
                let a = random_color_code_generate()
                color_generated += hexa_decimar_values[a]
                temp += hexa_decimar_values[a]
            }
            rad_colors_arr.push(temp)
            rad_color_generated += color_generated
        }
        rad_color_generated += ')'
        bg_rad_display.style.background = rad_color_generated
        color_code_available_to_display_rad = true
    }
    else {
        colors_count_rad_err_check()
        colors_shape_rad_err_check()
        colors_size_rad_err_check()
        colors_position_rad_err_check()
        color_code_available_to_display_rad = false
    }
})

/* Displays the color codes generated on click */
view_btn_rad.addEventListener("click", function () {
    display_codes_rad.style.display = 'flex'

    if (color_code_available_to_display_rad) {
        let temp = ``
        for (let i = 0; i < rad_colors_arr.length; i++) {
            temp += `<span>${rad_colors_arr[i]}&nbsp<div style="background-color: ${rad_colors_arr[i]};"></div></span>`
        }
        codes_div_rad.innerHTML = temp
    }
    else {
        codes_div_rad.innerHTML = `<span>None</span>`
    }
})

/* Closes the color codes display */
close_btn_rad.addEventListener("click", function () {
    display_codes_rad.style.display = 'none'

})
