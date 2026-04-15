#!/usr/bin/env python3
"""
🚀 CryptoMine Website - Automated Deployment Script
Automatise complètement le déploiement sur GitHub Pages, Vercel, ou Netlify
"""

import os
import sys
import subprocess
import requests
import json
from pathlib import Path
from typing import Optional

# Couleurs pour l'output
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def print_header(text: str):
    """Affiche un header"""
    print(f"\n{Colors.BLUE}{'='*60}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}🚀 {text}{Colors.ENDC}")
    print(f"{Colors.BLUE}{'='*60}{Colors.ENDC}\n")

def print_success(text: str):
    """Affiche un message de succès"""
    print(f"{Colors.GREEN}✅ {text}{Colors.ENDC}")

def print_error(text: str):
    """Affiche un message d'erreur"""
    print(f"{Colors.RED}❌ {text}{Colors.ENDC}")

def print_warning(text: str):
    """Affiche un avertissement"""
    print(f"{Colors.YELLOW}⚠️  {text}{Colors.ENDC}")

def print_info(text: str):
    """Affiche une information"""
    print(f"{Colors.CYAN}ℹ️  {text}{Colors.ENDC}")

def run_command(cmd: list, description: str = "") -> bool:
    """Exécute une commande shell"""
    try:
        if description:
            print_info(description)
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return True
    except subprocess.CalledProcessError as e:
        if description:
            print_error(f"{description} - {e.stderr}")
        return False

def check_git():
    """Vérifie que Git est installé"""
    return run_command(["git", "--version"], "Vérification de Git...")

def check_directory():
    """Vérifie que nous sommes dans le bon répertoire"""
    if not Path("index.html").exists():
        print_error("index.html non trouvé. Assurez-vous d'être dans le répertoire du site web.")
        sys.exit(1)
    print_success("Répertoire valide")

def init_git():
    """Initialise le repo Git"""
    print_info("Initialisation du repo Git...")
    
    # Configurer Git
    run_command(["git", "config", "user.email", "cryptomine@example.com"])
    run_command(["git", "config", "user.name", "CryptoMine"])
    
    # Ajouter les fichiers
    run_command(["git", "add", "."])
    
    # Commit
    if run_command(["git", "commit", "-m", "Initial commit: CryptoMine website"], "Création du commit..."):
        print_success("Git initialisé")
    else:
        print_warning("Repo Git déjà initialisé")

def deploy_github_pages():
    """Déploie sur GitHub Pages"""
    print_header("📦 Déploiement GitHub Pages")
    
    username = input(f"{Colors.CYAN}Entrez votre username GitHub: {Colors.ENDC}").strip()
    token = input(f"{Colors.CYAN}Entrez votre token GitHub: {Colors.ENDC}").strip()
    
    if not username or not token:
        print_error("Username ou token manquant")
        return False
    
    # URL du repo
    repo_url = f"https://{token}@github.com/{username}/cryptomine-website.git"
    
    print_info("Création du repo GitHub...")
    
    # Créer le repo avec l'API GitHub
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    data = {
        "name": "cryptomine-website",
        "description": "Site web marketing CryptoMine - Minage Bitcoin Professionnel",
        "private": False,
        "auto_init": False
    }
    
    try:
        response = requests.post(
            "https://api.github.com/user/repos",
            headers=headers,
            json=data,
            timeout=10
        )
        
        if response.status_code == 201:
            print_success("Repo GitHub créé")
        elif response.status_code == 422:
            print_warning("Repo GitHub existe déjà")
        else:
            print_error(f"Erreur GitHub API: {response.status_code}")
            return False
    except Exception as e:
        print_error(f"Erreur lors de la création du repo: {e}")
        return False
    
    # Initialiser Git
    init_git()
    
    # Ajouter le remote
    print_info("Configuration du remote GitHub...")
    run_command(["git", "remote", "remove", "origin"], "Suppression de l'ancien remote...")
    run_command(["git", "remote", "add", "origin", repo_url])
    
    # Renommer la branche
    run_command(["git", "branch", "-M", "main"])
    
    # Push
    print_info("Push du code sur GitHub...")
    if run_command(["git", "push", "-u", "origin", "main"]):
        print_success("Code poussé sur GitHub")
    else:
        print_error("Erreur lors du push")
        return False
    
    # Activer GitHub Pages
    print_info("Activation de GitHub Pages...")
    
    pages_data = {
        "source": {
            "branch": "main",
            "path": "/"
        }
    }
    
    try:
        response = requests.put(
            f"https://api.github.com/repos/{username}/cryptomine-website/pages",
            headers=headers,
            json=pages_data,
            timeout=10
        )
        
        if response.status_code in [200, 201]:
            print_success("GitHub Pages activé !")
        else:
            print_warning("GitHub Pages: Activez manuellement dans Settings")
    except Exception as e:
        print_warning(f"Erreur lors de l'activation de GitHub Pages: {e}")
    
    print(f"\n{Colors.GREEN}{Colors.BOLD}🌐 Votre site est maintenant en ligne !{Colors.ENDC}")
    print(f"   URL: https://{username}.github.io/cryptomine-website\n")
    
    return True

