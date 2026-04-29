let historyStack = [];
let currentNode = null;

const data = {
  start: "primary",
  nodes: {

    // =========================
    // QUESTION NODES
    // =========================

    primary: {
      type: "q",
      question: "What is the primary Hazard Class?",
      help: "Check Section 14 of the SDS.",
      options: [
        { text: "4.1 — Flammable solid", next: "i012" },
        { text: "4.2 — Spontaneously combustible", next: "i013" },
        { text: "4.3 — Dangerous when wet", next: "i014" },
        { text: "5.2 — Organic peroxide", next: "i015" },
        { text: "2, 3, 5.1, 6.1, or 8", next: "qother" }
      ]
    },

    qother: {
      type: "q",
      question: "Is this waste liquid or solid?",
      help: "For a spent solution like a carboy, classify by physical state. Solids include powders and dry materials.",
      options: [
        { text: "Liquid — including aerosols", next: "qliquid" },
        { text: "Solid — powders, dry material, debris", next: "qsolid" }
      ]
    },

    qliquid: {
      type: "q",
      question: "Is this a 6.1 PG I or PIH, an aerosol, or if neither — is it organic or inorganic?",
      help: "Any amount of organics makes the waste organic, even if the rest is inorganic.",
      options: [
        { text: "6.1 PG 1 or PIH", next: "qpih" },
        { text: "Aerosol", next: "qaero" },
        { text: "Organics present", next: "qorg" },
        { text: "Inorganic — no C-H bonds present in any constituents", next: "qinorg" }
      ]
    },

    qsolid: {
      type: "q",
      question: "What is the primary Hazard Class?",
      options: [
        { text: "5.1", next: "qs5_1" },
        { text: "6.1", next: "qs6_1" },
        { text: "8", next: "qs8" }
      ]
    },

    qpih: {
      type: "q",
      question: "Is this a poison inhalation hazard?",
      options: [
        { text: "Yes — it is a PIH", next: "ipih" },
        { text: "No, but it is a PG 1", next: "ipg1" }
      ]
    },

    qaero: {
      type: "q",
      question: "Is there fluorine present (fluoro)?",
      help: "Check the SDS for fluorine-containing compounds.",
      options: [
        { text: "Yes", next: "qfluoro" },
        { text: "No", next: "qnoflo" }
      ]
    },

    qorg: {
      type: "q",
      question: "Are there resins, small bottles, solid debris, or acrylics in this piece?",
      options: [
        { text: "Yes", next: "qorginc" },
        { text: "No", next: "qblend" }
      ]
    },

    qinorg: {
      type: "q",
      question: "What is the primary Hazard Class?",
      options: [
        { text: "5.1", next: "qi5_1" },
        { text: "6.1", next: "qi6_1" },
        { text: "8", next: "qi8" }
      ]
    },

    qs5_1: {
      type: "q",
      question: "Is there a 5.1 liquid piece?",
      options: [
        { text: "Yes — I will pack this with the 5.1 liquid piece", next: "qi5_1" },
        { text: "No 5.1 liquid piece", next: "t5_1solid" }
      ]
    },

    qs6_1: {
      type: "q",
      question: "What is the packing group?",
      options: [
        { text: "6.1 PG 1", next: "ipg1" },
        { text: "6.1 PG 2–3", next: "qpg23" }
      ]
    },

    qs8: {
      type: "q",
      question: "Is there an 8 liquid piece?",
      options: [
        { text: "Yes — I will pack this with the appropriate 8 liquid piece", next: "qs8sort" },
        { text: "No appropriate liquid 8 piece", next: "qsolid8" }
      ]
    },

    qfluoro: {
      type: "q",
      question: "Flammable or non-flammable gas?",
      help: "Check the SDS.",
      options: [
        { text: "Flammable", next: "i2_1f" },
        { text: "Non-flammable", next: "i2_2f" }
      ]
    },

    qnoflo: {
      type: "q",
      question: "Flammable or non-flammable gas?",
      help: "Check the SDS.",
      options: [
        { text: "Flammable", next: "f2_1" },
        { text: "Non-flammable", next: "f2_2" }
      ]
    },

    qorginc: {
      type: "q",
      question: "Are there reactives present (D003)?",
      options: [
        { text: "Yes", next: "qrxnbottles" },
        { text: "No", next: "qnonrxnbottles" }
      ]
    },

    qblend: {
      type: "q",
      question: "What is the primary Hazard Class?",
      options: [
        { text: "3", next: "ftlp" },
        { text: "5.1", next: "high_haz" },
        { text: "6.1", next: "f6_1" },
        { text: "8", next: "q8l" }
      ]
    },

    q8l: {
      type: "q",
      question: "Are there reactives present (D003)?",
      options: [
        { text: "Yes", next: "q8rxn" },
        { text: "No", next: "q8nonrxn" }
      ]
    },

    q8rxn: {
      type: "q",
      question: "Is this waste acidic or basic?",
      help: "Check section 9 of the SDS. See also the list of common acids and bases.",
      options: [
        { text: "Acidic", next: "i003" },
        { text: "Basic", next: "i004" }
      ]
    },

    q8nonrxn: {
      type: "q",
      question: "Is this waste acidic or basic?",
      help: "Check section 9 of the SDS. See also the list of common acids and bases.",
      options: [
        { text: "Acidic", next: "f80a" },
        { text: "Basic", next: "f8ob" }
      ]
    },

    qi5_1: {
      type: "q",
      question: "Are there reactives present (D003)?",
      options: [
        { text: "Yes", next: "i008" },
        { text: "No", next: "qi5_1nonr" }
      ]
    },

    qi6_1: {
      type: "q",
      question: "Is there a 6.1 piece with organics present?",
      options: [
        { text: "Yes — I will pack with the 6.1 organic piece", next: "f6_1" },
        { text: "No", next: "i005" }
      ]
    },

    qi8: {
      type: "q",
      question: "Is this waste acidic or basic?",
      options: [
        { text: "Acidic", next: "qi8a" },
        { text: "Basic", next: "qi8b" }
      ]
    },

    qi8a: {
      type: "q",
      question: "Are there reactives present (D003)?",
      options: [
        { text: "Yes", next: "i006" },
        { text: "No", next: "t8ia" }
      ]
    },

    qi8b: {
      type: "q",
      question: "Are there reactives present (D003)?",
      options: [
        { text: "Yes", next: "i007" },
        { text: "No", next: "qi8bora" }
      ]
    },

    qi8bora: {
      type: "q",
      question: "Separate bleach from ammonia if both are present. Which is this?",
      options: [
        { text: "Ammonia", next: "t8ibb" },
        { text: "Bleach", next: "t8iba" }
      ]
    },

    qi5_1nonr: {
      type: "q",
      question: "The following groups must be segregated if present. Select if applicable, otherwise choose standard.",
      options: [
        { text: "Perchloric acid", next: "i009" },
        { text: "Nitric acid", next: "tnitric" },
        { text: "Hydrogen peroxide", next: "th202" },
        { text: "None of these — standard 5.1 piece", next: "t5_1" }
      ]
    },

    qpg23: {
      type: "q",
      question: "Is there a 6.1 liquid piece already?",
      options: [
        { text: "Yes — I will pack this with the appropriate 6.1 liquid piece", next: "q23liq" },
        { text: "No 6.1 liquid piece", next: "q23solid" }
      ]
    },

    q23liq: {
      type: "q",
      question: "Sort into organic or inorganic liquid piece.",
      options: [
        { text: "Organic", next: "f6_1" },
        { text: "Inorganic", next: "qi6_1" }
      ]
    },

    q23solid: {
      type: "q",
      question: "Does this piece have U00, F00, or P00 codes?",
      options: [
        { text: "Yes", next: "i010" },
        { text: "No", next: "nonhaz1" }
      ]
    },

    qs8sort: {
      type: "q",
      question: "Separate into an organic and inorganic piece.",
      options: [
        { text: "Organic", next: "q8l" },
        { text: "Inorganic", next: "qi8" }
      ]
    },

    qsolid8: {
      type: "q",
      question: "Are there reactives present (D003)?",
      options: [
        { text: "Yes", next: "i011" },
        { text: "No", next: "nonhaz2" }
      ]
    },

    qrxnbottles: {
      type: "q",
      question: "What is the primary Hazard Class?",
      options: [
        { text: "3", next: "i017" },
        { text: "6.1", next: "i018" },
        { text: "8", next: "qrxnbottle8" }
      ]
    },

    qnonrxnbottles: {
      type: "q",
      question: "What is the primary Hazard Class?",
      options: [
        { text: "3", next: "i016" },
        { text: "6.1", next: "q005" },
        { text: "8", next: "qnonrxnbottle8" }
      ]
    },

    qrxnbottle8: {
      type: "q",
      question: "Is this waste acidic or basic?",
      options: [
        { text: "Acidic", next: "i019" },
        { text: "Basic", next: "i020" }
      ]
    },

    qnonrxnbottle8: {
      type: "q",
      question: "Is this waste acidic or basic?",
      options: [
        { text: "Acidic", next: "i021" },
        { text: "Basic", next: "i022" }
      ]
    },

    q005: {
      type: "q",
      question: "Does this piece have D00, U00, F00, or P00 codes?",
      options: [
        { text: "Yes — has D/U/F/P codes", next: "i055" },
        { text: "No codes", next: "nonhaz3" }
      ]
    },

    // =========================
    // RESULT NODES
    // =========================

    f2_1: {
      type: "r",
      result_title: "Fuel Blending",
      bullets: [
        "Process code: QCAero",
        "D-code subcategory: D001, high TOC liquid",
        "Segged on truck: No",
        "DNS?: No",
        "Ross profile (straight to Ross): -16",
        "Placard?: Yes, if over 1,001 lbs.",
        "⚠ Extras: NO VERM"
      ]
    },

    f2_2: {
      type: "r",
      result_title: "Fuel Blending",
      bullets: [
        "Process code: QCAero",
        "D-code subcategory: High TOC liquid",
        "Segged on truck: No",
        "DNS?: No",
        "Placard?: Yes, if over 1,001 lbs.",
        "⚠ Extras: NO VERM"
      ]
    },

    f6_1: {
      type: "r",
      result_title: "Fuel Blending",
      bullets: [
        "Process code: QCLPFUEL1",
        "D-code subcategory: High TOC liquid",
        "Segged on truck: No",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    f80a: {
      type: "r",
      result_title: "Fuel Blending",
      bullets: [
        "Process code: QCLPFUEL1",
        "D-code subcategory: High TOC liquid",
        "Segged on truck: No",
        "Placard?: Yes, if over 1,001 lbs.",
        "⚠ Corrosives must not be packed in DM"
      ]
    },

    f8ob: {
      type: "r",
      result_title: "Fuel Blending",
      bullets: [
        "Process code: QCLPFUEL1",
        "D-code subcategory: High TOC liquid",
        "Segged on truck: No",
        "Placard?: Yes, if over 1,001 lbs.",
        "⚠ Corrosives must not be packed in DM"
      ]
    },

    ftlp: {
      type: "r",
      result_title: "Fuel Blending",
      bullets: [
        "Process code: QCLPFUEL1",
        "D-code subcategory: High TOC liquid",
        "Segged on truck: No",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    high_haz: {
      type: "r",
      result_title: "High Haz — Review Required",
      notes: "⚠ This is likely a high haz job or an error. Please review and escalate as needed.",
      bullets: [
        "Review with supervisor before proceeding"
      ]
    },

    t8iba: {
      type: "r",
      result_title: "Treatment",
      bullets: [
        "Process code: QCLPTREAT1 or LSTBLOP",
        "D-code subcategory: D002, corrosive",
        "Segged on truck: No",
        "DNS?: No",
        "Ross profile (straight to Ross): -10",
        "Placard?: Yes, if over 1,001 lbs.",
        "⚠ Corrosives must not be packaged in DM"
      ]
    },

    t8ibb: {
      type: "r",
      result_title: "Treatment",
      bullets: [
        "Process code: QCLPTREAT1 or LSTBLOP",
        "D-code subcategory: D002, corrosive",
        "Segged on truck: No",
        "DNS?: No",
        "Ross profile (straight to Ross): -10",
        "Placard?: Yes, if over 1,001 lbs.",
        "⚠ Corrosives must not be packaged in DM"
      ]
    },

    t5_1: {
      type: "r",
      result_title: "Treatment",
      bullets: [
        "Process code: QCLPOX1 or QCLPINCIN2/RLP2A",
        "D-code subcategory: D001, ignitable",
        "Segged on truck: Yes",
        "DNS?: Yes",
        "Ross profile (straight to Ross): -06DNS",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    t5_1solid: {
      type: "r",
      result_title: "Treatment — Solid 5.1",
      bullets: [
        "Process code: QCLPOX1 or QCLPINCIN2/RLP2A",
        "D-code subcategory: D001, ignitable",
        "Segged on truck: Yes",
        "DNS?: Yes",
        "Ross profile (straight to Ross): -06DNS",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    t8ia: {
      type: "r",
      result_title: "Treatment",
      bullets: [
        "Process code: QCLPTREAT1/LSTALOP",
        "D-code subcategory: D002, corrosive",
        "Segged on truck: No",
        "DNS?: No",
        "Ross profile (straight to Ross): -09",
        "Placard?: Yes, if over 1,001 lbs.",
        "⚠ Corrosives must not be packaged in DM"
      ]
    },

    th202: {
      type: "r",
      result_title: "Treatment — Hydrogen Peroxide",
      bullets: [
        "Process code: QCLPOX1/RLP2A",
        "D-code subcategory: D001, ignitable",
        "Segged on truck: Yes",
        "DNS?: Yes",
        "Ross profile (straight to Ross): -06DNS",
        "Placard?: Yes, if over 1,001 lbs.",
        "⚠ MUST BE DOUBLE BAGGED"
      ]
    },

    tnitric: {
      type: "r",
      result_title: "Treatment — Nitric Acid",
      bullets: [
        "Process code: LSTOLLPP/RLP2A",
        "D-code subcategory: D001, ignitable",
        "Segged on truck: Yes",
        "DNS?: Yes",
        "Ross profile (straight to Ross): -06DNS",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    nonhaz1: {
      type: "r",
      result_title: "Non-Haz — WHEEL",
      bullets: [
        "Process code: LWHEELPP (Lowell)",
        "Segged on truck: No",
        "DNS?: No"
      ]
    },

    nonhaz2: {
      type: "r",
      result_title: "Non-Haz — WHEEL",
      bullets: [
        "Process code: LWHEELPP (Lowell)",
        "Segged on truck: No",
        "DNS?: No"
      ]
    },

    nonhaz3: {
      type: "r",
      result_title: "Non-Haz — WHEEL",
      bullets: [
        "Process code: LWHEELPP (Lowell)",
        "Segged on truck: No",
        "DNS?: No"
      ]
    },

    i003: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: QCLPINCIN3 or RLP3A",
        "D-code subcategory: D002 corrosive; D003 chemical specific",
        "Segged on truck: No",
        "DNS?: Yes",
        "Ross profile (straight to Ross): Verify",
        "Placard?: Yes, if over 1,001 lbs.",
        "⚠ Corrosives must not be packaged in DM"
      ]
    },

    i004: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: QCLPINCIN3 or RLP3A",
        "D-code subcategory: D002 corrosive; D003 chemical specific",
        "Segged on truck: No",
        "DNS?: Yes",
        "Ross profile (straight to Ross): Verify",
        "Placard?: Yes, if over 1,001 lbs.",
        "⚠ Corrosives must not be packaged in DM"
      ]
    },

    i005: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: QCLPINCIN3 or RLP3A",
        "Segged on truck: No",
        "DNS?: Yes",
        "Ross profile (straight to Ross): Verify",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    i006: {
      type: "r",
      result_title: "Incineration",
      notes: "⚠ Verify: check if inorganic or if reactive takes precedence.",
      bullets: [
        "Process code: QCLPINCIN3 or RLP3A",
        "D-code subcategory: D002 corrosive; D003 chemical specific",
        "Segged on truck: No",
        "DNS?: Yes",
        "Ross profile (straight to Ross): Verify",
        "Placard?: Yes, if over 1,001 lbs.",
        "⚠ Corrosives must not be packaged in DM"
      ]
    },

    i007: {
      type: "r",
      result_title: "Incineration",
      notes: "⚠ Verify: check if inorganic or if reactive takes precedence.",
      bullets: [
        "Process code: QCLPINCIN3 or RLP3A",
        "D-code subcategory: D002 corrosive; D003 chemical specific",
        "Segged on truck: No",
        "DNS?: Yes",
        "Ross profile (straight to Ross): Verify",
        "Placard?: Yes, if over 1,001 lbs.",
        "⚠ Corrosives must not be packaged in DM"
      ]
    },

    i008: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: QCLPINCIN3 or RLP3A",
        "D-code subcategory: D001, ignitable",
        "Segged on truck: Yes",
        "DNS?: Yes",
        "Ross profile (straight to Ross): Verify",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    i009: {
      type: "r",
      result_title: "Incineration — Perchloric Acid",
      notes: "⚠ Verify process code and Ross code with supervisor.",
      bullets: [
        "Process code: Verify",
        "D-code subcategory: D001, ignitable",
        "Segged on truck: Yes",
        "DNS?: Yes",
        "Ross profile (straight to Ross): -06DNS",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    i010: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: Verify",
        "Segged on truck: No",
        "DNS?: Depends on P code severity",
        "Ross profile (straight to Ross): -08",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    i011: {
      type: "r",
      result_title: "Incineration",
      notes: "⚠ Verify process code.",
      bullets: [
        "Process code: QCLPINCIN3 or RLP3A",
        "D-code subcategory: D002, corrosive",
        "Segged on truck: No",
        "DNS?: Yes",
        "Ross profile (straight to Ross): -09/-10",
        "Placard?: Yes, if over 1,001 lbs.",
        "⚠ Corrosives must not be packaged in DM"
      ]
    },

    i012: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: QCLPINCIN1/RLP1A",
        "D-code subcategory: D001, ignitable",
        "Segged on truck: Yes",
        "DNS?: No",
        "Ross profile (straight to Ross): -03",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    i013: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: QCLPINCIN3/RLP3A",
        "D-code subcategory: D003, ignitable",
        "Segged on truck: With X-boxes",
        "DNS?: Yes",
        "Ross profile (straight to Ross): -14DNS",
        "Placard?: Yes, if over 1,001 lbs.",
        "⚠ Must be in X-box"
      ]
    },

    i014: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: QCLPINCIN3/RLP3A",
        "D-code subcategory: D003, water-reactive",
        "Segged on truck: Yes",
        "DNS?: Yes",
        "Ross profile (straight to Ross): -24DNS",
        "Placard?: Yes, any amount"
      ]
    },

    i015: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: QCLPINCIN3/RLP3A",
        "D-code subcategory: D001, ignitable",
        "Segged on truck: Yes",
        "DNS?: Yes",
        "Ross profile (straight to Ross): -07DNS",
        "Instant placard?: No"
      ]
    },

    i016: {
      type: "r",
      result_title: "Incineration",
      notes: "⚠ Details pending — verify with supervisor.",
      bullets: [
        "Verify with supervisor before proceeding"
      ]
    },

    i017: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: QCLPINCIN3/RLP3A",
        "D-code subcategory: D001 high TOC liquids; D003 chemical specific",
        "Segged on truck: No",
        "DNS?: Yes",
        "Ross profile (straight to Ross): Verify",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    i018: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: QCLPINCIN3/RLP3A",
        "D-code subcategory: D003 chemical specific",
        "Segged on truck: No",
        "DNS?: Yes",
        "Ross profile (straight to Ross): Verify",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    i019: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: QCLPINCIN3/RLP3A",
        "D-code subcategory: D002 corrosive; D003 chemical specific",
        "Segged on truck: No",
        "DNS?: Yes",
        "Ross profile (straight to Ross): Verify",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    i020: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: QCLPINCIN3/RLP3A",
        "D-code subcategory: D002 corrosive; D003 chemical specific",
        "Segged on truck: No",
        "DNS?: Yes",
        "Ross profile (straight to Ross): Verify",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    i021: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: QCLPINCIN1/RLP1A",
        "D-code subcategory: D002, corrosive",
        "Segged on truck: No",
        "DNS?: No",
        "Ross profile (straight to Ross): -09",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    i022: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: QCLPINCIN1/RLP1A",
        "D-code subcategory: D002, corrosive",
        "Segged on truck: No",
        "DNS?: No",
        "Ross profile (straight to Ross): -10",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    i055: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: QCLPINCIN1/RLP1A",
        "Segged on truck: No",
        "DNS?: Depends on P code severity if applicable",
        "Ross profile (straight to Ross): -08",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    i2_1f: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: QCLPINCIN1/RLP1A",
        "D-code subcategory: D001, high TOC liquids",
        "Segged on truck: No",
        "DNS?: No",
        "Ross profile (straight to Ross): -16",
        "Placard?: Yes, if over 1,001 lbs.",
        "⚠ NO VERM"
      ]
    },

    i2_2f: {
      type: "r",
      result_title: "Incineration",
      bullets: [
        "Process code: QCLPINCIN1/RLP1A",
        "D-code subcategory: D001, high TOC liquids",
        "Segged on truck: No",
        "DNS?: No",
        "Ross profile (straight to Ross): -16",
        "Placard?: Yes, if over 1,001 lbs.",
        "⚠ NO VERM"
      ]
    },

    ipg1: {
      type: "r",
      result_title: "Incineration",
      notes: "⚠ 6.1 PG Is must not be shipped together unless they are the same chemical.",
      bullets: [
        "Process code: QCLPINCIN3/RLP3A",
        "Segged on truck: No",
        "DNS?: Yes",
        "Ross profile (straight to Ross): -14DNS",
        "Placard?: Yes, if over 1,001 lbs."
      ]
    },

    ipih: {
      type: "r",
      result_title: "Incineration — PIH",
      notes: "⚠ Zone As must be in X-boxes. Zone Bs must be in at least a paint can / Zone B kit.",
      bullets: [
        "Process code: QCLPINCIN2/RLP2A",
        "Segged on truck: No",
        "DNS?: Yes",
        "Ross profile (straight to Ross): -13DNS",
        "Placard?: Any amount, even if in X-box"
      ]
    }

  }
};

