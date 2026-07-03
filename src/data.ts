import { Service, Review, FAQ, ProjectPhoto } from "./types";

export const COMPANY_INFO = {
  name: "JRN Roofing Contractors",
  phone: "+44 7835 375466",
  phoneDisplay: "07835 375466",
  email: "info@jrnroofingcontractors.co.uk",
  hours: "Open 24 Hours",
  rating: 4.8,
  reviewsCount: 32,
  coverageAreas: [
    "Leeds",
    "York",
    "Harrogate",
    "Bradford",
    "Wakefield",
    "Wetherby",
    "Otley",
    "Ilkley",
    "Castleford",
    "Pontefract",
    "Huddersfield",
    "Halifax",
    "West Yorkshire"
  ]
};

export const SERVICES_DATA: Service[] = [
  {
    id: "roof-repairs",
    title: "Roof Repairs",
    description: "Professional repairs for broken slates, loose tiles, leaking valleys, and ridge repointing to maintain structural integrity.",
    details: "Your roof is your home's primary defense against the elements. Even minor issues like a single broken tile or crumbling ridge mortar can lead to extensive water damage and costly structural rot. At JRN Roofing, we carry out swift, high-quality, fully matched repairs that restore your roof to pristine condition.",
    iconName: "Hammer",
    benefits: [
      "Extends your current roof's overall lifespan",
      "Prevents expensive timber decay and mold growth",
      "Saves on high energy costs through repaired insulation",
      "Perfect color-matching tiles and matching materials used"
    ],
    imageUrl: "/src/assets/images/roof_inspection_1783040833637.jpg"
  },
  {
    id: "roof-replacement",
    title: "Roof Replacement",
    description: "Complete, state-of-the-art slate or clay tile re-roofing backed by our robust, comprehensive 20-year structural guarantee.",
    details: "If your old roof is showing signs of widespread degradation or failing structural support, a full replacement is the most cost-effective long-term investment. Our premium re-roofing service uses cutting-edge vapor-permeable underlayment, high-grade treated timber laths, and your choice of premium natural slate or clay tiles.",
    iconName: "Home",
    benefits: [
      "Upgrades structural thermal insulation to modern standards",
      "Significantly increases your home's curbside and resale value",
      "Comes with our ironclad 20-year comprehensive JRN guarantee",
      "Improves architectural aesthetics with precision slating"
    ],
    imageUrl: "/src/assets/images/hero_roof_install_1783040819790.jpg"
  },
  {
    id: "flat-roofing",
    title: "Flat Roofing",
    description: "Modern, high-performance EPDM single-ply rubber and GRP fiberglass systems designed for seamless, durable weatherproofing.",
    details: "Traditional felt flat roofs are prone to bubbling, cracking, and eventual leakage. JRN Roofing installs premium EPDM synthetic rubber and GRP fiberglass flat roofing membranes. These advanced solutions are jointless, extremely resilient to solar UV rays, and have a proven service life exceeding 40 years.",
    iconName: "Shield",
    benefits: [
      "100% seamless, joint-free waterproofing eliminates leak risks",
      "Flexible materials adapt to natural thermal structural shifts",
      "Virtually maintenance-free with high resistance to moss/dirt",
      "Guaranteed leak-free performance for up to 25 years"
    ],
    imageUrl: "/src/assets/images/aerial_roof_worker_1783040856910.jpg"
  },
  {
    id: "leak-repairs",
    title: "Leak Repairs",
    description: "Rapid water ingress diagnostic tracing and precision sealing to protect your property's interiors and ceiling plaster.",
    details: "Water leaks are notoriously tricky to locate, as gravity often pulls water far away from where it initially enters. Our experienced roofers use advanced moisture tracing techniques and visual inspection to find the exact point of ingress, providing rapid, reliable seals that stop leaks instantly.",
    iconName: "Droplets",
    benefits: [
      "Advanced water diagnostic tracing identifies hidden entries",
      "Fast same-day response to prevent ceiling collapsed plaster",
      "High-grade polymer sealants provide long-lasting repairs",
      "Includes general inspection of surrounding flashing work"
    ],
    imageUrl: "/src/assets/images/emergency_roofing_1783040845376.jpg"
  },
  {
    id: "emergency-roofing",
    title: "Emergency Roofing",
    description: "Priority 24/7 emergency response for storm damage, high winds, active major leaks, and fallen trees.",
    details: "When emergency strikes, waiting is not an option. Our certified rapid-response teams are on call 24 hours a day, 365 days a year. We arrive equipped to immediately perform structural boarding, install heavy-duty waterproof tarpaulins, and secure your property against ongoing weather threats.",
    iconName: "Clock",
    benefits: [
      "On-call rapid-response teams dispatched immediately",
      "Heavy-duty waterproof sheeting installed to secure interiors",
      "Prompt emergency pricing and digital insurance photography",
      "Fully approved contractor for major UK insurance claims"
    ],
    imageUrl: "/src/assets/images/emergency_roofing_1783040845376.jpg"
  },
  {
    id: "gutter-repairs",
    title: "Gutter Repairs & Guttering",
    description: "Installation, clearance, and seamless joint sealing of robust high-capacity PVC and aluminum guttering systems.",
    details: "Gutters serve a vital role in carrying roof water safely away from your home's foundation. Leaking, sagging, or blocked gutters can saturate exterior brickwork, resulting in severe internal damp and foundation issues. We install and repair premium, leak-free uPVC and aluminium guttering and fascia boards.",
    iconName: "CheckCircle",
    benefits: [
      "Safeguards brickwork, fascias, and foundations from water rot",
      "Custom-fitted uPVC fascias in matching modern color schemes",
      "Includes clearing of leaves, moss, and structural debris",
      "Heavy-duty brackets eliminate gutter sagging under snow weight"
    ],
    imageUrl: "/src/assets/images/hero_roof_install_1783040819790.jpg"
  },
  {
    id: "chimney-repairs",
    title: "Chimney Repairs",
    description: "Expert brick repointing, chimney pot securing, lead step-flashing replacement, and complete chimney crown sealing.",
    details: "Exposed to the highest wind speeds and heaviest rainfall, chimneys are major focal points for leaks and structural decay. JRN Roofing provides premium brickwork repointing, replacing worn lead flashing with high-grade lead, and rendering chimney crowns to ensure a perfect, watertight barrier.",
    iconName: "Hammer",
    benefits: [
      "Replaces weathered lead step-flashing with premium lead",
      "Secures loose masonry, pots, and cowls from high wind hazards",
      "Waterproofs chimney joints to prevent internal chimney damp",
      "Includes complete structural safety inspection of elevation"
    ],
    imageUrl: "/src/assets/images/roof_inspection_1783040833637.jpg"
  },
  {
    id: "roof-inspections",
    title: "Roof Inspections & Surveys",
    description: "Comprehensive drone-assisted and physical roof health surveys with detailed high-resolution photographic reports.",
    details: "Buying a new home or concerned about the age of your roof? Our complete roof inspection service provides an unbiased, highly detailed assessment of your slate, tiling, timber structure, chimneys, and gutters. We highlight immediate issues, potential risks, and estimate remaining roof lifespans.",
    iconName: "Eye",
    benefits: [
      "High-definition drone footage captures hard-to-reach angles",
      "Detailed, transparent written reports with digital photographs",
      "Unbiased appraisals perfect for pre-purchase property surveys",
      "Enables proactive minor repairs before they turn catastrophic"
    ],
    imageUrl: "/src/assets/images/aerial_roof_worker_1783040856910.jpg"
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: "rev-1",
    author: "Thomas H.",
    rating: 5,
    date: "2 days ago",
    text: "Outstanding emergency service! JRN came out at 11 PM during a severe storm to fix a massive roof leak. They sheeted it temporarily and came back the next morning to replace the broken slates. Absolute life-savers!",
    service: "Emergency Roofing"
  },
  {
    id: "rev-2",
    author: "Sarah M.",
    rating: 5,
    date: "1 week ago",
    text: "JRN Roofing replaced our entire guttering system and repaired several loose slates on our roof. Absolute professionals from start to finish. Fast quote, fair price, and immaculate cleanup afterwards. 10/10.",
    service: "Gutter Repairs"
  },
  {
    id: "rev-3",
    author: "David L.",
    rating: 5,
    date: "3 weeks ago",
    text: "We had a rear extension flat roof fitted with EPDM rubber. The finish is fantastic—completely seamless and looks brilliant. The team worked extremely hard, kept everything clean, and answered all our questions.",
    service: "Flat Roofing"
  },
  {
    id: "rev-4",
    author: "Eleanor G.",
    rating: 5,
    date: "1 month ago",
    text: "Extremely professional and friendly family business feel. Our complete slate re-roof was done ahead of schedule. The roofers vacuumed our driveway and lawn daily to clean up any debris. Excellent craftsmanship!",
    service: "Roof Replacement"
  },
  {
    id: "rev-5",
    author: "James P.",
    rating: 5,
    date: "1 month ago",
    text: "Quick response, reasonable quote, and efficient repair of our valley flashing. The communication was excellent throughout, showing us video footage of the damage and completed work. Highly recommend JRN.",
    service: "Roof Repairs"
  }
];

