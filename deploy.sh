#!/bin/bash

# CryptoMine Website Deployment Script
# Ce script déploie le site web sur Netlify de manière permanente

set -e

echo "🚀 Déploiement CryptoMine Website sur Netlify"
echo "=============================================="
echo ""

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "index.html" ]; then
    echo "❌ Erreur: index.html non trouvé. Assurez-vous d'être dans le répertoire du site web."
    exit 1
fi

# Vérifier que Git est initialisé
if [ ! -d ".git" ]; then
    echo "📦 Initialisation du repo Git..."
    git init
    git config user.email "cryptomine@example.com"
    git config user.name "CryptoMine"
    git add .
    git commit -m "Initial commit: CryptoMine website"
fi

# Vérifier que Netlify CLI est installé
if ! command -v netlify &> /dev/null; then
    echo "📥 Installation de Netlify CLI..."
    npm install -g netlify-cli
fi

echo ""
echo "✅ Prérequis vérifiés"
echo ""

# Afficher les options de déploiement
echo "Choisissez une option de déploiement:"
echo "1) Déploiement manuel (drag & drop sur Netlify)"
echo "2) Déploiement avec Netlify CLI (recommandé)"
echo "3) Déploiement avec GitHub (CI/CD automatique)"
echo ""
read -p "Entrez votre choix (1-3): " choice

case $choice in
    1)
        echo ""
        echo "📋 Déploiement Manuel:"
        echo "1. Allez sur https://netlify.com"
        echo "2. Cliquez sur 'Add new site' → 'Deploy manually'"
        echo "3. Glissez-déposez le dossier courant"
        echo "4. Votre site sera en ligne en quelques secondes!"
        echo ""
        echo "📁 Dossier à déployer: $(pwd)"
        ;;
    2)
        echo ""
        echo "🔑 Déploiement avec Netlify CLI:"
        echo ""
        
        # Vérifier si l'utilisateur est connecté à Netlify
        if ! netlify status &> /dev/null; then
            echo "🔐 Connexion à Netlify..."
            netlify login
        fi
        
        echo ""
        echo "📤 Déploiement en cours..."
        netlify deploy --prod --dir=.
        
        echo ""
        echo "✅ Déploiement terminé!"
        echo "🌐 Votre site est maintenant en ligne!"
        ;;
    3)
        echo ""
        echo "🐙 Déploiement avec GitHub:"
        echo "1. Créez un repo GitHub: https://github.com/new"
        echo "2. Nommez-le 'cryptomine-website'"
        echo "3. Exécutez ces commandes:"
        echo ""
        echo "   git remote add origin https://github.com/VOTRE_USERNAME/cryptomine-website.git"
        echo "   git branch -M main"
        echo "   git push -u origin main"
        echo ""
        echo "4. Sur Netlify, cliquez 'New site from Git'"
        echo "5. Connectez votre repo GitHub"
        echo "6. Netlify déploiera automatiquement!"
        echo ""
        ;;
    *)
        echo "❌ Choix invalide"
        exit 1
        ;;
esac

echo ""
echo "📚 Documentation:"
echo "- Netlify: https://docs.netlify.com"
echo "- Guide complet: voir README.md"
echo ""
