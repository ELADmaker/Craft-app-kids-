#!/bin/bash

################################################################################
#                                                                              #
#              🚀 CryptoMine Website - Automated Deployment Script 🚀         #
#                                                                              #
#  Ce script automatise complètement le déploiement du site web sur GitHub    #
#  Pages, Vercel, ou Netlify. Choisissez votre plateforme et c'est parti !   #
#                                                                              #
################################################################################

set -e

# Couleurs pour l'output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_header() {
    echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║${NC}  $1"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "index.html" ]; then
    print_error "index.html non trouvé. Assurez-vous d'être dans le répertoire du site web."
    exit 1
fi

print_header "🚀 CryptoMine Website - Automated Deployment"
echo ""

# Menu principal
echo "Choisissez votre plateforme de déploiement :"
echo ""
echo "1) GitHub Pages (Recommandé - 100% gratuit)"
echo "2) Vercel (Très facile - 100% gratuit)"
echo "3) Netlify (Drag & Drop - 100% gratuit)"
echo "4) Tous les trois (Déploiement multi-plateforme)"
echo ""
read -p "Entrez votre choix (1-4): " choice

case $choice in
    1)
        print_header "📦 Déploiement GitHub Pages"
        deploy_github_pages
        ;;
    2)
        print_header "🚀 Déploiement Vercel"
        deploy_vercel
        ;;
    3)
        print_header "🌐 Déploiement Netlify"
        deploy_netlify
        ;;
    4)
        print_header "🎯 Déploiement Multi-Plateforme"
        deploy_github_pages
        echo ""
        deploy_vercel
        echo ""
        deploy_netlify
        ;;
    *)
        print_error "Choix invalide"
        exit 1
        ;;
esac

echo ""
print_success "Déploiement terminé !"
echo ""

################################################################################
#                         FONCTION: GitHub Pages                              #
################################################################################

deploy_github_pages() {
    echo ""
    print_info "Déploiement sur GitHub Pages en cours..."
    echo ""
    
    # Demander les informations
    read -p "Entrez votre username GitHub: " github_username
    read -p "Entrez votre token GitHub (https://github.com/settings/tokens): " github_token
    
    if [ -z "$github_username" ] || [ -z "$github_token" ]; then
        print_error "Username ou token manquant"
        return 1
    fi
    
    # URL du repo
    repo_url="https://${github_token}@github.com/${github_username}/cryptomine-website.git"
    
    print_info "Vérification du repo GitHub..."
    
    # Vérifier si le repo existe, sinon le créer avec curl
    response=$(curl -s -X POST \
        -H "Authorization: token ${github_token}" \
        -H "Accept: application/vnd.github.v3+json" \
        https://api.github.com/user/repos \
        -d '{
            "name":"cryptomine-website",
            "description":"Site web marketing CryptoMine - Minage Bitcoin Professionnel",
            "private":false,
            "auto_init":false
        }')
    
    if echo "$response" | grep -q '"id"'; then
        print_success "Repo GitHub créé"
    elif echo "$response" | grep -q 'already exists'; then
        print_warning "Repo GitHub existe déjà"
    else
        print_error "Erreur lors de la création du repo"
        echo "$response"
        return 1
    fi
    
    print_info "Configuration Git..."
    
    # Configurer Git
    git config user.email "cryptomine@example.com"
    git config user.name "CryptoMine"
    
    # Ajouter le remote
    if git remote | grep -q origin; then
        git remote remove origin
    fi
    git remote add origin "$repo_url"
    
    # Renommer la branche
    git branch -M main
    
    print_info "Push du code sur GitHub..."
    
    # Pousser le code
    if git push -u origin main; then
        print_success "Code poussé sur GitHub"
    else
        print_error "Erreur lors du push"
        return 1
    fi
    
    # Activer GitHub Pages
    print_info "Activation de GitHub Pages..."
    
    curl -s -X PUT \
        -H "Authorization: token ${github_token}" \
        -H "Accept: application/vnd.github.v3+json" \
        https://api.github.com/repos/${github_username}/cryptomine-website/pages \
        -d '{
            "source": {
                "branch": "main",
                "path": "/"
            }
        }' > /dev/null
    
    print_success "GitHub Pages activé !"
    echo ""
    echo "🌐 Votre site est maintenant en ligne !"
    echo "   URL: https://${github_username}.github.io/cryptomine-website"
    echo ""
    echo "📝 Prochaines étapes :"
    echo "   1. Attendez 1-2 minutes pour que le site se déploie"
    echo "   2. Visitez l'URL ci-dessus"
    echo "   3. (Optionnel) Configurez un domaine personnalisé"
    echo ""
}

