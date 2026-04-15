import Link from "next/link"
import { Zap, Send, Globe, Code, Play } from "lucide-react"

const footerLinks = {
  product: {
    title: "Produit",
    links: [
      { label: "Fonctionnalites", href: "#features" },
      { label: "Tarification", href: "#pricing" },
      { label: "Calculateur", href: "#calculator" },
      { label: "Securite", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
  },
  company: {
    title: "Entreprise",
    links: [
      { label: "A Propos", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Carrieres", href: "#" },
      { label: "Presse", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  resources: {
    title: "Ressources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Guides TVA", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Statut Systeme", href: "#" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Confidentialite", href: "#" },
      { label: "Conditions", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Licences", href: "#" },
      { label: "Conformite", href: "#" },
    ],
  },
}

const socialLinks = [
  { icon: Send, href: "#", label: "Telegram" },
  { icon: Globe, href: "#", label: "Website" },
  { icon: Code, href: "#", label: "GitHub" },
  { icon: Play, href: "#", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-gradient">CryptoMine</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Plateforme de minage Bitcoin professionnelle avec conformite TVA 
              integree et programme d&apos;affiliation remunerateur.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {Object.values(footerLinks).map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            2025 CryptoMine. Tous droits reserves.
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>Bitcoin: $98,547</span>
            <span>Hashrate: 319 EH/s</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              Tous les systemes operationnels
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
