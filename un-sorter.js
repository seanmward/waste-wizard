let unHistoryStack = [];
let unCurrentNode = null;

const unData = {
  start: "start",
  nodes: {

    // =========================
    // QUESTION NODES
    // =========================

    start: {
      type: "q",
      question: "How many inner containers are in this piece?",
      options: [
        { text: "One (can be multiple of the same one)", next: "qu1" },
        { text: "2 or more different containers", next: "qu5" }
      ]
    },

    qu1: {
      type: "q",
      question: "Is this virgin or spent?",
      options: [
        { text: "Virgin", next: "qu2" },
        { text: "Spent", next: "qu3" }
      ]
    },

    qu2: {
      type: "q",
      question: "Consult the SDS and use the specific brand's SDS. If none is available, toggle to spent.",
      options: [
        { text: "Specific SDS found", next: "r01" },
        { text: "None found — consult similar SDS", next: "qu3" }
      ]
    },

    qu3: {
      type: "q",
      question: "How many hazardous constituents are present?",
      options: [
        { text: "1", next: "r02" },
        { text: "2 or more", next: "qu4" }
      ]
    },

    qu4: {
      type: "q",
      question: "Enter constituents into Wasteland and record all hazard classes. Consult precedence of hazard class. What is the primary class?",
      options: [
        { text: "3", next: "q01" },
        { text: "4.1", next: "q02" },
        { text: "4.2", next: "r12" },
        { text: "4.3", next: "q03" },
        { text: "5.1", next: "q04" },
        { text: "5.2", next: "r28" },
        { text: "6.1", next: "q05" },
        { text: "8", next: "q06" }
      ]
    },

    qu5: {
      type: "q",
      question: "Do these inner containers have the same shipping name according to the SDS?",
      options: [
        { text: "Yes — both are virgin and have the same shipping name by SDS", next: "r73" },
        { text: "Yes — but one is spent and the other is virgin", next: "qu6" },
        { text: "No", next: "qu7" }
      ]
    },

    qu6: {
      type: "q",
      question: "Is anything added to the spent solution?",
      options: [
        { text: "Yes", next: "qu8" },
        { text: "No", next: "r74" }
      ]
    },

    qu7: {
      type: "q",
      question: "Do all of these bottles have the same primary hazard class?",
      options: [
        { text: "No", next: "r77" },
        { text: "Yes", next: "qu4" }
      ]
    },

    qu8: {
      type: "q",
      question: "Is the added constituent hazardous?",
      options: [
        { text: "Yes", next: "qu9" },
        { text: "No", next: "r76" }
      ]
    },

    qu9: {
      type: "q",
      question: "Assess the primary hazard class of the spent solution. Is it the same as the virgin?",
      options: [
        { text: "Yes", next: "qu4" },
        { text: "No", next: "r75" }
      ]
    },

    q01: {
      type: "q",
      question: "Do any constituents have a secondary hazard class?",
      options: [
        { text: "No", next: "r03" },
        { text: "6.1", next: "r04" },
        { text: "8", next: "q08" },
        { text: "6.1 AND 8", next: "q09" }
      ]
    },

    q02: {
      type: "q",
      question: "Do any constituents have a secondary hazard class?",
      options: [
        { text: "No", next: "r09" },
        { text: "8", next: "r10" },
        { text: "6.1", next: "r11" }
      ]
    },

    q03: {
      type: "q",
      question: "Do any constituents have a secondary hazard class?",
      options: [
        { text: "No", next: "q07" },
        { text: "4.1", next: "r14" },
        { text: "3", next: "r15" },
        { text: "4.2", next: "r16" },
        { text: "8", next: "q10" },
        { text: "6.1", next: "q11" }
      ]
    },

    q04: {
      type: "q",
      question: "Do any constituents have a secondary hazard class?",
      options: [
        { text: "No", next: "q12" },
        { text: "8", next: "q13" },
        { text: "6.1", next: "q14" }
      ]
    },

    q05: {
      type: "q",
      question: "Which is present?",
      options: [
        { text: "None — this is a standard 6.1", next: "q15" },
        { text: "PIH", next: "q34" },
        { text: "PG I", next: "r52" }
      ]
    },

    q06: {
      type: "q",
      question: "Do any constituents have a secondary hazard class?",
      options: [
        { text: "No", next: "q29" },
        { text: "3", next: "r63" },
        { text: "4.1", next: "r64" },
        { text: "4.2", next: "q30" },
        { text: "4.3", next: "q31" },
        { text: "5.1", next: "q32" },
        { text: "6.1", next: "q33" }
      ]
    },

    q07: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r80" },
        { text: "Solids only or mostly solids", next: "r13" }
      ]
    },

    q08: {
      type: "q",
      question: "Does this pH?",
      options: [
        { text: "Yes — it is acidic or basic", next: "r06" },
        { text: "No — it is neutral", next: "r05" }
      ]
    },

    q09: {
      type: "q",
      question: "Does this pH?",
      options: [
        { text: "Yes — it is acidic or basic", next: "r07" },
        { text: "No — it is neutral", next: "r08" }
      ]
    },

    q10: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r17" },
        { text: "Solids only or mostly solids", next: "r18" }
      ]
    },

    q11: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r20" },
        { text: "Solids only or mostly solids", next: "r21" }
      ]
    },

    q12: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r22" },
        { text: "Solids only or mostly solids", next: "r23" }
      ]
    },

    q13: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r24" },
        { text: "Solids only or mostly solids", next: "r25" }
      ]
    },

    q14: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r26" },
        { text: "Solids only or mostly solids", next: "r27" }
      ]
    },

    q15: {
      type: "q",
      question: "Do any constituents have a secondary hazard class?",
      options: [
        { text: "No", next: "q16" },
        { text: "3", next: "r33" },
        { text: "4.1", next: "r78" },
        { text: "4.2", next: "r79" },
        { text: "4.3", next: "q19" },
        { text: "5.1", next: "q20" },
        { text: "8", next: "q21" }
      ]
    },

    q16: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "q17" },
        { text: "Solids only or mostly solids", next: "q18" }
      ]
    },

    q17: {
      type: "q",
      question: "Are there organics present?",
      options: [
        { text: "Yes — organic", next: "r29" },
        { text: "No — just inorganics", next: "r30" }
      ]
    },

    q18: {
      type: "q",
      question: "Are there organics present?",
      options: [
        { text: "Yes — organic", next: "r31" },
        { text: "No — just inorganics", next: "r32" }
      ]
    },

    q19: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r34" },
        { text: "Solids only or mostly solids", next: "r35" }
      ]
    },

    q20: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r36" },
        { text: "Solids only or mostly solids", next: "r37" }
      ]
    },

    q21: {
      type: "q",
      question: "Are there organics present?",
      options: [
        { text: "Yes — organic", next: "q27" },
        { text: "No — just inorganics", next: "q28" }
      ]
    },

    q22: {
      type: "q",
      question: "Is this a Zone A or Zone B?",
      options: [
        { text: "Zone A", next: "r42" },
        { text: "Zone B", next: "r43" }
      ]
    },

    q23: {
      type: "q",
      question: "Is this a Zone A or Zone B?",
      options: [
        { text: "Zone A", next: "r44" },
        { text: "Zone B", next: "r45" }
      ]
    },

    q24: {
      type: "q",
      question: "Is this a Zone A or Zone B?",
      options: [
        { text: "Zone A", next: "r46" },
        { text: "Zone B", next: "r47" }
      ]
    },

    q25: {
      type: "q",
      question: "Is this a Zone A or Zone B?",
      options: [
        { text: "Zone A", next: "r48" },
        { text: "Zone B", next: "r49" }
      ]
    },

    q26: {
      type: "q",
      question: "Is this a Zone A or Zone B?",
      options: [
        { text: "Zone A", next: "r50" },
        { text: "Zone B", next: "r51" }
      ]
    },

    q27: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r38" },
        { text: "Solids only or mostly solids", next: "r40" }
      ]
    },

    q28: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r39" },
        { text: "Solids only or mostly solids", next: "r41" }
      ]
    },

    q29: {
      type: "q",
      question: "Is this acidic, basic, or unspecified?",
      options: [
        { text: "Unspecified", next: "q35" },
        { text: "Acidic", next: "q36" },
        { text: "Basic", next: "q37" }
      ]
    },

    q30: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r65" },
        { text: "Solids only or mostly solids", next: "r66" }
      ]
    },

    q31: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r67" },
        { text: "Solids only or mostly solids", next: "r68" }
      ]
    },

    q32: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r69" },
        { text: "Solids only or mostly solids", next: "r70" }
      ]
    },

    q33: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r71" },
        { text: "Solids only or mostly solids", next: "r72" }
      ]
    },

    q34: {
      type: "q",
      question: "Do any constituents have a secondary hazard class?",
      options: [
        { text: "No", next: "q22" },
        { text: "3", next: "q24" },
        { text: "4.3", next: "q25" },
        { text: "5.1", next: "q26" },
        { text: "8", next: "q23" }
      ]
    },

    q35: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r53" },
        { text: "Solids only or mostly solids", next: "r54" }
      ]
    },

    q36: {
      type: "q",
      question: "Are there organics present?",
      options: [
        { text: "Yes — organic", next: "q38" },
        { text: "No — just inorganics", next: "q39" }
      ]
    },

    q37: {
      type: "q",
      question: "Are there organics present?",
      options: [
        { text: "Yes — organic", next: "q40" },
        { text: "No — just inorganics", next: "q41" }
      ]
    },

    q38: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r55" },
        { text: "Solids only or mostly solids", next: "r56" }
      ]
    },

    q39: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r57" },
        { text: "Solids only or mostly solids", next: "r58" }
      ]
    },

    q40: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r59" },
        { text: "Solids only or mostly solids", next: "r60" }
      ]
    },

    q41: {
      type: "q",
      question: "Are there liquids present or is it only solids?",
      options: [
        { text: "Liquids present", next: "r61" },
        { text: "Solids only or mostly solids", next: "r62" }
      ]
    },

    // =========================
    // RESULT NODES
    // =========================

    r01: {
      type: "r",
      un_number: "Per brand SDS",
      shipping_name: "",
      export: "",
      notes: "Use the shipping name and UN number according to the brand-specific SDS."
    },

    r02: {
      type: "r",
      un_number: "Per comparable SDS",
      shipping_name: "",
      export: "",
      notes: "Use the shipping name and UN number according to a comparable brand SDS."
    },

    r03: {
      type: "r",
      un_number: "UN1993",
      shipping_name: "Flammable liquids",
      export: "Yes — can ship to Canada",
      notes: ""
    },

    r04: {
      type: "r",
      un_number: "UN1992",
      shipping_name: "Flammable liquids, toxic",
      export: "Yes — can ship to Canada",
      notes: ""
    },

    r05: {
      type: "r",
      un_number: "UN1993",
      shipping_name: "Flammable liquids",
      export: "Yes - can ship to Canada",
      notes: ""
    },

    r06: {
      type: "r",
      un_number: "UN2924",
      shipping_name: "Flammable liquids, corrosive, n.o.s",
      export: "Yes",
      notes: "Keep acids and bases separate, even though the shipping name lumps them."
    },

    r07: {
      type: "r",
      un_number: "UN3286",
      shipping_name: "Flammable liquid, toxic, corrosive, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r08: {
      type: "r",
      un_number: "UN1993",
      shipping_name: "Flammable liquids, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r09: {
      type: "r",
      un_number: "UN1325",
      shipping_name: "Flammable solids, organic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r10: {
      type: "r",
      un_number: "UN2925",
      shipping_name: "Flammable solids, corrosive, organic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r11: {
      type: "r",
      un_number: "UN2926",
      shipping_name: "Flammable solids, toxic, organic, n.o.s.",
      export: "No",
      notes: ""
    },

    r12: {
      type: "r",
      un_number: "Consult SDS",
      shipping_name: "",
      export: "",
      notes: "Consult SDS — this will be very specific to the chemical."
    },

    r13: {
      type: "r",
      un_number: "UN2813",
      shipping_name: "Water-reactive solid, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r14: {
      type: "r",
      un_number: "UN3396",
      shipping_name: "Organometallic substance, solid, water-reactive, flammable",
      export: "Yes",
      notes: ""
    },

    r15: {
      type: "r",
      un_number: "UN3399",
      shipping_name: "Organometallic substance, liquid, water-reactive, flammable",
      export: "Yes",
      notes: ""
    },

    r16: {
      type: "r",
      un_number: "UN3397",
      shipping_name: "Organometallic substance, solid, water-reactive, self-heating",
      export: "Yes",
      notes: ""
    },

    r17: {
      type: "r",
      un_number: "UN3129",
      shipping_name: "Water-reactive liquid, corrosive, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r18: {
      type: "r",
      un_number: "UN3131",
      shipping_name: "Water-reactive solid, corrosive, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r20: {
      type: "r",
      un_number: "UN3130",
      shipping_name: "Water-reactive liquid, toxic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r21: {
      type: "r",
      un_number: "UN3134",
      shipping_name: "Water-reactive solid, toxic, n.o.s.",
      export: "No",
      notes: ""
    },

    r22: {
      type: "r",
      un_number: "UN3139",
      shipping_name: "Oxidizing liquid, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r23: {
      type: "r",
      un_number: "UN1479",
      shipping_name: "Oxidizing solid, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r24: {
      type: "r",
      un_number: "UN3098",
      shipping_name: "Oxidizing liquid, corrosive, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r25: {
      type: "r",
      un_number: "UN2085",
      shipping_name: "Oxidizing solid, corrosive, n.o.s.",
      export: "No",
      notes: ""
    },

    r26: {
      type: "r",
      un_number: "UN3099",
      shipping_name: "Oxidizing liquid, toxic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r27: {
      type: "r",
      un_number: "UN3087",
      shipping_name: "Oxidizing solid, toxic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r28: {
      type: "r",
      un_number: "N/A",
      shipping_name: "",
      export: "",
      notes: "⚠ 5.2 organic peroxides are not handled by this tool. Consult supervisor."
    },

    r29: {
      type: "r",
      un_number: "UN2811",
      shipping_name: "Toxic solids, organic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r30: {
      type: "r",
      un_number: "UN3288",
      shipping_name: "Toxic solid, inorganic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r31: {
      type: "r",
      un_number: "UN2810",
      shipping_name: "Toxic liquids, organic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r32: {
      type: "r",
      un_number: "UN3287",
      shipping_name: "Toxic liquid, inorganic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r33: {
      type: "r",
      un_number: "UN2929",
      shipping_name: "Toxic liquids, flammable, organic, n.o.s.",
      export: "No",
      notes: ""
    },

    r34: {
      type: "r",
      un_number: "UN3123",
      shipping_name: "Toxic liquids, water-reactive, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r35: {
      type: "r",
      un_number: "UN3125",
      shipping_name: "Toxic solids, water-reactive, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r36: {
      type: "r",
      un_number: "UN3122",
      shipping_name: "Toxic liquids, oxidizing, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r37: {
      type: "r",
      un_number: "UN3086",
      shipping_name: "Toxic solids, oxidizing, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r38: {
      type: "r",
      un_number: "UN2927",
      shipping_name: "Toxic liquids, corrosive, organic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r39: {
      type: "r",
      un_number: "UN2928",
      shipping_name: "Toxic solids, corrosive, organic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r40: {
      type: "r",
      un_number: "UN3289",
      shipping_name: "Toxic liquid, corrosive, inorganic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r41: {
      type: "r",
      un_number: "UN3290",
      shipping_name: "Toxic solid, corrosive, inorganic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r42: {
      type: "r",
      un_number: "UN3381",
      shipping_name: "Toxic by inhalation liquid [with an inhalation toxicity lower than or equal to 200 ml/m3 and saturated vapor concentration greater than or equal to 500 LC50]",
      export: "No",
      notes: ""
    },

    r43: {
      type: "r",
      un_number: "UN3382",
      shipping_name: "Toxic by inhalation liquid [with an inhalation toxicity toxicity lower than or equal to 1000 ml/m3 and saturated vapor concentration greater than or equal to 10 LC50]",
      export: "No",
      notes: ""
    },

    r44: {
      type: "r",
      un_number: "UN3389",
      shipping_name: "Toxic by inhalation liquid, corrosive [with an inhalation toxicity lower than or equal to 200 ml/m3 and saturated vapor concentration greater than or equal to 500 LC50]",
      export: "No",
      notes: ""
    },

    r45: {
      type: "r",
      un_number: "UN3390",
      shipping_name: "Toxic by inhalation liquid, corrosive [with an inhalation toxicity lower than or equal to 1000 ml/m3 and saturated vapor concentration greater than or equal to 10 LC50]",
      export: "No",
      notes: ""
    },

    r46: {
      type: "r",
      un_number: "UN3383",
      shipping_name: "Toxic by inhalation liquid, flammable [with an inhalation toxicity lower than or equal to 200 ml/m3 and saturated vapor concentration greater than or equal to 500 LC50]",
      export: "No",
      notes: ""
    },

    r47: {
      type: "r",
      un_number: "UN3384",
      shipping_name: "Toxic by inhalation liquid, flammable [with an inhalation toxicity lower than or equal to 1000 ml/m3 and saturated vapor concentration greater than or equal to 10 LC50]",
      export: "No",
      notes: ""
    },

    r48: {
      type: "r",
      un_number: "UN3385",
      shipping_name: "Toxic by inhalation liquid, water-reactive [with an inhalation toxicity lower than or equal to 200 ml/m3 and saturated vapor concentration greater than or equal to 500 LC50]",
      export: "No",
      notes: ""
    },

    r49: {
      type: "r",
      un_number: "UN3386",
      shipping_name: "Toxic by inhalation liquid, water-reactive [with an inhalation toxicity lower than or equal to 1000 ml/m3 and saturated vapor concentration greater than or equal to 10 LC50]",
      export: "No",
      notes: ""
    },

    r50: {
      type: "r",
      un_number: "UN3387",
      shipping_name: "Toxic by inhalation liquid, oxidizing [with an inhalation toxicity lower than or equal to 200 ml/m3 and saturated vapor concentration greater than or equal to 500 LC50]",
      export: "No",
      notes: ""
    },

    r51: {
      type: "r",
      un_number: "UN3388",
      shipping_name: "Toxic by inhalation liquid, oxidizing [with an inhalation toxicity lower than or equal to 1000 ml/m3 and saturated vapor concentration greater than or equal to 10 LC50]",
      export: "No",
      notes: ""
    },

    r52: {
      type: "r",
      un_number: "N/A",
      shipping_name: "",
      export: "",
      notes: "⚠ PG I 6.1 materials are not handled by this tool. Consult supervisor."
    },

    r53: {
      type: "r",
      un_number: "UN1760",
      shipping_name: "Corrosive liquids, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r54: {
      type: "r",
      un_number: "UN1759",
      shipping_name: "Corrosive solids, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r55: {
      type: "r",
      un_number: "UN3265",
      shipping_name: "Corrosive liquid, acidic, organic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r56: {
      type: "r",
      un_number: "UN3261",
      shipping_name: "Corrosive solid, acidic, organic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r57: {
      type: "r",
      un_number: "UN3264",
      shipping_name: "Corrosive liquid, acidic, inorganic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r58: {
      type: "r",
      un_number: "UN3262",
      shipping_name: "Corrosive solid, basic, inorganic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r59: {
      type: "r",
      un_number: "UN3267",
      shipping_name: "Corrosive liquid, basic, organic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r60: {
      type: "r",
      un_number: "UN3263",
      shipping_name: "Corrosive solid, basic, organic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r61: {
      type: "r",
      un_number: "UN3266",
      shipping_name: "Corrosive liquid, basic, inorganic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r62: {
      type: "r",
      un_number: "UN3262",
      shipping_name: "Corrosive solid, basic, inorganic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r63: {
      type: "r",
      un_number: "UN2920",
      shipping_name: "Corrosive liquids, flammable, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r64: {
      type: "r",
      un_number: "UN2921",
      shipping_name: "Corrosive solids, flammable, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r65: {
      type: "r",
      un_number: "UN3301",
      shipping_name: "Corrosive liquid, self-heating",
      export: "No",
      notes: ""
    },

    r66: {
      type: "r",
      un_number: "UN3095",
      shipping_name: "",
      export: "",
      notes: ""
    },

    r67: {
      type: "r",
      un_number: "UN3094",
      shipping_name: "Corrosive liquids, water-reactive",
      export: "No",
      notes: ""
    },

    r68: {
      type: "r",
      un_number: "UN3096",
      shipping_name: "Corrosive solids, water-reactive",
      export: "",
      notes: ""
    },

    r69: {
      type: "r",
      un_number: "UN3093",
      shipping_name: "Corrosive liquids, oxidizing",
      export: "No",
      notes: ""
    },

    r70: {
      type: "r",
      un_number: "UN3084",
      shipping_name: "Corrosive solids, oxidizing",
      export: "No",
      notes: ""
    },

    r71: {
      type: "r",
      un_number: "UN2922",
      shipping_name: "Corrosive liquids, toxic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r72: {
      type: "r",
      un_number: "UN2923",
      shipping_name: "Corrosive solids, toxic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r73: {
      type: "r",
      un_number: "Per SDS",
      shipping_name: "",
      export: "",
      notes: "Use the virgin's shipping name and UN number."
    },

    r74: {
      type: "r",
      un_number: "Per SDS",
      shipping_name: "",
      export: "",
      notes: "Use the virgin's shipping name and UN number."
    },

    r75: {
      type: "r",
      un_number: "N/A",
      shipping_name: "",
      export: "",
      notes: "⚠ Split this piece. Only inner containers with the same primary class may ship together."
    },

    r76: {
      type: "r",
      un_number: "Per SDS",
      shipping_name: "",
      export: "",
      notes: "Use the virgin's shipping name and UN number."
    },

    r77: {
      type: "r",
      un_number: "N/A",
      shipping_name: "",
      export: "",
      notes: "⚠ Remove bottles where the primary hazard class does not match that of the piece."
    },

    r78: {
      type: "r",
      un_number: "UN2930",
      shipping_name: "Toxic solids, flammable, organic, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r79: {
      type: "r",
      un_number: "UN3124",
      shipping_name: "Toxic solids, self-heating, n.o.s.",
      export: "Yes",
      notes: ""
    },

    r80: {
      type: "r",
      un_number: "UN3148",
      shipping_name: "Water-reactive liquid, n.o.s.",
      export: "Yes",
      notes: ""
    }

  }
};

