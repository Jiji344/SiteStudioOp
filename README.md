# Site Web Studio OP - Portfolio Graphiste

Site web OnePage moderne et minimaliste pour présenter le portfolio d'une graphiste créative.

## 🎨 Caractéristiques

- **Design moderne et minimaliste** avec palette de couleurs élégante (noir, blanc, doré)
- **Animations subtiles** pour une expérience utilisateur fluide
- **100% Responsive** - s'adapte à tous les écrans
- **Gestion de contenu** via Decap CMS (Netlify CMS)
- **Optimisé pour les performances** et le SEO

## 📋 Sections

1. **Héros** - Image pleine largeur avec slogan et call-to-action
2. **À propos** - Présentation de la graphiste avec photo et biographie
3. **Projets** - Galerie de projets gérée via Decap CMS
4. **Services** - Présentation des services offerts
5. **Témoignages** - Carousel défilant avec avis clients
6. **Contact** - Formulaire de contact et réseaux sociaux

## 🚀 Installation et Déploiement

### Déploiement sur Netlify

1. **Créer un compte Netlify** (si ce n'est pas déjà fait)
   - Aller sur [netlify.com](https://www.netlify.com)
   - Créer un compte gratuit

2. **Connecter votre repository Git**
   - Créer un repository sur GitHub, GitLab ou Bitbucket
   - Pousser ce code sur votre repository

3. **Déployer sur Netlify**
   ```
   - Aller dans Netlify Dashboard
   - Cliquer sur "Add new site" > "Import an existing project"
   - Sélectionner votre repository Git
   - Laisser les paramètres par défaut (déjà configurés dans netlify.toml)
   - Cliquer sur "Deploy site"
   ```

4. **Activer Identity et Git Gateway**
   ```
   - Dans les paramètres du site Netlify
   - Aller dans "Identity" > "Enable Identity"
   - Aller dans "Settings and usage" > "Enable Git Gateway"
   - Aller dans "Registration preferences" > Sélectionner "Invite only"
   ```

5. **Créer un utilisateur admin**
   ```
   - Aller dans Identity > "Invite users"
   - Entrer votre email
   - Vous recevrez un email d'invitation
   - Créer votre mot de passe
   ```

6. **Accéder au CMS**
   ```
   - Aller sur https://votre-site.netlify.app/admin/
   - Se connecter avec vos identifiants
   - Commencer à ajouter des projets !
   ```

### Développement Local

1. **Lancer un serveur local**
   ```bash
   # Python 3
   python -m http.server 8888
   
   # OU avec Node.js
   npx serve
   ```

2. **Ouvrir dans le navigateur**
   ```
   http://localhost:8888
   ```

## 📝 Utilisation du CMS

### Ajouter un nouveau projet

1. Se connecter au CMS : `https://votre-site.netlify.app/admin/`
2. Cliquer sur "Projets" dans le menu
3. Cliquer sur "New Project"
4. Remplir les informations :
   - **Titre** : Nom du projet
   - **Description** : Description courte pour l'aperçu
   - **Image** : Image principale du projet
   - **Catégorie** : Type de projet (Branding, Web, Illustration, etc.)
   - **Tags** : Mots-clés pour le projet
   - **Date** : Date de réalisation
   - **Client** : Nom du client (optionnel)
   - **Publié** : Activer pour rendre le projet visible
   - **Ordre** : Numéro d'ordre d'affichage (0 = premier)
5. Cliquer sur "Publish" pour sauvegarder

### Gérer les témoignages

Pour l'instant, les témoignages sont codés en dur dans le HTML. 

#### Intégration future avec Google My Business :

1. Dans "Paramètres du site" > "Google My Business"
2. Ajouter votre ID d'entreprise et API Key
3. Les avis Google seront automatiquement synchronisés

OU

1. Ajouter manuellement via "Témoignages" dans le CMS
2. Créer un nouveau témoignage avec nom, rôle, texte et note

## 🎨 Personnalisation

### Couleurs

Les couleurs sont définies dans `styles.css` en tant que variables CSS :

```css
:root {
    --primary-color: #000000;      /* Noir principal */
    --secondary-color: #ffffff;    /* Blanc */
    --accent-color: #9e2d08;       /* Rouge-brun terracotta */
    --soft-accent: #f0deb8;        /* Beige doux */
    --text-dark: #2c2c2c;          /* Texte foncé */
    --text-light: #666666;         /* Texte clair */
    --bg-light: #fafafa;           /* Fond clair */
}
```

Modifier ces valeurs pour changer la palette de couleurs du site.

### Logo

Le logo est utilisé dans :
- Header : `asset/Logo.png`
- Footer : `asset/Logo.png`

Pour changer le logo, remplacez simplement le fichier `asset/Logo.png`.

### Images

- **Image héros** : Modifiable dans `styles.css` ligne ~107 (`.hero-background`)
- **Photo À propos** : Modifiable dans `index.html` ligne ~75
- **Images projets** : Via le CMS ou dans `index.html` pour les exemples

### Textes

Tous les textes peuvent être modifiés directement dans `index.html` :
- **Slogan héros** : Ligne ~57
- **Biographie** : Lignes ~78-85
- **Services** : Lignes ~160-195
- **Formulaire contact** : Lignes ~250-270

## 📱 Réseaux Sociaux

Modifier les liens vers vos réseaux sociaux dans :
- Section Contact : `index.html` lignes ~270-276
- Footer : `index.html` lignes ~290-294
- CMS : "Paramètres du site" > "Réseaux sociaux"

## 🔧 Structure des Fichiers

```
Studio-OP/
├── index.html              # Page principale
├── styles.css              # Styles et animations
├── script.js               # Interactions JavaScript
├── projects-loader.js      # Chargement des projets CMS
├── netlify.toml            # Configuration Netlify
├── README.md               # Documentation
│
├── admin/
│   ├── index.html          # Interface CMS
│   └── config.yml          # Configuration CMS
│
├── asset/
│   ├── Logo.png            # Logo du site
│   └── uploads/            # Images uploadées via CMS
│
└── content/
    ├── projects/           # Fichiers markdown des projets
    ├── testimonials/       # Témoignages
    └── settings/           # Paramètres du site
```

## 🎯 Fonctionnalités Principales

### Animations
- **Fade-in** sur la section À propos
- **Slide-up** sur les services
- **Zoom** sur les images projets au survol
- **Scroll infini** pour les témoignages
- **Parallax** sur l'image héros
- **Curseur personnalisé** (désactivable sur mobile)

### Responsive
- Menu hamburger sur mobile
- Grilles adaptatives
- Images optimisées
- Touch-friendly

### Performance
- CSS minifié
- Images lazy-loading
- Animations GPU-accelerated
- Cache optimisé

## 📞 Support

Pour toute question ou assistance :
- Email : contact@studio-op.com
- Documentation Decap CMS : [decapcms.org](https://decapcms.org/)
- Documentation Netlify : [docs.netlify.com](https://docs.netlify.com/)

## 📄 Licence

© 2025 Studio OP. Tous droits réservés.

---

**Développé avec ❤️ pour Studio OP**

