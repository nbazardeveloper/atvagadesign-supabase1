export interface ServiceItem {
  n: string;
  slug: string;
  t: string;
  d: string;
  details: string;
  img: string;
  items: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    n: "01",
    slug: "design-drawings",
    t: "Design Drawings",
    d: "Precise, permit-ready design drawings that communicate your vision clearly to contractors and city reviewers.",
    details: "Our design drawings go far beyond a simple sketch — they are fully dimensioned, annotated construction documents that serve as the backbone of your project. We develop detailed floor plans that capture every room, wall, door, and window with exact measurements, paired with elevation drawings that show how your home will look from the outside. Section views reveal the interior structure in cross-cut detail, giving contractors and engineers the clarity they need to build confidently. Every sheet is prepared to the standard expected by Washington State building departments, so what you receive is a document set ready to move straight into permitting.",
    img: "/images/services/design-drawings.webp",
    items: ["Floor plan layout", "Elevation drawings", "Section views", "Dimension and annotation sets"],
  },
  {
    n: "02",
    slug: "permit-plans",
    t: "Permit Plans",
    d: "Comprehensive permit documentation packages built to Washington State municipal requirements for smooth approval.",
    details: "Navigating the permit process in Washington State means producing a document set that satisfies a layered set of municipal, state, and energy-code requirements. We assemble everything the city needs in one complete package: a site plan showing property boundaries, setbacks, and the proposed structure's footprint; structural notes that address load paths and connection details; energy compliance documentation meeting the current Washington State Energy Code; and zoning compliance sheets that confirm your project aligns with local land-use regulations. The result is a submission that arrives organized, complete, and ready for review — minimizing back-and-forth with the city and keeping your timeline on track.",
    img: "/images/services/permit-plans.webp",
    items: ["Site plans", "Structural notes", "Energy compliance", "Zoning compliance sheets"],
  },
  {
    n: "03",
    slug: "adu-dadu-design",
    t: "ADU / DADU Design",
    d: "Detached and attached accessory dwelling unit design from concept to permit-ready drawings — maximizing your property value.",
    details: "Accessory dwelling units are one of the most effective ways to add value and flexibility to a residential property, and we specialize in making the design and permitting process as smooth as possible. Whether you're planning a brand-new detached backyard cottage, an attached unit above a garage, a full garage conversion, or a basement ADU, we take the project from initial space planning all the way through to a complete permit-ready drawing set. We're familiar with the ADU-specific zoning rules across King and Snohomish counties and design each unit to maximize livable square footage within those constraints — balancing practicality, natural light, and long-term rental or resale appeal.",
    img: "/images/services/daduesign-card.webp",
    items: ["Detached ADU (DADU)", "Attached ADU", "Garage conversions", "Basement ADU conversions"],
  },
  {
    n: "04",
    slug: "additions-remodels",
    t: "Additions & Remodels",
    d: "Full-scope residential additions and interior remodel documentation, coordinated with structural engineers and city codes.",
    details: "Home additions and remodels require careful coordination between architectural design, structural engineering, and city permitting — and we manage all three sides of that relationship on your behalf. For additions, we develop drawings that seamlessly integrate new square footage with your existing home, whether that means a single-room bump-out, a full second-story addition, or an entirely new wing. For remodels, we document kitchen and bathroom transformations, open-concept conversions that require wall removal, and any other interior reconfiguration that needs permit approval. Every set is coordinated with a licensed structural engineer before submission so that the city receives a complete, buildable package the first time.",
    img: "/images/services/additions-remodels.webp",
    items: ["Room additions", "Second-story additions", "Kitchen & bath remodels", "Open-concept conversions"],
  },
  {
    n: "05",
    slug: "interior-layout-planning",
    t: "Interior Layout Planning",
    d: "Functional interior space planning that balances livability, light flow, and code compliance.",
    details: "A well-planned interior is what separates a house that merely looks good from one that genuinely works for the people living in it. We approach interior layout planning by studying how occupants move through a space throughout the day — mapping traffic flow, evaluating natural light at different hours, and identifying friction points in the existing arrangement. From that analysis we develop optimized floor plan options that improve everyday livability: furniture layouts that make rooms feel larger, spatial sequences that improve flow between kitchen, dining, and living areas, and accessibility reviews that ensure the home meets or exceeds code requirements for clearances and maneuvering space. The output is a clear, buildable layout that your contractor can execute with confidence.",
    img: "/images/services/interior-layout-planning.webp",
    items: ["Space planning", "Furniture layout", "Traffic flow analysis", "Accessibility reviews"],
  },
  {
    n: "06",
    slug: "exterior-facade",
    t: "Exterior & Facade Improvements",
    d: "Facade redesign and exterior upgrade documentation to modernize curb appeal with permit-ready drawings.",
    details: "The exterior of your home makes the first impression, and even targeted improvements can dramatically shift how a property reads from the street. We produce permit-ready drawings for a full range of exterior upgrades — from complete facade redesigns that recompose window and door proportions, to targeted changes like replacing dated siding with modern cladding, adding or expanding a covered porch, or reconfiguring a deck. Each project begins with an analysis of the existing conditions and neighborhood context, so the proposed changes feel intentional and coherent rather than cosmetic. All drawings are produced to the detail level required by Washington State building departments, covering materials, dimensions, and connections.",
    img: "/images/services/exterior-facade-Improvements.webp",
    items: ["Facade redesigns", "Window & door changes", "Deck & porch additions", "Siding and cladding updates"],
  },
  {
    n: "07",
    slug: "3d-renderings",
    t: "3D Renderings",
    d: "Photorealistic 3D visualizations that bring your project to life before a single nail is driven.",
    details: "Seeing a project clearly before construction begins changes the quality of every decision that follows. Our 3D rendering service translates your design drawings into photorealistic images that capture materials, lighting, landscaping, and spatial depth with a level of realism that flat drawings simply can't provide. We produce exterior views from the angles that matter most — street approach, backyard, and key corners — as well as interior renders that show how rooms will feel with natural light at different times of day. For clients who want to go further, we offer 360° virtual tours that let you walk through the space interactively, and before/after comparison sets that communicate the scope of a remodel or addition to contractors, lenders, or planning committees.",
    img: "/images/services/3D-renderings.webp",
    items: ["Exterior 3D views", "Interior renders", "360° virtual tours", "Before/after comparisons"],
  },
  {
    n: "08",
    slug: "city-permit-submittals",
    t: "City Permit Submittals",
    d: "End-to-end permit submission management — we prepare, submit, track, and correct until approval is issued.",
    details: "Submitting a permit application is not the end of a process — it's often the beginning of a back-and-forth that can stretch a project timeline by weeks or months if not managed carefully. We handle the entire submission lifecycle: preparing the application package for the appropriate submission channel (online portal or over-the-counter), monitoring the review queue, and responding promptly to any correction requests or reviewer comments with revised documents. Our familiarity with the specific requirements and reviewer expectations across Seattle, Bellevue, Kirkland, Redmond, and surrounding jurisdictions means fewer correction cycles and faster approvals. We stay on the permit until approval is in hand — you don't have to chase city portals or decode correction letters.",
    img: "/images/services/city-permit-submittals.webp",
    items: ["Online portal submissions", "Over-the-counter submittals", "Correction response packages", "Permit tracking"],
  },
  {
    n: "09",
    slug: "engineering-coordination",
    t: "Engineering Coordination",
    d: "Seamless coordination with licensed structural, geotechnical, and MEP engineers to complete your drawing set.",
    details: "Most residential permits in Washington State require engineering input beyond what an architectural drawing set alone can provide — and managing that relationship poorly is one of the most common causes of project delays. We act as the central point of coordination between your project and the licensed engineers it requires: structural engineers who design beams, posts, and lateral systems; geotechnical engineers when the site or project type requires a soils report; and MEP (mechanical, electrical, plumbing) consultants when scope demands it. We also handle SEPA documentation for projects that trigger State Environmental Policy Act review. Every discipline is integrated into a single, consistent drawing set before submission — so the city receives one coherent package rather than disconnected reports from separate consultants.",
    img: "/images/services/coordination-engineers.webp",
    items: ["Structural engineering liaison", "Geotechnical reports", "MEP coordination", "SEPA documentation"],
  },
];
