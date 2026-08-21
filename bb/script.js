/* ================= MENU MOBILE ================= */

function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}

/* ================= SLIDER DE JOGADORES (home) ================= */

let currentSlide = 0;
let slideTimer = null;

function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (!slides.length) return;

    function showSlide(index) {
        slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        currentSlide = index;
    }

    window.goSlide = function (index) {
        showSlide(index);
        restartAutoplay();
    };

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    function restartAutoplay() {
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, 5000);
    }

    restartAutoplay();
}

/* ================= DADOS DE JOGADORES ================= */

const playersData = {
    lebron: {
        name: 'LeBron James',
        team: 'Los Angeles Lakers',
        teamCode: 'LAL',
        position: 'Forward',
        number: '23',
        ppg: '22.6', rpg: '6.8', apg: '7.3',
        img: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/LeBron%20James%20(51912432538).jpg',
        bio: 'Um dos maiores nomes da história da NBA, LeBron continua, mesmo depois de mais de duas décadas de carreira, a ser um dos jogadores mais completos e influentes da liga, liderando os Lakers em pontos, ressaltos e assistências.'
    },
    curry: {
        name: 'Stephen Curry',
        team: 'Golden State Warriors',
        teamCode: 'GSW',
        position: 'Guard',
        number: '30',
        ppg: '26.6', rpg: '3.6', apg: '4.7',
        img: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Stephen%20Curry%202019.jpg',
        bio: 'Considerado o melhor lançador de sempre, Curry revolucionou o basquete moderno com o seu alcance a três pontos, continuando a ser o motor ofensivo dos Warriors.'
    },
    luka: {
        name: 'Luka Dončić',
        team: 'Los Angeles Lakers',
        teamCode: 'LAL',
        position: 'Guard-Forward',
        number: '77',
        ppg: '33.5', rpg: '7.7', apg: '8.3',
        img: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Luka%20Doncic%202019.jpg',
        bio: 'Uma das maiores joias europeias da liga, Luka combina visão de jogo, físico e talento ofensivo raros, sendo já hoje uma das maiores referências da sua geração.'
    },
    giannis: {
        name: 'Giannis Antetokounmpo',
        team: 'Milwaukee Bucks',
        teamCode: 'MIL',
        position: 'Forward',
        number: '34',
        ppg: '30.4', rpg: '11.5', apg: '6.5',
        img: null,
        bio: 'Conhecido como o "Greek Freak", Giannis é uma força dominante em ambos os lados do campo, combinando atletismo e físico como poucos na história da liga.'
    },
    jokic: {
        name: 'Nikola Jokić',
        team: 'Denver Nuggets',
        teamCode: 'DEN',
        position: 'Center',
        number: '15',
        ppg: '29.8', rpg: '13.2', apg: '10.5',
        img: null,
        bio: 'Com uma visão de jogo única para um poste, Jokić redefiniu a posição de center, sendo um dos passadores mais talentosos da NBA.'
    },
    tatum: {
        name: 'Jayson Tatum',
        team: 'Boston Celtics',
        teamCode: 'BOS',
        position: 'Forward',
        number: '0',
        ppg: '27.1', rpg: '8.4', apg: '4.9',
        img: null,
        bio: 'Estrela dos Celtics, Tatum tornou-se um dos alas mais completos da liga, capaz de decidir jogos tanto no ataque como na defesa.'
    }
};

const newsData = {
    'luka-historico': {
        category: 'NBA',
        title: 'Luka Dončić fecha a temporada com números históricos',
        date: 'HOOPZONE • 2026',
        paragraphs: [
            'A estrela dos Lakers continua entre os jogadores mais dominantes da liga, terminando mais uma temporada com médias que o colocam ao lado dos maiores nomes da história recente da NBA.',
            'Com 33.5 pontos, 7.7 ressaltos e 8.3 assistências por jogo, Luka mostrou uma versatilidade rara, sendo decisivo tanto no ataque organizado como em momentos de crise.',
            'A equipa técnica dos Lakers destaca também a evolução defensiva do esloveno, um dos pontos mais discutidos no início da sua carreira e que tem vindo a melhorar época após época.'
        ]
    },
    'lebron-tempo': {
        category: 'LEGENDS',
        title: 'LeBron continua a desafiar o tempo',
        date: 'HOOPZONE • 2026',
        paragraphs: [
            'O veterano continua a impressionar os fãs de basquete, mantendo um nível de produção que poucos jogadores conseguem sustentar depois de mais de vinte temporadas na liga.',
            'Além dos números em campo, LeBron continua a ser referido como um dos maiores exemplos de longevidade e cuidado físico no desporto profissional.',
            'Os Lakers continuam a apoiar-se na sua liderança, tanto dentro como fora do campo, enquanto a equipa constrói o próximo capítulo da franquia.'
        ]
    },
    'curry-3pt': {
        category: '3-POINT',
        title: 'Stephen Curry continua a dominar nos três pontos',
        date: 'HOOPZONE • 2026',
        paragraphs: [
            'O jogador continua a ser uma das maiores referências da história do basquete no que toca ao lançamento de longa distância.',
            'Esta temporada, Curry voltou a liderar a liga em triplos convertidos, consolidando o seu legado como o maior lançador de sempre.',
            'Os Warriors continuam a construir a sua estratégia ofensiva à volta da ameaça constante que Curry representa a partir do perímetro.'
        ]
    }
};

