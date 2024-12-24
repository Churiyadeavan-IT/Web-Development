/* ENTRY PAGE */

/* Entry page utility variables */
let start_game = document.getElementById("start-game-div")
let intro = document.getElementById("intro")
let instruction_page = document.getElementById("instruction-page")

/* Start game animations */
start_game.children[0].addEventListener("animationend", function () {
    start_game.addEventListener("click", function () {
        start_game.remove();
        const intro_child = {
            one: intro.children[0],
            two: intro.children[1]
        }

        /* Moving the left image */
        intro_child.one.style.opacity = '100%'
        intro_child.one.style.animation = "lftrev 1.5s ease-in-out 0.3s forwards"

        /* Moving the right image */
        intro_child.two.style.opacity = '100%'
        intro_child.two.style.animation = "rgtrev 1.5s ease-in-out 0.3s forwards"

        instruction_page.style.display = 'flex'
    })
})



/* INSTRUCTION PAGE */

/* Instruction page utility variables */
let instruction_btn = document.getElementById("instruction-btn")
let side_btn = document.getElementById("side-btn")
let instruction = document.getElementById("instruction")
let main_display = document.getElementById("main-display")

/* Let's start the game button */
instruction_btn.addEventListener("click", function () {

    if (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary") {
        instruction_page.style.transform = 'translateX(-73vw)'
        side_btn.style.display = 'block'
        instruction.style.opacity = '0%'
        main_display.style.display = 'flex'
        main_display.style.opacity = '100%'
    }
    else {
        instruction_page.style.transform = 'translateX(-80vw)'
        side_btn.style.display = 'block'
        instruction.style.opacity = '0%'
        main_display.style.display = 'flex'
        main_display.style.opacity = '100%'
    }
})

/* View instructions when required */
side_btn.addEventListener("click", function () {
    instruction_page.style.transform = 'translateX(0)'
    side_btn.style.display = 'none'
    instruction.style.opacity = '100%'
    main_display.style.opacity = '0%'
})



/* GAME PAGE */

/* All cards in array format */
const cards = ['Images/Cards/Ace.png', 'Images/Cards/Two.png', 'Images/Cards/Three.png',
    'Images/Cards/Four.png', 'Images/Cards/Five.png', 'Images/Cards/Six.png',
    'Images/Cards/Seven.png', 'Images/Cards/Eight.png', 'Images/Cards/Nine.png',
    'Images/Cards/Ten.png', 'Images/Cards/Jack.png', 'Images/Cards/Queen.png',
    'Images/Cards/King.png']

/* Ace card has two values = 1 and 11 */
const ace_values = {
    value1: 1,
    value2: 11
}

/* Stores player's drawn cards */
let player_cards = []

/* Game page utility variables */
let start = document.getElementById("start")
let display_cards = document.getElementById("display-cards")
let draw_cards = document.getElementById("draw-cards")
let card_deck = document.getElementById("card-deck")

/* Denotes the deck of cards animation is finished or not */
let card_deck_animation = false

/* Denotes the starting of game, in order to draw two cards at the begning */
let is_start = true

/* Game page utility functions */
/* Generates card to the player */
function random_card_generate() {
    return Math.floor(Math.random() * 13 + 1)
}

/* Stores card value in array, 10, Jack, Queen, King = 10 */
function store_card_value(get_card) {
    if (get_card >= 10) {
        player_cards.push(10)
    }
    else {
        player_cards.push(get_card)
    }
}

/* Finds the sum of cards the player holds */
function sum_cards() {
    let sum = 0
    for (let i = 0; i < player_cards.length; i++) {
        sum += player_cards[i]
    }
    return sum
}

/* Decides the Ace value (1 or 11), according to bestness for the player */
function decide_ace_value() {
    let ace_card_count = 0
    for (let i = 0; i < player_cards.length; i++) {
        if (player_cards[i] === 1 && ace_card_count === 0) {
            ace_card_count = 1
            player_cards[i] = ace_values.value2
            if (sum_cards() != 21) {
                player_cards[i] = ace_values.value1

            }
        }
    }
}

/* Draws two cards at the begning */
card_deck.children[0].children[0].addEventListener("animationend", function () {
    card_deck_animation = true
})
start.addEventListener("click", function () {
    if (is_start && card_deck_animation && sum_cards() === 0) {
        start.style.display = 'none'
        let first_card = random_card_generate()
        let second_card = random_card_generate()
        const cards_display_code = `<img src= ${cards[second_card - 1]}>
                                    <img src= ${cards[first_card - 1]}>`
        display_cards.insertAdjacentHTML("afterbegin", cards_display_code)
        is_start = false

        store_card_value(first_card)
        store_card_value(second_card)

        decide_ace_value()
        if (sum_cards() < 21) {
            draw_cards.style = `display: block;
                                    animation: add-card-btn 1s linear 1.5s normal forwards;`
        }
        display_cards.children[0].addEventListener("animationend", function () {
            game_alive_or_dead()
        })
    }

})

/* Draws consecutive cards */

draw_cards.addEventListener("click", function () {
    draw_cards.disabled = true
    if (sum_cards() < 21) {
        let other_cards = random_card_generate();
        const cards_display_code = `<img src= ${cards[other_cards - 1]}>`
        display_cards.insertAdjacentHTML("afterbegin", cards_display_code)
        store_card_value(other_cards)
        if (sum_cards() === 21 || sum_cards() > 21) {
            draw_cards.style.display = 'none'
        }
        decide_ace_value()
        display_cards.children[0].addEventListener("animationend", function () {
            game_alive_or_dead()
        })
        setTimeout(function () {
            draw_cards.disabled = false
        }, 2000)
    }
})



/* GAME NOTIFICATIONS */

/* Game notifications' utility functions */
/* Finds, whether the player won or lost the game */
function game_alive_or_dead() {
    if (sum_cards() === 21) {
        setTimeout(message, 500, "You Won")
    }
    else if (sum_cards() > 21) {
        setTimeout(message, 500, "You Lost the game")
    }
}

/* Displays the win or lose message */
function message(msg) {
    main_display.style.display = 'none'
    instruction_page.style.display = 'none'
    notification.style.display = 'flex'
    notification_display.textContent = msg
}

/* Game notifications utility variables */
let notification = document.getElementById("notification")
let notification_display = document.getElementById("notification-display")
let replay_btn = document.getElementById("replay-btn")

/* To play the again from start */
replay_btn.addEventListener("click", function () {
    for (let i = 0; i < player_cards.length; i++) {
        display_cards.children[0].remove()
    }
    player_cards = []
    instruction_page.style.display = 'flex'
    main_display.style.display = 'flex'
    notification.style.display = 'none'
    draw_cards.style.display = 'none'
    start.style.display = 'block'
    is_start = true
    card_deck_animation = false
})