export const PROJECTS_DATA: ProjectPhoto[] = [
  {
    id: "proj-1",
    url: "/src/assets/images/hero_roof_install_1783040819790.jpg",
    category: "Roof Replacement",
    title: "Premium Slate Re-Roofing",
    description: "Complete modern strip and replacement with natural slate tiles, vapor barrier, and high-performance lead valley valleys on a luxury detached home."
  },
  {
    id: "proj-2",
    url: "/src/assets/images/aerial_roof_worker_1783040856910.jpg",
    category: "Flat Roofing",
    title: "EPDM Flat Roof Installation",
    description: "Seamless single-ply EPDM rubber roofing membrane installation on a modern high-end architectural rear extension."
  },
  {
    id: "proj-3",
    url: "/src/assets/images/roof_inspection_1783040833637.jpg",
    category: "Roof Repairs",
    title: "Fascia & Gutter Renewal",
    description: "Premium matching white uPVC fascias, soffits, and heavy-duty deep-flow guttering installed to protect historic timber frameworks."
  },
  {
    id: "proj-4",
    url: "/src/assets/images/emergency_roofing_1783040845376.jpg",
    category: "Emergency Roofing",
    title: "Emergency Storm Damage Seal",
    description: "Dispatched rapid-response storm repair to temporarily sheet a high wind gale-damaged roof, returning the next dry morning to complete slate matches."
  }
];

