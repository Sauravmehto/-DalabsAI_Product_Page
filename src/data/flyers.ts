export type Flyer = {
  slug: string;
  label: string;
  description: string;
  file: string;
  thumbnail: string;
};

export const flyers: Flyer[] = [
  {
    slug: "overview",
    label: "DA One Overview",
    description: "The complete introduction to the DA One platform.",
    file: "/flyer/FINAL_Flyer_Darker.pdf",
    thumbnail: "/flyer/thumbs/final.webp",
  },
  {
    slug: "ecommerce",
    label: "Ecommerce",
    description: "How DA One helps ecommerce teams connect commerce, marketing and finance data.",
    file: "/flyer/ECOMMERCE_Flyer_Darker.pdf",
    thumbnail: "/flyer/thumbs/ecommerce.webp",
  },
  {
    slug: "fintech",
    label: "Fintech",
    description: "How DA One unifies lending, risk and finance data for faster decisions.",
    file: "/flyer/FINTECH_Flyer_Darker.pdf",
    thumbnail: "/flyer/thumbs/fintech.webp",
  },
  {
    slug: "payments",
    label: "Payments",
    description: "How DA One connects transaction, fraud and settlement data.",
    file: "/flyer/PAYMENTS_Flyer_Darker.pdf",
    thumbnail: "/flyer/thumbs/payments.webp",
  },
  {
    slug: "retail",
    label: "Retail",
    description: "How DA One unifies POS, inventory and finance data for retailers.",
    file: "/flyer/RETAIL_Flyer_Darker.pdf",
    thumbnail: "/flyer/thumbs/retail.webp",
  },
  {
    slug: "hospitality",
    label: "Hospitality",
    description: "How DA One connects property, guest and operational data.",
    file: "/flyer/HOSPITALITY_Flyer_Darker.pdf",
    thumbnail: "/flyer/thumbs/hospitality.webp",
  },
  {
    slug: "logistics",
    label: "Logistics",
    description: "How DA One connects operational, carrier and finance data for logistics teams.",
    file: "/flyer/LOGISTICS_Flyer_Darker.pdf",
    thumbnail: "/flyer/thumbs/logistics.webp",
  },
];
