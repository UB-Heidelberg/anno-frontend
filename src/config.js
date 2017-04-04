var C = module.exports = {}

C.annoservicehosturl = process.env.annoservicehosturl || 'http://anno.ub.uni-heidelberg.de'
C.annoserviceurl     = process.env.annoserviceurl     || C.annoservicehosturl + '/cgi-bin/anno.cgi';

// TODO probably deletd
C.typeList = {
    "dc:description-ger":   "text",
    "dc:identifier":        "identifier",
    "dc:title":             "title",
    "foaf:account":         "account",
    "foaf:name":            "user_name",
    "jcr:lastModified":     "jcr_modified",
    "jcr:uuid":             "uuid",
    "dc:source":            "link",
    "dc:sourceDescription": "sourcedescription",
    "jcr:versionHistory":   "versioned",
    "dc:type":              "type",
    "svg:polygon":          'svg_polygon',
    "user_rights":          'user_rights'
};

// TODO probably deletd
C.fields = {
  'id':        'clean_svname',
  'title':     'title',
  'text':      'test',
  'link':      'link',
  'linktitle': 'sourcedescription',
  'polygon':   'svg_polygon',
};

C.texts = [

    'annofield_link',
    'annofield_linktitle',
    'annofield_title',
    'cancel',
    'close',
    'close_all',
    'comment',
    'comments',
    'commenttarget',
    'edit',
    'edit_headline',
    'edit_zones',
    'headline',
    'license',
    'login',
    'metadata',
    'new',
    'open_all',
    'previous',
    'purl',
    'reply',
    'save',
    'showref',
    'showrefalways',
    'showrefdefault',
    'showrefnever',
    'sort',
    'sortdate',
    'sortdatereverse',
    'sorttitle',
    'version_from',
    'zones',

    'tag',
    'semtag',
    'add_tag',
    'add_semtag',
    'delete_tag',
    'delete_semtag',

    'unsaved',
    'annoeditor',
]

C.localizations = {
    'de':                      {
        'annofield_link':      'Link (URL)',
        'annofield_linktitle': 'Link-Titel',
        'annofield_title':     'Titel (Pflichtfeld)',
        'cancel':              'Abbrechen',
        'close':               'Schließen',
        'close_all':           'Alle schließen',
        'comment':             'Kommentieren',
        'comments':            'Kommentare',
        'commenttarget':       'Kommentar zu',
        'edit':                'Editieren',
        'edit_headline':       'Annotationen-Editor',
        'edit_zones':          'Zonen editieren',
        'headline':            'Annotationen',
        'license':             'Annotation wird unter CC0-Lizenz (Public Domain) veröffentlicht.',
        'login':               'Anmelden',
        'metadata':            'Metadaten',
        'new':                 'Neue Annotation',
        'open_all':            'Alle öffnen',
        'previous':            'Vorherige Version',
        'purl':                'Annotation: Persistente URL',
        'reply':               'Antworten',
        'save':                'Speichern',
        'showref':             'Bildbez\u00fcge anzeigen',
        'showrefalways':       'Immer',
        'showrefdefault':      'Standard',
        'showrefnever':        'Nie',
        'sort':                'Sortieren',
        'sortdate':            'Chronologisch aufsteigend',
        'sortdatereverse':     'Chronologisch absteigend',
        'sorttitle':           'Titel aufsteigend',
        'version_from':        'Version vom',
        'zones':               'Zonen',

        'add_semtag':          'Semantisches Schlagwort hinzuf\u00fcgen',
        'add_tag':             'Einfaches Schlagwort hinzuf\u00fcgen',
        'delete_semtag':       'Semantisches Tag l\u00f6schen',
        'delete_tag':          'Einfaches Tag l\u00f6schen',
        'semtag':              'Semantisches Schlagwort',
        'tag':                 'Einfaches Schlagwort',
        'semtags':             'Semantische Schlagworte',
        'tags':                'Einfache Schlagworte',

        'unsaved':             'Nicht gespeichert',
        'annoeditor':          'Annotations-Editor',

    },
    'en':                      {
        'Anmelden':            'Login',
        'Annotationen':        'Annotations',
        'Neue Annotation':     'New annotation',
        'annofield_link':      'Link (URL)',
        'annofield_linktitle': 'Link title',
        'annofield_title':     'Title (required)',
        'cancel':              'Cancel',
        'close':               'Close',
        'close_all':           'Close all',
        'comment':             'Comment',
        'comments':            'Comments',
        'commenttarget':       'Comment on',
        'edit':                'Edit',
        'edit_headline':       'Annotation Editor',
        'edit_zones':          'Edit zones',
        'license':             'Annotation is published under CC0 license (Public Domain)',
        'license_comment':     'Comment is published under CC0 license (Public Domain)',
        'metadata':            'Metadata',
        'open_all':            'Open all',
        'previous':            'Previous versions',
        'purl':                'Annotation: Persistent URL',
        'reply':               'Reply',
        'save':                'Save',
        'showref':             'Bildbezüge anzeigen',
        'showrefalways':       'always',
        'showrefdefault':      'mouseover',
        'showrefnever':        'never',
        'sort':                'Sort',
        'sortdate':            'by time (ascending)',
        'sortdatereverse':     'by time (descending)',
        'sorttitle':           'by title',
        'version_from':        'Version vom',
        'zones':               'Zones',

        'semtag':              'Semantic Tag',
        'tag':                 'Simple Tag',
        'semtags':             'Semantic Tags',
        'tags':                'Simple Tags',
        'add_semtag':          'Add Semantic Tag',
        'add_tag':             'Add Simple Tag',
        'delete_semtag':       'Delete Semantic Tag',
        'delete_tag':          'Delete Simple Tag',

        'unsaved':             'Unsaved',
        'annoeditor':          'Annotation editor',
    }
};