export const FAQS_DATA: FAQ[] = [
  {
    id: "faq-1",
    question: "How much does a typical roof repair cost?",
    answer: "Minor repairs (like replacing 2-3 broken slates or re-pointing a small mortar joint) start around £150 to £250. More complex work like structural valley repairs or ridge tile re-bedding ranges from £450 to £1,200. We always provide a 100% free, written, fixed-price quotation before commencing any work, so you'll never face hidden surprises."
  },
  {
    id: "faq-2",
    question: "Do you offer genuine 24-hour emergency roof repairs?",
    answer: "Yes, we operate a direct emergency hotline at +44 7835 375466. If you experience emergency storm damage, tree impacts, or extreme rain ingress, call us immediately. We aim to have an emergency response crew at your door within 1 to 2 hours in our coverage areas to safely dry-in your property."
  },
  {
    id: "faq-3",
    question: "How long does a complete roof replacement take?",
    answer: "An average domestic roof replacement takes between 3 to 7 working days, depending on house scale, tile specification, and weather conditions. We arrange all scaffolding, safety checks, and waste disposal. We tidy up and vacuum the surrounding grounds daily, ensuring minimal disruption."
  },
  {
    id: "faq-4",
    question: "Are estimates, inspections, and written quotes completely free?",
    answer: "Absolutely! We do not charge anything for visiting your property, conducting visual roof inspections, or preparing comprehensive multi-option written quotes. There is zero pressure and 100% no obligation to hire us."
  },
  {
    id: "faq-5",
    question: "Do you guarantee your workmanship and materials?",
    answer: "Yes, peace of mind is central to our business. All minor repairs carry a 12-month workmanship guarantee. Modern EPDM flat roof installations carry a 20-to-25-year manufacturer guarantee, and full slate or tiled roof replacements come backed with JRN's comprehensive 20-year structural warranty."
  },
  {
    id: "faq-6",
    question: "Are JRN Roofing Contractors fully insured?",
    answer: "Yes, we are fully insured with a comprehensive £5,000,000 Public and Employer's Liability insurance policy. All our team members are fully trained, qualified, and adhere strictly to UK health and safety roofing guidelines."
  }
];
