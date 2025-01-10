/* Utility variables */

let container_outer = document.querySelectorAll('.container-outer')
let btns = document.querySelectorAll('.button')
let reset_btn = document.querySelector('.reset')
let vehicle_table_display = document.querySelectorAll('.vehicle-table-display')
let session_end_display = document.querySelector('.session-end-display')
let close_btn = document.querySelector('.close-btn')

/* Stores the count of each vehicles */
let vehicles_count = {
    car: 0,
    bus: 0,
    truck: 0,
    bike: 0,
    man: 0
}

/* Stores the relative maximum of each vehicles */
let vehicles_percentage = {
    car: '',
    bus: '',
    truck: '',
    bike: '',
    man: ''
}

/* stores the stroke-dashoffset of circles according to maximum */
const percentage_values = {
    max1: '0%',
    max2: '60%',
    max3: '120%',
    max4: '180%',
    max5: '240%'
}

/* Utility functions */

/* Returns the key names of given value */
function getKeyByValue(obj, value) {
    return Object.entries(obj)
        .reduce((acc, [key, val]) => {
            if (val === value) {
                acc.push(key);
            }
            return acc;
        }, []);
}

/* Sets the rank for each vehicles based on count values */
function to_set_percentage() {
    let result = Object.values(vehicles_count)
    let sorted_array = result.sort(function (a, b) { return a - b })
    let iteration = 1

    for (let i = 4; i >= 0; i -= ans.length) {
        ans = getKeyByValue(vehicles_count, sorted_array[i])

        for (let j = 0; j < ans.length; j++) {

            switch (iteration) {
                case 1:
                    vehicles_percentage[ans[j]] = 'max1'
                    break
                case 2:
                    vehicles_percentage[ans[j]] = 'max2'
                    break
                case 3:
                    vehicles_percentage[ans[j]] = 'max3'
                    break
                case 4:
                    vehicles_percentage[ans[j]] = 'max4'
                    break
                case 5:
                    vehicles_percentage[ans[j]] = 'max5'
                    break
                default:
                    break
            }
        }
        console.log('iteration: ' + iteration)
        iteration++
    }
    to_set_circle_animation_for_percentage()
}

/* Sets the circular bar animation to each vehicles based on maxima values */
function to_set_circle_animation_for_percentage() {
    container_outer.forEach(function (vehicle) {
        if (vehicle.dataset.vehicleType === 'car') {
            vehicle.children[1].children[1].style.strokeDashoffset = percentage_values[`${vehicles_percentage.car}`]
        }
        else if (vehicle.dataset.vehicleType === 'bus') {
            vehicle.children[1].children[1].style.strokeDashoffset = percentage_values[`${vehicles_percentage.bus}`]
        }
        else if (vehicle.dataset.vehicleType === 'truck') {
            vehicle.children[1].children[1].style.strokeDashoffset = percentage_values[`${vehicles_percentage.truck}`]
        }
        else if (vehicle.dataset.vehicleType === 'bike') {
            vehicle.children[1].children[1].style.strokeDashoffset = percentage_values[`${vehicles_percentage.bike}`]
        }
        else if (vehicle.dataset.vehicleType === 'man') {
            vehicle.children[1].children[1].style.strokeDashoffset = percentage_values[`${vehicles_percentage.man}`]
        }
    })
}

/* Resets everyting to the starting stage */
function resetAll() {
    vehicles_count = {
        car: 0,
        bus: 0,
        truck: 0,
        bike: 0,
        man: 0
    }

    vehicles_percentage = {
        car: '',
        bus: '',
        truck: '',
        bike: '',
        man: ''
    }
    container_outer.forEach(function (vehicle) {
        vehicle.children[1].children[1].style.strokeDashoffset = '280%'
        vehicle.dataset.vehicleSelected = 'false'
        hover_out(vehicle)
    })
}

