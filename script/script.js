// Gestion du scroll pour la barre de navigation
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    });
}

// Fermeture automatique du menu mobile lors d'un clic sur un lien
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarNav");
    // On vérifie que bootstrap est bien chargé pour éviter les erreurs
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const bsCollapse = bootstrap.Collapse.getInstance(menuToggle);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        });
    });
}

// Génération des compétences (Skills)
function createSkillsFromJSON() {
    const container = document.getElementById("skills-container");
    fetch("./data/skills.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const card = document.createElement("div");
                card.className = "col-lg-4 mt-4";
                card.innerHTML = `
                    <div class="card skillsText h-100">
                        <div class="card-body text-center">
                            <img src="../images/${item.image}" 
                                 alt="Logo ${item.title}"
                                 style="height: 50px; margin-bottom: 10px; object-fit: contain;" />
                            <h3 class="card-title">${item.title}</h3>
                            <p class="card-text">${item.text}</p>
                        </div>
                    </div>`;
                container.appendChild(card);
            });
        })
        .catch(error => console.error("Erreur Skills:", error));
}

// Génération du Portfolio avec alignement automatique
function createPortfolioFromJSON() {
    const container = document.getElementById("portfolio-container");
    fetch("./data/portfolio.json")
        .then(response => response.json())
        .then(data => {
            const row = document.createElement("div");
            row.className = "row g-4"; // g-4 assure l'espacement égal entre les cartes
            
            data.forEach(item => {
                const card = document.createElement("div");
                card.className = "col-lg-4 col-md-6";
                card.innerHTML = `
                    <div class="card portfolioContent h-100 shadow-sm border-0">
                        <img class="card-img-top" src="images/${item.image}" alt="${item.title}" 
                             style="height: 220px; object-fit: cover;">
                        <div class="card-body d-flex flex-column">
                            <h3 class="card-title fw-bold h5">${item.title}</h3> 
                            <p class="card-text text-muted flex-grow-1">${item.text}</p>
                            <div class="mt-auto pt-3 text-center">
                                ${item.link ? `<a href="${item.link}" target="_blank" class="btn btn-dark w-100">Voir le projet</a>` 
                                            : '<span class="badge bg-secondary w-100 py-2">En cours de finalisation</span>'}
                            </div>
                        </div>
                    </div>`;
                row.appendChild(card);
            });
            container.appendChild(row);
        })
        .catch(error => console.error("Erreur Portfolio:", error));
}

// Lancement au chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
    handleNavbarScroll();
    handleNavbarCollapse();
    createSkillsFromJSON();
    createPortfolioFromJSON();
});