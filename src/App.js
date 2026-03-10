import { useState, useEffect, useRef } from "react";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const translations = {
  fr: {
    dir: "ltr",
    nav: ["Accueil", "Présentation", "Services", "Galerie", "Témoignages", "Zone", "FAQ", "Contact"],
    heroTitle: "Un accompagnement soignant",
    heroTitleAccent: "de qualité, directement chez vous",
    heroSub: "Aide soignant diplômé d'État — sur rendez-vous à Vienne et alentours",
    heroCta1: "Prendre contact",
    heroCta2: "Appeler",
    trustExp: "Plus de 10 ans d'expérience",
    trust7: "Sur rendez-vous",
    trustZone: "Vienne et alentours",
    whoTitle: "Qui suis-je ?",
    whoSub: "Un service humain, sans intermédiaire",
    whoText1: "Aide soignant diplômé d'État depuis 2014, j'ai travaillé aux Hospices Civils de Lyon en chirurgie, médecine, oncologie, gériatrie, réanimation, urgences, lésions médullaires… J'ai acquis une grande expérience dans toutes formes de prise en charge.",
    whoText2: "Je suis à votre disposition personnellement. Pas d'agence, pas de rotation de personnel. Juste un professionnel engagé, à votre écoute.",
    cards: ["Diplômé d'État", "Intervenant direct", "A travaillé aux HCL", "Vienne"],
    cardsSub: ["depuis 2014", "sans intermédiaire", "Hospices Civils de Lyon", "et alentours"],
    servicesTitle: "Mes services",
    servicesSub: "Des prestations adaptées à vos besoins",
    servicesCats: ["Soins quotidiens", "Soins de surveillance", "Accompagnement humain"],
    servicesItems: [
      ["Toilette complète", "Aide au lever et au coucher", "Aide à l'alimentation et à l'hydratation", "Aide à la prise de médicaments prescrits par un médecin et préparés par un(e) infirmier(ère)"],
      ["Prise de constantes", "Soins préventifs anti-escarres"],
      ["Accompagnement en fin de vie", "Soins post mortem dans le respect des rites"],
    ],
    galleryTitle: "Au cœur des soins",
    gallerySub: "Bienveillance, professionnalisme et humanité à votre domicile",
    galleryLabels: ["Soins à domicile", "Accompagnement", "Prise de constantes", "Aide quotidienne", "Présence humaine", "Soins préventifs"],
    testiTitle: "Ils nous font confiance",
    testiSub: "La confiance de nos patients et de leurs familles",
    testimonials: [
      { name: "Marie L.", role: "Famille d'un patient", text: "Un professionnel d'une grande bienveillance. Mon père se sent en confiance à chaque intervention. Je recommande vivement." },
      { name: "Fatima B.", role: "Patiente, 71 ans", text: "Il comprend nos besoins et respecte nos habitudes. Un soignant à l'écoute, attentionné et très professionnel. Baraka Allaho fik." },
      { name: "Carlos M.", role: "Famille d'une patiente", text: "Muito profissional e humano. A minha mãe está em boas mãos. Recomendo a toda a comunidade portuguesa." },
    ],
    zoneTitle: "Mes compétences",
    zoneSub: "Référentiel professionnel aide-soignant diplômé d'État",
    zoneText: "J'interviens sur Vienne (38200) et les communes alentours.",
    zoneItems: [
      { icon: "🤲", text: "Accompagner une personne dans les actes essentiels de la vie quotidienne et de sa vie sociale" },
      { icon: "🩺", text: "Apprécier l'état clinique d'une personne et mise en œuvre de soins adaptés" },
      { icon: "💉", text: "Réaliser des soins en relation avec l'état de la personne" },
      { icon: "🦺", text: "Utiliser les techniques préventives de manutention et les règles de sécurité" },
      { icon: "💬", text: "Établir une communication adaptée à la personne et à son entourage" },
      { icon: "📋", text: "Rechercher, traiter et transmettre les informations pour assurer la continuité des soins" },
      { icon: "🔒", text: "Devoir de discrétion et de confidentialité en respectant les règles éthiques et déontologiques" },
    ],
    faqTitle: "Questions fréquentes",
    faqSub: "Tout ce que vous devez savoir",
    faqs: [
      { q: "Comment se déroule une première intervention ?", a: "Je prends contact avec vous ou votre famille pour un premier échange téléphonique gratuit. Nous convenons ensemble d'une première visite à domicile pour évaluer vos besoins et établir un plan de soins personnalisé." },
      { q: "Modalités pour les soins à domicile", a: "Plusieurs dispositifs existent pour vous aider à financer et organiser vos soins à domicile :", faqLinks: [
        { label: "Maintien à domicile (MAD)", desc: "Prestations médicales, techniques et financières pour aider les personnes âgées ou en situation de handicap à rester à domicile", url: "https://www.ameli.fr/assure/sante/bons-gestes/seniors/maintien-domicile" },
        { label: "SSIAD", desc: "Services de soins infirmiers à domicile, disponibles sur prescription médicale", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F246" },
        { label: "Professionnels de santé à domicile", desc: "Aides-soignants et autres professionnels intervenant au domicile pour des soins adaptés", url: "https://www.pour-les-personnes-agees.gouv.fr/vivre-a-domicile/beneficier-de-soins-a-domicile" },
        { label: "Réforme SAD (ARS AuRA)", desc: "Réforme des services autonomie à domicile visant à simplifier les démarches administratives", url: "https://www.auvergne-rhone-alpes.ars.sante.fr/index.php/reforme-des-services-autonomie-domicile-sad-informations-et-demarches-en-auvergne-rhone-alpes" },
      ]},
      { q: "Quels sont vos horaires d'intervention ?", a: "J'interviens à toute heure — en journée comme en soirée ou la nuit — en m'adaptant à vos besoins et à votre rythme de vie." },
      { q: "Intervenez-vous en urgence ?", a: "J'interviens en urgence dans la mesure du possible, dans le cadre strict de mes compétences pour les soins non médicaux. Pour toute situation médicale aiguë, n'attendez pas : contactez votre médecin traitant ou composez le 15." },
      { q: "Quelle est votre zone d'intervention ?", a: "J'interviens sur Vienne (38200) et les communes limitrophes." },
    ],
    contactTitle: "Me contacter",
    contactSub: "Je vous réponds dans les plus brefs délais",
    contactDirect: "Coordonnées directes",
    contactLabels: ["Téléphone", "Email", "Zone", "Disponibilité"],
    contactValues: ["+33 7 70 00 73 35", "olivier.scafi@gmail.com", "Vienne 38200 et alentours", "Sur rendez-vous"],
    formName: "Votre nom *",
    formPhone: "Téléphone",
    formEmail: "Email",
    formMsg: "Votre message *",
    formBtn: "Envoyer ma demande",
    formSentTitle: "Message transmis",
    formSentText: "Je vous recontacterai dans les plus brefs délais.",
    footer: "© 2026 ASD — Aide Soignant à Domicile · Vienne 38200",
    footerLegal: "SIRET 822 971 065 00021 · Code APE 8810A · 52 Av. Marcellin Berthelot · Rés. Les Portes de Lyon · 38200 Vienne",
    footerAI: "Site conçu avec l'assistance de Claude (Anthropic) · Copilot · Grok · Olivier (Orchestrateur)",
    footerAITooltip: "Construction & déploiement : Claude — Anthropic · Conception : Microsoft Copilot · Design : Grok — xAI · Orchestration : Olivier Scafi",
    floatCall: "Appeler",
    cesuBtn: "Paiement CESU",
    cesuTitle: "Le CESU — Chèque Emploi Service Universel",
    cesuSub: "Un mode de paiement simple et avantageux pour vos proches",
    cesuWhat: "Qu'est-ce que le CESU ?",
    cesuWhatText: "Le Chèque Emploi Service Universel (CESU) est un dispositif officiel de l'État français qui permet de payer simplement les intervenants à domicile. Il existe en deux formes : le CESU bancaire (chèque classique) et le CESU préfinancé (financé par un employeur, une mutuelle ou une caisse de retraite).",
    cesuHow: "Comment me payer en CESU ?",
    cesuHowSteps: [
      "Votre proche ou sa famille crée un espace sur cesu.urssaf.fr",
      "Il déclare le paiement en indiquant mon SIRET : 822 971 065 00021",
      "Le règlement s'effectue par chèque CESU ou virement CESU",
      "Des avantages fiscaux s'appliquent : crédit d'impôt de 50% des sommes versées",
    ],
    cesuAdvantage: "💡 Bon à savoir",
    cesuAdvantageText: "Avec le CESU, vos proches peuvent bénéficier d'un crédit d'impôt de 50% sur les sommes versées — ce qui réduit concrètement le coût de l'intervention.",
    cesuLink: "Accéder au site officiel CESU",
    cesuClose: "Fermer",
    diplomasBtn: "Mon parcours & diplômes",
    diplomasTitle: "Parcours & diplômes",
    diplomasSub: "Qualifications officielles d'Olivier Scafi",
    diplomas: [
      { icon: "🎓", badge: "DIPLÔME D'ÉTAT", title: "Aide-Soignant Diplômé d'État", org: "Ministère chargé de la Santé · Région Rhône-Alpes", date: "7 juillet 2014", num: "N° 0979386", highlight: false },
      { icon: "🚑", badge: "DIPLÔME D'ÉTAT", title: "Certificat de Capacité d'Ambulancier (DEA)", org: "Ministère chargé de la Santé · Vienne (Isère)", date: "19 décembre 2006", num: "", highlight: false },
      { icon: "⭐", badge: "CERTIFICATION FORMATEUR", title: "Animateur — Méthode Manutention des Malades® Paul DOTTE", org: "SIFAM Formations · Hospices Civils de Lyon", date: "2009", num: "N° 09 027", highlight: true },
      { icon: "🏥", badge: "ATTESTATION HCL", title: "Transports Pédiatriques Vecteurs I et II", org: "Institut de Formation aux Carrières de Santé · SAMU 69 · HCL", date: "Juin 2009", num: "", highlight: false },
      { icon: "♿", badge: "CERTIFICAT", title: "Travailler en situation de handicap", org: "Hospices Civils de Lyon · Edflex — Certificat vérifié", date: "4 juillet 2024", num: "", highlight: false },
    ],
  },
  ar: {
    dir: "rtl",
    nav: ["الرئيسية", "تعريف", "الخدمات", "معرض", "شهادات", "المنطقة", "أسئلة", "اتصل"],
    heroTitle: "رعاية منزلية احترافية",
    heroTitleAccent: "بجودة عالية، مباشرة في منزلكم",
    heroSub: "ممرض معتمد من الدولة — على موعد في فيان وضواحيها",
    heroCta1: "تواصل معنا",
    heroCta2: "اتصل",
    trustExp: "أكثر من 10 سنوات خبرة",
    trust7: "على موعد",
    trustZone: "فيان وضواحيها",
    whoTitle: "من أنا؟",
    whoSub: "خدمة إنسانية بدون وسيط",
    whoText1: "ممرض معتمد من الدولة منذ 2014، عملت في مستشفيات ليون المدنية في الجراحة، الطب، علم الأورام، طب الشيخوخة، الإنعاش، الطوارئ، إصابات النخاع الشوكي… اكتسبت خبرة واسعة في جميع أشكال الرعاية.",
    whoText2: "أنا شخصياً في خدمتكم. لا وكالة، لا تناوب في الموظفين. فقط محترف ملتزم ومستمع لكم.",
    cards: ["معتمد من الدولة", "تدخل مباشر", "عمل في HCL", "فيان"],
    cardsSub: ["منذ 2014", "بدون وسيط", "مستشفيات ليون المدنية", "وضواحيها"],
    servicesTitle: "خدماتي",
    servicesSub: "خدمات مكيّفة حسب احتياجاتكم",
    servicesCats: ["رعاية يومية", "رعاية ومراقبة", "مرافقة إنسانية"],
    servicesItems: [
      ["الاستحمام الكامل", "المساعدة في النهوض والنوم", "المساعدة في الأكل والشرب", "المساعدة في تناول الأدوية الموصوفة من طبيب والمحضّرة من قِبَل ممرض/ة"],
      ["قياس العلامات الحيوية", "العناية الوقائية من القرح"],
      ["المرافقة في نهاية الحياة", "رعاية ما بعد الوفاة مع احترام الشعائر"],
    ],
    galleryTitle: "في قلب الرعاية",
    gallerySub: "لطف واحترافية وإنسانية في منزلكم",
    galleryLabels: ["رعاية منزلية", "مرافقة", "قياس الحيوية", "مساعدة يومية", "حضور إنساني", "رعاية وقائية"],
    testiTitle: "يثقون بنا",
    testiSub: "ثقة مرضانا وعائلاتهم",
    testimonials: [
      { name: "ماري ل.", role: "عائلة مريض", text: "محترف بالغ اللطف. والدي يشعر بالثقة في كل زيارة. أوصي به بشدة." },
      { name: "فاطمة ب.", role: "مريضة، 71 سنة", text: "يفهم احتياجاتنا ويحترم عاداتنا. ممرض مستمع ومهتم واحترافي جداً. بارك الله فيك." },
      { name: "كارلوس م.", role: "عائلة مريضة", text: "محترف جداً وإنساني. والدتي في أيدٍ أمينة. أنصح به لكل الجالية." },
    ],
    zoneTitle: "كفاءاتي",
    zoneSub: "المرجع المهني للممرض المعتمد من الدولة",
    zoneText: "أتدخل في فيان (38200) والبلديات المجاورة.",
    zoneItems: [
      { icon: "🤲", text: "مرافقة الشخص في الأعمال الأساسية للحياة اليومية والاجتماعية" },
      { icon: "🩺", text: "تقييم الحالة السريرية للشخص وتنفيذ الرعاية المناسبة" },
      { icon: "💉", text: "تقديم الرعاية بما يتناسب مع حالة الشخص" },
      { icon: "🦺", text: "استخدام تقنيات المناولة الوقائية وقواعد السلامة" },
      { icon: "💬", text: "إقامة تواصل مناسب مع الشخص ومحيطه" },
      { icon: "📋", text: "البحث عن المعلومات ومعالجتها ونقلها لضمان استمرارية الرعاية" },
      { icon: "🔒", text: "واجب التحفظ والسرية مع احترام القواعد الأخلاقية والمهنية" },
    ],
    faqTitle: "أسئلة شائعة",
    faqSub: "كل ما تحتاج معرفته",
    faqs: [
      { q: "كيف يتم التدخل الأول؟", a: "أتواصل معكم أو مع عائلتكم لمحادثة هاتفية مجانية أولى. نتفق معاً على زيارة منزلية أولى لتقييم احتياجاتكم ووضع خطة رعاية شخصية." },
      { q: "إجراءات الرعاية المنزلية", a: "تتوفر عدة أنظمة لمساعدتكم في تمويل وتنظيم رعايتكم المنزلية :", faqLinks: [
        { label: "الحفاظ على الاستقلالية في المنزل (MAD)", desc: "خدمات طبية وتقنية ومالية لمساعدة المسنين وذوي الإعاقة على البقاء في المنزل", url: "https://www.ameli.fr/assure/sante/bons-gestes/seniors/maintien-domicile" },
        { label: "خدمات التمريض المنزلي (SSIAD)", desc: "خدمات الرعاية الطبية والتقنية المتاحة بوصفة طبية", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F246" },
        { label: "متخصصو الصحة في المنزل", desc: "مساعدو التمريض والمتخصصون الآخرون يتدخلون في المنزل لتقديم رعاية مناسبة", url: "https://www.pour-les-personnes-agees.gouv.fr/vivre-a-domicile/beneficier-de-soins-a-domicile" },
        { label: "إصلاح خدمات الاستقلالية المنزلية (SAD)", desc: "إصلاح يهدف إلى تعزيز الخدمات المنزلية وتبسيط الإجراءات الإدارية", url: "https://www.auvergne-rhone-alpes.ars.sante.fr/index.php/reforme-des-services-autonomie-domicile-sad-informations-et-demarches-en-auvergne-rhone-alpes" },
      ]},
      { q: "ما هي مواعيد التدخل؟", a: "أتدخل في أي وقت — نهاراً أو مساءً أو ليلاً — مع التكيف مع احتياجاتكم وإيقاع حياتكم." },
      { q: "هل تتدخلون في حالات الطوارئ؟", a: "أتدخل في حالات الطوارئ بقدر الإمكان، في إطار صارم من كفاءاتي للرعاية غير الطبية. لأي حالة طبية حادة، لا تنتظروا: اتصلوا بطبيبكم أو اتصلوا بـ 15." },
      { q: "ما هي منطقة تدخلكم؟", a: "أتدخل في فيان (38200) والبلديات المجاورة." },
    ],
    contactTitle: "اتصل بي",
    contactSub: "سأرد عليكم في أقرب وقت ممكن",
    contactDirect: "معلومات الاتصال المباشر",
    contactLabels: ["الهاتف", "البريد", "المنطقة", "التوفر"],
    contactValues: ["+33 7 70 00 73 35", "olivier.scafi@gmail.com", "فيان 38200 وضواحيها", "على موعد"],
    formName: "اسمكم *",
    formPhone: "الهاتف",
    formEmail: "البريد الإلكتروني",
    formMsg: "رسالتكم *",
    formBtn: "إرسال الطلب",
    formSentTitle: "تم إرسال الرسالة",
    formSentText: "سأتواصل معكم في أقرب وقت ممكن.",
    footer: "© 2026 ASD — ممرض منزلي · فيان 38200",
    footerLegal: "SIRET 822 971 065 00021 · APE 8810A · 52 Av. Marcellin Berthelot · 38200 Vienne FRANCE",
    footerAI: "موقع صُمِّم بمساعدة Claude (Anthropic) · Copilot · Grok · Olivier (المنسّق)",
    footerAITooltip: "البناء والنشر: Claude — Anthropic · التصميم المفاهيمي: Microsoft Copilot · التصميم البصري: Grok — xAI · التنسيق: Olivier Scafi",
    floatCall: "اتصل",
    cesuBtn: "الدفع بـ CESU",
    cesuTitle: "CESU — شيك خدمة التوظيف المنزلي",
    cesuSub: "طريقة دفع بسيطة ومفيدة لذويكم",
    cesuWhat: "ما هو CESU؟",
    cesuWhatText: "شيك خدمة التوظيف المنزلي (CESU) هو نظام رسمي من الدولة الفرنسية يتيح دفع رواتب المتدخلين المنزليين بسهولة. يوجد في شكلين: CESU بنكي (شيك عادي) و CESU ممول مسبقاً (من صاحب العمل أو التأمين الصحي).",
    cesuHow: "كيف تدفعون لي بـ CESU؟",
    cesuHowSteps: [
      "يفتح ذووكم حساباً على cesu.urssaf.fr",
      "يعلنون عن الدفع مع ذكر رقمي: 822 971 065 00021",
      "يتم الدفع بشيك CESU أو تحويل CESU",
      "تطبّق مزايا ضريبية: تخفيض ضريبي 50% على المبالغ المدفوعة",
    ],
    cesuAdvantage: "💡 معلومة مهمة",
    cesuAdvantageText: "مع CESU، يستفيد ذووكم من تخفيض ضريبي بنسبة 50% على المبالغ المدفوعة — مما يقلل فعلياً من تكلفة التدخل.",
    cesuLink: "الموقع الرسمي لـ CESU",
    cesuClose: "إغلاق",
    diplomasBtn: "مساري ومؤهلاتي",
    diplomasTitle: "المسار والمؤهلات",
    diplomasSub: "المؤهلات الرسمية لأوليفييه سكافي",
    diplomas: [
      { icon: "🎓", badge: "شهادة دولة", title: "ممرض مساعد معتمد من الدولة", org: "وزارة الصحة · إقليم رون-ألب", date: "7 يوليو 2014", num: "رقم 0979386", highlight: false },
      { icon: "🚑", badge: "شهادة دولة", title: "شهادة كفاءة مسعف (DEA)", org: "وزارة الصحة · فيان (إيزير)", date: "19 ديسمبر 2006", num: "", highlight: false },
      { icon: "⭐", badge: "شهادة مدرّب", title: "منشّط — طريقة مناولة المرضى® بول دوت", org: "SIFAM Formations · مستشفيات ليون المدنية", date: "2009", num: "رقم 09 027", highlight: true },
      { icon: "🏥", badge: "شهادة HCL", title: "نقل الأطفال المرضى Vecteurs I et II", org: "معهد تكوين مهن الصحة · SAMU 69 · HCL", date: "يونيو 2009", num: "", highlight: false },
      { icon: "♿", badge: "شهادة نجاح", title: "العمل مع أشخاص ذوي إعاقة", org: "مستشفيات ليون المدنية · Edflex", date: "4 يوليو 2024", num: "", highlight: false },
    ],
  },
  pt: {
    dir: "ltr",
    nav: ["Início", "Apresentação", "Serviços", "Galeria", "Depoimentos", "Zona", "FAQ", "Contato"],
    heroTitle: "Acompanhamento de enfermagem",
    heroTitleAccent: "de qualidade, diretamente em sua casa",
    heroSub: "Auxiliar de enfermagem diplomado pelo Estado — com marcação em Vienne e arredores",
    heroCta1: "Entrar em contato",
    heroCta2: "Ligar",
    trustExp: "Mais de 10 anos de experiência",
    trust7: "Com marcação",
    trustZone: "Vienne e arredores",
    whoTitle: "Quem sou eu?",
    whoSub: "Um serviço humano, sem intermediários",
    whoText1: "Auxiliar de enfermagem diplomado pelo Estado desde 2014, trabalhei nos Hospícios Civis de Lyon em cirurgia, medicina, oncologia, geriatria, reanimação, urgências, lesões medulares… Adquiri uma grande experiência em todas as formas de cuidados.",
    whoText2: "Estou pessoalmente ao seu dispor. Sem agência, sem rotatividade de pessoal. Apenas um profissional comprometido, à sua escuta.",
    cards: ["Diplomado pelo Estado", "Intervenção direta", "Trabalhou nos HCL", "Vienne"],
    cardsSub: ["desde 2014", "sem intermediários", "Hospícios Civis de Lyon", "e arredores"],
    servicesTitle: "Meus serviços",
    servicesSub: "Serviços adaptados às suas necessidades",
    servicesCats: ["Cuidados diários", "Cuidados de vigilância", "Acompanhamento humano"],
    servicesItems: [
      ["Higiene completa", "Auxílio no levantar e deitar", "Auxílio na alimentação e hidratação", "Auxílio na toma de medicamentos prescritos por médico e preparados por enfermeiro/a"],
      ["Verificação de sinais vitais", "Cuidados preventivos anti-escaras"],
      ["Acompanhamento no fim de vida", "Cuidados post mortem com respeito aos ritos"],
    ],
    galleryTitle: "No coração dos cuidados",
    gallerySub: "Benevolência, profissionalismo e humanidade em sua casa",
    galleryLabels: ["Cuidados domiciliares", "Acompanhamento", "Sinais vitais", "Auxílio diário", "Presença humana", "Cuidados preventivos"],
    testiTitle: "Eles confiam em nós",
    testiSub: "A confiança de nossos pacientes e suas famílias",
    testimonials: [
      { name: "Marie L.", role: "Família de paciente", text: "Um profissional de grande benevolência. Meu pai se sente seguro em cada visita. Recomendo vivamente." },
      { name: "Fátima B.", role: "Paciente, 71 anos", text: "Ele compreende as nossas necessidades e respeita os nossos hábitos. Um cuidador atento e muito profissional. Muito obrigada." },
      { name: "Carlos M.", role: "Família de paciente", text: "Muito profissional e humano. A minha mãe está em boas mãos. Recomendo a toda a comunidade portuguesa." },
    ],
    zoneTitle: "As minhas competências",
    zoneSub: "Referencial profissional do auxiliar de enfermagem diplomado pelo Estado",
    zoneText: "Intervenho em Vienne (38200) e nos municípios vizinhos.",
    zoneItems: [
      { icon: "🤲", text: "Acompanhar uma pessoa nos atos essenciais da vida quotidiana e da sua vida social" },
      { icon: "🩺", text: "Avaliar o estado clínico de uma pessoa e implementar cuidados adaptados" },
      { icon: "💉", text: "Realizar cuidados em relação com o estado da pessoa" },
      { icon: "🦺", text: "Utilizar técnicas preventivas de movimentação e regras de segurança" },
      { icon: "💬", text: "Estabelecer uma comunicação adaptada à pessoa e ao seu entorno" },
      { icon: "📋", text: "Pesquisar, tratar e transmitir informações para garantir a continuidade dos cuidados" },
      { icon: "🔒", text: "Dever de discrição e confidencialidade respeitando as regras éticas e deontológicas" },
    ],
    faqTitle: "Perguntas frequentes",
    faqSub: "Tudo o que você precisa saber",
    faqs: [
      { q: "Como funciona a primeira intervenção?", a: "Entro em contato com você ou sua família para uma primeira conversa telefônica gratuita. Combinamos juntos uma primeira visita domiciliar para avaliar suas necessidades e estabelecer um plano de cuidados personalizado." },
      { q: "Modalidades para os cuidados ao domicílio", a: "Existem vários dispositivos para o ajudar a financiar e organizar os seus cuidados em casa :", faqLinks: [
        { label: "Manutenção ao domicílio (MAD)", desc: "Prestações médicas, técnicas e financeiras para ajudar os idosos ou pessoas com deficiência a permanecer em casa", url: "https://www.ameli.fr/assure/sante/bons-gestes/seniors/maintien-domicile" },
        { label: "SSIAD", desc: "Serviços de enfermagem ao domicílio disponíveis mediante prescrição médica", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F246" },
        { label: "Profissionais de saúde ao domicílio", desc: "Auxiliares de enfermagem e outros profissionais que intervêm em casa para cuidados adaptados", url: "https://www.pour-les-personnes-agees.gouv.fr/vivre-a-domicile/beneficier-de-soins-a-domicile" },
        { label: "Reforma SAD (ARS AuRA)", desc: "Reforma dos serviços de autonomia ao domicílio visando simplificar as formalidades administrativas", url: "https://www.auvergne-rhone-alpes.ars.sante.fr/index.php/reforme-des-services-autonomie-domicile-sad-informations-et-demarches-en-auvergne-rhone-alpes" },
      ]},
      { q: "Quais são seus horários de intervenção?", a: "Intervenho a qualquer hora — de dia, à tarde ou à noite — adaptando-me às suas necessidades e ao seu ritmo de vida." },
      { q: "Vocês intervêm em emergências?", a: "Intervenho em urgência na medida do possível, no âmbito estrito das minhas competências para cuidados não médicos. Para qualquer situação médica aguda, não espere: contacte o seu médico de família ou ligue para o 15." },
      { q: "Qual é a sua zona de intervenção?", a: "Intervenho em Vienne (38200) e nos municípios limitrofes." },
    ],
    contactTitle: "Entrar em contato",
    contactSub: "Responderei o mais brevemente possível",
    contactDirect: "Contato direto",
    contactLabels: ["Telefone", "Email", "Zona", "Disponibilidade"],
    contactValues: ["+33 7 70 00 73 35", "olivier.scafi@gmail.com", "Vienne 38200 e arredores", "Com marcação"],
    formName: "Seu nome *",
    formPhone: "Telefone",
    formEmail: "Email",
    formMsg: "Sua mensagem *",
    formBtn: "Enviar minha solicitação",
    formSentTitle: "Mensagem enviada",
    formSentText: "Entrarei em contato o mais brevemente possível.",
    footer: "© 2026 ASD — Auxiliar de Enfermagem Domiciliar · Vienne 38200",
    footerLegal: "SIRET 822 971 065 00021 · APE 8810A · 52 Av. Marcellin Berthelot · 38200 Vienne FRANCE",
    footerAI: "Site concebido com a assistência de Claude (Anthropic) · Copilot · Grok · Olivier (Orquestrador)",
    footerAITooltip: "Construção & implementação: Claude — Anthropic · Conceção: Microsoft Copilot · Design: Grok — xAI · Orquestração: Olivier Scafi",
    floatCall: "Ligar",
    cesuBtn: "Pagamento CESU",
    cesuTitle: "O CESU — Cheque Emprego Serviço Universal",
    cesuSub: "Um modo de pagamento simples e vantajoso para os seus familiares",
    cesuWhat: "O que é o CESU?",
    cesuWhatText: "O Cheque Emprego Serviço Universal (CESU) é um dispositivo oficial do Estado francês que permite pagar facilmente os prestadores de serviços ao domicílio. Existe em duas formas: o CESU bancário (cheque clássico) e o CESU pré-financiado (financiado por um empregador, seguro de saúde ou caixa de reforma).",
    cesuHow: "Como me pagar em CESU?",
    cesuHowSteps: [
      "O seu familiar cria um espaço em cesu.urssaf.fr",
      "Declara o pagamento indicando o meu SIRET: 822 971 065 00021",
      "O pagamento é feito por cheque CESU ou transferência CESU",
      "Aplicam-se vantagens fiscais: crédito fiscal de 50% sobre os montantes pagos",
    ],
    cesuAdvantage: "💡 Bom saber",
    cesuAdvantageText: "Com o CESU, os seus familiares podem beneficiar de um crédito fiscal de 50% sobre os montantes pagos — o que reduz concretamente o custo da intervenção.",
    cesuLink: "Aceder ao site oficial CESU",
    cesuClose: "Fechar",
    diplomasBtn: "O meu percurso & diplomas",
    diplomasTitle: "Percurso & diplomas",
    diplomasSub: "Qualificações oficiais de Olivier Scafi",
    diplomas: [
      { icon: "🎓", badge: "DIPLOMA DE ESTADO", title: "Auxiliar de Enfermagem Diplomado pelo Estado", org: "Ministério da Saúde · Região Ródano-Alpes", date: "7 de julho de 2014", num: "N° 0979386", highlight: false },
      { icon: "🚑", badge: "DIPLOMA DE ESTADO", title: "Certificado de Capacidade de Paramédico (DEA)", org: "Ministério da Saúde · Vienne (Isère)", date: "19 de dezembro de 2006", num: "", highlight: false },
      { icon: "⭐", badge: "CERTIFICAÇÃO FORMADOR", title: "Animador — Método Movimentação de Doentes® Paul DOTTE", org: "SIFAM Formations · Hospícios Civis de Lyon", date: "2009", num: "N° 09 027", highlight: true },
      { icon: "🏥", badge: "ATESTADO HCL", title: "Transportes Pediátricos Vetores I e II", org: "Instituto de Formação em Carreiras de Saúde · SAMU 69 · HCL", date: "Junho de 2009", num: "", highlight: false },
      { icon: "♿", badge: "CERTIFICADO", title: "Trabalhar com pessoas com deficiência", org: "Hospícios Civis de Lyon · Edflex — Certificado verificado", date: "4 de julho de 2024", num: "", highlight: false },
    ],
  },
};



const galleryImages = [
  "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80",
  "https://images.unsplash.com/photo-1559757175-7cb036e0d465?w=800&q=80",
  "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80",
  "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
];

const C = {
  deep: "#0d2a48", mid: "#1a5f8a", accent: "#2a9fc4",
  cyan: "#4db8d4", glacier: "#b8d4e8", lavender: "#c8d8f0",
  white: "#f8fbff", textDark: "#0d2a48", textMid: "#4a6480",
};

// ─── WAVE BACKGROUND ──────────────────────────────────────────────────────────
function WaveBg() {
  return (
    <div style={{ position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:0,pointerEvents:"none",background:"linear-gradient(135deg,#dce8f5 0%,#c8d8ee 50%,#e8eef8 100%)" }}>
      <style>{`
        @keyframes wave1 { 0%{transform:translate(0,0)} 50%{transform:translate(-60px,20px)} 100%{transform:translate(0,0)} }
        @keyframes wave2 { 0%{transform:translate(0,0)} 50%{transform:translate(40px,-15px)} 100%{transform:translate(0,0)} }
        @keyframes wave3 { 0%{transform:translate(0,0)} 50%{transform:translate(-30px,10px)} 100%{transform:translate(0,0)} }
        @keyframes wave4 { 0%{transform:translate(0,0) scaleX(1)} 50%{transform:translate(20px,-8px) scaleX(1.05)} 100%{transform:translate(0,0) scaleX(1)} }
        .w1{animation:wave1 13s ease-in-out infinite}
        .w2{animation:wave2 17s ease-in-out infinite}
        .w3{animation:wave3 21s ease-in-out infinite}
        .w4{animation:wave4 25s ease-in-out infinite}
      `}</style>
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style={{width:"100%",height:"100%",position:"absolute"}}>
        <path className="w1" d="M-200,350 C100,150 400,500 750,300 C1050,100 1300,400 1640,200 L1640,0 L-200,0Z" fill="#4db8d4" fillOpacity="0.15"/>
        <path className="w2" d="M-200,520 C100,380 350,640 700,480 C1000,320 1200,560 1640,420 L1640,0 L-200,0Z" fill="#b8d4e8" fillOpacity="0.2"/>
        <path className="w3" d="M-200,680 C200,540 500,780 850,620 C1150,470 1350,700 1640,580 L1640,900 L-200,900Z" fill="#2a9fc4" fillOpacity="0.1"/>
        <path className="w4" d="M-200,800 C150,680 450,880 800,750 C1100,630 1350,820 1640,720 L1640,900 L-200,900Z" fill="#c8d8f0" fillOpacity="0.25"/>
      </svg>
    </div>
  );
}

// ─── ANIMATED LOGO ────────────────────────────────────────────────────────────
function ASDLogo({ size = 1 }) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => { const t = setInterval(() => setPulse(p => !p), 2500); return () => clearInterval(t); }, []);
  const w = 70 * size;
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",transition:"transform 0.8s ease",transform:pulse?"scale(1.05) rotate(1deg)":"scale(1) rotate(0deg)" }}>
      <img src="/logo-asd.jpg" alt="ASD" style={{width:w,height:"auto",objectFit:"contain",filter:"drop-shadow(0 4px 12px rgba(42,159,196,0.3))"}}/>
    </div>
  );
}


// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ lang, setLang, fontSize, setFontSize, t }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll",h); return () => window.removeEventListener("scroll",h); },[]);

  const ids = ["hero","presentation","services","gallery","testimonials","zone","faq","contact"];

  return (
    <>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,padding:"10px 24px",background:scrolled?"rgba(248,251,255,0.95)":"rgba(248,251,255,0.7)",backdropFilter:"blur(20px)",borderBottom:scrolled?"1px solid rgba(74,100,128,0.12)":"1px solid transparent",transition:"all 0.4s",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}} dir="ltr">
        {/* Left logo */}
        <div style={{flex:"0 0 auto"}}><ASDLogo size={0.55}/></div>

        {/* Center burger */}
        <div style={{flex:1,display:"flex",justifyContent:"center"}}>
          <button onClick={() => setMenuOpen(o=>!o)} style={{background:"rgba(255,255,255,0.7)",border:`1.5px solid rgba(42,159,196,0.25)`,borderRadius:12,padding:"8px 16px",cursor:"pointer",display:"flex",flexDirection:"column",gap:4,alignItems:"center",backdropFilter:"blur(8px)"}}>
            {[0,1,2].map(i => <span key={i} style={{display:"block",width:22,height:2,background:C.deep,borderRadius:2,transition:"all 0.3s",transform:menuOpen&&i===0?"rotate(45deg) translate(4px,4px)":menuOpen&&i===2?"rotate(-45deg) translate(4px,-4px)":"none",opacity:menuOpen&&i===1?0:1}}/>)}
          </button>
        </div>

        {/* Right logo */}
        <div style={{flex:"0 0 auto"}}><ASDLogo size={0.55}/></div>

        {/* Controls row */}
        <div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",display:"flex",gap:8,padding:"6px 16px",background:"rgba(248,251,255,0.9)",backdropFilter:"blur(10px)",borderRadius:"0 0 16px 16px",borderBottom:"1px solid rgba(74,100,128,0.1)",borderLeft:"1px solid rgba(74,100,128,0.1)",borderRight:"1px solid rgba(74,100,128,0.1)"}}>
          {["fr","ar","pt"].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{padding:"4px 12px",borderRadius:20,border:lang===l?"2px solid "+C.accent:"2px solid transparent",background:lang===l?"rgba(42,159,196,0.12)":"transparent",color:lang===l?C.accent:C.textMid,fontWeight:700,fontSize:12,fontFamily:"'Montserrat',sans-serif",cursor:"pointer",letterSpacing:1,transition:"all 0.2s"}}>
              {l.toUpperCase()}
            </button>
          ))}
          <div style={{width:1,background:"rgba(74,100,128,0.2)",margin:"0 4px"}}/>
          <button onClick={() => setFontSize(s => Math.min(s+2,22))} style={{padding:"4px 10px",borderRadius:20,border:"1.5px solid rgba(74,100,128,0.2)",background:"transparent",color:C.textMid,fontWeight:700,fontSize:13,cursor:"pointer"}}>A+</button>
          <button onClick={() => setFontSize(s => Math.max(s-2,12))} style={{padding:"4px 10px",borderRadius:20,border:"1.5px solid rgba(74,100,128,0.2)",background:"transparent",color:C.textMid,fontWeight:700,fontSize:11,cursor:"pointer"}}>A−</button>
        </div>
      </nav>

      {/* Dropdown menu */}
      {menuOpen && (
        <div style={{position:"fixed",top:90,left:"50%",transform:"translateX(-50%)",zIndex:199,background:"rgba(248,251,255,0.97)",backdropFilter:"blur(20px)",borderRadius:20,padding:"20px 32px",boxShadow:"0 20px 60px rgba(13,42,72,0.15)",border:"1px solid rgba(77,184,212,0.2)",minWidth:240,textAlign:t.dir==="rtl"?"right":"center"}} dir={t.dir}>
          {t.nav.map((label,i) => (
            <a key={i} href={`#${ids[i]}`} onClick={() => setMenuOpen(false)} style={{display:"block",padding:"12px 0",color:C.deep,textDecoration:"none",fontFamily:"'Raleway',sans-serif",fontWeight:600,fontSize:15,letterSpacing:1,borderBottom:i<t.nav.length-1?"1px solid rgba(74,100,128,0.08)":"none",transition:"color 0.2s"}}
              onMouseEnter={e=>e.target.style.color=C.accent} onMouseLeave={e=>e.target.style.color=C.deep}>
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────
function Sec({ id, children, tinted=false, style={} }) {
  const ref = useRef(); const [vis, setVis] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVis(true); },{threshold:0.1});
    if(ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  },[]);
  return (
    <section id={id} ref={ref} style={{position:"relative",zIndex:1,padding:"110px 40px 80px",background:tinted?"rgba(255,255,255,0.3)":"transparent",backdropFilter:tinted?"blur(4px)":"none",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(40px)",transition:"all 0.8s ease",...style}}>
      <div style={{maxWidth:1100,margin:"0 auto",...style}}>{children}</div>
    </section>
  );
}

function SecTitle({ title, sub, dir }) {
  return (
    <div style={{marginBottom:56,textAlign:"center"}} dir={dir}>
      <h2 style={{fontSize:36,fontWeight:800,color:C.deep,fontFamily:"'Montserrat',sans-serif",margin:"0 0 10px",letterSpacing:0.5}}>{title}</h2>
      {sub && <p style={{color:C.textMid,fontSize:15,fontFamily:"'Raleway',sans-serif",margin:0}}>{sub}</p>}
      <div style={{width:56,height:3,margin:"16px auto 0",background:`linear-gradient(90deg,${C.accent},${C.glacier})`,borderRadius:2}}/>
    </div>
  );
}

// ─── CAROUSEL ─────────────────────────────────────────────────────────────────
function Carousel({ images, labels }) {
  const [cur, setCur] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const len = images.length;
    const t = setInterval(() => { setFade(false); setTimeout(() => { setCur(c => (c+1)%len); setFade(true); },400); },4000);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const go = (dir) => { setFade(false); setTimeout(() => { setCur(c => (c+dir+images.length)%images.length); setFade(true); },300); };
  return (
    <div style={{position:"relative",borderRadius:24,overflow:"hidden",boxShadow:"0 20px 60px rgba(13,42,72,0.15)"}}>
      <div style={{position:"relative",height:480,background:C.glacier}}>
        <img src={images[cur]} alt={labels[cur]} onError={e=>{e.target.src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"}}
          style={{width:"100%",height:"100%",objectFit:"cover",opacity:fade?1:0,transition:"opacity 0.4s ease"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"40px 32px 24px",background:"linear-gradient(to top,rgba(13,42,72,0.7),transparent)"}}>
          <p style={{color:"white",fontFamily:"'Raleway',sans-serif",fontWeight:600,fontSize:16,letterSpacing:1,margin:0,opacity:fade?1:0,transition:"opacity 0.4s ease"}}>{labels[cur]}</p>
        </div>
        <button onClick={() => go(-1)} style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.85)",border:"none",borderRadius:"50%",width:44,height:44,fontSize:18,cursor:"pointer",color:C.deep,backdropFilter:"blur(8px)"}}>‹</button>
        <button onClick={() => go(1)} style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.85)",border:"none",borderRadius:"50%",width:44,height:44,fontSize:18,cursor:"pointer",color:C.deep,backdropFilter:"blur(8px)"}}>›</button>
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:8,padding:"16px",background:"rgba(248,251,255,0.8)"}}>
        {images.map((_,i) => <button key={i} onClick={() => {setFade(false);setTimeout(()=>{setCur(i);setFade(true);},300);}} style={{width:cur===i?24:8,height:8,borderRadius:4,border:"none",background:cur===i?C.accent:C.glacier,cursor:"pointer",transition:"all 0.3s"}}/>)}
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ({ faqs, dir }) {
  const [open, setOpen] = useState(null);
  return (
    <div dir={dir}>
      {faqs.map((item,i) => (
        <div key={i} style={{marginBottom:12,borderRadius:16,overflow:"hidden",border:`1px solid rgba(77,184,212,${open===i?0.3:0.15})`,transition:"all 0.3s"}}>
          <button onClick={() => setOpen(open===i?null:i)} style={{width:"100%",padding:"18px 24px",background:open===i?"rgba(42,159,196,0.08)":"rgba(248,251,255,0.7)",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,textAlign:dir==="rtl"?"right":"left"}}>
            <span style={{fontWeight:700,color:C.deep,fontFamily:"'Raleway',sans-serif",fontSize:15}}>{item.q}</span>
            <span style={{color:C.accent,fontSize:20,transition:"transform 0.3s",transform:open===i?"rotate(45deg)":"none",flexShrink:0}}>+</span>
          </button>
          {open===i && <div style={{padding:"0 24px 18px",background:"rgba(248,251,255,0.5)"}}>
            <p style={{color:C.textMid,fontFamily:"'Raleway',sans-serif",lineHeight:1.8,margin:"0 0 14px",fontSize:14}}>{item.a}</p>
            {item.faqLinks && (
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {item.faqLinks.map((link,li)=>(
                  <a key={li} href={link.url} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 16px",background:"rgba(42,159,196,0.08)",border:"1px solid rgba(42,159,196,0.2)",borderRadius:12,textDecoration:"none",transition:"all 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.background="rgba(42,159,196,0.15)";e.currentTarget.style.borderColor="rgba(42,159,196,0.4)"}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(42,159,196,0.08)";e.currentTarget.style.borderColor="rgba(42,159,196,0.2)"}}>
                    <span style={{fontSize:16,flexShrink:0,marginTop:2}}>🔗</span>
                    <div>
                      <div style={{fontWeight:700,color:C.accent,fontSize:13,fontFamily:"'Montserrat',sans-serif",marginBottom:3}}>{link.label}</div>
                      <div style={{fontSize:12,color:C.textMid,lineHeight:1.5}}>{link.desc}</div>
                    </div>
                    <span style={{color:C.accent,fontSize:14,marginLeft:"auto",flexShrink:0,marginTop:2}}>→</span>
                  </a>
                ))}
              </div>
            )}
          </div>}
        </div>
      ))}
    </div>
  );
}

// ─── CESU MODAL ───────────────────────────────────────────────────────────────
function CesuModal({ t, onClose }) {
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:400,background:"rgba(13,42,72,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"rgba(248,251,255,0.98)",borderRadius:24,padding:"40px 36px",maxWidth:620,width:"100%",maxHeight:"85vh",overflowY:"auto",boxShadow:"0 30px 80px rgba(13,42,72,0.25)",border:"1px solid rgba(77,184,212,0.2)",position:"relative"}} dir={t.dir}>
        <button onClick={onClose} style={{position:"absolute",top:18,right:t.dir==="rtl"?"auto":18,left:t.dir==="rtl"?18:"auto",background:"rgba(42,159,196,0.1)",border:"none",borderRadius:"50%",width:36,height:36,fontSize:18,cursor:"pointer",color:C.deep,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:8,paddingRight:40}}>
          <span style={{fontSize:36}}>🧾</span>
          <div>
            <h2 style={{fontSize:22,fontWeight:800,color:C.deep,fontFamily:"'Montserrat',sans-serif",margin:0}}>{t.cesuTitle}</h2>
            <p style={{color:C.textMid,fontSize:13,margin:0,fontFamily:"'Raleway',sans-serif"}}>{t.cesuSub}</p>
          </div>
        </div>

        <div style={{borderTop:"1px solid rgba(74,100,128,0.1)",paddingTop:24,display:"flex",flexDirection:"column",gap:20}}>

          {/* Qu'est-ce que le CESU */}
          <div>
            <h3 style={{fontSize:15,fontWeight:700,color:C.accent,fontFamily:"'Montserrat',sans-serif",margin:"0 0 10px"}}>{t.cesuWhat}</h3>
            <p style={{fontSize:13,lineHeight:1.8,color:C.textMid,margin:0}}>{t.cesuWhatText}</p>
          </div>

          {/* Comment payer */}
          <div style={{background:"rgba(42,159,196,0.06)",borderRadius:16,padding:"20px 22px",border:"1px solid rgba(42,159,196,0.15)"}}>
            <h3 style={{fontSize:15,fontWeight:700,color:C.deep,fontFamily:"'Montserrat',sans-serif",margin:"0 0 14px"}}>{t.cesuHow}</h3>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {t.cesuHowSteps.map((step,i)=>(
                <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                  <span style={{flexShrink:0,width:24,height:24,borderRadius:"50%",background:`linear-gradient(135deg,${C.accent},#1a6fa0)`,color:"white",fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Montserrat',sans-serif",marginTop:1}}>{i+1}</span>
                  <span style={{fontSize:13,color:C.textMid,lineHeight:1.7}}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Avantage */}
          <div style={{background:"linear-gradient(135deg,rgba(255,193,7,0.1),rgba(255,152,0,0.08))",borderRadius:14,padding:"16px 18px",border:"1px solid rgba(255,193,7,0.3)"}}>
            <div style={{fontWeight:700,color:"#e65100",fontSize:13,fontFamily:"'Montserrat',sans-serif",marginBottom:6}}>{t.cesuAdvantage}</div>
            <p style={{fontSize:13,color:C.textMid,margin:0,lineHeight:1.7}}>{t.cesuAdvantageText}</p>
          </div>

          {/* Boutons */}
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <a href="https://www.cesu.urssaf.fr" target="_blank" rel="noopener noreferrer" style={{flex:1,minWidth:180,padding:"13px 20px",background:`linear-gradient(135deg,${C.accent},#1a6fa0)`,color:"white",borderRadius:50,textDecoration:"none",fontWeight:700,fontSize:12,fontFamily:"'Montserrat',sans-serif",letterSpacing:1,textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              🔗 {t.cesuLink}
            </a>
            <button onClick={onClose} style={{padding:"13px 24px",background:"transparent",border:`2px solid rgba(74,100,128,0.2)`,color:C.textMid,borderRadius:50,fontWeight:700,fontSize:12,fontFamily:"'Montserrat',sans-serif",letterSpacing:1,cursor:"pointer"}}>
              {t.cesuClose}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DIPLOMAS MODAL ───────────────────────────────────────────────────────────
function DiplomasModal({ t, onClose }) {
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:400,background:"rgba(13,42,72,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"rgba(248,251,255,0.98)",borderRadius:24,padding:"40px 36px",maxWidth:680,width:"100%",maxHeight:"85vh",overflowY:"auto",boxShadow:"0 30px 80px rgba(13,42,72,0.25)",border:"1px solid rgba(77,184,212,0.2)",position:"relative"}} dir={t.dir}>
        <button onClick={onClose} style={{position:"absolute",top:18,right:t.dir==="rtl"?"auto":18,left:t.dir==="rtl"?18:"auto",background:"rgba(42,159,196,0.1)",border:"none",borderRadius:"50%",width:36,height:36,fontSize:18,cursor:"pointer",color:C.deep,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        <h2 style={{fontSize:24,fontWeight:800,color:C.deep,fontFamily:"'Montserrat',sans-serif",margin:"0 0 6px",paddingRight:40}}>{t.diplomasTitle}</h2>
        <p style={{color:C.textMid,fontSize:13,margin:"0 0 28px",fontFamily:"'Raleway',sans-serif"}}>{t.diplomasSub}</p>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {t.diplomas.map((d,i)=>(
            <div key={i} style={{display:"flex",gap:16,padding:"18px 20px",borderRadius:16,background:d.highlight?"linear-gradient(135deg,rgba(42,159,196,0.1),rgba(26,111,160,0.08))":"rgba(255,255,255,0.7)",border:d.highlight?"2px solid rgba(42,159,196,0.4)":"1px solid rgba(77,184,212,0.15)",alignItems:"flex-start",boxShadow:d.highlight?"0 4px 20px rgba(42,159,196,0.15)":"0 2px 10px rgba(13,42,72,0.05)"}}>
              <span style={{fontSize:28,flexShrink:0}}>{d.icon}</span>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:5}}>
                  <span style={{fontSize:9,fontWeight:700,letterSpacing:1.5,color:d.highlight?C.accent:C.textMid,fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase",background:d.highlight?"rgba(42,159,196,0.12)":"rgba(74,100,128,0.08)",padding:"2px 8px",borderRadius:20}}>{d.badge}</span>
                  {d.highlight && <span style={{fontSize:9,background:`linear-gradient(135deg,${C.accent},#1a6fa0)`,color:"white",padding:"2px 8px",borderRadius:20,fontWeight:700,fontFamily:"'Montserrat',sans-serif",letterSpacing:1}}>★ FORMATEUR CERTIFIÉ</span>}
                </div>
                <div style={{fontWeight:700,color:C.deep,fontSize:14,fontFamily:"'Montserrat',sans-serif",marginBottom:4,lineHeight:1.4}}>{d.title}</div>
                <div style={{fontSize:12,color:C.textMid,fontFamily:"'Raleway',sans-serif",marginBottom:3}}>{d.org}</div>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <span style={{fontSize:11,color:C.accent,fontWeight:600}}>📅 {d.date}</span>
                  {d.num && <span style={{fontSize:11,color:C.textMid}}>{d.num}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT FORM (EmailJS) ───────────────────────────────────────────────────
function ContactForm({ t }) {
  const [form, setForm] = useState({nom:"",tel:"",email:"",msg:""});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async () => {
    if(!form.nom||!form.msg) return;
    setSending(true);
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          service_id: "service_asd_scafi",
          template_id: "template_asd_contact",
          user_id: "YOUR_EMAILJS_PUBLIC_KEY",
          template_params: {
            from_name: form.nom,
            from_phone: form.tel,
            from_email: form.email,
            message: form.msg,
            to_email: "olivier.scafi@gmail.com",
          }
        })
      });
      if(res.ok) { setSent(true); }
      else { throw new Error(); }
    } catch {
      // Fallback mailto si EmailJS non configuré
      const s = encodeURIComponent(`Demande ASD - ${form.nom}`);
      const b = encodeURIComponent(`Nom: ${form.nom}\nTél: ${form.tel}\nEmail: ${form.email}\n\n${form.msg}`);
      window.location.href = `mailto:olivier.scafi@gmail.com?subject=${s}&body=${b}`;
      setSent(true);
    } finally { setSending(false); }
  };
  const inp = {width:"100%",padding:"13px 16px",borderRadius:12,border:"1.5px solid rgba(74,100,128,0.15)",background:"rgba(248,251,255,0.8)",fontSize:14,fontFamily:"'Raleway',sans-serif",color:C.textDark,outline:"none",boxSizing:"border-box"};
  if(sent) return <div style={{textAlign:"center",padding:"48px 32px",background:"rgba(77,184,212,0.08)",borderRadius:20,border:"1px solid rgba(77,184,212,0.2)"}}>
    <div style={{fontSize:44,marginBottom:12}}>💙</div>
    <p style={{fontSize:18,color:C.deep,fontFamily:"'Montserrat',sans-serif",fontWeight:700,margin:"0 0 8px"}}>{t.formSentTitle}</p>
    <p style={{color:C.textMid,fontFamily:"'Raleway',sans-serif",margin:0}}>{t.formSentText}</p>
  </div>;
  return (
    <div dir={t.dir}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <input placeholder={t.formName} value={form.nom} onChange={e=>setForm({...form,nom:e.target.value})} style={inp}/>
        <input placeholder={t.formPhone} value={form.tel} onChange={e=>setForm({...form,tel:e.target.value})} style={inp}/>
      </div>
      <input placeholder={t.formEmail} value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={{...inp,marginBottom:12}}/>
      <textarea placeholder={t.formMsg} value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} rows={4} style={{...inp,resize:"vertical",marginBottom:20}}/>
      <button onClick={submit} disabled={sending} style={{width:"100%",padding:15,background:sending?`rgba(42,159,196,0.5)`:`linear-gradient(135deg,${C.accent},#1a6fa0)`,color:"white",border:"none",borderRadius:12,fontSize:13,fontWeight:700,letterSpacing:2,fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase",cursor:sending?"not-allowed":"pointer"}}>
        {sending ? "⏳ Envoi..." : t.formBtn}
      </button>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("fr");
  const [fontSize, setFontSize] = useState(16);
  const [heroVis, setHeroVis] = useState(false);
  const [diplomasOpen, setDiplomasOpen] = useState(false);
  const [cesuOpen, setCesuOpen] = useState(false);
  useEffect(() => { setTimeout(() => setHeroVis(true),200); },[]);
  const t = translations[lang];

  return (
    <div style={{minHeight:"100vh",fontFamily:"'Raleway',sans-serif",color:C.textDark}} dir={t.dir}>
      <style>{`
        html { font-size: ${fontSize}px !important; }
        body { font-size: ${fontSize}px !important; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <WaveBg/>
      <Navbar lang={lang} setLang={setLang} fontSize={fontSize} setFontSize={setFontSize} t={t}/>
      {diplomasOpen && <DiplomasModal t={t} onClose={()=>setDiplomasOpen(false)}/>}
      {cesuOpen && <CesuModal t={t} onClose={()=>setCesuOpen(false)}/>}

      {/* HERO */}
      <div id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",zIndex:1,textAlign:"center",padding:"140px 40px 80px",opacity:heroVis?1:0,transform:heroVis?"translateY(0)":"translateY(30px)",transition:"all 1s ease"}}>
        <div style={{marginBottom:36}}><ASDLogo size={1.4}/></div>
        <h1 style={{fontSize:"clamp(22px,3.5vw,44px)",fontWeight:800,color:C.deep,maxWidth:680,lineHeight:1.3,margin:"0 0 18px",fontFamily:"'Montserrat',sans-serif"}}>
          {t.heroTitle}<br/>
          <span style={{background:`linear-gradient(135deg,${C.accent},#1a6fa0)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{t.heroTitleAccent}</span>
        </h1>
        <p style={{fontSize:17,color:C.textMid,maxWidth:480,lineHeight:1.8,margin:"0 0 44px"}}>{t.heroSub}</p>
        <div style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"}}>
          <a href="#contact" style={{padding:"15px 34px",background:`linear-gradient(135deg,${C.accent},#1a6fa0)`,color:"white",textDecoration:"none",borderRadius:50,fontWeight:700,letterSpacing:2,fontSize:13,fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase",boxShadow:`0 8px 30px rgba(42,159,196,0.35)`}}>{t.heroCta1}</a>
          <a href="tel:+33770007335" style={{padding:"15px 34px",background:"rgba(255,255,255,0.75)",color:C.deep,textDecoration:"none",borderRadius:50,fontWeight:700,letterSpacing:2,fontSize:13,fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase",border:`1.5px solid rgba(42,159,196,0.3)`,backdropFilter:"blur(10px)"}}>📞 {t.heroCta2}</a>
          <button onClick={()=>setCesuOpen(true)} style={{padding:"15px 34px",background:"linear-gradient(135deg,#2ecc71,#27ae60)",color:"white",border:"none",borderRadius:50,fontWeight:700,letterSpacing:2,fontSize:13,fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase",cursor:"pointer",boxShadow:"0 8px 30px rgba(46,204,113,0.35)",transition:"transform 0.3s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>🧾 {t.cesuBtn}</button>
        </div>

        {/* Trust bar */}
        <div style={{display:"flex",gap:0,marginTop:60,background:"rgba(255,255,255,0.65)",borderRadius:20,overflow:"hidden",border:"1px solid rgba(77,184,212,0.2)",backdropFilter:"blur(12px)"}}>
          {[{icon:"🏅",label:t.trustExp},{icon:"📅",label:t.trust7},{icon:"📍",label:t.trustZone}].map(({icon,label},i)=>(
            <div key={i} style={{padding:"18px 28px",borderRight:i<2?"1px solid rgba(74,100,128,0.1)":"none",textAlign:"center"}}>
              <div style={{fontSize:22,marginBottom:4}}>{icon}</div>
              <div style={{fontSize:12,fontWeight:700,color:C.deep,fontFamily:"'Montserrat',sans-serif",letterSpacing:0.5}}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRESENTATION */}
      <Sec id="presentation">
        <SecTitle title={t.whoTitle} sub={t.whoSub} dir={t.dir}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:50,alignItems:"center"}} dir={t.dir}>
          <div>
            <p style={{fontSize:16,lineHeight:1.9,color:C.textMid,margin:"0 0 20px"}}>{t.whoText1}</p>
            <p style={{fontSize:16,lineHeight:1.9,color:C.textMid,margin:"0 0 24px"}}>{t.whoText2}</p>
            <button onClick={()=>setDiplomasOpen(true)} style={{display:"inline-flex",alignItems:"center",gap:10,padding:"13px 26px",background:`linear-gradient(135deg,${C.accent},#1a6fa0)`,color:"white",border:"none",borderRadius:50,fontWeight:700,fontSize:13,fontFamily:"'Montserrat',sans-serif",letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer",boxShadow:`0 6px 24px rgba(42,159,196,0.3)`,transition:"transform 0.3s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              🎓 {t.diplomasBtn}
            </button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {t.cards.map((label,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,0.65)",borderRadius:16,padding:"22px 18px",textAlign:"center",border:"1px solid rgba(77,184,212,0.15)",backdropFilter:"blur(10px)",transition:"transform 0.3s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                <div style={{fontSize:26,marginBottom:8}}>{"🏅👤📅📍"[i*2]}{"🏅👤📅📍"[i*2]}</div>
                <div style={{fontWeight:700,color:C.deep,fontSize:13,fontFamily:"'Montserrat',sans-serif"}}>{label}</div>
                <div style={{color:C.textMid,fontSize:11,marginTop:4}}>{t.cardsSub[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      {/* SERVICES */}
      <Sec id="services" tinted>
        <SecTitle title={t.servicesTitle} sub={t.servicesSub} dir={t.dir}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}} dir={t.dir}>
          {["🤲","📋","💙"].map((icon,ci)=>(
            <div key={ci} style={{background:"rgba(248,251,255,0.82)",borderRadius:20,padding:"32px 24px",border:"1px solid rgba(77,184,212,0.18)",backdropFilter:"blur(14px)",boxShadow:"0 4px 24px rgba(13,42,72,0.06)",transition:"transform 0.3s,box-shadow 0.3s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 12px 40px rgba(13,42,72,0.12)"}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 24px rgba(13,42,72,0.06)"}}>
              <div style={{fontSize:32,marginBottom:10}}>{icon}</div>
              <h3 style={{fontSize:16,fontWeight:800,color:C.deep,fontFamily:"'Montserrat',sans-serif",margin:"0 0 18px",paddingBottom:12,borderBottom:`2px solid rgba(77,184,212,0.18)`}}>{t.servicesCats[ci]}</h3>
              <ul style={{listStyle:"none",padding:0,margin:0}}>
                {t.servicesItems[ci].map((item,ii)=>(
                  <li key={ii} style={{padding:"7px 0",borderBottom:"1px solid rgba(74,100,128,0.07)",fontSize:13,color:C.textMid,display:"flex",alignItems:"center",gap:10}}>
                    <span style={{color:C.accent,fontWeight:700}}>—</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Sec>

      {/* GALLERY */}
      <Sec id="gallery">
        <SecTitle title={t.galleryTitle} sub={t.gallerySub} dir={t.dir}/>
        <Carousel images={galleryImages} labels={t.galleryLabels}/>
      </Sec>

      {/* TESTIMONIALS */}
      <Sec id="testimonials" tinted>
        <SecTitle title={t.testiTitle} sub={t.testiSub} dir={t.dir}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}} dir={t.dir}>
          {t.testimonials.map((testi,i)=>(
            <div key={i} style={{background:"rgba(248,251,255,0.82)",borderRadius:20,padding:"32px 24px",border:"1px solid rgba(77,184,212,0.15)",backdropFilter:"blur(12px)",position:"relative"}}>
              <div style={{fontSize:48,color:C.cyan,opacity:0.25,position:"absolute",top:16,left:t.dir==="rtl"?"auto":20,right:t.dir==="rtl"?20:"auto",fontFamily:"Georgia",lineHeight:1}}>"</div>
              <p style={{fontSize:14,lineHeight:1.8,color:C.textMid,margin:"0 0 20px",position:"relative",zIndex:1,fontStyle:"italic"}}>{testi.text}</p>
              <div style={{borderTop:"1px solid rgba(74,100,128,0.1)",paddingTop:14}}>
                <div style={{fontWeight:700,color:C.deep,fontSize:14,fontFamily:"'Montserrat',sans-serif"}}>{testi.name}</div>
                <div style={{color:C.textMid,fontSize:12,marginTop:2}}>{testi.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      {/* ZONE / COMPÉTENCES */}
      <Sec id="zone">
        <SecTitle title={t.zoneTitle} sub={t.zoneSub} dir={t.dir}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16,maxWidth:1000,margin:"0 auto"}} dir={t.dir}>
          {t.zoneItems.map((item,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.65)",borderRadius:16,padding:"20px 22px",border:"1px solid rgba(77,184,212,0.18)",backdropFilter:"blur(10px)",boxShadow:"0 4px 18px rgba(13,42,72,0.06)",display:"flex",alignItems:"flex-start",gap:14,transition:"transform 0.3s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              <span style={{fontSize:22,flexShrink:0,marginTop:2}}>{item.icon}</span>
              <div>
                <span style={{fontWeight:600,color:C.accent,fontSize:13,fontFamily:"'Montserrat',sans-serif",marginRight:6}}>{String.fromCharCode(64+i+1)})</span>
                <span style={{fontSize:13,color:C.textMid,lineHeight:1.6}}>{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      {/* FAQ */}
      <Sec id="faq" tinted>
        <SecTitle title={t.faqTitle} sub={t.faqSub} dir={t.dir}/>
        <div style={{maxWidth:740,margin:"0 auto"}}>
          <FAQ faqs={t.faqs} dir={t.dir}/>
        </div>
      </Sec>

      {/* CONTACT */}
      <Sec id="contact">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16,marginBottom:8}} dir={t.dir}>
          <SecTitle title={t.contactTitle} sub={t.contactSub} dir={t.dir}/>
          <button onClick={()=>setCesuOpen(true)} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 22px",background:"linear-gradient(135deg,#2ecc71,#27ae60)",color:"white",border:"none",borderRadius:50,fontWeight:700,fontSize:12,fontFamily:"'Montserrat',sans-serif",letterSpacing:1.2,textTransform:"uppercase",cursor:"pointer",boxShadow:"0 6px 20px rgba(46,204,113,0.3)",transition:"transform 0.3s",flexShrink:0}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
            🧾 {t.cesuBtn}
          </button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"start"}} dir={t.dir}>
          <div>
            <h3 style={{fontSize:18,fontWeight:800,color:C.deep,fontFamily:"'Montserrat',sans-serif",margin:"0 0 24px"}}>{t.contactDirect}</h3>
            {["📞","✉️","📍","🕐"].map((icon,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 0",borderBottom:"1px solid rgba(74,100,128,0.07)"}}>
                <span style={{fontSize:20}}>{icon}</span>
                <div>
                  <div style={{fontSize:10,letterSpacing:2,color:C.textMid,fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase",marginBottom:2}}>{t.contactLabels[i]}</div>
                  {i<2 ? <a href={i===0?"tel:+33770007335":"mailto:olivier.scafi@gmail.com"} style={{color:C.accent,textDecoration:"none",fontWeight:600,fontSize:14}}>{t.contactValues[i]}</a>
                  : <span style={{color:C.deep,fontWeight:600,fontSize:14}}>{t.contactValues[i]}</span>}
                </div>
              </div>
            ))}
          </div>
          <ContactForm t={t}/>
        </div>
      </Sec>

      {/* BANDEAU IA */}
      <div style={{position:"relative",zIndex:1,borderTop:"1px solid rgba(74,100,128,0.1)",background:"rgba(13,42,72,0.04)",padding:"16px 40px",textAlign:"center"}} dir={t.dir}>
        <div style={{display:"inline-flex",alignItems:"center",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
          <span style={{fontSize:16}}>🤖</span>
          <span style={{fontSize:12,fontWeight:600,color:C.textMid,fontFamily:"'Montserrat',sans-serif",letterSpacing:0.5}}>{t.footerAI}</span>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {[
              {label:"Claude", sub:"Construction & déploiement", color:"#c8521a"},
              {label:"Copilot", sub:"Conception", color:"#0078d4"},
              {label:"Grok", sub:"Design", color:"#1a1a2e"},
              {label:"Olivier", sub:"Orchestrateur", color:"#2a9fc4"},
            ].map((ai,i)=>(
              <span key={i} title={ai.sub} style={{fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20,background:`${ai.color}18`,color:ai.color,border:`1px solid ${ai.color}30`,fontFamily:"'Montserrat',sans-serif",letterSpacing:0.5,cursor:"help"}}>
                {ai.label}{i===3?" · Orchestrateur":""}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{position:"relative",zIndex:1,textAlign:"center",padding:"20px 40px",background:"rgba(248,251,255,0.7)"}} dir={t.dir}>
        <p style={{color:C.textMid,fontSize:13,fontFamily:"'Raleway',sans-serif",margin:"0 0 5px"}}>{t.footer}</p>
        <p style={{color:C.textMid,fontSize:10,fontFamily:"'Raleway',sans-serif",margin:0,opacity:0.65}}>{t.footerLegal}</p>
      </footer>

      {/* FLOATING CALL BUTTON */}
      <a href="tel:+33770007335" style={{position:"fixed",bottom:28,right:28,zIndex:300,background:`linear-gradient(135deg,${C.accent},#1a6fa0)`,color:"white",textDecoration:"none",borderRadius:50,padding:"14px 22px",fontWeight:700,fontSize:13,fontFamily:"'Montserrat',sans-serif",letterSpacing:1.5,boxShadow:"0 8px 30px rgba(42,159,196,0.45)",display:"flex",alignItems:"center",gap:8,transition:"transform 0.3s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px) scale(1.05)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0) scale(1)"}>
        📞 {t.floatCall}
      </a>

      <style>{`html{scroll-behavior:smooth}*{box-sizing:border-box;margin:0;padding:0}@media(max-width:768px){nav{padding:8px 12px!important}}`}</style>
    </div>
  );
}