/* Displays the vehicles in descending order in a tabular form */
function display_vehicles_info_table() {
    let vehicles_info = {
        car: `<td><img src="./Images/car_white.png" alt="" width="20%" height="auto"></td>
                <td>Car</td>
                <td>${vehicles_count.car}</td>`,
        bus: `<td><img src="./Images/bus_white.png" alt="" width="25%" height="auto"></td>
                <td>Bus</td>
                <td>${vehicles_count.bus}</td>`,
        truck: `<td><img src="./Images/truck_white.png" alt="" width="25%" height="auto"></td>
                <td>Truck</td>
                <td>${vehicles_count.truck}</td>`,
        bike: `<td><img src="./Images/bike_white.png" alt="" width="15%" height="auto"></td>
                <td>Bike</td>
                <td>${vehicles_count.bike}</td>`,
        man: `<td><img src="./Images/man_white.png" alt="" width="15%" height="auto"></td>
                <td>People</td>
                <td>${vehicles_count.man}</td>`
    }
    let result = Object.values(vehicles_count)
    let sorted_array = result.sort(function (a, b) { return a - b })
    let iteration = 1

    for (let i = 4; i >= 0; i -= ans.length) {
        ans = getKeyByValue(vehicles_count, sorted_array[i]) //[car, bus]
        for (let j = 0; j < ans.length; j++) {
            switch (iteration) {
                case 1:
                    vehicle_table_display[0].innerHTML = vehicles_info[ans[j]]
                    iteration++
                    break
                case 2:
                    vehicle_table_display[1].innerHTML = vehicles_info[ans[j]]
                    iteration++
                    break
                case 3:
                    vehicle_table_display[2].innerHTML = vehicles_info[ans[j]]
                    iteration++
                    break
                case 4:
                    vehicle_table_display[3].innerHTML = vehicles_info[ans[j]]
                    iteration++
                    break
                case 5:
                    vehicle_table_display[4].innerHTML = vehicles_info[ans[j]]
                    iteration++
                    break
                default:
                    break
            }
        }
    }
}

/* Returns the values of count */
function to_display_count(vehicle_type) {
    if (vehicle_type === 'car') {
        return vehicles_count.car
    }
    else if (vehicle_type === 'bus') {
        return vehicles_count.bus
    }
    else if (vehicle_type === 'truck') {
        return vehicles_count.truck
    }
    else if (vehicle_type === 'bike') {
        return vehicles_count.bike
    }
    else if (vehicle_type === 'man') {
        return vehicles_count.man
    }
}

/* Animation for hover out action */
function hover_out(temp) {
    temp.children[0].style.opacity = '100%'
    temp.children[0].style.transform = `rotateY(0deg)`
    setTimeout(function () {
        let white_to_black = temp.children[0].children[0].children[0].src.replace('white', 'black')
        temp.children[0].children[0].children[0].src = white_to_black
        temp.children[0].children[0].style.backgroundImage = `linear-gradient(to top, #D7E1EC, rgb(222, 239, 255))`
        temp.children[0].children[1].innerText = to_display_count(temp.dataset.vehicleType)
    }, 100)
}

