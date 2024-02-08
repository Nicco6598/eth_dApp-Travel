# dApp travel

Benvenuto nel repository ufficiale di dApp Travel, una piattaforma innovativa che permette di acquistare pacchetti viaggio utilizzando criptovalute. 
Grazie alla nostra integrazione con MetaMask e alla rete di test Sepolia, offriamo un'esperienza utente fluida e sicura, rendendo l'acquisto di pacchetti viaggio più accessibile che mai.

## Caratteristiche Principali

- **Connessione Wallet MetaMask**: Connetti facilmente il tuo wallet MetaMask per interagire con la nostra dApp.
- **Acquisto Pacchetti Viaggio**: Sfoglia e acquista pacchetti viaggio esclusivi direttamente sulla nostra piattaforma.
- **Pagamenti Gestiti via Smart Contract**: Tutti i pagamenti sono gestiti in modo sicuro attraverso uno smart contract sulla rete Sepolia.
- **Trasparenza e Sicurezza**: Visualizza il codice dello smart contract nel folder `contracts` del nostro progetto per massima trasparenza.

## Come Iniziare

Per iniziare ad utilizzare dApp Travel, segui questi semplici passaggi:

1. **Connetti il tuo Wallet MetaMask**:
   Assicurati di avere MetaMask installato e configurato per la rete di test Sepolia.

2. **Visita la nostra piattaforma**:
   Accedi a dApp Travel con il tuo wallet MetaMask su rete Sepolia per iniziare a navigare tra i vari pacchetti viaggio disponibili.

3. **Scegli e acquista un pacchetto viaggio**:
   Una volta trovato il pacchetto che preferisci, procedi con l'acquisto attraverso il nostro sistema di pagamento sicuro basato su smart contract.

## Esempi di Codice

Per offrirti una migliore comprensione di come funziona la nostra dApp, ecco alcuni esempi di codice:

- **Connettere il Wallet MetaMask**:
  ```typescript
  const connectWallet = async () => {
    try {
      const modalProvider = await web3Modal.connect();
      const connectedProvider = new ethers.providers.Web3Provider(modalProvider);
      console.log("Provider in ConnectWalletButton:", connectedProvider);
      const userAccount = await connectedProvider.getSigner().getAddress();

      setProvider(connectedProvider);
      setAccount(userAccount);

      // Ascolta l'evento di disconnessione
      modalProvider.on('disconnect', () => {
        resetApp();
      });
    } catch (error) {
      console.error('Connessione al wallet fallita:', error);
    }
  };
  ```

- **Interagire con lo Smart Contract**:
  ```solidity
    function buyProduct() external payable {
        require(msg.value > 0, "Send ETH to buy the product");
        recipient.transfer(msg.value); // Cambia da owner a recipient
        emit Purchase(msg.sender, msg.value);
    }
  ```

## Deployment

Il nostro progetto è ospitato su Vercel, garantendo aggiornamenti automatici ad ogni commit sulla repository. 
Puoi visualizzare il sito live e accedere al codice sorgente tramite il link presente in alto a destra della nostra repository GitHub.

## Clone

**Clona la Repository**:
   Per iniziare a lavorare con dApp Travel, clona prima la repository sul tuo computer locale utilizzando il comando:

   ```bash
   git clone https://github.com/Nicco6598/eth_dApp-Travel.git
   ```

## Smart Contract

Lo smart contract è deployato all'indirizzo `[0xC598C2A23076De237B489426363C10cf388EeaB7]`(https://sepolia.etherscan.io/address/0xC598C2A23076De237B489426363C10cf388EeaB7) sulla rete di test Sepolia.
Durante il deploy, è stato configurato per inviare tutti i pagamenti all'indirizzo `0x2F566EafA151EaA0bE17C3bDeb901900A4b77fD4`, è possibile cambiarlo per il vostro progetto clonato facendo di nuovo il deploy del contratto con RedHat o su Remix IDE, scegliendo un nuovo recipient al momento del deploy.

## Licenza

Questo progetto è rilasciato sotto la licenza [Inserire tipo di licenza], per maggiori dettagli consulta il file `LICENSE` presente in questo repository.