/* Utility variables for Hex color flipper */

/* Color code values stored in array */
const hexa_decimar_values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

let Change_btn_hex = document.getElementById('Change-btn-hex')
let bg_hex_display = document.getElementById('bg-hex-display')
let bg_hex_value = document.getElementById('bg-hex-value')

/* Utility function for Hex color flipper */

/* Generate number from 0 - 15 */
function random_color_code_generate() {
    return Math.floor(Math.random() * hexa_decimar_values.length)
}

/* Changes the Hex color on click */
Change_btn_hex.addEventListener("click", function () {
    let color_generated = '#'
    for (let i = 0; i < 6; i++) {
        color_generated += hexa_decimar_values[random_color_code_generate()]
    }
    bg_hex_display.style.backgroundColor = color_generated
    bg_hex_value.children[1].textContent = color_generated
    bg_hex_value.children[1].insertAdjacentHTML("beforeend", ' <div></div>')
    bg_hex_value.children[1].children[0].style.backgroundColor = color_generated
})