import { SectorKey } from "@/lib/personalYearSectors";

// forza and evita are now arrays — 3 variants per sector per vibration.
// The displayed variant rotates every 9 days so repeated vibration numbers
// show different text each cycle.
type SectorInsight = { forza: string[]; evita: string[] };
type VibrationInsights = Record<number, Record<SectorKey, SectorInsight>>;
type MotivationalMessages = Record<string, string>;
type SectorMeta = Record<SectorKey, { title: string; icon: string }>;

const sectorMetaByLang: Record<string, SectorMeta> = {
  it: {
    lavoro:    { title: "Lavoro e Carriera",    icon: "💼" },
    amore:     { title: "Amore e Relazioni",    icon: "❤️" },
    denaro:    { title: "Denaro e Gestione",    icon: "💰" },
    benessere: { title: "Benessere e Energia",  icon: "🌿" },
    crescita:  { title: "Crescita Personale",   icon: "🌟" },
  },
  en: {
    lavoro:    { title: "Work & Career",       icon: "💼" },
    amore:     { title: "Love & Relationships", icon: "❤️" },
    denaro:    { title: "Money & Finances",    icon: "💰" },
    benessere: { title: "Wellness & Energy",   icon: "🌿" },
    crescita:  { title: "Personal Growth",     icon: "🌟" },
  },
};