def deploy_vercel():
    """Déploie sur Vercel"""
    print_header("🚀 Déploiement Vercel")
    
    print_info("Vercel: Déploiement manuel recommandé")
    print(f"""
{Colors.CYAN}Étapes :
1. Allez sur https://vercel.com/dashboard
2. Cliquez "Add New..." → "Project"
3. Importez votre repo GitHub
4. Vercel déploiera automatiquement !

{Colors.GREEN}URL: https://cryptomine-website.vercel.app{Colors.ENDC}
    """)
    
    return True

def deploy_netlify():
    """Déploie sur Netlify"""
    print_header("🌐 Déploiement Netlify")
    
    print_info("Netlify: Déploiement drag & drop")
    print(f"""
{Colors.CYAN}Étapes :
1. Allez sur https://netlify.com
2. Cliquez "Add new site" → "Deploy manually"
3. Glissez-déposez ce dossier
4. Votre site est en ligne !

{Colors.GREEN}URL: https://cryptomine-XXXXX.netlify.app{Colors.ENDC}
    """)
    
    return True

def main():
    """Fonction principale"""
    print(f"\n{Colors.BOLD}{Colors.BLUE}")
    print("╔════════════════════════════════════════════════════════════╗")
    print("║                                                            ║")
    print("║      🚀 CryptoMine Website - Automated Deployment 🚀      ║")
    print("║                                                            ║")
    print("║           Minage Bitcoin Professionnel avec TVA            ║")
    print("║                                                            ║")
    print("╚════════════════════════════════════════════════════════════╝")
    print(f"{Colors.ENDC}\n")
    
    # Vérifications
    check_directory()
    check_git()
    
    # Menu
    print("Choisissez votre plateforme de déploiement :\n")
    print("1) GitHub Pages (Recommandé - 100% gratuit)")
    print("2) Vercel (Très facile - 100% gratuit)")
    print("3) Netlify (Drag & Drop - 100% gratuit)")
    print("4) Tous les trois (Multi-plateforme)")
    print("5) Quitter\n")
    
    choice = input(f"{Colors.CYAN}Entrez votre choix (1-5): {Colors.ENDC}").strip()
    
    if choice == "1":
        deploy_github_pages()
    elif choice == "2":
        deploy_vercel()
    elif choice == "3":
        deploy_netlify()
    elif choice == "4":
        deploy_github_pages()
        deploy_vercel()
        deploy_netlify()
    elif choice == "5":
        print_info("Au revoir !")
        sys.exit(0)
    else:
        print_error("Choix invalide")
        sys.exit(1)
    
    # Résumé final
    print_header("🎉 Déploiement Automatisé Terminé !")
    print(f"""
{Colors.GREEN}Votre site web CryptoMine est maintenant en ligne et accessible 24/7 !{Colors.ENDC}

{Colors.CYAN}📚 Documentation :
   • QUICK_START.md - Démarrage rapide
   • DEPLOYMENT_GUIDE.md - Guide complet
   • github-pages-deploy.md - GitHub Pages
   • vercel-deploy.md - Vercel

🌐 Domaine personnalisé (optionnel) :
   1. Achetez un domaine : namecheap.com
   2. Configurez-le dans votre plateforme
   3. Attendez 24-48h

✨ Merci d'avoir utilisé CryptoMine ! 🚀{Colors.ENDC}
    """)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print(f"\n{Colors.YELLOW}Opération annulée par l'utilisateur{Colors.ENDC}")
        sys.exit(0)
    except Exception as e:
        print_error(f"Erreur: {e}")
        sys.exit(1)
