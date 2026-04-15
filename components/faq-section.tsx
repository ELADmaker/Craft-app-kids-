"use client"

import { useState } from "react"
import { HelpCircle, ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Comment fonctionne le minage cloud avec CryptoMine?",
    answer: "CryptoMine possede des fermes de minage reparties dans le monde entier. En achetant des mineurs NFT, vous acquerez une part de notre puissance de calcul. Les revenus generes sont distribues quotidiennement sur votre compte, proportionnellement a votre investissement. Aucun equipement a acheter ou maintenir de votre cote.",
  },
  {
    question: "Quels sont les revenus moyens que je peux esperer?",
    answer: "Les revenus dependent de plusieurs facteurs: le nombre de mineurs, le prix du Bitcoin, et la difficulte du reseau. En moyenne, nos utilisateurs generent entre 8% et 15% de ROI annuel. Avec le programme d'affiliation, certains utilisateurs atteignent plus de $5,000/mois de revenus passifs.",
  },
  {
    question: "Comment fonctionne le programme d'affiliation?",
    answer: "Partagez votre lien unique et gagnez des commissions sur tous les frais de minage de vos filleuls, a vie. Les commissions varient de 10% (Bronze) a 25% (Diamond) selon votre niveau. Vous recevez egalement des bonus de $50 a $2,000 en atteignant certains paliers de parrainage.",
  },
  {
    question: "Comment sont geres les aspects fiscaux et la TVA?",
    answer: "CryptoMine genere automatiquement tous les rapports necessaires pour vos declarations fiscales. Pour les residents europeens, la TVA est calculee et declaree automatiquement. Vous recevez chaque trimestre un releve detaille compatible avec les administrations fiscales de votre pays.",
  },
  {
    question: "Mes fonds sont-ils en securite?",
    answer: "Absolument. Nous utilisons le chiffrement AES-256, la 2FA obligatoire, et stockons 95% des fonds en cold storage. Nous sommes certifies ISO 27001 et SOC 2 Type II. De plus, nos reserves sont auditees mensuellement par des cabinets independants.",
  },
  {
    question: "Comment puis-je retirer mes gains?",
    answer: "Vous pouvez retirer vos gains a tout moment en Bitcoin vers votre wallet externe, ou en euros/dollars via virement bancaire SEPA. Les retraits en crypto sont traites sous 1 heure, les virements bancaires sous 24-48h ouvrees. Montant minimum: 50 EUR ou 0.001 BTC.",
  },
  {
    question: "Y a-t-il des frais caches?",
    answer: "Non, notre tarification est 100% transparente. Les seuls frais sont les frais de minage (15-20% selon le plan) qui couvrent l'electricite et la maintenance. Aucun frais d'inscription, de retrait en crypto, ou de gestion de compte. Les frais de virement SEPA sont de 1 EUR.",
  },
  {
    question: "Puis-je annuler ou me faire rembourser?",
    answer: "Les mineurs NFT sont des actifs numeriques non remboursables une fois actives. Cependant, vous pouvez les revendre sur notre marketplace secondaire a d'autres utilisateurs. Le plan gratuit n'engage a rien et vous permet de tester la plateforme sans risque.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Questions{" "}
            <span className="text-gradient">Frequentes</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tout ce que vous devez savoir sur CryptoMine et le minage Bitcoin.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
              >
                <span className="font-medium pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`} 
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Vous avez d&apos;autres questions?
          </p>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            Contactez notre support 24/7
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