const dayVibrationInsightsByLang: Record<string, VibrationInsights> = {
  it: {
    1: {
      amore: {
        forza: [
          "Prendi l'iniziativa: dichiara i tuoi sentimenti o proponi qualcosa di nuovo.",
          "Un gesto coraggioso vale più di mille parole: fai il primo passo oggi.",
          "La tua sicurezza interiore oggi è magnetica: i sentimenti veri meritano di essere detti.",
        ],
        evita: [
          "Evita di essere troppo autoritario o di imporre la tua visione al partner.",
          "Evita di aspettarti che l'altro indovini i tuoi bisogni: la chiarezza è amore.",
          "Evita di confondere il desiderio di controllo con la passione: l'amore libera.",
        ],
      },
      lavoro: {
        forza: [
          "Giornata perfetta per lanciare idee, prendere decisioni e guidare progetti.",
          "Hai le carte in mano: proponi quella promozione o quel progetto che covavi da mesi.",
          "La tua determinazione oggi sblocca situazioni ferme da troppo tempo.",
        ],
        evita: [
          "Evita di ignorare il contributo dei colleghi o di agire senza consultare il team.",
          "Evita di bruciare i tempi: anche il leader più capace ha bisogno del consenso del gruppo.",
          "Evita di interpretare ogni disaccordo come un attacco: le critiche costruiscono.",
        ],
      },
      denaro: {
        forza: [
          "Buon momento per investimenti autonomi e decisioni finanziarie rapide.",
          "Oggi hai la lucidità per valutare una scelta economica importante rimasta in sospeso.",
          "La tua fiducia in te stesso attira opportunità economiche concrete: resta aperto.",
        ],
        evita: [
          "Evita spese impulsive dettate dall'ego o acquisti per impressionare gli altri.",
          "Evita di fare grandi movimenti finanziari senza un piano: il coraggio non è impulsività.",
          "Evita di sopravvalutare le tue risorse attuali: pianifica con i numeri reali.",
        ],
      },
      benessere: {
        forza: [
          "Energia alta: ideale per iniziare un nuovo allenamento o routine salutare.",
          "Il tuo corpo oggi risponde magnificamente agli sforzi: sfrutta questa vitalità.",
          "Inizia quella pratica salutare che rimandavi: oggi la motivazione è dalla tua parte.",
        ],
        evita: [
          "Evita di esagerare con lo sforzo fisico, rischi di strappi o sovraccarico.",
          "Evita di ignorare i segnali di stanchezza: anche le macchine hanno bisogno di riposo.",
          "Evita gli sport solitari che sfociano nella competitività ossessiva: il benessere è gioia.",
        ],
      },
      crescita: {
        forza: [
          "Momento di leadership interiore: fidati del tuo istinto e agisci.",
          "Oggi sei il protagonista della tua storia: scrivi il prossimo capitolo con intenzione.",
          "La chiarezza interiore di oggi è un dono: usa questo momento per definire le tue priorità.",
        ],
        evita: [
          "Evita l'isolamento eccessivo: la forza non esclude la connessione.",
          "Evita di confrontare il tuo percorso con quello degli altri: la tua strada è unica.",
          "Evita di disperdere questa energia in obiettivi troppo numerosi: scegli uno e vai a fondo.",
        ],
      },
    },

    2: {
      amore: {
        forza: [
          "Ascolta profondamente il partner. L'empatia oggi è il tuo superpotere.",
          "Un momento di silenzio condiviso vale più di mille parole: stai vicino a chi ami.",
          "La tua sensibilità oggi crea ponti dove c'erano muri: usala con dolcezza.",
        ],
        evita: [
          "Evita di sacrificarti troppo o di sopprimere i tuoi bisogni per compiacere.",
          "Evita di fare il detective emotivo: non tutti i silenzi nascondono un problema.",
          "Evita di assorbire le emozioni altrui come fossero tue: impara a fare il filtro.",
        ],
      },
      lavoro: {
        forza: [
          "Collabora, media, costruisci alleanze. Il lavoro di squadra porta risultati.",
          "La tua capacità di ascoltare tutti fa di te il punto di riferimento del gruppo.",
          "Un collega ha bisogno del tuo supporto: offritelo generosamente e tornerà con gli interessi.",
        ],
        evita: [
          "Evita conflitti diretti e decisioni unilaterali: oggi serve diplomazia.",
          "Evita di rimandare ogni decisione aspettando il consenso universale: a volte devi scegliere.",
          "Evita di sparire nei dettagli emotivi delle dinamiche di gruppo: mantieni il focus sul risultato.",
        ],
      },
      denaro: {
        forza: [
          "Buon giorno per trattative e accordi condivisi, joint venture.",
          "Valuta oggi un'associazione o una collaborazione economica proposta recentemente.",
          "Le tue finanze beneficiano di un approccio condiviso: parla con un esperto o un partner fidato.",
        ],
        evita: [
          "Evita investimenti rischiosi o decisioni finanziarie sotto pressione emotiva.",
          "Evita di fidarti ciecamente di chi ti offre opportunità troppo allettanti: la prudenza paga.",
          "Evita di prendere decisioni economiche importanti quando sei emotivamente turbato.",
        ],
      },
      benessere: {
        forza: [
          "Attività dolci: yoga, meditazione, passeggiate nella natura.",
          "Il tuo sistema nervoso ha bisogno di silenzio e gentilezza: concediglielo senza sensi di colpa.",
          "Una sessione di respirazione consapevole o un bagno caldo possono fare miracoli oggi.",
        ],
        evita: [
          "Evita ambienti caotici e persone che drenano la tua energia.",
          "Evita di trascurare i segnali fisici di tensione emotiva: il corpo parla sempre prima della mente.",
          "Evita luoghi affollati e rumori forti: la tua sensibilità oggi è amplificata.",
        ],
      },
      crescita: {
        forza: [
          "Sviluppa l'intelligenza emotiva e la capacità di ricevere.",
          "La vulnerabilità è forza: oggi permettiti di essere visto per quello che sei davvero.",
          "Impara qualcosa di nuovo da chi ha un'esperienza diversa dalla tua: l'umiltà apre porte.",
        ],
        evita: [
          "Evita di confondere la gentilezza con la debolezza: mantieni i tuoi confini.",
          "Evita di cedere alle aspettative altrui rinunciando alla tua autenticità.",
          "Evita di restare bloccato in ruoli che non ti appartengono più per non deludere nessuno.",
        ],
      },
    },

    3: {
      amore: {
        forza: [
          "Flirta, divertiti, condividi risate. La leggerezza rafforza il legame.",
          "Una serata speciale, un messaggio spiritoso, un gesto creativo: l'amore si nutre di sorprese.",
          "Racconta qualcosa di te che non hai mai condiviso: l'intimità nasce dalla condivisione autentica.",
        ],
        evita: [
          "Evita la superficialità: non scappare dalle conversazioni importanti.",
          "Evita di usare l'umorismo come scudo: a volte ci vuole serietà e presenza emotiva.",
          "Evita di disperdere le tue energie romantiche su troppi fronti: la profondità vale più dell'ampiezza.",
        ],
      },
      lavoro: {
        forza: [
          "Comunica, presenta, crea. La tua creatività oggi è magnetica.",
          "Oggi le tue parole convincono: è il giorno giusto per presentazioni, pitch o negoziazioni.",
          "Il tuo tocco creativo trasforma anche i compiti più ordinari in qualcosa di memorabile.",
        ],
        evita: [
          "Evita di disperdere energia su troppi progetti: scegli e concentrati.",
          "Evita di promettere più di quello che puoi consegnare: l'entusiasmo deve fare i conti con la realtà.",
          "Evita di correggere o criticare il lavoro altrui senza essere stato invitato a farlo.",
        ],
      },
      denaro: {
        forza: [
          "Opportunità legate alla comunicazione e alla visibilità sociale.",
          "Monetizza un talento creativo che hai tenuto nascosto: oggi il mondo è pronto ad ascoltarti.",
          "Un'idea brillante può diventare un'opportunità economica: parlane con qualcuno di fiducia.",
        ],
        evita: [
          "Evita spese eccessive per socializzare o apparire.",
          "Evita di spendere per colmare un vuoto emotivo: lo shopping non è terapia.",
          "Evita di fare acquisti sotto l'impulso dell'entusiasmo del momento: aspetta 24 ore.",
        ],
      },
      benessere: {
        forza: [
          "Movimento espressivo: danza, sport di gruppo, attività creative.",
          "Dedica tempo a un hobby creativo: l'anima si nutre di espressione.",
          "Ridere è la migliore medicina: oggi cerca la leggerezza e trasmettila a chi ti sta vicino.",
        ],
        evita: [
          "Evita eccessi alimentari e notti troppo lunghe.",
          "Evita di trascurare il sonno in nome del divertimento: il riposo è parte della creatività.",
          "Evita gli ambienti tossici o le persone che spengono la tua energia con il loro pessimismo.",
        ],
      },
      crescita: {
        forza: [
          "Esprimi te stesso senza paura del giudizio altrui.",
          "Ogni cosa che crei oggi è un frammento di te nel mondo: non sminuire i tuoi doni.",
          "Scrivi, disegna, canta, parla: qualunque forma di espressione oggi ti avvicina alla tua verità.",
        ],
        evita: [
          "Evita di nasconderti dietro l'umorismo quando serve serietà.",
          "Evita di cercare l'approvazione esterna per ciò che hai fatto: la tua voce ha valore in sé.",
          "Evita di confrontare la tua creatività con quella degli altri: ogni voce è unica e necessaria.",
        ],
      },
    },

    4: {
      amore: {
        forza: [
          "Costruisci stabilità: piccoli gesti concreti valgono più delle parole.",
          "La costanza è la forma più alta di amore: essere sempre presente vale più di mille gesti eroici.",
          "Pianifica insieme al partner un progetto comune: costruire qualcosa insieme rafforza il legame.",
        ],
        evita: [
          "Evita la rigidità emotiva: non tutto deve essere perfettamente organizzato.",
          "Evita di mettere la logica prima dei sentimenti: l'amore non segue sempre le regole.",
          "Evita di aspettarti che il partner condivida la tua stessa precisione: ognuno ha il suo ritmo.",
        ],
      },
      lavoro: {
        forza: [
          "Organizza, pianifica, struttura. Giornata eccellente per completare task.",
          "Oggi hai la pazienza per affrontare i compiti più complessi e noiosi: sfruttala.",
          "Crea un sistema che ti faccia risparmiare tempo nelle settimane a venire: l'ordine è potere.",
        ],
        evita: [
          "Evita la resistenza al cambiamento e l'ossessione per i dettagli.",
          "Evita di perdere la visione d'insieme concentrandoti troppo sui particolari.",
          "Evita di bloccarti su una procedura che non funziona: la rigidità non è qualità.",
        ],
      },
      denaro: {
        forza: [
          "Rivedi il budget, paga i debiti, pianifica risparmi a lungo termine.",
          "Metti nero su bianco le tue finanze: vedere i numeri chiaramente è il primo passo verso l'abbondanza.",
          "Oggi è il giorno ideale per avviare un piano risparmio o saldare un debito in sospeso.",
        ],
        evita: [
          "Evita di bloccarti nella paura di spendere: investire è diverso da sprecare.",
          "Evita di rimandare decisioni finanziarie importanti: ogni giorno di ritardo ha un costo.",
          "Evita di farti influenzare da modelli di consumo altrui: le tue priorità finanziarie sono tue.",
        ],
      },
      benessere: {
        forza: [
          "Routine strutturata: palestra con programma, stretching, postura.",
          "La regolarità è la tua arma segreta: anche 20 minuti al giorno di movimento fanno la differenza.",
          "Pianifica i tuoi pasti della settimana: nutrirsi bene è una forma di rispetto verso te stesso.",
        ],
        evita: [
          "Evita di accumulare stress senza scaricarlo: il corpo tiene il conto.",
          "Evita di usare il lavoro come scusa per non prenderti cura di te: la salute è la base di tutto.",
          "Evita la rigidità ossessiva nelle abitudini salutari: il perfezionismo stanca più del riposo.",
        ],
      },
      crescita: {
        forza: [
          "Disciplina e costanza: ogni piccolo passo costruisce grandi risultati.",
          "La crescita vera non fa rumore: dedica oggi al lavoro silenzioso che nessuno vede ma tutti sentiranno.",
          "Identifica un'abitudine che vuoi coltivare e inizia oggi con un gesto minimo ma concreto.",
        ],
        evita: [
          "Evita di sentirti limitato: la struttura è libertà, non prigione.",
          "Evita di scoraggiarti perché i risultati non sono immediati: le radici crescono prima dei frutti.",
          "Evita di cercare scorciatoie: i percorsi solidi si costruiscono mattone su mattone.",
        ],
      },
    },

    5: {
      amore: {
        forza: [
          "Avventura e novità: sorprendi il partner, esplora insieme.",
          "Rompi la routine di coppia: una nuova esperienza condivisa ravviva la connessione.",
          "La tua energia contagiosa oggi ispira chi ami: sii spontaneo e lasciati trascinare.",
        ],
        evita: [
          "Evita l'irrequietezza che sabota la stabilità: novità sì, caos no.",
          "Evita di fuggire dai momenti di noia relazionale: la noia è parte della vera intimità.",
          "Evita di prendere decisioni affettive importanti nell'ebbrezza del momento.",
        ],
      },
      lavoro: {
        forza: [
          "Adattati, innova, proponi cambiamenti. La flessibilità viene premiata.",
          "Oggi sei il catalizzatore del cambiamento: le tue idee fuori dagli schemi meritano ascolto.",
          "Un'opportunità inaspettata potrebbe presentarsi: mantieni apertura mentale e occhi aperti.",
        ],
        evita: [
          "Evita decisioni impulsive come lasciare il lavoro senza un piano B.",
          "Evita di sabotare con la noia i progetti in corso: il completamento è parte del processo.",
          "Evita di disperdere la tua energia su troppe direzioni: scegli la priorità del giorno.",
        ],
      },
      denaro: {
        forza: [
          "Opportunità improvvise: sii pronto a coglierle con lucidità.",
          "Oggi potresti imbatterti in un'idea di business insolita: valutala con curiosità.",
          "La tua apertura mentale ti permette di vedere opportunità dove gli altri vedono rischi.",
        ],
        evita: [
          "Evita scommesse finanziarie rischiose e acquisti compulsivi.",
          "Evita di prendere decisioni finanziarie irrevocabili basandoti sull'entusiasmo del momento.",
          "Evita di investire in qualcosa che non capisci pienamente solo perché qualcuno ti ha entusiasmato.",
        ],
      },
      benessere: {
        forza: [
          "Sport all'aperto, avventure, nuove attività fisiche stimolanti.",
          "Prova un'attività fisica che non hai mai sperimentato: il corpo ama essere sorpreso.",
          "Trascorri del tempo all'aperto: la natura oggi ricarica le tue batterie in modo straordinario.",
        ],
        evita: [
          "Evita eccessi sensoriali: troppi stimoli affaticano il sistema nervoso.",
          "Evita di saltare i pasti o di mangiare in modo caotico: la libertà include prendersi cura di sé.",
          "Evita di stimolarti eccessivamente con alcol o caffeina: il tuo sistema nervoso chiede equilibrio.",
        ],
      },
      crescita: {
        forza: [
          "Espandi i tuoi orizzonti: viaggia, impara, sperimenta.",
          "Ogni persona che incontri oggi porta un insegnamento: resta curioso e aperto.",
          "Iscriviti a un corso, leggi di un argomento nuovo, ascolta una voce diversa: la mente si espande.",
        ],
        evita: [
          "Evita di confondere la fuga con la libertà.",
          "Evita di lasciarti distrarre dalle infinite possibilità: la crescita richiede anche focus.",
          "Evita di restare sempre nella zona di comfort chiamandola 'stabilità': crescere fa un po' paura, ed è normale.",
        ],
      },
    },

    6: {
      amore: {
        forza: [
          "Dedica tempo alla famiglia e al partner. L'armonia domestica è al centro.",
          "Un gesto di cura autentico — un pasto cucinato con amore, un messaggio del cuore — vale più di qualsiasi regalo.",
          "Oggi l'armonia si costruisce con piccoli atti di attenzione e presenza.",
        ],
        evita: [
          "Evita di caricarti delle responsabilità altrui: aiutare non significa salvare.",
          "Evita di mettere le esigenze altrui sempre davanti alle tue: anche tu meriti cura.",
          "Evita di assumere il ruolo di 'salvatore': le persone che ami hanno bisogno di essere rispettate nella loro autonomia.",
        ],
      },
      lavoro: {
        forza: [
          "Mentoring, cura del team, ruoli di responsabilità relazionale.",
          "Il tuo talento per creare ambienti armonici oggi porta risultati concreti: usalo.",
          "Oggi puoi risolvere una tensione nel team con un semplice gesto di ascolto.",
        ],
        evita: [
          "Evita il perfezionismo: fatto è meglio che perfetto.",
          "Evita di coprire le inefficienze altrui: la responsabilità individuale è fondamentale.",
          "Evita di sobbarcarti il lavoro degli altri per evitare conflitti: i limiti sani vanno espressi.",
        ],
      },
      denaro: {
        forza: [
          "Investimenti nella casa, nella famiglia, nella qualità della vita.",
          "Spendere per migliorare l'ambiente domestico è un investimento in benessere.",
          "Valuta un acquisto che migliori la qualità della vita quotidiana: il benessere non è lusso.",
        ],
        evita: [
          "Evita spese eccessive per gli altri trascurando te stesso.",
          "Evita di ignorare le tue esigenze finanziarie per far felici gli altri: la solidità personale viene prima.",
          "Evita donazioni o prestiti emotivi che non puoi permetterti: la generosità ha i suoi limiti sani.",
        ],
      },
      benessere: {
        forza: [
          "Cucina sana, ambienti armonici, cure termali e relax.",
          "Creare bellezza intorno a te — un fiore, una candela, un ambiente ordinato — nutre l'anima.",
          "La tua salute oggi beneficia dell'armonia relazionale: coltiva le connessioni che ti fanno stare bene.",
        ],
        evita: [
          "Evita di trascurare il tuo benessere per prenderti cura degli altri.",
          "Evita di passare tutto il giorno a occuparti degli altri: riserva almeno un'ora solo per te.",
          "Evita di mangiare o dormire male per accontentare i ritmi altrui: il tuo corpo ha le sue esigenze.",
        ],
      },
      crescita: {
        forza: [
          "Coltiva l'amore incondizionato e la responsabilità consapevole.",
          "Impara a ricevere oggi tanto quanto sai dare: il flusso dell'amore è bidirezionale.",
          "Riconosci i tuoi confini e comunicali con gentilezza: dire 'no' è un atto d'amore verso tutti.",
        ],
        evita: [
          "Evita il senso di colpa: puoi amare senza annullarti.",
          "Evita di usare la cura degli altri come fuga dalle tue responsabilità verso te stesso.",
          "Evita di costruire la tua identità interamente attorno al ruolo di chi si prende cura: sei molto di più.",
        ],
      },
    },

    7: {
      amore: {
        forza: [
          "Intimità profonda e conversazioni significative con il partner.",
          "Condividi una riflessione intima: la vera connessione nasce dall'onestà intellettuale.",
          "Un momento di silenzio condiviso o di lettura accanto all'altro: l'amore profondo non ha bisogno di rumore.",
        ],
        evita: [
          "Evita il distacco emotivo e l'isolamento: la solitudine non è solitudine dell'anima.",
          "Evita di analizzare in modo eccessivo le dinamiche della relazione: non tutto ha una spiegazione razionale.",
          "Evita di chiuderti nel tuo mondo interiore senza avvisare il partner: la comunicazione è un atto d'amore.",
        ],
      },
      lavoro: {
        forza: [
          "Analisi, ricerca, strategia. Giornata ideale per studio e riflessione.",
          "La tua mente oggi è un laser: usala per risolvere un problema complesso che stavi evitando.",
          "Dedica questa giornata alla pianificazione strategica o allo studio di settore: il futuro si costruisce con la conoscenza.",
        ],
        evita: [
          "Evita di rimandare le decisioni per eccesso di analisi (paralisi da analisi).",
          "Evita di condividere le tue conclusioni prima di averle testate: la profondità richiede tempo.",
          "Evita le riunioni superficiali che distolgono la tua mente dal lavoro profondo.",
        ],
      },
      denaro: {
        forza: [
          "Studia investimenti con calma, fai ricerche approfondite prima di agire.",
          "Una ricerca finanziaria approfondita oggi può rivelare opportunità che gli altri non vedono.",
          "Consulta uno specialista, analizza i tuoi conti: la conoscenza è il miglior investimento.",
        ],
        evita: [
          "Evita di ignorare le opportunità per eccesso di prudenza.",
          "Evita di restare in attesa dell'informazione perfetta: ad un certo punto bisogna agire.",
          "Evita l'avarizia mascherata da prudenza: trattenerti sempre porta alla stagnazione.",
        ],
      },
      benessere: {
        forza: [
          "Meditazione, digiuno leggero, cura del sistema nervoso.",
          "Oggi il tuo benessere passa attraverso la mente: un libro o una riflessione tranquilla ti rigenerano.",
          "Una passeggiata solitaria nella natura o una sessione di scrittura riflessiva ti fanno più bene di qualsiasi integratore.",
        ],
        evita: [
          "Evita l'eccesso di caffeina e stimolanti: il tuo sistema nervoso è già attivo.",
          "Evita di sovra-stimolare la mente con troppi input digitali: il silenzio è nutrimento.",
          "Evita di isolarti troppo a lungo: il benessere del 7 ha bisogno anche di connessione umana.",
        ],
      },
      crescita: {
        forza: [
          "Autoanalisi, lettura, studio spirituale. La saggezza interiore emerge.",
          "Oggi le domande sono più importanti delle risposte: abita le tue incertezze con curiosità.",
          "Scrivi un diario, medita, esplora una tradizione filosofica: il viaggio interiore ha i suoi frutti.",
        ],
        evita: [
          "Evita il cinismo e lo scetticismo: non tutto deve essere dimostrato razionalmente.",
          "Evita di diventare l'osservatore distaccato della tua vita: a un certo punto bisogna scendere in campo.",
          "Evita di usare la spiritualità come fuga dal mondo reale: la saggezza si applica, non solo si contempla.",
        ],
      },
    },

    8: {
      amore: {
        forza: [
          "Stabilità e sicurezza nella relazione. Dimostra il tuo impegno concreto.",
          "Oggi puoi costruire una base solida nella relazione con un atto di responsabilità e impegno.",
          "Parla apertamente dei tuoi obiettivi di vita con il partner: l'allineamento sui grandi temi rafforza l'unione.",
        ],
        evita: [
          "Evita di usare il denaro o il potere come sostituti dell'affetto.",
          "Evita di misurare il valore del partner in base a ciò che porta materialmente: l'amore è oltre i conti.",
          "Evita di usare la tua forza per dominare il partner: il rispetto è il fondamento di ogni relazione duratura.",
        ],
      },
      lavoro: {
        forza: [
          "Affari, carriera, risultati concreti. Chiudi contratti e trattative.",
          "Oggi la tua presenza ispira fiducia: è il momento ideale per presentarti ai decision maker.",
          "Negozia con autorevolezza e rispetto: la tua capacità di trovare accordi equi è al massimo.",
        ],
        evita: [
          "Evita l'avidità e la competizione sleale: il karma dell'8 è immediato.",
          "Evita di calpestare gli altri nella corsa verso il successo: i ponti bruciati non si ricostruiscono facilmente.",
          "Evita di accettare compromessi al ribasso solo per chiudere in fretta: la tua posizione ha valore.",
        ],
      },
      denaro: {
        forza: [
          "Giornata potente per affari, negoziazioni e decisioni finanziarie importanti.",
          "Oggi hai il coraggio e la lucidità per affrontare un nodo finanziario che evitavi.",
          "Un'opportunità di guadagno potrebbe presentarsi: valutala con calma ma non lasciarla scivolare via.",
        ],
        evita: [
          "Evita la mentalità della scarsità: investi con fiducia ma con criterio.",
          "Evita di legarti a persone o accordi che promettono guadagni rapidi senza trasparenza.",
          "Evita di ossessionarti con i numeri al punto da perdere di vista il benessere complessivo.",
        ],
      },
      benessere: {
        forza: [
          "Allenamento intenso e strutturato: il corpo risponde alla sfida.",
          "La tua forza fisica oggi è notevole: usala con intelligenza per risultati duraturi.",
          "Un allenamento di forza o un'attività che ti mette alla prova fisicamente ti darà soddisfazione profonda.",
        ],
        evita: [
          "Evita di ignorare lo stress accumulato: il burnout è reale.",
          "Evita di spingere il corpo oltre i suoi limiti per dimostrare qualcosa a te stesso.",
          "Evita di trascurare il recupero: i muscoli crescono durante il riposo, non durante lo sforzo.",
        ],
      },
      crescita: {
        forza: [
          "Lavora sul tuo rapporto con il potere e l'abbondanza.",
          "Riconosci oggi la tua influenza sugli altri e usala responsabilmente: il potere vero è al servizio del bene comune.",
          "Ogni risultato che ottieni oggi è la prova concreta che il lavoro paga: celebra i tuoi successi.",
        ],
        evita: [
          "Evita di misurare il tuo valore in base ai risultati materiali.",
          "Evita di confondere il successo esterno con la realizzazione interiore: sono due percorsi diversi.",
          "Evita il workaholism come fuga: il vero potere include anche la capacità di fermarsi.",
        ],
      },
    },

    9: {
      amore: {
        forza: [
          "Compassione, perdono, chiusura di cicli. Lascia andare ciò che non serve.",
          "Un gesto di perdono — verso l'altro o verso te stesso — oggi libera una quantità enorme di energia.",
          "Guarda la tua relazione con occhi di gratitudine: anche le difficoltà ti hanno insegnato qualcosa di prezioso.",
        ],
        evita: [
          "Evita di aggrapparti a relazioni finite: il lasciar andare apre nuove porte.",
          "Evita di riaprire ferite chiuse solo per avere l'ultima parola: il silenzio è spesso la risposta più saggia.",
          "Evita di idealizzare il passato sentimentale al punto da bloccare il tuo presente.",
        ],
      },
      lavoro: {
        forza: [
          "Concludi progetti, fai bilanci, prepara il terreno per il nuovo.",
          "Dedica questa giornata a completare, archiviare e fare spazio: la fine di un ciclo è l'inizio del prossimo.",
          "Un progetto che trascini da mesi merita oggi la tua attenzione finale: chiudilo con cura.",
        ],
        evita: [
          "Evita di iniziare nuovi progetti importanti: è tempo di chiudere, non aprire.",
          "Evita di rimandare conversazioni difficili legate a chiusure o cambiamenti: l'onestà libera.",
          "Evita di raccogliere idee per nuovi progetti prima di aver chiuso quelli in corso.",
        ],
      },
      denaro: {
        forza: [
          "Dona, condividi, restituisci. La generosità viene ricambiata.",
          "Valuta una riorganizzazione finanziaria: eliminare il superfluo libera risorse per ciò che conta.",
          "Oggi è un buon momento per regolare conti in sospeso o chiudere abbonamenti inutili.",
        ],
        evita: [
          "Evita di trattenere ossessivamente: il denaro bloccato ristagna.",
          "Evita di prendere decisioni economiche importanti spinto dall'emozione o dal senso di colpa.",
          "Evita di interpretare la generosità come perdita: ciò che dai con gioia torna moltiplicato.",
        ],
      },
      benessere: {
        forza: [
          "Detox fisico ed emotivo. Pulizia, purificazione, rilascio.",
          "Oggi il tuo corpo ha bisogno di leggerezza: meno cibo pesante, meno schermo, più respiro.",
          "Un bagno depurativo, una sessione di stretching profondo o una giornata leggera possono rivitalizzarti.",
        ],
        evita: [
          "Evita la malinconia e il rimpianto: guarda avanti con gratitudine.",
          "Evita di lasciare che la stanchezza emotiva si trasformi in sintomi fisici: parla con qualcuno.",
          "Evita di trascinarti attraverso la giornata ignorando i segnali di esaurimento: il corpo ha sempre ragione.",
        ],
      },
      crescita: {
        forza: [
          "Saggezza e compassione universale. Diventa un faro per gli altri.",
          "Guarda indietro al cammino percorso con occhi di gratitudine: ogni caduta ti ha reso più forte.",
          "Oggi sei pronto per un salto evolutivo: riconosci chi sei diventato e abbraccia la versione più matura di te.",
        ],
        evita: [
          "Evita il vittimismo: le prove del 9 sono trasformative, non punizioni.",
          "Evita di portare con te i pesi del passato come fossero tuoi per sempre: trasformali in saggezza.",
          "Evita la nostalgia paralizzante: il passato è il tuo maestro, non la tua destinazione.",
        ],
      },
    },
  },

  en: {
    1: {
      amore: {
        forza: [
          "Take the initiative: express your feelings or suggest something new.",
          "A courageous gesture is worth more than a thousand words: make the first move today.",
          "Your inner confidence today is magnetic: true feelings deserve to be spoken.",
        ],
        evita: [
          "Avoid being too authoritarian or imposing your vision on your partner.",
          "Avoid expecting the other to guess your needs: clarity is love.",
          "Avoid confusing the desire for control with passion: love sets free.",
        ],
      },
      lavoro: {
        forza: [
          "Perfect day to launch ideas, make decisions and lead projects.",
          "You hold the cards: propose that promotion or project you've been sitting on for months.",
          "Your determination today unblocks situations that have been stuck too long.",
        ],
        evita: [
          "Avoid ignoring colleagues' input or acting without consulting the team.",
          "Avoid burning through timelines: even the most capable leader needs group consensus.",
          "Avoid interpreting every disagreement as an attack: criticism builds.",
        ],
      },
      denaro: {
        forza: [
          "Good time for independent investments and quick financial decisions.",
          "Today you have the clarity to evaluate an important economic choice left pending.",
          "Your self-confidence today attracts concrete economic opportunities: stay open.",
        ],
        evita: [
          "Avoid impulsive spending driven by ego or purchases to impress others.",
          "Avoid making big financial moves without a plan: courage is not impulsivity.",
          "Avoid overestimating your current resources: plan with the real numbers.",
        ],
      },
      benessere: {
        forza: [
          "High energy: ideal for starting a new workout or health routine.",
          "Your body responds brilliantly to effort today: make the most of this vitality.",
          "Start the healthy practice you've been putting off: motivation is on your side.",
        ],
        evita: [
          "Avoid overdoing physical effort — risk of strain or overload.",
          "Avoid ignoring signs of fatigue: even machines need rest.",
          "Avoid solitary sports that slip into obsessive competitiveness: wellbeing is joy.",
        ],
      },
      crescita: {
        forza: [
          "A moment of inner leadership: trust your instinct and act.",
          "Today you are the protagonist of your story: write the next chapter with intention.",
          "Today's inner clarity is a gift: use this moment to define your priorities.",
        ],
        evita: [
          "Avoid excessive isolation: strength doesn't exclude connection.",
          "Avoid comparing your path with others': your road is unique.",
          "Avoid scattering this energy across too many goals: choose one and go deep.",
        ],
      },
    },
    2: {
      amore: {
        forza: [
          "Listen deeply to your partner. Empathy is your superpower today.",
          "A shared moment of silence is worth more than a thousand words: stay close to those you love.",
          "Your sensitivity today builds bridges where walls existed: use it gently.",
        ],
        evita: [
          "Avoid sacrificing too much or suppressing your needs to please others.",
          "Avoid playing emotional detective: not every silence hides a problem.",
          "Avoid absorbing others' emotions as if they were your own: learn to filter.",
        ],
      },
      lavoro: {
        forza: [
          "Collaborate, mediate, build alliances. Teamwork brings results.",
          "Your ability to listen to everyone makes you the group's reference point.",
          "A colleague needs your support: offer it generously and it will come back with interest.",
        ],
        evita: [
          "Avoid direct conflicts and unilateral decisions: diplomacy is key today.",
          "Avoid postponing every decision waiting for universal consensus: sometimes you must choose.",
          "Avoid getting lost in the emotional details of group dynamics: keep focus on the result.",
        ],
      },
      denaro: {
        forza: [
          "Good day for negotiations and shared agreements, joint ventures.",
          "Consider a partnership or economic collaboration that was recently proposed.",
          "Your finances benefit from a shared approach: speak with a trusted expert or partner.",
        ],
        evita: [
          "Avoid risky investments or financial decisions under emotional pressure.",
          "Avoid blindly trusting anyone offering opportunities that seem too good.",
          "Avoid important economic decisions when you are emotionally unsettled.",
        ],
      },
      benessere: {
        forza: [
          "Gentle activities: yoga, meditation, walks in nature.",
          "Your nervous system needs silence and gentleness: give it that without guilt.",
          "Conscious breathing or a warm bath can work miracles today.",
        ],
        evita: [
          "Avoid chaotic environments and people who drain your energy.",
          "Avoid neglecting physical signs of emotional tension: the body always speaks first.",
          "Avoid crowded places and loud noise: your sensitivity is amplified today.",
        ],
      },
      crescita: {
        forza: [
          "Develop emotional intelligence and the ability to receive.",
          "Vulnerability is strength: today allow yourself to be seen for who you truly are.",
          "Learn something new from someone with a different experience: humility opens doors.",
        ],
        evita: [
          "Avoid confusing kindness with weakness: maintain your boundaries.",
          "Avoid yielding to others' expectations at the cost of your authenticity.",
          "Avoid staying stuck in roles that no longer belong to you just to avoid disappointing anyone.",
        ],
      },
    },
    3: {
      amore: {
        forza: [
          "Flirt, have fun, share laughter. Lightness strengthens the bond.",
          "A special evening, a witty message, a creative gesture: love feeds on surprises.",
          "Share something about yourself you've never shared: intimacy is born from authentic sharing.",
        ],
        evita: [
          "Avoid superficiality: don't run away from important conversations.",
          "Avoid using humour as a shield: sometimes seriousness and emotional presence are needed.",
          "Avoid scattering your romantic energy across too many fronts: depth is worth more than breadth.",
        ],
      },
      lavoro: {
        forza: [
          "Communicate, present, create. Your creativity is magnetic today.",
          "Your words are convincing today: the right day for presentations, pitches or negotiations.",
          "Your creative touch turns even the most ordinary tasks into something memorable.",
        ],
        evita: [
          "Avoid scattering energy across too many projects: choose and focus.",
          "Avoid promising more than you can deliver: enthusiasm must face reality.",
          "Avoid correcting or criticising others' work without being invited to do so.",
        ],
      },
      denaro: {
        forza: [
          "Opportunities tied to communication and social visibility.",
          "Monetise a creative talent you've kept hidden: today the world is ready to listen.",
          "A brilliant idea can become an economic opportunity: share it with someone you trust.",
        ],
        evita: [
          "Avoid excessive spending to socialise or show off.",
          "Avoid spending to fill an emotional void: shopping is not therapy.",
          "Avoid purchases driven by the enthusiasm of the moment: wait 24 hours.",
        ],
      },
      benessere: {
        forza: [
          "Expressive movement: dance, group sports, creative activities.",
          "Dedicate time to a creative hobby: the soul feeds on expression.",
          "Laughter is the best medicine: seek lightness today and share it with those around you.",
        ],
        evita: [
          "Avoid food excesses and late nights.",
          "Avoid neglecting sleep in the name of fun: rest is part of creativity.",
          "Avoid toxic environments or people who extinguish your energy with their pessimism.",
        ],
      },
      crescita: {
        forza: [
          "Express yourself without fear of others' judgment.",
          "Everything you create today is a fragment of you in the world: don't undervalue your gifts.",
          "Write, draw, sing, speak: any form of expression today brings you closer to your truth.",
        ],
        evita: [
          "Avoid hiding behind humour when seriousness is needed.",
          "Avoid seeking external approval for what you've created: your voice has value in itself.",
          "Avoid comparing your creativity to others': every voice is unique and necessary.",
        ],
      },
    },
    4: {
      amore: {
        forza: [
          "Build stability: small concrete gestures are worth more than words.",
          "Consistency is the highest form of love: being always present is worth more than heroic gestures.",
          "Plan a joint project with your partner: building something together strengthens the bond.",
        ],
        evita: [
          "Avoid emotional rigidity: not everything needs to be perfectly organised.",
          "Avoid putting logic before feelings: love doesn't always follow rules.",
          "Avoid expecting your partner to share your same precision: everyone has their own rhythm.",
        ],
      },
      lavoro: {
        forza: [
          "Organise, plan, structure. Excellent day for completing tasks.",
          "Today you have the patience to tackle the most complex and tedious tasks: use it.",
          "Create a system that saves you time in the weeks ahead: order is power.",
        ],
        evita: [
          "Avoid resistance to change and obsession over details.",
          "Avoid losing the big picture by focusing too much on particulars.",
          "Avoid getting stuck on a procedure that isn't working: rigidity is not quality.",
        ],
      },
      denaro: {
        forza: [
          "Review your budget, pay debts, plan long-term savings.",
          "Put your finances in black and white: seeing the numbers clearly is the first step towards abundance.",
          "Today is ideal for starting a savings plan or settling a pending debt.",
        ],
        evita: [
          "Avoid freezing up from fear of spending: investing is different from wasting.",
          "Avoid postponing important financial decisions: every day of delay has a cost.",
          "Avoid being influenced by others' consumption models: your financial priorities are your own.",
        ],
      },
      benessere: {
        forza: [
          "Structured routine: gym with a program, stretching, posture.",
          "Regularity is your secret weapon: even 20 minutes of daily movement makes a difference.",
          "Plan your meals for the week: eating well is a form of self-respect.",
        ],
        evita: [
          "Avoid accumulating stress without releasing it: the body keeps score.",
          "Avoid using work as an excuse not to take care of yourself: health is the foundation of everything.",
          "Avoid obsessive rigidity in healthy habits: perfectionism tires more than rest.",
        ],
      },
      crescita: {
        forza: [
          "Discipline and consistency: every small step builds great results.",
          "True growth makes no noise: devote today to the silent work no one sees but everyone will feel.",
          "Identify a habit you want to cultivate and start today with a minimal but concrete gesture.",
        ],
        evita: [
          "Avoid feeling limited: structure is freedom, not a prison.",
          "Avoid discouragement because results aren't immediate: roots grow before fruits.",
          "Avoid looking for shortcuts: solid paths are built brick by brick.",
        ],
      },
    },
    5: {
      amore: {
        forza: [
          "Adventure and novelty: surprise your partner, explore together.",
          "Break the couple's routine: a new shared experience revives the connection.",
          "Your contagious energy today inspires those you love: be spontaneous and let yourself be carried.",
        ],
        evita: [
          "Avoid restlessness that sabotages stability: novelty yes, chaos no.",
          "Avoid running from boring moments in the relationship: boredom is part of true intimacy.",
          "Avoid making important affective decisions in the heat of the moment.",
        ],
      },
      lavoro: {
        forza: [
          "Adapt, innovate, propose changes. Flexibility is rewarded.",
          "Today you are the catalyst for change: your out-of-the-box ideas deserve to be heard.",
          "An unexpected opportunity may arise: keep an open mind and your eyes open.",
        ],
        evita: [
          "Avoid impulsive decisions like quitting your job without a plan B.",
          "Avoid sabotaging ongoing projects with boredom: completion is part of the process.",
          "Avoid scattering your energy in too many directions: choose today's priority.",
        ],
      },
      denaro: {
        forza: [
          "Sudden opportunities: be ready to seize them with clarity.",
          "Today you might come across an unusual business idea: evaluate it with curiosity.",
          "Your open mind lets you see opportunities where others see only risks.",
        ],
        evita: [
          "Avoid risky financial bets and compulsive purchases.",
          "Avoid making irrevocable financial decisions based on the enthusiasm of the moment.",
          "Avoid investing in something you don't fully understand just because someone got you excited.",
        ],
      },
      benessere: {
        forza: [
          "Outdoor sports, adventures, stimulating new physical activities.",
          "Try a physical activity you've never tried before: the body loves being surprised.",
          "Spend time outdoors: nature recharges your batteries in an extraordinary way today.",
        ],
        evita: [
          "Avoid sensory overload: too many stimuli strain the nervous system.",
          "Avoid skipping meals or eating chaotically: freedom includes taking care of yourself.",
          "Avoid excessive stimulation from alcohol or caffeine: your nervous system needs balance.",
        ],
      },
      crescita: {
        forza: [
          "Expand your horizons: travel, learn, experiment.",
          "Every person you meet today carries a lesson: stay curious and open.",
          "Sign up for a course, read about a new topic, listen to a different voice: the mind expands when challenged.",
        ],
        evita: [
          "Avoid confusing escape with freedom.",
          "Avoid being distracted by endless possibilities: growth also requires focus.",
          "Avoid staying in your comfort zone and calling it 'stability': growing is a little scary, and that's normal.",
        ],
      },
    },
    6: {
      amore: {
        forza: [
          "Dedicate time to family and partner. Domestic harmony is central.",
          "An authentic gesture of care — a home-cooked meal, a heartfelt message — is worth more than any gift.",
          "Today harmony is built with small acts of attention and presence.",
        ],
        evita: [
          "Avoid taking on others' responsibilities: helping doesn't mean saving.",
          "Avoid always putting others' needs before your own: you deserve care too.",
          "Avoid assuming the 'saviour' role: those you love need to be respected in their autonomy.",
        ],
      },
      lavoro: {
        forza: [
          "Mentoring, team care, relational responsibility roles.",
          "Your talent for creating harmonious environments yields concrete results today: use it.",
          "Today you can resolve tension in the team with a simple act of listening.",
        ],
        evita: [
          "Avoid perfectionism: done is better than perfect.",
          "Avoid covering others' inefficiencies: individual responsibility is fundamental.",
          "Avoid taking on others' work to avoid conflict: healthy limits must be expressed.",
        ],
      },
      denaro: {
        forza: [
          "Investments in home, family, and quality of life.",
          "Spending to improve your home environment is an investment in wellbeing.",
          "Consider a purchase that improves daily quality of life: wellbeing is not a luxury.",
        ],
        evita: [
          "Avoid excessive spending on others while neglecting yourself.",
          "Avoid ignoring your financial needs to make others happy: personal stability comes first.",
          "Avoid emotional loans or donations you can't afford: generosity has healthy limits.",
        ],
      },
      benessere: {
        forza: [
          "Healthy cooking, harmonious environments, spa treatments and relaxation.",
          "Creating beauty around you — a flower, a candle, a tidy space — nourishes the soul.",
          "Your health today benefits from relational harmony: nurture connections that make you feel good.",
        ],
        evita: [
          "Avoid neglecting your wellbeing while caring for others.",
          "Avoid spending the whole day caring for others: reserve at least an hour just for yourself.",
          "Avoid eating or sleeping poorly to accommodate others' rhythms: your body has its own needs.",
        ],
      },
      crescita: {
        forza: [
          "Cultivate unconditional love and conscious responsibility.",
          "Learn to receive today as much as you know how to give: the flow of love is bidirectional.",
          "Recognise your limits and communicate them gently: saying 'no' is an act of love for everyone.",
        ],
        evita: [
          "Avoid guilt: you can love without losing yourself.",
          "Avoid using care for others as an escape from your responsibilities to yourself.",
          "Avoid building your entire identity around the caregiver role: you are so much more.",
        ],
      },
    },
    7: {
      amore: {
        forza: [
          "Deep intimacy and meaningful conversations with your partner.",
          "Share an intimate reflection: true connection is born from intellectual honesty.",
          "A shared silence or reading side by side: deep love needs no noise.",
        ],
        evita: [
          "Avoid emotional detachment and isolation: solitude isn't soul loneliness.",
          "Avoid over-analysing relationship dynamics: not everything has a rational explanation.",
          "Avoid retreating into your inner world without telling your partner: communication is love.",
        ],
      },
      lavoro: {
        forza: [
          "Analysis, research, strategy. Ideal day for study and reflection.",
          "Your mind is a laser today: use it to solve a complex problem you've been avoiding.",
          "Devote this day to strategic planning or sector study: the future is built with knowledge.",
        ],
        evita: [
          "Avoid postponing decisions due to over-analysis (analysis paralysis).",
          "Avoid sharing your conclusions before you've tested them: depth takes time.",
          "Avoid superficial meetings that distract your mind from deep work.",
        ],
      },
      denaro: {
        forza: [
          "Study investments calmly, do thorough research before acting.",
          "Thorough financial research today can reveal opportunities others don't see.",
          "Consult a specialist, analyse your accounts: knowledge is the best investment.",
        ],
        evita: [
          "Avoid ignoring opportunities out of excessive caution.",
          "Avoid waiting for perfect information: at some point you have to act.",
          "Avoid miserliness disguised as prudence: always holding back leads to stagnation.",
        ],
      },
      benessere: {
        forza: [
          "Meditation, light fasting, nervous system care.",
          "Your wellbeing today flows through the mind: a book or quiet reflection regenerates you.",
          "A solitary walk in nature or a reflective writing session does more good than any supplement.",
        ],
        evita: [
          "Avoid excess caffeine and stimulants: your nervous system is already active.",
          "Avoid over-stimulating the mind with too many digital inputs: silence is nourishment.",
          "Avoid isolating yourself too long: the 7's wellbeing also needs human connection.",
        ],
      },
      crescita: {
        forza: [
          "Self-analysis, reading, spiritual study. Inner wisdom emerges.",
          "Today questions matter more than answers: inhabit your uncertainties with curiosity.",
          "Write a journal, meditate, explore a philosophical tradition: the inner journey bears fruit.",
        ],
        evita: [
          "Avoid cynicism and skepticism: not everything must be rationally proven.",
          "Avoid becoming the detached observer of your own life: at some point you must enter the field.",
          "Avoid using spirituality as an escape from the real world: wisdom is applied, not just contemplated.",
        ],
      },
    },
    8: {
      amore: {
        forza: [
          "Stability and security in the relationship. Show your concrete commitment.",
          "Today you can build a solid foundation in the relationship with an act of responsibility.",
          "Talk openly with your partner about life goals: alignment on big themes strengthens the union.",
        ],
        evita: [
          "Avoid using money or power as substitutes for affection.",
          "Avoid measuring your partner's worth by what they bring materially: love is beyond accounts.",
          "Avoid using your strength to dominate your partner: respect is the foundation of any lasting relationship.",
        ],
      },
      lavoro: {
        forza: [
          "Business, career, concrete results. Close contracts and negotiations.",
          "Your presence inspires trust today: the ideal moment to present yourself to decision makers.",
          "Negotiate with authority and respect: your ability to find fair agreements is at its peak.",
        ],
        evita: [
          "Avoid greed and unfair competition: the karma of 8 is immediate.",
          "Avoid stepping on others in the race to success: burned bridges are hard to rebuild.",
          "Avoid accepting below-par compromises just to close quickly: your position has value.",
        ],
      },
      denaro: {
        forza: [
          "Powerful day for business, negotiations and important financial decisions.",
          "Today you have the courage and clarity to tackle a financial knot you've been avoiding.",
          "A revenue opportunity may arise: evaluate it calmly but don't let it slip away.",
        ],
        evita: [
          "Avoid scarcity mentality: invest with confidence but with criteria.",
          "Avoid tying yourself to people or deals promising quick gains without transparency.",
          "Avoid obsessing over numbers to the point of losing sight of overall wellbeing.",
        ],
      },
      benessere: {
        forza: [
          "Intense, structured training: the body responds to the challenge.",
          "Your physical strength today is remarkable: use it intelligently for lasting results.",
          "A strength workout or physically challenging activity gives you deep satisfaction today.",
        ],
        evita: [
          "Avoid ignoring accumulated stress: burnout is real.",
          "Avoid pushing your body beyond its natural limits to prove something to yourself.",
          "Avoid neglecting recovery: muscles grow during rest, not during effort.",
        ],
      },
      crescita: {
        forza: [
          "Work on your relationship with power and abundance.",
          "Recognise your influence on others today and use it responsibly: true power serves the common good.",
          "Every result you achieve today is concrete proof that effort pays: celebrate your successes.",
        ],
        evita: [
          "Avoid measuring your worth by material results.",
          "Avoid confusing external success with inner fulfillment: they are two different paths.",
          "Avoid workaholism as escape: true power includes the ability to stop.",
        ],
      },
    },
    9: {
      amore: {
        forza: [
          "Compassion, forgiveness, closing cycles. Let go of what no longer serves.",
          "A gesture of forgiveness — toward the other or yourself — frees an enormous amount of energy today.",
          "Look at your relationship with eyes of gratitude: even difficulties have taught you something precious.",
        ],
        evita: [
          "Avoid clinging to ended relationships: letting go opens new doors.",
          "Avoid reopening closed wounds just to have the last word: silence is often the wisest answer.",
          "Avoid idealising your romantic past so much that it blocks your present.",
        ],
      },
      lavoro: {
        forza: [
          "Complete projects, take stock, prepare the ground for what's new.",
          "Devote this day to completing, filing and making space: the end of a cycle is the start of the next.",
          "A project you've been dragging for months deserves your final attention today: close it with care.",
        ],
        evita: [
          "Avoid starting important new projects: it's time to close, not open.",
          "Avoid postponing difficult conversations about closures or changes: honesty liberates.",
          "Avoid gathering ideas for new projects before you've closed the ones in progress.",
        ],
      },
      denaro: {
        forza: [
          "Give, share, give back. Generosity is reciprocated.",
          "Consider a financial reorganisation: eliminating the superfluous frees resources for what matters.",
          "Today is a good time to settle outstanding accounts or cancel unnecessary subscriptions.",
        ],
        evita: [
          "Avoid holding on obsessively: blocked money stagnates.",
          "Avoid making important economic decisions driven by emotion or guilt.",
          "Avoid interpreting generosity as loss: what you give with joy comes back multiplied.",
        ],
      },
      benessere: {
        forza: [
          "Physical and emotional detox. Cleansing, purification, release.",
          "Today your body needs lightness: less heavy food, less screen time, more breath and silence.",
          "A detox bath, deep stretching session or a light day can revitalise you.",
        ],
        evita: [
          "Avoid melancholy and regret: look forward with gratitude.",
          "Avoid letting emotional fatigue turn into physical symptoms: talk to someone about how you feel.",
          "Avoid dragging yourself through the day ignoring signs of exhaustion: the body is always right.",
        ],
      },
      crescita: {
        forza: [
          "Universal wisdom and compassion. Become a beacon for others.",
          "Look back at the path walked with eyes of gratitude: every fall has made you stronger.",
          "Today you are ready for an evolutionary leap: recognise who you've become and embrace the wiser version of yourself.",
        ],
        evita: [
          "Avoid victimhood: the trials of 9 are transformative, not punishments.",
          "Avoid carrying the weights of the past as if they were yours forever: transform them into wisdom.",
          "Avoid paralysing nostalgia: the past is your teacher, not your destination.",
        ],
      },
    },
  },
};

