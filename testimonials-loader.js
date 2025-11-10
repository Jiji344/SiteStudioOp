// ========================================
// Chargement dynamique des témoignages depuis les fichiers Markdown
// ========================================

/**
 * Parse le front matter YAML d'un fichier markdown
 */
function parseFrontMatter(content) {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);
    
    if (!match) {
        return null;
    }
    
    const [, frontMatter, body] = match;
    const data = {};
    
    // Parse simple du YAML
    const lines = frontMatter.split('\n');
    let currentKey = null;
    let currentArray = null;
    
    lines.forEach(line => {
        // Gestion des tableaux
        if (line.trim().startsWith('- ')) {
            if (currentArray) {
                currentArray.push(line.trim().substring(2).trim());
            }
        }
        // Gestion des paires clé-valeur
        else if (line.includes(':')) {
            const colonIndex = line.indexOf(':');
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            
            currentKey = key;
            
            // Si la valeur est vide, c'est probablement le début d'un tableau
            if (value === '') {
                currentArray = [];
                data[key] = currentArray;
            } else {
                // Nettoyer les guillemets
                data[key] = value.replace(/^["']|["']$/g, '');
                currentArray = null;
            }
        }
    });
    
    return {
        data,
        body: body.trim()
    };
}

/**
 * Charge tous les témoignages depuis le dossier content/testimonials
 */
async function loadAllTestimonials() {
    try {
        // Cette approche nécessite que les fichiers soient listés
        // Dans un environnement statique, on peut créer un index.json
        const response = await fetch('/content/testimonials/index.json');
        
        if (!response.ok) {
            console.log('Fichier index des témoignages non trouvé, utilisation des témoignages par défaut');
            return null;
        }
        
        const testimonialFiles = await response.json();
        const testimonials = [];
        
        for (const file of testimonialFiles) {
            const testimonialResponse = await fetch(`/content/testimonials/${file}`);
            const content = await testimonialResponse.text();
            const parsed = parseFrontMatter(content);
            
            if (parsed && parsed.data.published !== 'false') {
                testimonials.push({
                    ...parsed.data,
                    content: parsed.body,
                    filename: file
                });
            }
        }
        
        // Trier par date (plus récent en premier)
        testimonials.sort((a, b) => {
            const dateA = new Date(a.date || 0);
            const dateB = new Date(b.date || 0);
            return dateB - dateA;
        });
        
        return testimonials;
        
    } catch (error) {
        console.log('Erreur lors du chargement des témoignages:', error);
        return null;
    }
}

/**
 * Génère les étoiles pour la note
 */
function generateStars(rating) {
    const numStars = parseInt(rating) || 5;
    let starsHTML = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < numStars) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    
    return starsHTML;
}

/**
 * Render les témoignages dans le DOM
 */
function renderTestimonialsFromMarkdown(testimonials) {
    const container = document.getElementById('testimonials-track');
    
    if (!container || !testimonials || testimonials.length === 0) {
        return;
    }
    
    // Garder les témoignages par défaut si aucun témoignage CMS
    if (testimonials.length === 0) {
        return;
    }
    
    container.innerHTML = '';
    
    testimonials.forEach(testimonial => {
        const stars = generateStars(testimonial.rating);
        const photo = testimonial.photo ? `<img src="${testimonial.photo}" alt="${testimonial.author}" class="testimonial-photo">` : '';
        
        const testimonialHTML = `
            <div class="testimonial-item">
                <div class="stars">
                    ${stars}
                </div>
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-author-info">
                    ${photo}
                    <div class="testimonial-author-details">
                        <p class="testimonial-author">${testimonial.author}</p>
                        <p class="testimonial-role">${testimonial.role}</p>
                        ${testimonial.source ? `<p class="testimonial-source">${testimonial.source}</p>` : ''}
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', testimonialHTML);
    });
}

/**
 * Initialisation du chargement des témoignages
 */
async function initTestimonials() {
    const testimonials = await loadAllTestimonials();
    
    if (testimonials && testimonials.length > 0) {
        renderTestimonialsFromMarkdown(testimonials);
        console.log(`${testimonials.length} témoignage(s) chargé(s) depuis le CMS`);
        
        // Réinitialiser l'animation de défilement
        if (typeof window.resetTestimonialsScroll === 'function') {
            window.resetTestimonialsScroll();
        }
    } else {
        console.log('Utilisation des témoignages par défaut du HTML');
    }
}

// Export pour utilisation dans script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadAllTestimonials, renderTestimonialsFromMarkdown, initTestimonials };
}
