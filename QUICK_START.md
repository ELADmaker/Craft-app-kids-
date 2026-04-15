# 🚀 Démarrage Rapide - CryptoMine Website

Vous avez 3 minutes pour mettre votre site en ligne ? Suivez ce guide !

---

## ⚡ Option 1: Drag & Drop (La Plus Rapide - 2 minutes)

### Étapes :

1. **Ouvrez Netlify**
   ```
   https://netlify.com
   ```

2. **Connectez-vous ou créez un compte**
   - Utilisez votre email ou GitHub

3. **Cliquez "Add new site"**
   - Puis "Deploy manually"

4. **Glissez-déposez ce dossier**
   - Ou téléchargez `cryptomine-website.zip`

5. **Attendez 10 secondes**
   - Votre site est en ligne ! 🎉

### URL générée :
```
https://cryptomine-XXXXX.netlify.app
```

---

## 🐙 Option 2: GitHub (Recommandé - 5 minutes)

### Étapes :

1. **Créez un repo GitHub**
   ```
   https://github.com/new
   Nom: cryptomine-website
   ```

2. **Poussez le code**
   ```bash
   cd /home/ubuntu/cryptomine-website
   git remote add origin https://github.com/VOTRE_USERNAME/cryptomine-website.git
   git branch -M main
   git push -u origin main
   ```

3. **Connectez à Netlify**
   - https://netlify.com
   - "New site from Git"
   - Sélectionnez votre repo
   - "Deploy"

4. **C'est fait !**
   - Netlify déploiera automatiquement à chaque push

---

## 📱 Tester Localement

```bash
cd /home/ubuntu/cryptomine-website

# Démarrer un serveur local
python3 -m http.server 8000

# Ouvrez http://localhost:8000 dans votre navigateur
```

---

## 🎯 Prochaines Étapes

1. ✅ **Domaine personnalisé** (optionnel)
   - Achetez un domaine : namecheap.com
   - Configurez-le dans Netlify

2. ✅ **Google Analytics**
   - https://analytics.google.com
   - Ajoutez le code de suivi

3. ✅ **Formulaire de contact**
   - Netlify Forms (gratuit)
   - Voir DEPLOYMENT_GUIDE.md

4. ✅ **Contenu**
   - Mettez à jour les articles
   - Ajoutez des images
   - Optimisez pour SEO

---

## 📞 Besoin d'Aide ?

- **Netlify Docs** : https://docs.netlify.com
- **Support** : https://support.netlify.com
- **Guide Complet** : Voir `DEPLOYMENT_GUIDE.md`

---

## ✨ Résumé

| Méthode | Temps | Difficulté | Avantages |
|---------|-------|-----------|-----------|
| Drag & Drop | 2 min | Très facile | Instantané |
| GitHub | 5 min | Facile | Auto-déploiement |
| CLI | 3 min | Moyen | Contrôle total |

**Recommandation** : Utilisez GitHub pour un déploiement professionnel ! 🚀

---

**CryptoMine** - Minage Bitcoin Professionnel ⛏️
