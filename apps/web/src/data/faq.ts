export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

export const faqs: FAQCategory[] = [
  {
    category: 'FAQ',
    questions: [
      {
        q: 'Was ist der Unterschied zwischen Coaching und Psychotherapie?',
        a: 'Antwort: Coaching konzentriert sich meist auf spezifische Ziele, berufliche Herausforderungen oder die persönliche Weiterentwicklung im Hier und Jetzt. Psychotherapie ist eine tiefergehende klinische Behandlung von psychischen Beschwerden mit Krankheitswert (z.B. Depressionen oder Angststörungen) durch eine approbierte Fachkraft. Oben im Text gehe ich da auch nochmal spezifischer drauf ein.',
      },
      {
        q: 'Bietest du Therapie für Kinder und Jugendliche an?',
        a: 'Antwort: Jein, als approbierte Kinder- und Jugendlichenpsychotherapeutin biete ich spezialisierte Unterstützung für Kinder, Jugendliche und deren Familien an und habe diesen Beruf auch schon mehrere Jahre ausgeführt. Ich wohne allerdings derzeit nicht in Deutschland, so dass ich damit kein Mitglied einer Psychotherapeutenkammer bin. Dieses ist aber Voraussetzung, um in Deutschland Psychotherapie anbieten zu dürfen. Da ich meine beruflichen Kenntnisse als Psychotherapeutin natürlich nicht vergessen habe, nur, weil ich meinen Wohnsitz ausserhalb Deutschlands verlegt habe, lasse ich diese Regelung gerade durch einen Anwalt für Medizinrecht prüfen. Sobald ich mit Gewissheit sagen kann, dass ich meine Psychotherapien auch aus dem Ausland abhalten darf, werde ich mit großer Freude auch wieder Psychotherapien, auf dieser website, anbieten.',
      },
      {
        q: 'In welchen Sprachen findet die Beratung statt?',
        a: 'Antwort: Ich biete alle Sitzungen fließend in **Deutsch, Englisch, Spanisch und Niederländisch** an. Du entscheidest in welcher Sprache du dich mit deinen Gefühlen und Gedanken am ehesten ausdrücken kannst.',
      },
    ],
  },
  {
    category: 'Ablauf & Technik',
    questions: [
      {
        q: 'Wie läuft eine Online-Sitzung ab?',
        a: 'Antwort: Wir treffen uns in einem gesicherten, datenschutzkonformen Videoraum. Um den Datenschutz DSGVO-konform und damit die Sicherheit vor Cyberangriffen zu gewährleisten, arbeite ich mit dem Anbieter „Threema“. Das ermöglicht uns eine Ende-zu-Ende verschlüsselte Kommunikation und Videosprechstunden, ohne Angabe der Handynummer. Die Nutzung erfordert nur eine einmalige Einverständniserklärung. Du benötigst lediglich eine stabile Internetverbindung, ein Mikrofon und einen privaten Ort, an dem du ungestört sprechen kannst.',
      },
      {
        q: 'Wie buche ich einen Termin?',
        a: "Antwort: Du kannst dein Erstgespräch direkt über den Kalender auf der Website buchen. Alternativ kannst du mir auch eine E-Mail schreiben und ich antworte dir schnellstmöglich.",
      },
      {
        q: 'Gibt es eine Warteliste?',
        a: 'Antwort:* Da ich online flexibel arbeite, sind Erstgespräche meist zeitnah innerhalb von 1–2 Wochen möglich.',
      },
      {
        q: 'Ich bin in einer Krise und brauche dringend Hilfe. Was kann ich tun?',
        a: 'Antwort: In akuten psychischen und psychiatrischen Notfällen sind schnelle Hilfe und die richtigen Kontakte entscheidend. Bei akuter Eigen- oder Fremdgefährdung (Suizidgefahr, Aggression, Gewalt,…) bitte SOFORT den Notruf 112 (Deutschland) oder 144 (Österreich/ Schweiz) wählen. Rund um die Uhr bieten Krisendienste, psychiatrische Ambulanzen und Telefonseelsorgen (142, 0800-1110111). Da Kinder- und Jugendtelefon (116 111) bietet von Montag bis Samstag von 14.00 bis 20.00 Uhr Beratung an. Anonym und vom Festnetz sowie Handy kostenlos. Elterntelefon (0800 111 0 550) Erreichbarkeit Montag bis Freitag von 9.99 bis 17.00 Uhr. Dienstag und Donnerstag zusätzlich bis 19.00 Uhr.',
      },
    ],
  },
  {
    category: 'Kosten & Versicherung',
    questions: [
      {
        q: 'Werden die Kosten von der Krankenkasse übernommen?',
        a: "Antwort: Da sich mein Angebot primär an Selbstzahler und Expatriates weltweit richtet, erfolgt die Abrechnung privat.",
      },
    ],
  },
  {
    category: 'Besonderheiten für Expats',
    questions: [
      {
        q: 'Warum ist eine Online-Therapie für Expats sinnvoll?',
        a: 'Antwort: Ein Umzug ins Ausland bringt oft Identitätskrisen oder familiäre Belastungen mit sich. Eine Therapeutin und Coach zu haben, die die "Heimatsprache" spricht und die bürokratischen sowie emotionalen Hürden einer Auswanderung versteht, ist oft der Schlüssel zum Erfolg.',
      },
      {
        q: 'In welcher Zeitzone arbeitest du?',
        a: 'Antwort: Ich biete Termine an, die für verschiedene Zeitzonen (Europa, Amerika) optimiert sind. Bei der Buchung wird dir die verfügbare Zeit direkt in deiner Lokalzeit angezeigt.',
      },
    ],
  },
];
