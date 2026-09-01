document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Salutation dynamique avec effet
    const greetingElement = document.getElementById("dynamic-greeting");
    const hour = new Date().getHours();
    let salutation = "";

    // Adaptation du message selon l'heure avec de l'effet
    if (hour >= 5 && hour < 12) {
        salutation = "< Bonjour. Accès autorisé. Étudiant en B.U.T. Informatique >";
    } else if (hour >= 12 && hour < 18) {
        salutation = "< Connexion établie. Étudiant en B.U.T. Informatique >";
    } else {
        salutation = "< Bonsoir. Etudiant en B.U.T. Informatique, session sécurisée autoriser. >";
    }
    greetingElement.textContent = "";
    let i = 0;
    const speed = 40;

    function typeWriter() {
        if (i < salutation.length) {
            greetingElement.textContent += salutation.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    setTimeout(typeWriter, 500);

    // --- 2. Animation d'apparition des sections au défilement
    const sections = document.querySelectorAll("section");

    const revealSection = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });

    // Copie interactive de l'email au clic
    const emailElement = document.getElementById("email-text");
    const feedbackElement = document.getElementById("feedback");

    emailElement.addEventListener("click", () => {
        const email = emailElement.textContent;

        navigator.clipboard.writeText(email).then(() => {
            feedbackElement.textContent = "[ Copié dans le presse-papier ]";
            feedbackElement.classList.add("show");

            // Masquer le message après 2.5 secondes
            setTimeout(() => {
                feedbackElement.classList.remove("show");
            }, 2500);
        }).catch(err => {
            // Gestion du cas où la copie échoue
            console.error("Erreur lors de la copie de l'email : ", err);
            feedbackElement.textContent = "[ Erreur de copie ]";
            feedbackElement.style.color = "red";
            feedbackElement.classList.add("show");
        });
    });

    // --- 4. Mise à jour automatique de l'année dans le footer ---
    document.getElementById("year").textContent = new Date().getFullYear();
});