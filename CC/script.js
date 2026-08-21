/* =========================================
   HOOPZONE — SCRIPT.JS
   ========================================= */


/* =========================================
   SLIDER
   ========================================= */

let currentSlide = 0;

let sliderTimer;


/*
   Mostra determinado slide
*/

function goSlide(number) {

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    if (slides.length === 0) {
        return;
    }

    currentSlide = number;

    slides.forEach((slide, index) => {

        slide.classList.toggle(
            "active",
            index === number
        );

    });


    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === number
        );

    });

}


/*
   Slide automático
*/

function startSlider() {

    const slides = document.querySelectorAll(".slide");

    if (slides.length === 0) {
        return;
    }

    sliderTimer = setInterval(() => {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        goSlide(currentSlide);

    }, 5000);

}


/* =========================================
   MENU MOBILE
   ========================================= */

function toggleMenu() {

    const menu =
        document.getElementById("mobileMenu");

    if (!menu) {
        return;
    }

    menu.classList.toggle("open");

}


/*
   Fecha o menu quando clicamos num link
*/

document.addEventListener(
    "click",
    function(event) {

        const menu =
            document.getElementById("mobileMenu");

        if (!menu) {
            return;
        }

        if (
            event.target.tagName === "A"
        ) {

            menu.classList.remove("open");

        }

    }
);


/* =========================================
   LOGIN / REGISTO
   ========================================= */


/*
   Verifica se existe utilizador
*/

function getUser() {

    const user =
        localStorage.getItem("hoopzoneUser");

    if (!user) {
        return null;
    }

    try {

        return JSON.parse(user);

    } catch (error) {

        return null;

    }

}


/*
   Criar conta
*/

function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document
            .getElementById("confirmPassword")
            .value;


    if (!name || !email || !password) {

        alert(
            "Preencha todos os campos."
        );

        return;

    }


    if (password.length < 6) {

        alert(
            "A palavra-passe deve ter pelo menos 6 caracteres."
        );

        return;

    }


    if (password !== confirmPassword) {

        alert(
            "As palavras-passe não coincidem."
        );

        return;

    }


    const user = {

        name: name,

        email: email,

        password: password

    };


    localStorage.setItem(
        "hoopzoneUser",
        JSON.stringify(user)
    );


    alert(
        "Conta criada com sucesso! 🏀"
    );


    window.location.href =
        "index.html";

}


/*
   Login
*/

function loginUser(event) {

    event.preventDefault();


    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    const savedUser =
        getUser();


    if (!savedUser) {

        alert(
            "Nenhuma conta encontrada. Crie uma conta primeiro."
        );

        return;

    }


    if (
        email !== savedUser.email ||
        password !== savedUser.password
    ) {

        alert(
            "E-mail ou palavra-passe incorretos."
        );

        return;

    }


    localStorage.setItem(
        "hoopzoneLogged",
        "true"
    );


    alert(
        "Login realizado com sucesso! 🔥"
    );


    window.location.href =
        "index.html";

}


/*
   Logout
*/

function logoutUser() {

    localStorage.removeItem(
        "hoopzoneLogged"
    );

    alert(
        "Sessão terminada."
    );

    window.location.href =
        "index.html";

}


/* =========================================
   PERFIL DO UTILIZADOR
   ========================================= */

function loadUserProfile() {

    const user =
        getUser();

    const logged =
        localStorage.getItem(
            "hoopzoneLogged"
        );


    if (!user || logged !== "true") {

        return;

    }


    const nameElement =
        document.getElementById(
            "userName"
        );

    const emailElement =
        document.getElementById(
            "userEmail"
        );


    if (nameElement) {

        nameElement.textContent =
            user.name;

    }


    if (emailElement) {

        emailElement.textContent =
            user.email;

    }

}


/* =========================================
   PROTEÇÃO DA PÁGINA DE PERFIL
   ========================================= */

function protectProfilePage() {

    const logged =
        localStorage.getItem(
            "hoopzoneLogged"
        );


    const profilePage =
        document.getElementById(
            "profilePage"
        );


    if (!profilePage) {

        return;

    }


    if (logged !== "true") {

        window.location.href =
            "login.html";

    }

}


/* =========================================
   PESQUISA DE JOGADORES
   ========================================= */

function searchPlayers() {

    const input =
        document.getElementById(
            "playerSearch"
        );


    const cards =
        document.querySelectorAll(
            ".player-card"
        );


    if (!input) {

        return;

    }


    const search =
        input.value.toLowerCase().trim();


    cards.forEach(card => {

        const name =
            card
                .textContent
                .toLowerCase();


        if (name.includes(search)) {

            card.style.display =
                "";

        } else {

            card.style.display =
                "none";

        }

    });

}


/* =========================================
   FAVORITOS
   ========================================= */

function addFavorite(player) {

    let favorites =
        JSON.parse(
            localStorage.getItem(
                "hoopzoneFavorites"
            )
        ) || [];


    if (!favorites.includes(player)) {

        favorites.push(player);

        localStorage.setItem(
            "hoopzoneFavorites",
            JSON.stringify(favorites)
        );


        alert(
            player +
            " foi adicionado aos favoritos ⭐"
        );

    } else {

        alert(
            player +
            " já está nos favoritos."
        );

    }

}


/*
   Remover favorito
*/

function removeFavorite(player) {

    let favorites =
        JSON.parse(
            localStorage.getItem(
                "hoopzoneFavorites"
            )
        ) || [];


    favorites =
        favorites.filter(
            item => item !== player
        );


    localStorage.setItem(
        "hoopzoneFavorites",
        JSON.stringify(favorites)
    );

}


/* =========================================
   ANIMAÇÃO AO FAZER SCROLL
   ========================================= */

function revealOnScroll() {

    const elements =
        document.querySelectorAll(
            ".player-card, .news-card, .stats div"
        );


    elements.forEach(element => {

        const position =
            element.getBoundingClientRect();


        if (
            position.top <
            window.innerHeight - 80
        ) {

            element.classList.add(
                "show"
            );

        }

    });

}


/* =========================================
   INICIALIZAÇÃO
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
           Começar slider
        */

        startSlider();


        /*
           Carregar perfil
        */

        loadUserProfile();


        /*
           Verificar perfil
        */

        protectProfilePage();


        /*
           Primeira animação
        */

        revealOnScroll();

    }
);


/* =========================================
   SCROLL
   ========================================= */

window.addEventListener(
    "scroll",
    revealOnScroll
);