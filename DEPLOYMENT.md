# Guide de Déploiement - Studio OP

Guide rapide pour déployer votre site sur Netlify avec Decap CMS.

## 📦 Prérequis

- Un compte GitHub, GitLab ou Bitbucket
- Un compte Netlify (gratuit)
- Git installé sur votre ordinateur

## 🚀 Étapes de Déploiement

### 1. Préparer le Repository Git

```bash
# Initialiser Git (si ce n'est pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit - Site Portfolio Studio OP"

# Créer un nouveau repository sur GitHub/GitLab/Bitbucket
# Puis lier votre repository local

git remote add origin https://github.com/votre-username/studio-op.git
git branch -M main
git push -u origin main
```

### 2. Déployer sur Netlify

#### Option A : Via l'interface Netlify

1. **Se connecter à Netlify**
   - Aller sur [netlify.com](https://www.netlify.com)
   - Se connecter ou créer un compte

2. **Importer le projet**
   - Cliquer sur "Add new site" → "Import an existing project"
   - Choisir votre provider Git (GitHub, GitLab, Bitbucket)
   - Autoriser Netlify à accéder à vos repositories
   - Sélectionner le repository "studio-op"

3. **Configuration du build**
   - **Build command** : Laisser vide (déjà configuré dans netlify.toml)
   - **Publish directory** : Laisser vide ou mettre "."
   - Cliquer sur "Deploy site"

4. **Attendre le déploiement**
   - Le site sera déployé en quelques secondes
   - Vous recevrez une URL type : `https://random-name-123456.netlify.app`

#### Option B : Via Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter à Netlify
netlify login

# Initialiser le site
netlify init

# Déployer
netlify deploy --prod
```

### 3. Configurer Netlify Identity

1. **Activer Identity**
   - Dans le dashboard Netlify de votre site
   - Aller dans "Site settings" → "Identity"
   - Cliquer sur "Enable Identity"

2. **Activer Git Gateway**
   - Dans "Identity", aller dans "Services"
   - Cliquer sur "Enable Git Gateway"
   - Cela permettra au CMS de sauvegarder les changements

3. **Configurer l'inscription**
   - Dans "Identity" → "Settings and usage"
   - "Registration preferences" → Sélectionner **"Invite only"**
   - Cela empêche les inscriptions non autorisées

### 4. Créer un Compte Administrateur

1. **Inviter un utilisateur**
   - Dans "Identity" → "Invite users"
   - Entrer votre adresse email
   - Cliquer sur "Send"

2. **Accepter l'invitation**
   - Vérifier votre boîte email
   - Cliquer sur le lien d'invitation
   - Créer votre mot de passe
   - Confirmer

### 5. Accéder au CMS

1. **Se connecter au CMS**
   ```
   https://votre-site.netlify.app/admin/
   ```

2. **Se connecter avec vos identifiants**
   - Email et mot de passe créés à l'étape 4

3. **Commencer à gérer le contenu !**
   - Ajouter des projets
   - Modifier les témoignages
   - Configurer les paramètres du site

## 🔧 Configuration du Domaine Personnalisé

### Ajouter votre propre domaine

1. **Acheter un domaine** (si vous n'en avez pas)
   - OVH, Namecheap, Google Domains, etc.

2. **Configurer dans Netlify**
   - Dans "Site settings" → "Domain management"
   - Cliquer sur "Add custom domain"
   - Entrer votre domaine : `www.studio-op.com`

3. **Configurer les DNS**
   - Chez votre registrar de domaine
   - Ajouter un enregistrement CNAME :
     ```
     Type: CNAME
     Name: www
     Value: votre-site.netlify.app
     ```
   - OU ajouter un enregistrement A :
     ```
     Type: A
     Name: @
     Value: 75.2.60.5
     ```

4. **Attendre la propagation DNS** (quelques heures max)

5. **Activer HTTPS**
   - Netlify activera automatiquement le SSL
   - Votre site sera accessible en HTTPS

## 📝 Configuration Post-Déploiement

### Personnaliser les Informations du Site

1. **Via le CMS**
   - Aller sur `/admin/`
   - Cliquer sur "Paramètres du site"
   - Modifier :
     - Nom du site
     - Email de contact
     - Réseaux sociaux
     - Google My Business ID (pour les avis)

2. **Via le code**
   - Modifier `content/settings/general.json`
   - Commit et push sur Git
   - Netlify redéploiera automatiquement

### Ajouter le Premier Projet

1. Se connecter au CMS
2. Aller dans "Projets"
3. Cliquer sur "New Project"
4. Remplir les informations
5. Upload l'image
6. Publier

## 🔄 Workflow de Mise à Jour

### Mise à jour du contenu (via CMS)

1. Se connecter à `/admin/`
2. Modifier le contenu
3. Cliquer sur "Publish"
4. Les changements sont automatiquement déployés

### Mise à jour du code (modifications HTML/CSS/JS)

```bash
# Faire vos modifications localement
# Tester localement

# Commiter
git add .
git commit -m "Description des changements"

# Pousser sur Git
git push origin main

# Netlify redéploie automatiquement !
```

## 📊 Optimisations Recommandées

### 1. SEO

Ajouter dans `index.html` (balise `<head>`) :

```html
<!-- Meta SEO -->
<meta name="description" content="Graphiste freelance - Création d'identités visuelles, design web, illustration">
<meta name="keywords" content="graphiste, design, identité visuelle, logo, web design">
<meta name="author" content="Studio OP">

<!-- Open Graph -->
<meta property="og:title" content="Studio OP - Graphiste Créative">
<meta property="og:description" content="Création graphique sur mesure">
<meta property="og:image" content="/asset/Logo.png">
<meta property="og:url" content="https://www.studio-op.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Studio OP - Graphiste Créative">
<meta name="twitter:description" content="Création graphique sur mesure">
<meta name="twitter:image" content="/asset/Logo.png">
```

### 2. Analytics

Ajouter Google Analytics :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. Performance

- Compresser les images avant upload
- Utiliser WebP pour les images modernes
- Activer le cache Netlify (déjà configuré)

## 🆘 Résolution de Problèmes

### Le CMS ne s'affiche pas

1. Vérifier que Identity est activé
2. Vérifier que Git Gateway est activé
3. Vider le cache du navigateur
4. Essayer en navigation privée

### Les changements ne se sauvegardent pas

1. Vérifier les permissions Git Gateway
2. Vérifier que vous êtes bien connecté
3. Regarder les logs dans Netlify

### Les projets ne s'affichent pas

1. Vérifier que les projets sont "Publiés"
2. Vérifier le fichier `content/projects/index.json`
3. Regarder la console du navigateur (F12)

## 📞 Support

- Documentation Netlify : [docs.netlify.com](https://docs.netlify.com)
- Documentation Decap CMS : [decapcms.org/docs](https://decapcms.org/docs)
- Community Netlify : [answers.netlify.com](https://answers.netlify.com)

## ✅ Checklist Finale

- [ ] Site déployé sur Netlify
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] Identity activé
- [ ] Git Gateway activé
- [ ] Compte admin créé
- [ ] Premier projet ajouté
- [ ] Informations de contact mises à jour
- [ ] Réseaux sociaux liés
- [ ] Logo personnalisé uploadé
- [ ] SEO configuré
- [ ] Analytics ajouté (optionnel)

---

**Félicitations ! Votre site est maintenant en ligne ! 🎉**




