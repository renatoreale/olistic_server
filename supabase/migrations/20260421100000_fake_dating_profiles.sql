-- ── Fake dating profiles ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS fake_dating_profiles (
  user_id   uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  nome      text        NOT NULL,
  cognome   text        NOT NULL,
  birth_date date       NOT NULL,
  sesso     text        NOT NULL CHECK (sesso IN ('M','F')),
  looking_for text      DEFAULT 'B',
  bio       text,
  dating_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE fake_dating_profiles ENABLE ROW LEVEL SECURITY;

-- ── Populate 1000 fake profiles ───────────────────────────────────────────────

DO $$
DECLARE
  female_names text[] := ARRAY[
    'Sofia','Giulia','Valentina','Francesca','Chiara','Alessia','Martina','Serena','Elena','Giorgia',
    'Laura','Federica','Roberta','Claudia','Silvia','Maria','Carmen','Ana','Isabel','Lucía',
    'Marta','Paula','Sara','Nora','Ines','Marie','Sophie','Emma','Léa','Camille',
    'Chloé','Manon','Julie','Alice','Elise','Anna','Hannah','Lena','Lisa','Sarah',
    'Julia','Katharina','Petra','Heike','Monika','Emily','Olivia','Charlotte','Grace','Lucy',
    'Amelia','Mia','Natasha','Olga','Irina','Katerina','Anastasia','Vera','Nadia','Tanya',
    'Camila','Isabella','Mariana','Gabriela','Daniela','Carolina','Alejandra','Fernanda','Beatriz','Renata',
    'Yuki','Hana','Mei','Sakura','Aiko','Priya','Kavya','Aisha','Fatima','Zara',
    'Ingrid','Astrid','Sigrid','Freya','Maja','Miriam','Rebecca','Leila','Yasmin','Nour',
    'Svetlana','Ludmila','Veronika','Michaela','Zuzana','Agnieszka','Karolina','Magdalena','Zofia','Wiktoria'
  ];
  male_names text[] := ARRAY[
    'Marco','Luca','Alessandro','Andrea','Matteo','Lorenzo','Giovanni','Francesco','Antonio','Giuseppe',
    'Roberto','Carlo','Mario','Sergio','Paolo','Carlos','Miguel','Juan','Pedro','Diego',
    'Rafael','Fernando','Andrés','Javier','Rodrigo','Pierre','Jean','Louis','Antoine','Thomas',
    'Nicolas','Hugo','Alexandre','Paul','Lucas','Michael','Andreas','Stefan','Markus','Johannes',
    'Klaus','Dieter','Hans','Peter','Kevin','James','John','David','Robert','William',
    'Richard','Daniel','Matthew','Ryan','Nathan','Dmitri','Ivan','Boris','Alexei','Nikolai',
    'Sergei','Andrei','Pavel','Viktor','Gabriel','Mateus','Eduardo','Gustavo','Thiago','Bruno',
    'Takeshi','Kenji','Hiroshi','Daiki','Ryo','Arjun','Rahul','Omar','Khalid','Tariq',
    'Erik','Lars','Bjorn','Sven','Magnus','Karim','Youssef','Hassan','Mehdi','Ali',
    'Tomasz','Piotr','Marek','Krzysztof','Wojciech','Václav','Radek','Lukas','Martin','Jakub'
  ];
  surnames text[] := ARRAY[
    'Rossi','Ferrari','Esposito','Bianchi','Romano','Colombo','Ricci','Marino','Greco','Bruno',
    'Gallo','Conti','Mancini','Costa','Giordano','García','Martínez','López','Sánchez','González',
    'Rodríguez','Fernández','Torres','Díaz','Ruiz','Martin','Bernard','Dubois','Robert','Petit',
    'Leroy','Simon','Dumont','Laurent','Lefebvre','Müller','Schmidt','Schneider','Fischer','Weber',
    'Meyer','Wagner','Becker','Schulz','Hoffmann','Smith','Jones','Williams','Brown','Taylor',
    'Davies','Evans','Wilson','Roberts','Johnson','Ivanov','Petrov','Sidorov','Popov','Volkov',
    'Kozlov','Novak','Kowalski','Nowak','Szabó','Silva','Santos','Oliveira','Souza','Lima',
    'Pereira','Alves','Ferreira','Carvalho','Araújo','Tanaka','Yamamoto','Suzuki','Watanabe','Ito',
    'Patel','Sharma','Singh','Kumar','Gupta','Al-Hassan','Al-Farsi','Benali','Mansouri','Khalil',
    'Andersen','Nielsen','Hansen','Pedersen','Larsen','Novák','Svoboda','Dvořák','Procházka','Blažek'
  ];
  bios_f text[] := ARRAY[
    'Appassionata di viaggi e cucina. Cerco qualcuno con cui condividere avventure autentiche.',
    'Amante della natura e della meditazione. Credo nelle connessioni profonde e nell''energia universale.',
    'Artista nel tempo libero, professionista nella vita. Amo la musica jazz e i tramonti in riva al mare.',
    'Sportiva e dinamica. Corro al mattino e leggo la sera. Cerco la mia metà numerologica.',
    'Curiosa del mondo, appassionata di libri e cinema. La vita è troppo corta per le cose banali.',
    'Sogno di girare il mondo con uno zaino e tanta voglia di scoprire. Tu sei pronto?',
    'Amo cucinare per gli altri, ridere forte e ballare sotto la pioggia. Cerco autenticità.',
    'Yoga, tè verde e buona conversazione. Cerco qualcuno che ami la profondità quanto me.',
    'Fotografa di anime, collezionista di emozioni. Ogni giorno è una nuova storia da raccontare.',
    'Musicista e sognatore. Cerco qualcuno con cui costruire qualcosa di bello e duraturo.',
    'Adoro la montagna in inverno e il mare in estate. Cerco un compagno di avventura.',
    'Insegnante di cuore, curiosa di mente. Credo che la vita sia il più bel dei viaggi.',
    'Appassionata di astrologia e numerologia. Convinta che l''universo ci guidi nelle scelte.',
    'Amo i mercatini vintage, il caffè il mattino e le persone genuine.',
    'Chef casalinga per passione. Ti conquisto con un piatto di pasta fatto a mano.'
  ];
  bios_m text[] := ARRAY[
    'Appassionato di musica e fotografia. Cerco qualcuno con cui esplorare il mondo e condividere silenzi.',
    'Chef per passione. Adoro cucinare piatti esotici e scoprire nuovi sapori in giro per il mondo.',
    'Sportivo e avventuriero. Il weekend è fatto per esplorare sentieri e spiagge inesplorate.',
    'Creativo e sensibile. Amo l''arte, la filosofia e le conversazioni che durano fino all''alba.',
    'Imprenditore curioso della vita. Cerco connessioni genuine e significative, non perdo tempo.',
    'Appassionato di hiking e astronomia. Il cielo stellato mi ricorda quanto siamo piccoli e fortunati.',
    'Musicista nel tempo libero. La vita ha un ritmo: cerco qualcuno che sappia ballare al mio.',
    'Viaggiatore seriale con passaporto pieno di timbri. Il prossimo viaggio voglio farlo in due.',
    'Ingegnere di giorno, scrittore di notte. Le parole sono il mio modo di capire il mondo.',
    'Amante del cinema d''autore, del vino buono e delle persone vere. La superficialità mi annoia.',
    'Papà orgoglioso e professionista ambizioso. Cerco qualcuno che sappia stare in equilibrio.',
    'Adoro il surf, il caffè lungo e i libri di filosofia. Strano mix, lo so.',
    'Convinto che la numerologia riveli l''anima. Cerco la mia corrispondenza perfetta.',
    'Amo cucinare il sabato mattina e fare lunghe passeggiate domenicali. Semplicità e profondità.',
    'Designer creativo con la testa tra le nuvole e i piedi ben piantati per terra.'
  ];
  looking_for_opts text[] := ARRAY['M','F','B','M','F','B','M','F'];
  i int;
  fname text;
  lname text;
  bdate date;
  gen text;
  lf text;
  bio_txt text;
BEGIN
  -- 500 female profiles
  FOR i IN 1..500 LOOP
    fname := female_names[((i - 1) % array_length(female_names, 1)) + 1];
    lname := surnames[((i - 1) % array_length(surnames, 1)) + 1];
    bdate := CURRENT_DATE - (floor(random() * (50 - 18 + 1) + 18)::int * 365 + floor(random() * 365)::int) * INTERVAL '1 day';
    lf    := CASE floor(random() * 3)::int WHEN 0 THEN 'M' WHEN 1 THEN 'B' ELSE 'M' END;
    bio_txt := bios_f[((i - 1) % array_length(bios_f, 1)) + 1];
    INSERT INTO fake_dating_profiles (nome, cognome, birth_date, sesso, looking_for, bio, dating_visible, created_at)
    VALUES (fname, lname, bdate, 'F', lf, bio_txt, true,
            NOW() - (floor(random() * 730)::int * INTERVAL '1 day'));
  END LOOP;

  -- 500 male profiles
  FOR i IN 1..500 LOOP
    fname := male_names[((i - 1) % array_length(male_names, 1)) + 1];
    lname := surnames[((i - 1) % array_length(surnames, 1)) + 1];
    bdate := CURRENT_DATE - (floor(random() * (50 - 18 + 1) + 18)::int * 365 + floor(random() * 365)::int) * INTERVAL '1 day';
    lf    := CASE floor(random() * 3)::int WHEN 0 THEN 'F' WHEN 1 THEN 'B' ELSE 'F' END;
    bio_txt := bios_m[((i - 1) % array_length(bios_m, 1)) + 1];
    INSERT INTO fake_dating_profiles (nome, cognome, birth_date, sesso, looking_for, bio, dating_visible, created_at)
    VALUES (fname, lname, bdate, 'M', lf, bio_txt, true,
            NOW() - (floor(random() * 730)::int * INTERVAL '1 day'));
  END LOOP;
END;
$$;

-- ── Update get_dating_profiles to include fakes ───────────────────────────────

DROP FUNCTION IF EXISTS public.get_dating_profiles();
CREATE OR REPLACE FUNCTION get_dating_profiles()
RETURNS TABLE (
  user_id     uuid,
  nome        text,
  cognome     text,
  birth_date  date,
  sesso       text,
  looking_for text,
  bio         text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT user_id, nome, cognome, birth_date, sesso, COALESCE(looking_for,'B'), bio
  FROM profiles
  WHERE dating_visible = true
  UNION ALL
  SELECT user_id, nome, cognome, birth_date, sesso, COALESCE(looking_for,'B'), bio
  FROM fake_dating_profiles
  WHERE dating_visible = true;
$$;

-- ── Trigger: disable one fake per new real signup ─────────────────────────────

CREATE OR REPLACE FUNCTION fn_disable_fake_on_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Fire only for real users (profiles inserted by auth trigger, not fakes)
  UPDATE fake_dating_profiles
  SET dating_visible = false
  WHERE user_id = (
    SELECT user_id FROM fake_dating_profiles
    WHERE dating_visible = true
    ORDER BY created_at ASC
    LIMIT 1
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_disable_fake_on_signup ON profiles;
CREATE TRIGGER trg_disable_fake_on_signup
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION fn_disable_fake_on_signup();
