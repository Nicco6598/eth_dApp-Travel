import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      ),
      title: "Connetti il Wallet",
      description: "Connetti il tuo wallet MetaMask configurato per la rete di test Sepolia per interagire con la piattaforma."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: "Scegli la Destinazione",
      description: "Sfoglia tra le diverse destinazioni disponibili e scegli quella che più ti ispira per il tuo prossimo viaggio."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: "Conferma l'Acquisto",
      description: "Acquista il pacchetto viaggio utilizzando Ethereum. Ogni transazione è gestita in modo sicuro tramite smart contract."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Preparati al Viaggio",
      description: "Ricevi la conferma della prenotazione e tutte le informazioni necessarie per il tuo viaggio tramite email."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-4">
            Processo Semplice
          </span>
          <h2 className="section-title">Come Funziona</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            dApp Travel rende semplice e sicuro l'acquisto di pacchetti viaggio utilizzando la tecnologia blockchain. 
            Ecco come funziona in pochi passaggi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-6 relative"
            >
              <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div className="mb-4 mt-4 text-accent">
                {step.icon}
              </div>
              <h3 className="font-display font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-xl p-8 text-white"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-8 lg:mb-0">
              <h3 className="font-display font-bold text-2xl mb-4">Pronto per iniziare la tua avventura?</h3>
              <p className="text-white/80">
                Connetti il tuo wallet e inizia a esplorare le destinazioni oggi stesso.
              </p>
            </div>
            <div className="flex space-x-4">
              <a 
                href="#destinations" 
                className="bg-white text-primary hover:bg-gray-100 py-3 px-6 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Esplora Destinazioni
              </a>
              <a 
                href="https://sepolia.etherscan.io/address/0xC598C2A23076De237B489426363C10cf388EeaB7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent hover:bg-white/10 border border-white py-3 px-6 rounded-xl font-semibold transition-all"
              >
                Visualizza Contratto
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;