# Déploiement avec GitHub Pages (Gratuit et Facile)

## 🚀 GitHub Pages - Déploiement Gratuit

GitHub Pages est une plateforme de déploiement **100% gratuite** directement depuis GitHub.

### Avantages :
- ✅ Complètement gratuit
- ✅ Pas de limite de bande passante
- ✅ HTTPS automatique
- ✅ Domaine gratuit
- ✅ Intégration GitHub parfaite

---

## 📋 Étapes de Déploiement

### 1. Créer un Repo GitHub

1. Allez sur **https://github.com/new**
2. **Repository name** : `cryptomine-website`
3. **Description** : "Site web marketing CryptoMine"
4. Sélectionnez **"Public"**
5. Cliquez **"Create repository"**

### 2. Pousser le Code

```bash
cd /home/ubuntu/cryptomine-website

# Ajouter le remote GitHub
git remote add origin https://github.com/VOTRE_USERNAME/cryptomine-website.git

# Renommer la branche
git branch -M main

# Pousser le code
git push -u origin main
```

### 3. Activer GitHub Pages

1. Allez dans votre repo GitHub
2. Cliquez sur **Settings** (onglet)
3. Scrollez jusqu'à **"Pages"** (dans le menu de gauche)
4. Sous **"Source"**, sélectionnez **"Deploy from a branch"**
5. Sélectionnez **"main"** et **"/ (root)"**
6. Cliquez **"Save"**

### 4. Voilà !

Votre site est maintenant en ligne sur :
```
https://VOTRE_USERNAME.github.io/cryptomine-website
```

---

## 🌐 Ajouter un Domaine Personnalisé

### Étape 1 : Acheter un Domaine

Achetez un domaine sur :
- **Namecheap** : https://namecheap.com
- **GoDaddy** : https://godaddy.com
- **Google Domains** : https://domains.google.com

Coût : ~$10-15/an

### Étape 2 : Configurer sur GitHub

1. Dans votre repo → **Settings** → **Pages**
2. Sous **"Custom domain"**, entrez votre domaine
3. Cliquez **"Save"**
4. GitHub créera automatiquement un fichier `CNAME`

### Étape 3 : Configurer les DNS

Chez votre registraire (Namecheap, GoDaddy, etc.) :

1. Allez dans **DNS Settings**
2. Créez un enregistrement **CNAME** :
   - **Host** : `www`
   - **Value** : `VOTRE_USERNAME.github.io`
3. Créez un enregistrement **A** (optionnel, pour le domaine racine) :
   - **Host** : `@`
   - **Value** : `185.199.108.153`

4. Attendez 24-48h pour la propagation DNS

### Étape 4 : Vérifier

Visitez votre domaine :
```
https://cryptomine.com
```

---

## 🔄 Déploiement Automatique

Chaque fois que vous poussez du code :

```bash
git add .
git commit -m "Update website"
git push origin main
```

GitHub Pages se mettra à jour automatiquement ! 🎉

---

## 📊 Temps de Déploiement

- **Première fois** : 1-2 minutes
- **Mises à jour** : 30 secondes à 1 minute

---

## 🎯 Résumé

| Étape | Temps |
|-------|-------|
| Créer repo GitHub | 2 min |
| Pousser le code | 1 min |
| Activer GitHub Pages | 1 min |
| Domaine gratuit actif | Immédiat |
| **Total** | **4 minutes** |

---

## 📱 URL Finale

### Sans domaine personnalisé :
```
https://VOTRE_USERNAME.github.io/cryptomine-website
```

### Avec domaine personnalisé :
```
https://cryptomine.com
```

---

## 🔒 Sécurité

- ✅ HTTPS automatique
- ✅ Certificat SSL gratuit
- ✅ Renouvellement automatique

---

## 💡 Conseils

1. **Utilisez `main` comme branche** (pas `master`)
2. **Attendez 1-2 min** après le push pour voir les changements
3. **Vérifiez les logs** dans **Settings** → **Pages** si ça ne fonctionne pas
4. **Utilisez un domaine personnalisé** pour un look professionnel

---

## 🆘 Dépannage

### Le site ne s'affiche pas

1. Vérifiez que GitHub Pages est activé dans Settings
2. Attendez 1-2 minutes après le push
3. Videz le cache du navigateur (Ctrl+Shift+Delete)
4. Vérifiez les logs dans **Settings** → **Pages**

### Le domaine personnalisé ne fonctionne pas

1. Vérifiez les enregistrements DNS chez votre registraire
2. Attendez 24-48h pour la propagation
3. Utilisez https://dnschecker.org pour vérifier

---

## 📚 Ressources

- **GitHub Pages Docs** : https://pages.github.com
- **GitHub Help** : https://docs.github.com/pages
- **DNS Checker** : https://dnschecker.org

---

## ✅ Checklist

- [ ] Repo GitHub créé
- [ ] Code poussé sur GitHub
- [ ] GitHub Pages activé
- [ ] Site accessible sur `https://VOTRE_USERNAME.github.io/cryptomine-website`
- [ ] Domaine personnalisé acheté (optionnel)
- [ ] DNS configuré (optionnel)
- [ ] Site accessible sur votre domaine (optionnel)

---

**Prêt ? Créez votre repo GitHub et déployez ! 🚀**

https://github.com/new