// =========================
// HOMEPAGE FUNCTIONS
// =========================

function startApp() {
  document.getElementById("home").style.display = "none";
  document.getElementById("app").style.display = "block";
  historyStack = [];
  renderNode(data.start);
}

function goHome() {
  document.getElementById("app").style.display = "none";
  document.getElementById("home").style.display = "block";
  historyStack = [];
  currentNode = null;
}

function loadImg(input, imgId, labelId) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.getElementById(imgId);
    img.src = e.target.result;
    img.style.display = "block";
    document.getElementById(labelId).style.display = "none";
  };
  reader.readAsDataURL(file);
}

// =========================
// KEY RENDER FUNCTIONS
// =========================

function renderNode(nodeId) {
  const node = data.nodes[nodeId];

  if (!node) {
    console.error("Missing node:", nodeId);
    document.getElementById("question").innerText = "Error: missing node '" + nodeId + "'";
    return;
  }

  if (node.type === "r") {
    showResult(node);
    return;
  }

  currentNode = nodeId;

  document.getElementById("question-section").style.display = "block";
  document.getElementById("result-section").style.display = "none";

  document.getElementById("question").innerText = node.question;
  document.getElementById("q-header-label").innerText = "Classification Key";

  const helpBtn = document.getElementById("help-btn");
  if (node.help) {
    helpBtn.style.display = "inline-block";
    helpBtn.onclick = () => showHelp(node.help);
  } else {
    helpBtn.style.display = "none";
  }

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  const letters = ["A","B","C","D","E"];
  node.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.innerHTML = "<b>" + (letters[i] || (i+1)) + ".</b>&nbsp;&nbsp;" + option.text;
    btn.onclick = () => {
      historyStack.push(currentNode);
      renderNode(option.next);
    };
    answersDiv.appendChild(btn);
  });
}