const motivationalMessagesByLang: Record<string, MotivationalMessages> = {
  it: {
    "1-1": "Doppia energia di comando: oggi sei inarrestabile. Usa questa forza per iniziare ciò che hai sempre rimandato.",
    "1-2": "La tua riflessione interiore trova oggi il coraggio di manifestarsi. Agisci con equilibrio e determinazione.",
    "1-3": "L'iniziativa oggi si veste di creatività. Proponi quell'idea folle: ha più senso di quanto credi.",
    "1-4": "Struttura e iniziativa si fondono: è il giorno giusto per gettare le basi di qualcosa di solido e duraturo.",
    "1-5": "Libertà e comando: oggi rompi gli schemi con consapevolezza. Il cambiamento che inizi oggi ha radici profonde.",
    "1-6": "La tua leadership oggi si esprime nella cura degli altri. Guidare con il cuore è il vero potere.",
    "1-7": "La tua analisi profonda trova oggi la spinta per trasformarsi in azione concreta. Fidati della tua intuizione.",
    "1-8": "Potere su potere: giornata formidabile per affari e decisioni importanti. Il successo è a portata di mano.",
    "1-9": "Chiudi un capitolo con la forza di un leader. Il coraggio di lasciar andare apre porte straordinarie.",
    "2-1": "Oggi la collaborazione nasce da un'idea forte. Ascolta gli altri, ma non perdere la tua visione.",
    "2-2": "Sensibilità raddoppiata: sei un radar emotivo. Usa questo dono per creare armonia dove c'è tensione.",
    "2-3": "Diplomazia e creatività si abbracciano. Le tue parole oggi hanno il potere di guarire e ispirare.",
    "2-4": "Pazienza e collaborazione costruiscono ponti solidi. Ogni alleanza stretta oggi durerà nel tempo.",
    "2-5": "Adattabilità e sensibilità ti rendono il mediatore perfetto in situazioni caotiche. Sii l'ancora.",
    "2-6": "Amore e armonia al massimo: oggi ogni gesto gentile torna indietro moltiplicato.",
    "2-7": "Intuizione profonda: oggi ascolti ciò che gli altri non dicono. La tua empatia è chiaroveggenza.",
    "2-8": "La tua diplomazia apre le porte del potere. Negozia con grazia e ottieni più di quanto speri.",
    "2-9": "Compassione e cooperazione: oggi sei un guaritore naturale. Il tuo cuore grande fa la differenza.",
    "3-1": "Creatività esplosiva: le tue idee oggi hanno la forza di diventare realtà. Non censurarti.",
    "3-2": "La tua arte incontra la sensibilità. Ciò che crei oggi tocca il cuore delle persone.",
    "3-3": "Espressione pura: oggi il tuo carisma è incontenibile. Parla, crea, brilla senza freni.",
    "3-4": "La creatività trova struttura: è il giorno per trasformare un'idea brillante in un piano concreto.",
    "3-5": "Energia vulcanica: oggi tutto è possibile. Socializza, esplora, lascia il segno ovunque vai.",
    "3-6": "La tua creatività oggi è al servizio dell'amore. Un gesto artistico per chi ami vale più di mille parole.",
    "3-7": "L'ispirazione nasce dalla profondità. Oggi la tua creatività ha radici spirituali: lasciala fluire.",
    "3-8": "Carisma e ambizione: oggi la tua comunicazione apre porte importanti nel mondo degli affari.",
    "3-9": "Il tuo talento espressivo oggi chiude cicli creativi. Finisci quel progetto: è il momento.",
    "4-1": "Le fondamenta che costruisci oggi reggono una nuova grande iniziativa. Pianifica e agisci.",
    "4-2": "Metodo e collaborazione: oggi il lavoro di squadra produce risultati concreti e misurabili.",
    "4-3": "La disciplina incontra l'ispirazione. Oggi riesci a dare forma alle idee più ambiziose.",
    "4-4": "Solidità assoluta: oggi sei una roccia. Ogni sforzo costruisce qualcosa di permanente.",
    "4-5": "Ordine nel caos: oggi la tua capacità organizzativa trasforma l'imprevisto in opportunità.",
    "4-6": "Stabilità e cura: oggi costruisci sicurezza per te e per chi ami. Ogni dettaglio conta.",
    "4-7": "Studio e metodo: oggi la tua mente analitica raggiunge intuizioni straordinarie.",
    "4-8": "Disciplina e potere: oggi il tuo lavoro duro viene riconosciuto e ricompensato.",
    "4-9": "Completa con metodo ciò che hai iniziato. La chiusura ordinata apre spazi nuovi.",
    "5-1": "Cambiamento e coraggio: oggi sei il pioniere di una nuova avventura. Parti senza esitare.",
    "5-2": "La tua flessibilità oggi si esprime nella capacità di adattarti alle emozioni altrui con grazia.",
    "5-3": "Libertà creativa al massimo: oggi ogni esperienza diventa ispirazione. Vivi intensamente.",
    "5-4": "Il cambiamento trova struttura: oggi le novità si integrano nella tua routine in modo naturale.",
    "5-5": "Libertà totale: oggi il mondo è la tua tela. Attenzione solo a non disperdere troppa energia.",
    "5-6": "L'avventura oggi è al servizio dell'amore. Sorprendi chi ami con qualcosa di inaspettato.",
    "5-7": "La curiosità incontra la profondità. Oggi una scoperta apparentemente casuale cambia la tua prospettiva.",
    "5-8": "Rischio calcolato: oggi la tua audacia negli affari paga. Cogli l'attimo con intelligenza.",
    "5-9": "Lascia andare il vecchio per abbracciare il nuovo. Oggi il cambiamento è liberazione.",
    "6-1": "La cura degli altri oggi ti rende leader naturale. L'amore è la forma più alta di autorità.",
    "6-2": "Armonia doppia: oggi sei il cuore pulsante della tua comunità. Ogni relazione fiorisce.",
    "6-3": "L'amore si esprime attraverso la bellezza. Oggi crea qualcosa di bello per chi ti circonda.",
    "6-4": "Responsabilità e stabilità: oggi costruisci un nido sicuro. La tua dedizione è il dono più grande.",
    "6-5": "L'amore chiede libertà: oggi trova l'equilibrio tra cura e spazio personale.",
    "6-6": "Amore puro e incondizionato: oggi il tuo cuore è un rifugio per tutti. Non dimenticare te stesso.",
    "6-7": "La cura incontra la saggezza. Oggi le tue parole guariscono chi ti ascolta.",
    "6-8": "Responsabilità e abbondanza: oggi il tuo impegno per gli altri genera prosperità per tutti.",
    "6-9": "Amore universale: oggi chiudi con compassione ciò che non serve più per fare spazio al nuovo.",
    "7-1": "La tua saggezza interiore oggi trova il coraggio di esprimersi. Le tue intuizioni sono oro.",
    "7-2": "Profondità e sensibilità: oggi percepisci verità nascoste. Fidati delle tue sensazioni.",
    "7-3": "L'analisi incontra la creatività: oggi le tue riflessioni generano idee brillanti e originali.",
    "7-4": "Studio metodico: oggi ogni ricerca porta a scoperte significative. La pazienza ripaga.",
    "7-5": "La saggezza abbraccia il cambiamento. Oggi un'intuizione improvvisa apre nuovi orizzonti.",
    "7-6": "La riflessione profonda oggi si mette al servizio dell'amore. Comprendi ciò che il cuore sussurra.",
    "7-7": "Giornata di illuminazione interiore. Oggi la tua mente penetra i misteri con chiarezza cristallina.",
    "7-8": "L'intelletto guida il potere: oggi le tue strategie sono impeccabili. Agisci con precisione.",
    "7-9": "Saggezza e trascendenza: oggi comprendi il senso profondo delle prove che hai attraversato.",
    "8-1": "Potere e iniziativa: oggi sei il comandante del tuo destino. Ogni decisione è vincente.",
    "8-2": "Il potere oggi si esprime nella diplomazia. Le alleanze strategiche moltiplicano il successo.",
    "8-3": "Ambizione e carisma: oggi la tua comunicazione apre porte importanti. Presentati al meglio.",
    "8-4": "Potere e disciplina: oggi il tuo lavoro sistematico produce risultati straordinari.",
    "8-5": "L'ambizione incontra l'audacia: oggi i rischi calcolati portano grandi ricompense.",
    "8-6": "Il successo materiale oggi è al servizio dell'amore. Usa la tua forza per proteggere chi ami.",
    "8-7": "Strategia e intuizione: oggi le tue mosse sono guidate da una saggezza profonda.",
    "8-8": "Potenza totale: oggi l'universo amplifica ogni tua azione. Agisci con integrità e raccoglierai in abbondanza.",
    "8-9": "Il potere del lasciar andare: oggi chiudi affari e situazioni con maestria e visione a lungo termine.",
    "9-1": "Fine e nuovo inizio: oggi chiudi un ciclo con la forza di chi sa dove sta andando.",
    "9-2": "Il completamento oggi richiede delicatezza. Lascia andare con grazia e compassione.",
    "9-3": "La chiusura di un ciclo genera ispirazione. Oggi ciò che finisce diventa arte e insegnamento.",
    "9-4": "Concludi con ordine e metodo. Ogni finale ben gestito costruisce le basi del futuro.",
    "9-5": "Liberazione totale: oggi il vecchio crolla per fare spazio a qualcosa di completamente nuovo.",
    "9-6": "Chiudi con amore: oggi il perdono e la gratitudine sono le chiavi della trasformazione.",
    "9-7": "Comprensione profonda: oggi vedi il disegno più grande dietro ogni prova e ogni perdita.",
    "9-8": "Il bilancio finale rivela abbondanza nascosta. Oggi scopri quanto sei ricco dentro e fuori.",
    "9-9": "Trasformazione totale: oggi muore il vecchio te e nasce una versione più saggia e luminosa.",
  },
  en: {
    "1-1": "Double commanding energy: you're unstoppable today. Use this force to start what you've always postponed.",
    "1-2": "Your inner reflection finds the courage to manifest today. Act with balance and determination.",
    "1-3": "Initiative dresses in creativity today. Pitch that bold idea: it makes more sense than you think.",
    "1-4": "Structure and initiative merge: the right day to lay the foundation for something solid and lasting.",
    "1-5": "Freedom and command: break the mold consciously today. The change you start now has deep roots.",
    "1-6": "Your leadership today expresses itself through caring for others. Leading with the heart is true power.",
    "1-7": "Your deep analysis finds the push to become concrete action today. Trust your intuition.",
    "1-8": "Power upon power: a formidable day for business and important decisions. Success is within reach.",
    "1-9": "Close a chapter with a leader's strength. The courage to let go opens extraordinary doors.",
    "2-1": "Today collaboration is born from a strong idea. Listen to others, but don't lose your vision.",
    "2-2": "Doubled sensitivity: you're an emotional radar. Use this gift to create harmony where there's tension.",
    "2-3": "Diplomacy and creativity embrace each other. Your words today have the power to heal and inspire.",
    "2-4": "Patience and collaboration build solid bridges. Every alliance formed today will last over time.",
    "2-5": "Adaptability and sensitivity make you the perfect mediator in chaotic situations. Be the anchor.",
    "2-6": "Love and harmony at their peak: today every kind gesture comes back multiplied.",
    "2-7": "Deep intuition: today you hear what others don't say. Your empathy is clairvoyance.",
    "2-8": "Your diplomacy opens the doors of power. Negotiate with grace and achieve more than you hope.",
    "2-9": "Compassion and cooperation: today you're a natural healer. Your big heart makes the difference.",
    "3-1": "Explosive creativity: your ideas today have the strength to become reality. Don't censor yourself.",
    "3-2": "Your art meets sensitivity. What you create today touches people's hearts.",
    "3-3": "Pure expression: today your charisma is unstoppable. Speak, create, shine without limits.",
    "3-4": "Creativity finds structure: the day to turn a brilliant idea into a concrete plan.",
    "3-5": "Volcanic energy: everything is possible today. Socialize, explore, leave your mark wherever you go.",
    "3-6": "Your creativity today serves love. An artistic gesture for someone you love is worth a thousand words.",
    "3-7": "Inspiration comes from depth. Today your creativity has spiritual roots: let it flow.",
    "3-8": "Charisma and ambition: today your communication opens important doors in the business world.",
    "3-9": "Your expressive talent today closes creative cycles. Finish that project: it's the moment.",
    "4-1": "The foundations you build today support a great new initiative. Plan and act.",
    "4-2": "Method and collaboration: today teamwork produces concrete, measurable results.",
    "4-3": "Discipline meets inspiration. Today you can shape the most ambitious ideas.",
    "4-4": "Absolute solidity: today you're a rock. Every effort builds something permanent.",
    "4-5": "Order in chaos: today your organizational ability turns the unexpected into opportunity.",
    "4-6": "Stability and care: today you build security for yourself and loved ones. Every detail matters.",
    "4-7": "Study and method: today your analytical mind reaches extraordinary insights.",
    "4-8": "Discipline and power: today your hard work is recognized and rewarded.",
    "4-9": "Complete methodically what you started. An orderly closure opens new spaces.",
    "5-1": "Change and courage: today you're the pioneer of a new adventure. Leave without hesitation.",
    "5-2": "Your flexibility today shows in the ability to adapt to others' emotions with grace.",
    "5-3": "Creative freedom at its peak: today every experience becomes inspiration. Live intensely.",
    "5-4": "Change finds structure: today new things integrate into your routine naturally.",
    "5-5": "Total freedom: today the world is your canvas. Just be careful not to scatter too much energy.",
    "5-6": "Adventure today serves love. Surprise someone you love with something unexpected.",
    "5-7": "Curiosity meets depth. Today a seemingly random discovery changes your perspective.",
    "5-8": "Calculated risk: today your boldness in business pays off. Seize the moment intelligently.",
    "5-9": "Let go of the old to embrace the new. Today change is liberation.",
    "6-1": "Caring for others makes you a natural leader today. Love is the highest form of authority.",
    "6-2": "Double harmony: today you're the beating heart of your community. Every relationship flourishes.",
    "6-3": "Love expresses itself through beauty. Today create something beautiful for those around you.",
    "6-4": "Responsibility and stability: today you build a safe nest. Your dedication is the greatest gift.",
    "6-5": "Love asks for freedom: today find the balance between care and personal space.",
    "6-6": "Pure, unconditional love: today your heart is a refuge for everyone. Don't forget yourself.",
    "6-7": "Care meets wisdom. Today your words heal those who listen.",
    "6-8": "Responsibility and abundance: today your commitment to others generates prosperity for all.",
    "6-9": "Universal love: today close with compassion what no longer serves to make room for the new.",
    "7-1": "Your inner wisdom finds the courage to express itself today. Your intuitions are gold.",
    "7-2": "Depth and sensitivity: today you perceive hidden truths. Trust your feelings.",
    "7-3": "Analysis meets creativity: today your reflections generate brilliant, original ideas.",
    "7-4": "Methodical study: today every research leads to significant discoveries. Patience pays off.",
    "7-5": "Wisdom embraces change. Today a sudden intuition opens new horizons.",
    "7-6": "Deep reflection today serves love. Understand what the heart whispers.",
    "7-7": "A day of inner illumination. Today your mind penetrates mysteries with crystal clarity.",
    "7-8": "Intellect guides power: today your strategies are impeccable. Act with precision.",
    "7-9": "Wisdom and transcendence: today you understand the deep meaning of the trials you've faced.",
    "8-1": "Power and initiative: today you command your destiny. Every decision is a winner.",
    "8-2": "Power today expresses itself through diplomacy. Strategic alliances multiply success.",
    "8-3": "Ambition and charisma: today your communication opens important doors. Present your best.",
    "8-4": "Power and discipline: today your systematic work produces extraordinary results.",
    "8-5": "Ambition meets audacity: today calculated risks bring great rewards.",
    "8-6": "Material success today serves love. Use your strength to protect those you love.",
    "8-7": "Strategy and intuition: today your moves are guided by deep wisdom.",
    "8-8": "Total power: today the universe amplifies your every action. Act with integrity and reap abundance.",
    "8-9": "The power of letting go: today close deals and situations with mastery and long-term vision.",
    "9-1": "Ending and new beginning: today close a cycle with the strength of one who knows where they're going.",
    "9-2": "Completion today requires gentleness. Let go with grace and compassion.",
    "9-3": "Closing a cycle generates inspiration. Today what ends becomes art and teaching.",
    "9-4": "Conclude with order and method. Every well-managed ending builds the foundation for the future.",
    "9-5": "Total liberation: today the old crumbles to make room for something completely new.",
    "9-6": "Close with love: today forgiveness and gratitude are the keys to transformation.",
    "9-7": "Deep understanding: today you see the bigger picture behind every trial and every loss.",
    "9-8": "The final balance reveals hidden abundance. Today discover how rich you are inside and out.",
    "9-9": "Total transformation: today the old you dies and a wiser, brighter version is born.",
  },
};

const defaultMotivational: Record<string, string> = {
  it: "Oggi è un giorno unico: ascolta la tua voce interiore e lasciati guidare dalla saggezza dei numeri.",
  en: "Today is a unique day: listen to your inner voice and let the wisdom of numbers guide you.",
};

export function getSectorMeta(lang: string): SectorMeta {
  return sectorMetaByLang[lang] || sectorMetaByLang.en;
}

export function getDayVibrationInsights(lang: string): VibrationInsights {
  return dayVibrationInsightsByLang[lang] || dayVibrationInsightsByLang.en;
}

export function getMotivationalMessages(lang: string): MotivationalMessages {
  return motivationalMessagesByLang[lang] || motivationalMessagesByLang.en;
}

export function getDefaultMotivational(lang: string): string {
  return defaultMotivational[lang] || defaultMotivational.en;
}