C.tinymce_localizations = {
    'de': {
        "Cut":                     "Ausschneiden",
        "Heading 5":               "\u00dcberschrift 5",
        "Header 2":                "\u00dcberschrift 2",
        "Heading 4":               "\u00dcberschrift 4",
        "Div":                     "Textblock",
        "Heading 2":               "\u00dcberschrift 2",
        "Paste":                   "Einf\u00fcgen",
        "Close":                   "Schlie\u00dfen",
        "Font Family":             "Schriftart",
        "Pre":                     "Vorformatierter Text",
        "Align right":             "Rechtsb\u00fcndig ausrichten",
        "New document":            "Neues Dokument",
        "Blockquote":              "Zitat",
        "Numbered list":           "Nummerierte Liste",
        "Heading 1":               "\u00dcberschrift 1",
        "Headings":                "\u00dcberschriften",
        "Increase indent":         "Einzug vergr\u00f6\u00dfern",
        "Formats":                 "Formate",
        "Headers":                 "\u00dcberschriften",
        "Select all":              "Alles ausw\u00e4hlen",
        "Header 3":                "\u00dcberschrift 3",
        "Blocks":                  "Absatzformate",
        "Undo":                    "R\u00fcckg\u00e4ngig",
        "Strikethrough":           "Durchgestrichen",
        "Bullet list":             "Aufz\u00e4hlung",
        "Header 1":                "\u00dcberschrift 1",
        "Superscript":             "Hochgestellt",
        "Clear formatting":        "Formatierung entfernen",
        "Font Sizes":              "Schriftgr\u00f6\u00dfe",
        "Subscript":               "Tiefgestellt",
        "Header 6":                "\u00dcberschrift 6",
        "Redo":                    "Wiederholen",
        "Paragraph":               "Absatz",
        "Ok":                      "Ok",
        "Bold":                    "Fett",
        "Code":                    "Quelltext",
        "Italic":                  "Kursiv",
        "Align center":            "Zentriert ausrichten",
        "Header 5":                "\u00dcberschrift 5",
        "Heading 6":               "\u00dcberschrift 6",
        "Heading 3":               "\u00dcberschrift 3",
        "Decrease indent":         "Einzug verkleinern",
        "Header 4":                "\u00dcberschrift 4",
        "Underline":               "Unterstrichen",
        "Cancel":                  "Abbrechen",
        "Justify":                 "Blocksatz",
        "Inline":                  "Zeichenformate",
        "Copy":                    "Kopieren",
        "Align left":              "Linksb\u00fcndig ausrichten",
        "Visual aids":             "Visuelle Hilfen",
        "Lower Greek":             "Griechische Kleinbuchstaben",
        "Square":                  "Quadrat",
        "Default":                 "Standard",
        "Lower Alpha":             "Kleinbuchstaben",
        "Circle":                  "Kreis",
        "Disc":                    "Punkt",
        "Upper Alpha":             "Gro\u00dfbuchstaben",
        "Upper Roman":             "R\u00f6mische Zahlen (Gro\u00dfbuchstaben)",
        "Lower Roman":             "R\u00f6mische Zahlen (Kleinbuchstaben)",
        "Name":                    "Name",
        "Anchor":                  "Textmarke",
        "Restore last draft":      "Letzten Entwurf wiederherstellen",
        "Special character":       "Sonderzeichen",
        "Source code":             "Quelltext",
        "B":                       "B",
        "R":                       "R",
        "G":                       "G",
        "Color":                   "Farbe",
        "Right to left":           "Von rechts nach links",
        "Left to right":           "Von links nach rechts",
        "Emoticons":               "Emoticons",
        "Robots":                  "Robots",
        "Document properties":     "Dokumenteigenschaften",
        "Title":                   "Titel",
        "Keywords":                "Sch\u00fcsselw\u00f6rter",
        "Encoding":                "Zeichenkodierung",
        "Description":             "Beschreibung",
        "Author":                  "Verfasser",
        "Fullscreen":              "Vollbild",
        "Horizontal line":         "Horizontale Linie",
        "Horizontal space":        "Horizontaler Abstand",
        "Insert\/edit image":      "Bild einf\u00fcgen\/bearbeiten",
        "General":                 "Allgemein",
        "Advanced":                "Erweitert",
        "Source":                  "Quelle",
        "Border":                  "Rahmen",
        "Constrain proportions":   "Seitenverh\u00e4ltnis beibehalten",
        "Vertical space":          "Vertikaler Abstand",
        "Image description":       "Bildbeschreibung",
        "Style":                   "Stil",
        "Dimensions":              "Abmessungen",
        "Insert image":            "Bild einf\u00fcgen",
        "Zoom in":                 "Ansicht vergr\u00f6\u00dfern",
        "Contrast":                "Kontrast",
        "Back":                    "Zur\u00fcck",
        "Gamma":                   "Gamma",
        "Flip horizontally":       "Horizontal spiegeln",
        "Resize":                  "Skalieren",
        "Sharpen":                 "Sch\u00e4rfen",
        "Zoom out":                "Ansicht verkleinern",
        "Image options":           "Bildeigenschaften",
        "Apply":                   "Anwenden",
        "Brightness":              "Helligkeit",
        "Rotate clockwise":        "Im Uhrzeigersinn drehen",
        "Rotate counterclockwise": "Gegen den Uhrzeigersinn drehen",
        "Edit image":              "Bild bearbeiten",
        "Color levels":            "Farbwerte",
        "Crop":                    "Bescheiden",
        "Orientation":             "Ausrichtung",
        "Flip vertically":         "Vertikal spiegeln",
        "Invert":                  "Invertieren",
        "Insert date\/time":       "Datum\/Uhrzeit einf\u00fcgen ",
        "Remove link":             "Link entfernen",
        "Url":                     "URL",
        "Text to display":         "Anzuzeigender Text",
        "Anchors":                 "Textmarken",
        "Insert link":             "Link einf\u00fcgen",
        "New window":              "Neues Fenster",
        "None":                    "Keine",
        "Insert\/edit link":       "Link einf\u00fcgen\/bearbeiten",
        "Insert\/edit video":      "Video einf\u00fcgen\/bearbeiten",
        "Poster":                  "Poster",
        "Alternative source":      "Alternative Quelle",
        "Insert video":            "Video einf\u00fcgen",
        "Embed":                   "Einbetten",
        "Nonbreaking space":       "Gesch\u00fctztes Leerzeichen",
        "Page break":              "Seitenumbruch",
        "Paste as text":           "Als Text einf\u00fcgen",
        "Preview":                 "Vorschau",
        "Print":                   "Drucken",
        "Save":                    "Speichern",
        "Replace":                 "Ersetzen",
        "Next":                    "Weiter",
        "Whole words":             "Nur ganze W\u00f6rter",
        "Find and replace":        "Suchen und ersetzen",
        "Replace with":            "Ersetzen durch",
        "Find":                    "Suchen",
        "Replace all":             "Alles ersetzen",
        "Match case":              "Gro\u00df-\/Kleinschreibung beachten",
        "Prev":                    "Zur\u00fcck",
        "Spellcheck":              "Rechtschreibpr\u00fcfung",
        "Finish":                  "Ende",
        "Ignore all":              "Alles Ignorieren",
        "Ignore":                  "Ignorieren",
        "Add to Dictionary":       "Zum W\u00f6rterbuch hinzuf\u00fcgen",
        "Insert row before":       "Neue Zeile davor einf\u00fcgen ",
        "Rows":                    "Zeilen",
        "Height":                  "H\u00f6he",
        "Paste row after":         "Zeile danach einf\u00fcgen",
        "Alignment":               "Ausrichtung",
        "Border color":            "Rahmenfarbe",
        "Column group":            "Spaltengruppe",
        "Row":                     "Zeile",
        "Insert column before":    "Neue Spalte davor einf\u00fcgen",
        "Split cell":              "Zelle aufteilen",
        "Cell padding":            "Zelleninnenabstand",
        "Cell spacing":            "Zellenabstand",
        "Row type":                "Zeilentyp",
        "Insert table":            "Tabelle einf\u00fcgen",
        "Body":                    "Inhalt",
        "Caption":                 "Beschriftung",
        "Footer":                  "Fu\u00dfzeile",
        "Delete row":              "Zeile l\u00f6schen",
        "Paste row before":        "Zeile davor einf\u00fcgen",
        "Scope":                   "G\u00fcltigkeitsbereich",
        "Delete table":            "Tabelle l\u00f6schen",
        "H Align":                 "Horizontale Ausrichtung",
        "Top":                     "Oben",
        "Header cell":             "Kopfzelle",
        "Column":                  "Spalte",
        "Row group":               "Zeilengruppe",
        "Cell":                    "Zelle",
        "Middle":                  "Mitte",
        "Cell type":               "Zellentyp",
        "Copy row":                "Zeile kopieren",
        "Row properties":          "Zeileneigenschaften",
        "Table properties":        "Tabelleneigenschaften",
        "Bottom":                  "Unten",
        "V Align":                 "Vertikale Ausrichtung",
        "Header":                  "Kopfzeile",
        "Right":                   "Rechtsb\u00fcndig",
        "Insert column after":     "Neue Spalte danach einf\u00fcgen",
        "Cols":                    "Spalten",
        "Insert row after":        "Neue Zeile danach einf\u00fcgen",
        "Width":                   "Breite",
        "Cell properties":         "Zelleneigenschaften",
        "Left":                    "Linksb\u00fcndig",
        "Cut row":                 "Zeile ausschneiden",
        "Delete column":           "Spalte l\u00f6schen",
        "Center":                  "Zentriert",
        "Merge cells":             "Zellen verbinden",
        "Insert template":         "Vorlage einf\u00fcgen ",
        "Templates":               "Vorlagen",
        "Background color":        "Hintergrundfarbe",
        "Custom...":               "Benutzerdefiniert...",
        "Custom color":            "Benutzerdefinierte Farbe",
        "No color":                "Keine Farbe",
        "Text color":              "Textfarbe",
        "Show blocks":             " Bl\u00f6cke anzeigen",
        "Words: {0}":              "W\u00f6rter: {0}",
        "Insert":                  "Einf\u00fcgen",
        "File":                    "Datei",
        "Edit":                    "Bearbeiten",
        "Tools":                   "Werkzeuge",
        "View":                    "Ansicht",
        "Table":                   "Tabelle",
        "Format":                  "Format",
        "Show invisible characters":    "Unsichtbare Zeichen anzeigen",
        "Paste your embed code below:": "F\u00fcgen Sie Ihren Einbettungscode hier ein:",
        "Could not find the specified string.": "Die Zeichenfolge wurde nicht gefunden.",
        "Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help": "Rich-Text- Area. Dr\u00fccken Sie ALT-F9 f\u00fcr das Men\u00fc. Dr\u00fccken Sie ALT-F10 f\u00fcr Symbolleiste. Dr\u00fccken Sie ALT-0 f\u00fcr Hilfe",
        "Your browser doesn't support direct access to the clipboard. Please use the Ctrl+X\/C\/V keyboard shortcuts instead.": "Ihr Browser unterst\u00fctzt leider keinen direkten Zugriff auf die Zwischenablage. Bitte benutzen Sie die Strg + X \/ C \/ V Tastenkombinationen.",
        "Paste is now in plain text mode. Contents will now be pasted as plain text until you toggle this option off.": "Einf\u00fcgen ist nun im einfachen Textmodus. Inhalte werden ab jetzt als unformatierter Text eingef\u00fcgt, bis Sie diese Einstellung wieder ausschalten!",
        "You have unsaved changes are you sure you want to navigate away?": "Die \u00c4nderungen wurden noch nicht gespeichert, sind Sie sicher, dass Sie diese Seite verlassen wollen?",
        "The URL you entered seems to be an external link. Do you want to add the required http:\/\/ prefix?": "Diese Adresse scheint ein externer Link zu sein. M\u00f6chten Sie das dazu ben\u00f6tigte \"http:\/\/\" voranstellen?",
        "Target": "Ziel",
        "The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?": "Diese Adresse scheint eine E-Mail-Adresse zu sein. M\u00f6chten Sie das dazu ben\u00f6tigte \"mailto:\" voranstellen?",
    }
}

C.langcode = {
   'en':  'en',
   'eng': 'en',
   'de':  'de',
   'ger': 'de',
};

C.defaultlang = 'de';