################################################################################
#                           FONCTION: Vercel                                  #
################################################################################

deploy_vercel() {
    echo ""
    print_info "Déploiement sur Vercel en cours..."
    echo ""
    
    read -p "Entrez votre token Vercel (https://vercel.com/account/tokens): " vercel_token
    
    if [ -z "$vercel_token" ]; then
        print_error "Token Vercel manquant"
        return 1
    fi
    
    print_info "Création du projet Vercel..."
    
    # Créer un projet Vercel
    response=$(curl -s -X POST \
        -H "Authorization: Bearer ${vercel_token}" \
        https://api.vercel.com/v10/projects \
        -d '{
            "name": "cryptomine-website",
            "gitRepository": {
                "type": "github",
                "repo": "USERNAME/cryptomine-website"
            }
        }')
    
    if echo "$response" | grep -q '"id"'; then
        print_success "Projet Vercel créé"
    else
        print_warning "Vercel: Créez manuellement le projet sur https://vercel.com"
    fi
    
    echo ""
    echo "🌐 Votre site est maintenant en ligne !"
    echo "   URL: https://cryptomine-website.vercel.app"
    echo ""
    echo "📝 Prochaines étapes :"
    echo "   1. Allez sur https://vercel.com/dashboard"
    echo "   2. Importez votre repo GitHub"
    echo "   3. Vercel déploiera automatiquement !"
    echo ""
}

################################################################################
#                          FONCTION: Netlify                                  #
################################################################################

deploy_netlify() {
    echo ""
    print_info "Déploiement sur Netlify en cours..."
    echo ""
    
    read -p "Entrez votre token Netlify (https://app.netlify.com/user/applications): " netlify_token
    
    if [ -z "$netlify_token" ]; then
        print_error "Token Netlify manquant"
        return 1
    fi
    
    print_info "Vérification de Netlify CLI..."
    
    if ! command -v netlify &> /dev/null; then
        print_info "Installation de Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    print_success "Netlify CLI installé"
    
    print_info "Création du site Netlify..."
    
    # Déployer sur Netlify
    netlify deploy --prod --dir=. --auth="${netlify_token}" --site="cryptomine-website"
    
    echo ""
    echo "🌐 Votre site est maintenant en ligne !"
    echo "   URL: https://cryptomine-website.netlify.app"
    echo ""
    echo "📝 Prochaines étapes :"
    echo "   1. Visitez https://app.netlify.com"
    echo "   2. Configurez un domaine personnalisé (optionnel)"
    echo "   3. Activez les formulaires Netlify (optionnel)"
    echo ""
}

################################################################################
#                              FIN DU SCRIPT                                  #
################################################################################

echo ""
print_header "🎉 Déploiement Automatisé Terminé !"
echo ""
echo "Votre site web CryptoMine est maintenant en ligne et accessible 24/7 !"
echo ""
echo "📚 Documentation :"
echo "   • QUICK_START.md - Démarrage rapide"
echo "   • DEPLOYMENT_GUIDE.md - Guide complet"
echo "   • github-pages-deploy.md - GitHub Pages"
echo "   • vercel-deploy.md - Vercel"
echo ""
echo "🌐 Domaine personnalisé (optionnel) :"
echo "   1. Achetez un domaine : namecheap.com"
echo "   2. Configurez-le dans votre plateforme"
echo "   3. Attendez 24-48h"
echo ""
echo "✨ Merci d'avoir utilisé CryptoMine ! 🚀"
echo ""