// =========================
// RENDER FUNCTIONS
// =========================

function unStartOver() {
  unHistoryStack = [];
  unRenderNode(unData.start);
}

function unGoBack() {
  if (unHistoryStack.length > 0) {
    unRenderNode(unHistoryStack.pop());
  }
}

function unRenderNode(nodeId) {
  const node = unData.nodes[nodeId];

  if (!node) {
    console.error("Missing UN node:", nodeId);
    document.getElementById("un-question").innerText = "Error: missing node '" + nodeId + "'";
    return;
  }

  if (node.type === "r") {
    unShowResult(node);
    return;
  }

  unCurrentNode = nodeId;

  document.getElementById("un-question-section").style.display = "block";
  document.getElementById("un-result-section").style.display = "none";

  document.getElementById("un-question").innerText = node.question;

  const helpBtn = document.getElementById("un-help-btn");
  if (node.help) {
    helpBtn.style.display = "inline-block";
    helpBtn.onclick = () => unShowHelp(node.help);
  } else {
    helpBtn.style.display = "none";
  }

  const answersDiv = document.getElementById("un-answers");
  answersDiv.innerHTML = "";

  const letters = ["A","B","C","D","E","F","G","H"];
  node.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.innerHTML = "<b>" + (letters[i] || (i+1)) + ".</b>&nbsp;&nbsp;" + option.text;
    btn.onclick = () => {
      unHistoryStack.push(unCurrentNode);
      unRenderNode(option.next);
    };
    answersDiv.appendChild(btn);
  });
}

function unShowResult(node) {
  document.getElementById("un-question-section").style.display = "none";
  document.getElementById("un-result-section").style.display = "block";

  document.getElementById("un-result-title").innerText = node.shipping_name;
  document.getElementById("un-number").innerText = node.un_number || "—";
  document.getElementById("un-shipping-name").innerText = node.shipping_name || "—";
  document.getElementById("un-export").innerText = node.export || "—";

  const notesDiv = document.getElementById("un-notes");
  if (node.notes) {
    notesDiv.innerHTML = "<p>" + node.notes + "</p>";
  } else {
    notesDiv.innerHTML = "<p>No additional notes.</p>";
  }
}

function unShowHelp(helpText) {
  document.getElementById("un-help-text").innerHTML = helpText;
  document.getElementById("un-help-modal").style.display = "flex";
}

function unCloseHelp() {
  document.getElementById("un-help-modal").style.display = "none";
}

// Start automatically on page load
window.onload = function() {
  unRenderNode(unData.start);
};