/* Animation for mouse enter action */
container_outer.forEach(function (vehicle) {
    vehicle.addEventListener('mouseenter', function () {
        if (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary") { }
        else {
            let temp = this
            temp.children[0].style.transform = `rotateY(180deg)`
            setTimeout(function () {
                let black_to_white = temp.children[0].children[0].children[0].src.replace('black', 'white')
                temp.children[0].children[0].children[0].src = black_to_white
                temp.children[0].children[0].style.backgroundImage = `linear-gradient(to bottom, #111111, #181818)`
                temp.children[0].children[1].innerText = ''
            }, 95)
        }
    })
})

/* Animation for mouse leave action */
container_outer.forEach(function (vehicle) {
    vehicle.addEventListener('mouseleave', function () {
        if (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary") { }
        else {
            let temp = this
            if (temp.dataset.vehicleSelected == 'false') {
                hover_out(temp)
            }
        }
    })
})

/* Function for clicking the vehicle */
container_outer.forEach(function (vehicle) {
    vehicle.addEventListener('click', function () {
        temp = this
        if (temp.dataset.vehicleSelected == 'false') {
            if (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary") {
                temp.children[0].style.transform = `rotateY(180deg)`
                setTimeout(function () {
                    let black_to_white = temp.children[0].children[0].children[0].src.replace('black', 'white')
                    temp.children[0].children[0].children[0].src = black_to_white
                    temp.children[0].children[0].style.backgroundImage = `linear-gradient(to bottom, #111111, #181818)`
                    temp.children[0].children[1].innerText = ''
                }, 95)
            }
            temp.dataset.vehicleSelected = 'true'
            temp.children[0].style.opacity = '85%'
        }
        else if (temp.dataset.vehicleSelected == 'true') {
            if (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary") {
                hover_out(temp)
            }
            temp.dataset.vehicleSelected = 'false'
            temp.children[0].style.opacity = '100%'
        }
    })
})

/* Functions for button click actions */
btns.forEach(function (button) {
    button.addEventListener("click", function (e) {
        let btn_clicked = e.currentTarget

        /* Increase button actions */
        if (btn_clicked.classList.contains('increase')) {
            container_outer.forEach(function (vehicle) {
                if (vehicle.dataset.vehicleSelected === 'true') {
                    if (vehicle.dataset.vehicleType === 'car') {
                        vehicles_count.car++
                    }
                    else if (vehicle.dataset.vehicleType === 'bus') {
                        vehicles_count.bus++
                    }
                    else if (vehicle.dataset.vehicleType === 'truck') {
                        vehicles_count.truck++
                    }
                    else if (vehicle.dataset.vehicleType === 'bike') {
                        vehicles_count.bike++
                    }
                    else if (vehicle.dataset.vehicleType === 'man') {
                        vehicles_count.man++
                    }
                    hover_out(vehicle)
                    vehicle.dataset.vehicleSelected = 'false'
                    to_set_percentage()
                }
            })
        }

        /* Decrease button actions */
        else if (btn_clicked.classList.contains('decrease')) {
            container_outer.forEach(function (vehicle) {
                if (vehicle.dataset.vehicleSelected === 'true') {
                    if (vehicle.dataset.vehicleType === 'car') {
                        vehicles_count.car--
                    }
                    else if (vehicle.dataset.vehicleType === 'bus') {
                        vehicles_count.bus--
                    }
                    else if (vehicle.dataset.vehicleType === 'truck') {
                        vehicles_count.truck--
                    }
                    else if (vehicle.dataset.vehicleType === 'bike') {
                        vehicles_count.bike--
                    }
                    else if (vehicle.dataset.vehicleType === 'man') {
                        vehicles_count.man--
                    }
                    hover_out(vehicle)
                    vehicle.dataset.vehicleSelected = 'false'
                    to_set_percentage()
                }
            })
        }

        /* Finish activity actions */
        else if (btn_clicked.classList.contains('reset')) {
            reset_btn.classList.add('resetbtn-click-animation')
            display_vehicles_info_table()
            session_end_display.style.display = 'flex'
            setTimeout(function () {
                session_end_display.style.opacity = '100%'
                reset_btn.classList.remove('resetbtn-click-animation')
            }, 1000)
            resetAll()
        }
    })
})

/* Close button actions */
close_btn.addEventListener("click", function () {
    close_btn.classList.add('resetbtn-click-animation')
    setTimeout(function () {
        session_end_display.style.opacity = '0%'
    }, 700)
    setTimeout(function () {
        session_end_display.style.display = 'none'
        close_btn.classList.remove('resetbtn-click-animation')
        display_vehicles_info_table()
    }, 1400)
})