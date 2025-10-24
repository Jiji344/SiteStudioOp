// ========================================
// Chargement dynamique des projets depuis les fichiers Markdown
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
 * Charge tous les projets depuis le dossier content/projects
 */
async function loadAllProjects() {
    try {
        // Cette approche nécessite que les fichiers soient listés
        // Dans un environnement statique, on peut créer un index.json
        const response = await fetch('/content/projects/index.json');
        
        if (!response.ok) {
            console.log('Fichier index non trouvé, utilisation des projets par défaut');
            return null;
        }
        
        const projectFiles = await response.json();
        const projects = [];
        
        for (const file of projectFiles) {
            const projectResponse = await fetch(`/content/projects/${file}`);
            const content = await projectResponse.text();
            const parsed = parseFrontMatter(content);
            
            if (parsed && parsed.data.published !== 'false') {
                projects.push({
                    ...parsed.data,
                    content: parsed.body,
                    filename: file
                });
            }
        }
        
        // Trier par ordre
        projects.sort((a, b) => {
            const orderA = parseInt(a.order) || 999;
            const orderB = parseInt(b.order) || 999;
            return orderA - orderB;
        });
        
        return projects;
        
    } catch (error) {
        console.log('Erreur lors du chargement des projets:', error);
        return null;
    }
}

/**
 * Render les projets dans le DOM
 */
function renderProjectsFromMarkdown(projects) {
    const container = document.getElementById('projects-container');
    
    if (!container || !projects || projects.length === 0) {
        return;
    }
    
    // Garder les projets par défaut si aucun projet CMS
    if (projects.length === 0) {
        return;
    }
    
    container.innerHTML = '';
    
    projects.forEach(project => {
        const tags = Array.isArray(project.tags) ? project.tags : [project.tags];
        
        const projectHTML = `
            <div class="project-item" data-category="${project.category}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <div class="project-info">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <div class="project-tags">
                                ${tags.map(tag => `
                                    <span class="tag">
                                        <i class="${getIconForCategory(project.category)}"></i> ${tag}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', projectHTML);
    });
}

/**
 * Obtenir l'icône appropriée pour une catégorie
 */
function getIconForCategory(category) {
    const iconMap = {
        'branding': 'fas fa-palette',
        'web': 'fas fa-laptop-code',
        'illustration': 'fas fa-pencil-alt',
        'packaging': 'fas fa-box',
        'print': 'fas fa-print'
    };
    return iconMap[category] || 'fas fa-tag';
}

/**
 * Initialisation du chargement des projets
 */
async function initProjects() {
    const projects = await loadAllProjects();
    
    if (projects && projects.length > 0) {
        renderProjectsFromMarkdown(projects);
        console.log(`${projects.length} projet(s) chargé(s) depuis le CMS`);
    } else {
        console.log('Utilisation des projets par défaut du HTML');
    }
}

// Export pour utilisation dans script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadAllProjects, renderProjectsFromMarkdown, initProjects };
}