/* ================= PÁGINA: JOGADOR INDIVIDUAL ================= */

function initPlayerPage() {
    const container = document.getElementById('playerDetail');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('player');
    const player = playersData[slug];

    if (!player) {
        container.innerHTML = `
            <div class="not-found">
                <h1>Jogador não encontrado</h1>
                <p>Não encontrámos nenhum jogador com esse identificador.</p>
                <a href="players.html" class="main-button">Ver todos os jogadores →</a>
            </div>
        `;
        return;
    }

    document.title = player.name + ' | HoopZone';

    const imageHtml = player.img
        ? `<img src="${player.img}" alt="${player.name}">`
        : `<div class="detail-initials" style="background:var(--orange);">${initialsOf(player.name)}</div>`;

    container.innerHTML = `
        <div class="detail-image">${imageHtml}</div>
        <div class="detail-info">
            <p class="small-title">${player.teamCode} • ${player.position.toUpperCase()}</p>
            <h1>${player.name}</h1>
            <p class="detail-meta">${player.team} • #${player.number}</p>
            <div class="detail-stats">
                <div><strong>${player.ppg}</strong><span>PPG</span></div>
                <div><strong>${player.rpg}</strong><span>RPG</span></div>
                <div><strong>${player.apg}</strong><span>APG</span></div>
            </div>
            <p class="detail-bio">${player.bio}</p>
        </div>
    `;
}

/* ================= PÁGINA: LISTA DE JOGADORES ================= */

function initPlayersListPage() {
    const grid = document.getElementById('playersListGrid');
    if (!grid) return;

    grid.innerHTML = Object.entries(playersData).map(([slug, player]) => `
        <a href="player.html?player=${slug}" class="player-card">
            <div class="player-image">
                ${player.img
                    ? `<img src="${player.img}" alt="${player.name}">`
                    : `<div class="detail-initials" style="background:var(--surface-2);">${initialsOf(player.name)}</div>`
                }
                <span>#${player.number}</span>
            </div>
            <div class="player-card-content">
                <small>${player.teamCode} • ${player.position.toUpperCase()}</small>
                <h3>${player.name}</h3>
                <p>${player.ppg} PPG • ${player.rpg} RPG • ${player.apg} APG</p>
            </div>
        </a>
    `).join('');
}

/* ================= PÁGINA: NOTÍCIA INDIVIDUAL ================= */

function initNewsPage() {
    const container = document.getElementById('newsDetail');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('story');
    const story = newsData[slug];

    if (!story) {
        container.innerHTML = `
            <div class="not-found">
                <h1>Notícia não encontrada</h1>
                <p>Não encontrámos nenhuma notícia com esse identificador.</p>
                <a href="index.html#news" class="main-button">Voltar às notícias →</a>
            </div>
        `;
        return;
    }

    document.title = story.title + ' | HoopZone';

    container.innerHTML = `
        <p class="small-title">${story.category}</p>
        <h1>${story.title}</h1>
        <p class="detail-meta">${story.date}</p>
        ${story.paragraphs.map(p => `<p>${p}</p>`).join('')}
    `;
}

/* ================= FORMULÁRIOS (login / criar conta) ================= */

function initAuthForm() {
    const form = document.getElementById('authForm');
    if (!form) return;

    const message = document.getElementById('authMessage');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (message) {
            message.classList.add('show');
        }
        form.reset();
    });
}

/* ================= HELPERS ================= */

function initialsOf(name) {
    return name.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

/* ================= INIT ================= */

document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initPlayerPage();
    initPlayersListPage();
    initNewsPage();
    initAuthForm();
});