function showResult(node) {
  document.getElementById("question-section").style.display = "none";
  document.getElementById("result-section").style.display = "block";

  document.getElementById("result-title").innerText = node.result_title;

  const bulletsList = document.getElementById("result-bullets");
  bulletsList.innerHTML = "";
  if (node.bullets) {
    node.bullets.forEach(b => {
      const li = document.createElement("li");
      li.innerHTML = b;
      bulletsList.appendChild(li);
    });
  }

  const notesDiv = document.getElementById("result-notes");
  if (node.notes) {
    notesDiv.style.display = "block";
    notesDiv.innerHTML = "<p>" + node.notes + "</p>";
  } else {
    notesDiv.style.display = "none";
  }
}

function goBack() {
  if (historyStack.length > 0) {
    renderNode(historyStack.pop());
  }
}

function startOver() {
  historyStack = [];
  renderNode(data.start);
}

// =========================
// MODAL FUNCTIONS
// =========================

function showHelp(helpText) {
  document.getElementById("help-text").innerHTML = helpText;
  document.getElementById("help-modal").style.display = "flex";
}

function closeHelp() {
  document.getElementById("help-modal").style.display = "none";
}

function openImgModal(src) {
  document.getElementById("img-modal-img").src = src;
  document.getElementById("img-modal").style.display = "flex";
}

function closeImgModal() {
  document.getElementById("img-modal").style.display = "none";
}