# 🚀 Guide d'Automatisation Complète du Déploiement

Ce guide vous explique comment utiliser les scripts d'automatisation pour déployer votre site web CryptoMine de manière complètement automatisée.

---

## 📋 Prérequis

- ✅ Git installé
- ✅ Python 3.6+ (pour le script Python)
- ✅ Compte GitHub (pour GitHub Pages)
- ✅ Compte Vercel ou Netlify (optionnel)

---

## 🎯 2 Options d'Automatisation

### Option 1: Script Python (Recommandé)

**Avantages :**
- ✅ Interface interactive colorée
- ✅ Gestion d'erreurs complète
- ✅ Création automatique du repo GitHub
- ✅ Activation automatique de GitHub Pages

**Utilisation :**

```bash
cd /home/ubuntu/cryptomine-website
python3 auto-deploy.py
```

Puis suivez les instructions à l'écran.

---

### Option 2: Script Bash

**Avantages :**
- ✅ Pas de dépendances Python
- ✅ Léger et rapide
- ✅ Compatible avec tous les systèmes Unix

**Utilisation :**

```bash
cd /home/ubuntu/cryptomine-website
./auto-deploy.sh
```

Puis suivez les instructions à l'écran.

---

## 🔑 Obtenir les Tokens Nécessaires

### GitHub Token

1. Allez sur https://github.com/settings/tokens
2. Cliquez **"Generate new token"** → **"Generate new token (classic)"**
3. Donnez-lui un nom : `CryptoMine Deploy`
4. Sélectionnez les permissions :
   - ✅ `repo` (accès complet aux repos)
   - ✅ `admin:repo_hook` (webhooks)
5. Cliquez **"Generate token"**
6. **Copiez le token** (il ne s'affichera qu'une fois !)

### Vercel Token

1. Allez sur https://vercel.com/account/tokens
2. Cliquez **"Create"**
3. Donnez-lui un nom : `CryptoMine`
4. Cliquez **"Create Token"**
5. **Copiez le token**

### Netlify Token

1. Allez sur https://app.netlify.com/user/applications
2. Cliquez **"New access token"**
3. Donnez-lui un nom : `CryptoMine`
4. Cliquez **"Generate token"**
5. **Copiez le token**

---

## 🚀 Déploiement Automatisé Complet

### Étape 1: Préparez vos Tokens

Avant de lancer le script, ayez à portée de main :
- ✅ Votre username GitHub
- ✅ Votre GitHub token
- ✅ Votre Vercel token (optionnel)
- ✅ Votre Netlify token (optionnel)

### Étape 2: Lancez le Script

```bash
cd /home/ubuntu/cryptomine-website
python3 auto-deploy.py
```

### Étape 3: Suivez les Instructions

Le script vous guidera à travers :
1. Sélection de la plateforme
2. Saisie des tokens
3. Création du repo GitHub
4. Push du code
5. Activation de GitHub Pages

### Étape 4: Vérifiez le Déploiement

Visitez votre site :
```
https://VOTRE_USERNAME.github.io/cryptomine-website
```

---

## 📊 Flux d'Automatisation Complet

```
┌─────────────────────────────────────┐
│  Lancer auto-deploy.py              │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Vérifier Git et le répertoire      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Afficher le menu de sélection      │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┬──────────┬──────────┐
        │             │          │          │
        ▼             ▼          ▼          ▼
   GitHub Pages   Vercel    Netlify    Tous les trois
        │             │          │          │
        ▼             ▼          ▼          ▼
   ┌─────────┐  ┌────────┐  ┌────────┐  ┌──────────┐
   │Demander │  │Demander│  │Demander│  │Exécuter  │
   │ token   │  │ token  │  │ token  │  │ tous les │
   │ GitHub  │  │Vercel  │  │Netlify │  │déploiem. │
   └────┬────┘  └────┬───┘  └────┬───┘  └────┬─────┘
        │             │          │           │
        ▼             ▼          ▼           ▼
   ┌─────────────────────────────────────────────┐
   │  Créer repo GitHub avec API                 │
   └────────────┬────────────────────────────────┘
                │
                ▼
   ┌─────────────────────────────────────────────┐
   │  Initialiser Git et commit                  │
   └────────────┬────────────────────────────────┘
                │
                ▼
   ┌─────────────────────────────────────────────┐
   │  Push du code sur GitHub                    │
   └────────────┬────────────────────────────────┘
                │
                ▼
   ┌─────────────────────────────────────────────┐
   │  Activer GitHub Pages avec API              │
   └────────────┬────────────────────────────────┘
                │
                ▼
   ┌─────────────────────────────────────────────┐
   │  ✅ Déploiement Terminé !                   │
   │  🌐 Site en ligne et accessible             │
   └─────────────────────────────────────────────┘
```

---

## 🔍 Dépannage

### Le script s'arrête avec une erreur

**Erreur : "index.html non trouvé"**
```bash
# Assurez-vous d'être dans le bon répertoire
cd /home/ubuntu/cryptomine-website
ls index.html
```

**Erreur : "Git non trouvé"**
```bash
# Installez Git
sudo apt-get install git
```

**Erreur : "Token invalide"**
- Vérifiez que vous avez copié le token correctement
- Assurez-vous que le token n'a pas expiré
- Créez un nouveau token

### Le repo GitHub ne se crée pas

- Vérifiez que le token a les permissions `repo`
- Vérifiez votre connexion Internet
- Essayez de créer le repo manuellement sur GitHub

### GitHub Pages ne s'active pas

- Attendez 1-2 minutes après le push
- Vérifiez que le repo est public
- Activez manuellement dans Settings → Pages

---

## 🎯 Cas d'Usage

### Déploiement Unique

```bash
# Déployer une seule fois
python3 auto-deploy.py
# Choisir "1" pour GitHub Pages
```

### Déploiement Multi-Plateforme

```bash
# Déployer sur les 3 plateformes
python3 auto-deploy.py
# Choisir "4" pour tous les trois
```

### Mises à Jour Futures

```bash
# Après avoir modifié le site
git add .
git commit -m "Mise à jour du site"
git push origin main
# GitHub Pages se mettra à jour automatiquement !
```

---

## 📚 Fichiers Inclus

| Fichier | Description |
|---------|-------------|
| `auto-deploy.py` | Script Python d'automatisation (recommandé) |
| `auto-deploy.sh` | Script Bash d'automatisation |
| `AUTO_DEPLOY_GUIDE.md` | Ce guide |
| `QUICK_START.md` | Démarrage rapide |
| `DEPLOYMENT_GUIDE.md` | Guide complet de déploiement |

---

## ✅ Checklist Finale

- [ ] Git installé
- [ ] Vous êtes dans le bon répertoire
- [ ] Vous avez votre GitHub token
- [ ] Vous avez lancé le script
- [ ] Le site est en ligne
- [ ] Vous pouvez accéder à l'URL

---

## 🎉 Résumé

**Avant :** Déploiement manuel en 5-10 étapes  
**Après :** Déploiement automatisé en 1 commande ! 🚀

```bash
python3 auto-deploy.py
```

C'est tout !

---

## 📞 Support

- **Problèmes Git** : https://git-scm.com/doc
- **Problèmes GitHub** : https://docs.github.com
- **Problèmes Vercel** : https://vercel.com/docs
- **Problèmes Netlify** : https://docs.netlify.com

---

**CryptoMine** - Minage Bitcoin Professionnel avec Conformité TVA ⛏️

Créé le : 10 Avril 2025  
Version : 1.0.0
