export type CaseStudy = {
  slug: string;
  industry: string;
  title: string;
  summary: string;
  image: string;
  datasetImage: string;
  pdf?: string;
  cardMetrics: { value: string; label: string }[];
  metrics: { value: string; label: string }[];
  executiveAsk: string;
  sections: { heading: string; body: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ecommerce",
    industry: "Ecommerce",
    title: "Turning Fragmented Commerce Data into Profitable Growth",
    summary:
      "A UAE-based omnichannel ecommerce company used DA One to connect commerce, marketing, operations and finance data so management could identify where GMV growth was eroding contribution margin.",
    image: "/use-cases/ecommerceaii.png",
    datasetImage: "/use-cases/ecommerceaii.png",
    pdf: "/flyer/pdf/ECOMMERCE_Flyer_Darker.pdf",
    cardMetrics: [
      { value: "AED 420M", label: "Annual GMV" },
      { value: "18%", label: "YoY GMV growth" },
    ],
    metrics: [
      { value: "AED 420M", label: "Annual GMV" },
      { value: "18%", label: "YoY GMV growth" },
      { value: "11.8% → 9.6%", label: "Contribution margin" },
      { value: "40 hrs → 4 hrs", label: "Reporting cycle" },
    ],
    executiveAsk:
      "Which categories are growing GMV but reducing contribution margin after discounts, marketing spend, returns, payment fees and fulfillment costs?",
    sections: [
      {
        heading: "The operating context",
        body: "A UAE-based omnichannel ecommerce company generating approximately AED 420M in annual GMV across the GCC was struggling to reconcile data across ecommerce platforms, marketplaces, CRM, marketing channels, OMS/WMS, payment gateways and ERP systems.",
      },
      {
        heading: "The challenge",
        body: "Management could see GMV growing 18% YoY, yet contribution margin had fallen from 11.8% to 9.6%. The problem was not lack of data — it was the time required to connect, validate and interpret it.",
      },
      {
        heading: "How DA One connected the decision layer",
        body: "With DA One, these fragmented sources were connected into one customized Data, Analytics and Reporting layer. The analysis identified that three category/channel combinations accounted for 68% of margin deterioration, while acquisition costs had increased 21% and return rates in one category had risen from 17% to 24%.",
      },
      {
        heading: "Reporting efficiency",
        body: "A reporting exercise that previously required approximately 40 hours of extraction, reconciliation, analysis and preparation was reduced to approximately 4 hours — a 10× improvement in reporting efficiency.",
      },
      {
        heading: "Modeled outcomes",
        body: "Modeled actions helped improve priority-SKU availability from 91% to 96%, identify approximately AED 1.4M in annual leakage, and support contribution-margin recovery toward 11.1%.",
      },
    ],
  },
  {
    slug: "fintech",
    industry: "Fintech",
    title: "Turning Fragmented Lending & Customer Data into Faster, Risk-Aware Decisions",
    summary:
      "A UAE-based digital lending and embedded-finance company used DA One to unify lending, risk, collections, fraud, CRM and finance data for faster, risk-aware management decisions.",
    image: "/use-cases/fintechaii.png",
    datasetImage: "/use-cases/fintechaii.png",
    pdf: "/flyer/pdf/FINTECH_Flyer_Darker.pdf",
    cardMetrics: [
      { value: "41% → 47%", label: "Approval rate" },
      { value: "5.8% → 7.1%", label: "30+ DPD delinquency" },
    ],
    metrics: [
      { value: "41% → 47%", label: "Approval rate" },
      { value: "5.8% → 7.1%", label: "30+ DPD delinquency" },
      { value: "14.2% → 11.9%", label: "Contribution margin" },
      { value: "40 hrs → 4 hrs", label: "Reporting cycle" },
    ],
    executiveAsk:
      "Which products and customer cohorts are driving disbursement growth but weakening risk-adjusted profitability after credit losses, collections cost, CAC and funding cost?",
    sections: [
      {
        heading: "The operating context",
        body: "A UAE-based digital lending and embedded-finance company serving consumers, SMEs and merchants across the GCC was managing growth across multiple systems for applications, KYC, credit decisioning, loan servicing, collections, CRM, fraud monitoring and finance.",
      },
      {
        heading: "The challenge",
        body: "Customer acquisition and disbursement volumes were growing, but management struggled to see the full economics of that growth. Approval rates had increased from 41% to 47%, while 30+ DPD delinquency rose from 5.8% to 7.1% and contribution margin fell from 14.2% to 11.9%.",
      },
      {
        heading: "How DA One connected the decision layer",
        body: "With DA One, fragmented lending, risk, collections, fraud, CRM and finance data was unified into one customized Data, Analytics and Reporting layer. The analysis showed that two customer cohorts accounted for 61% of the rise in delinquency, while acquisition cost had increased 19% and collections effectiveness had weakened in specific risk bands.",
      },
      {
        heading: "Reporting efficiency",
        body: "A management-reporting process that previously required approximately 40 hours of extraction, reconciliation, risk analysis and preparation was reduced to approximately 4 hours — a 10× improvement in reporting efficiency.",
      },
      {
        heading: "Modeled outcomes",
        body: "Modeled actions helped improve collections effectiveness by 8 percentage points, reduce avoidable credit-loss leakage by approximately AED 1.8M annually, and support contribution-margin recovery toward 13.4%.",
      },
    ],
  },
  {
    slug: "payments",
    industry: "Payments",
    title: "Turning Fragmented Transaction Data into Margin, Risk & Reliability Intelligence",
    summary:
      "A UAE-based payment service provider used DA One to connect transaction, merchant, fraud, settlement and finance data and surface where TPV growth was weakening net margin.",
    image: "/use-cases/paymentsaii.png",
    datasetImage: "/use-cases/paymentsaii.png",
    pdf: "/flyer/pdf/PAYMENTS_Flyer_Darker.pdf",
    cardMetrics: [
      { value: "AED 9.5B", label: "Annual TPV" },
      { value: "24%", label: "YoY TPV growth" },
    ],
    metrics: [
      { value: "AED 9.5B", label: "Annual TPV" },
      { value: "24%", label: "YoY TPV growth" },
      { value: "91.8% → 94.1%", label: "Payment success" },
      { value: "40 hrs → 4 hrs", label: "Reporting cycle" },
    ],
    executiveAsk:
      "Which merchants, payment methods and routing paths are growing TPV but reducing net margin after processing fees, fraud, chargebacks, refunds and settlement costs?",
    sections: [
      {
        heading: "The operating context",
        body: "A UAE-based payment service provider processing approximately AED 9.5B in annual TPV across retail, ecommerce, hospitality and digital merchants was operating across gateways, acquirers, fraud systems, merchant platforms, settlement files, CRM and finance systems.",
      },
      {
        heading: "The challenge",
        body: "TPV was growing 24% YoY, yet net revenue growth lagged at 11%. Payment success had improved from 91.8% to 94.1%, but fraud losses, chargebacks, routing costs and settlement exceptions were eroding profitability.",
      },
      {
        heading: "How DA One connected the decision layer",
        body: "With DA One, transaction, merchant, fraud, settlement and finance data was unified into one customized Data, Analytics and Reporting layer. The analysis identified that four merchant/payment combinations accounted for 64% of margin leakage, while chargeback costs had risen 18% and one routing path was generating higher approval rates but materially higher processing costs.",
      },
      {
        heading: "Reporting efficiency",
        body: "A reporting process that previously required approximately 40 hours of extraction, reconciliation and analysis was reduced to approximately 4 hours — a 10× improvement in reporting efficiency.",
      },
      {
        heading: "Modeled outcomes",
        body: "Modeled actions helped improve routing economics, reduce settlement exceptions by 32%, lower fraud-and-chargeback leakage by approximately AED 2.1M annually, and support gross-margin improvement from 18.6% to 20.1%.",
      },
    ],
  },
  {
    slug: "retail",
    industry: "Retail",
    title: "Turning Disconnected Store & Inventory Data into Profitable Growth",
    summary:
      "A UAE-based omnichannel retailer used DA One to unify POS, inventory, loyalty, workforce, ecommerce and finance data and identify the store-category combinations driving margin deterioration.",
    image: "/use-cases/retailaii.png",
    datasetImage: "/use-cases/retailaii.png",
    pdf: "/flyer/pdf/RETAIL_Flyer_Darker.pdf",
    cardMetrics: [
      { value: "12%", label: "YoY sales growth" },
      { value: "36.4% → 33.9%", label: "Gross margin" },
    ],
    metrics: [
      { value: "12%", label: "YoY sales growth" },
      { value: "36.4% → 33.9%", label: "Gross margin" },
      { value: "91% → 96%", label: "Priority-SKU availability" },
      { value: "40 hrs → 4 hrs", label: "Reporting cycle" },
    ],
    executiveAsk:
      "Which stores and categories are growing sales but destroying margin because of markdowns, stockouts, shrinkage, labor cost and poor inventory productivity?",
    sections: [
      {
        heading: "The operating context",
        body: "A UAE-based omnichannel retailer operating across malls, high-street locations and ecommerce channels was managing sales, inventory, POS, loyalty, workforce, merchandising, CRM and finance data across multiple disconnected systems.",
      },
      {
        heading: "The challenge",
        body: "Sales were growing 12% YoY, but management could not clearly explain why gross margin had declined from 36.4% to 33.9%. Footfall was up, yet conversion was uneven across stores, markdowns were rising, and stockouts were hurting high-demand categories.",
      },
      {
        heading: "How DA One connected the decision layer",
        body: "With DA One, POS, inventory, CRM, workforce, ecommerce and finance data was unified into one customized Data, Analytics and Reporting layer. The analysis revealed that five store-category combinations accounted for 66% of the margin deterioration, while markdown rates had increased 14% and stockout exposure in priority SKUs had reached 9%.",
      },
      {
        heading: "Reporting efficiency",
        body: "A reporting process that previously required approximately 40 hours of extraction, reconciliation and analysis was reduced to approximately 4 hours — a 10× improvement in reporting efficiency.",
      },
      {
        heading: "Modeled outcomes",
        body: "Modeled actions helped improve priority-SKU availability from 91% to 96%, reduce markdown leakage by approximately AED 1.6M annually, improve GMROI by 11%, and support gross-margin recovery toward 35.2%.",
      },
    ],
  },
  {
    slug: "hospitality",
    industry: "Hospitality",
    title: "Turning Fragmented Property & Guest Data into Profitable Performance",
    summary:
      "A UAE-based hospitality group used DA One to unify property, channel, guest, operational and finance data so management could see the full profitability impact of occupancy, channel mix and operating costs.",
    image: "/use-cases/hospitalityaii.png",
    datasetImage: "/use-cases/hospitalityaii.png",
    pdf: "/flyer/pdf/HOSPITALITY_Flyer_Darker.pdf",
    cardMetrics: [
      { value: "74% → 79%", label: "Occupancy" },
      { value: "31.6% → 28.9%", label: "GOP margin" },
    ],
    metrics: [
      { value: "74% → 79%", label: "Occupancy" },
      { value: "31.6% → 28.9%", label: "GOP margin" },
      { value: "9%", label: "Labor productivity improvement" },
      { value: "40 hrs → 4 hrs", label: "Reporting cycle" },
    ],
    executiveAsk:
      "Which properties and channels are growing revenue but reducing profitability after distribution costs, labor, F&B performance and operating expenses?",
    sections: [
      {
        heading: "The operating context",
        body: "A UAE-based hospitality group operating multiple upscale hotels across the GCC was managing revenue, reservations, distribution, F&B, MICE, guest experience, workforce and finance data across PMS, CRS, channel managers, POS, CRM and ERP systems.",
      },
      {
        heading: "The challenge",
        body: "Occupancy had improved from 74% to 79%, yet GOP margin declined from 31.6% to 28.9%. Management could see stronger room revenue, but not the full impact of OTA commissions, labor cost, F&B profitability, channel mix and operating expenses across properties.",
      },
      {
        heading: "How DA One connected the decision layer",
        body: "With DA One, property, channel, guest, operational and finance data was unified into one customized Data, Analytics and Reporting layer. The analysis showed that three properties accounted for 63% of the GOP-margin deterioration, while OTA contribution had increased 17%, labor cost per occupied room had risen 12%, and one property's F&B margin had fallen materially despite higher revenue.",
      },
      {
        heading: "Reporting efficiency",
        body: "A reporting process that previously required approximately 40 hours of extraction, reconciliation and analysis was reduced to approximately 4 hours — a 10× improvement in reporting efficiency.",
      },
      {
        heading: "Modeled outcomes",
        body: "Modeled actions helped shift demand toward higher-margin direct channels, improve labor productivity by 9%, identify approximately AED 1.3M in annual cost leakage, and support GOP-margin recovery toward 30.7%.",
      },
    ],
  },
  {
    slug: "logistics",
    industry: "Logistics",
    title: "Turning Fragmented Shipment Data into Margin & Service Intelligence",
    summary:
      "A UAE-based freight forwarder and 3PL used DA One to connect operational, commercial, carrier and finance data and expose where shipment growth was weakening margin and service performance.",
    image: "/use-cases/logisticsaii.png",
    datasetImage: "/use-cases/logisticsaii.png",
    pdf: "/flyer/pdf/LOGISTICS_Flyer_Darker.pdf",
    cardMetrics: [
      { value: "16%", label: "YoY shipment growth" },
      { value: "24.8% → 21.9%", label: "GP margin" },
    ],
    metrics: [
      { value: "16%", label: "YoY shipment growth" },
      { value: "24.8% → 21.9%", label: "GP margin" },
      { value: "92.4% → 95.1%", label: "OTIF" },
      { value: "40 hrs → 4 hrs", label: "Reporting cycle" },
    ],
    executiveAsk:
      "Which customers, trade lanes and freight modes are growing revenue but reducing profitability after carrier costs, D&D, exceptions and cost-to-serve are included?",
    sections: [
      {
        heading: "The operating context",
        body: "A UAE-based freight forwarder and 3PL operating across the GCC was managing air, ocean, road and multimodal shipments across TMS, WMS, carrier portals, customs systems, CRM, finance platforms and Excel-based operational reports.",
      },
      {
        heading: "The challenge",
        body: "Shipment volumes had increased 16% YoY, yet gross profit margin declined from 24.8% to 21.9%. Management could see higher revenue, but not the true impact of carrier buy-rate increases, demurrage and detention, service exceptions, accessorial costs and lane-level cost-to-serve.",
      },
      {
        heading: "How DA One connected the decision layer",
        body: "With DA One, operational, commercial, carrier and finance data was unified into one customized Data, Analytics and Reporting layer. The analysis identified that four trade-lane/customer combinations accounted for 67% of the margin deterioration, while carrier costs had risen 13%, D&D expenses increased 28%, and one high-volume ocean corridor was consistently missing OTIF targets.",
      },
      {
        heading: "Reporting efficiency",
        body: "A reporting process that previously required approximately 40 hours of extraction, reconciliation and analysis was reduced to approximately 4 hours — a 10× improvement in reporting efficiency.",
      },
      {
        heading: "Modeled outcomes",
        body: "Modeled actions helped reduce avoidable D&D by 31%, improve OTIF from 92.4% to 95.1%, identify approximately AED 1.7M in annual margin leakage, and support GP-margin recovery toward 23.6%.",
      },
    ],
  },
  {
    slug: "real-estate",
    industry: "Real Estate",
    title: "Turning Fragmented Property & Investment Data into Portfolio-Level Performance Intelligence",
    summary:
      "A UAE-based real estate investment and operating platform used DA One to unify property, leasing, valuation, debt and finance data and identify which assets were actually creating economic value.",
    image: "/use-cases/RealEstate_Datasetai.png",
    datasetImage: "/use-cases/RealEstate_Datasetai.png",
     pdf: "/flyer/pdf/RealEstate_Flyer.pdf",
    cardMetrics: [
      { value: "86% → 90%", label: "Portfolio occupancy" },
      { value: "60.8% → 56.9%", label: "Portfolio NOI margin" },
    ],
    metrics: [
      { value: "AED 7.2B", label: "Gross asset value" },
      { value: "86% → 90%", label: "Portfolio occupancy" },
      { value: "60.8% → 56.9%", label: "Portfolio NOI margin" },
      { value: "40 hrs → 4 hrs", label: "Reporting cycle" },
    ],
    executiveAsk:
      "Which assets are growing revenue but reducing NOI and risk-adjusted returns after concessions, operating expenses, CapEx, financing costs and vacancy risk are considered?",
    sections: [
      {
        heading: "The operating context",
        body: "A UAE-based real estate investment and operating platform managing approximately AED 7.2B in gross asset value across residential, office, retail, hospitality and mixed-use assets in the GCC was managing property operations, leasing, valuations, debt, CapEx, facilities and finance data across multiple disconnected systems.",
      },
      {
        heading: "The challenge",
        body: "Portfolio occupancy had improved from 86% to 90% and property revenue was growing 14% YoY, yet portfolio NOI margin had declined from 60.8% to 56.9%. At the same time, asset-level return expectations were coming under pressure as operating expenses, financing costs and unplanned CapEx increased. Management could see revenue growth — but not consistently determine which assets were actually creating economic value.",
      },
      {
        heading: "How DA One connected the decision layer",
        body: "With DA One, property-management, leasing, valuation, CapEx, debt, operating and finance data was unified into one customized Data, Analytics and Reporting layer. The analysis showed that four assets accounted for 71% of the portfolio's NOI-margin deterioration, while controllable operating expenses had increased 16%, CapEx exceeded plan by 23% across two assets, and financing costs had risen disproportionately within one asset cluster.",
      },
      {
        heading: "Reporting efficiency",
        body: "A portfolio-reporting process that previously required approximately 40 hours of extraction, reconciliation, asset-level analysis and preparation was reduced to approximately 4 hours — a 10× improvement in reporting efficiency.",
      },
      {
        heading: "Modeled outcomes",
        body: "Modeled actions helped identify approximately AED 2.4M in annual controllable cost leakage, prioritize CapEx toward higher-return assets, support portfolio NOI-margin recovery toward 59.8%, and improve projected IRR for underperforming assets toward 12.0%.",
      },
    ],
  },
  {
    slug: "asset-management",
    industry: "Asset Management",
    title: "Turning Fragmented Fund, Portfolio & Investor Data into Decision-Ready Investment Intelligence",
    summary:
      "A UAE-based alternative asset manager used DA One to unify portfolio, valuation, exposure, investor and risk data and identify which funds were increasing concentration and reporting risk.",
    image: "/use-cases/AlternativeAssets_Datasetai.png",
    datasetImage: "/use-cases/AlternativeAssets_Datasetai.png",
    pdf: "/flyer/pdf/AssetManagement_Flyer.pdf",
    cardMetrics: [
      { value: "AED 12B", label: "Assets under management" },
      { value: "31% → 37%", label: "Top-10 concentration" },
    ],
    metrics: [
      { value: "AED 12B", label: "Assets under management" },
      { value: "23%", label: "YoY AUM growth" },
      { value: "31% → 37%", label: "Top-10 concentration" },
      { value: "40 hrs → 4 hrs", label: "Reporting cycle" },
    ],
    executiveAsk:
      "Which funds and strategies are generating returns, but increasing concentration, liquidity or reporting risk once exposures, valuation timing, leverage and cash requirements are considered?",
    sections: [
      {
        heading: "The operating context",
        body: "A UAE-based alternative asset manager overseeing approximately AED 12B in AUM across Private Credit, Private Equity and Real Assets was managing portfolio, valuation, exposure, investor, accounting and risk data across fund administrators, custodians, portfolio systems, internal databases and spreadsheets.",
      },
      {
        heading: "The challenge",
        body: "AUM had increased 23% YoY, while the number of funds and investment vehicles had expanded from 7 to 10. Investment performance remained healthy, but management visibility was becoming more difficult as portfolio complexity increased. Top-10 portfolio concentration had risen from 31% to 37%, and investment, risk and investor-reporting teams were frequently reconciling different versions of the same exposure and performance data.",
      },
      {
        heading: "How DA One connected the decision layer",
        body: "With DA One, portfolio, fund-administration, valuation, accounting, investor and risk data was unified into one customized Data, Analytics and Reporting layer. The analysis showed that three funds accounted for 68% of the increase in portfolio concentration, while approximately 14% of portfolio and valuation records required recurring manual reconciliation, and liquidity visibility differed materially across two investment strategies.",
      },
      {
        heading: "Reporting efficiency",
        body: "A management and investor-reporting process that previously required approximately 40 hours of extraction, reconciliation, validation and analysis was reduced to approximately 4 hours — a 10× improvement in reporting efficiency.",
      },
      {
        heading: "Modeled outcomes",
        body: "Modeled actions helped reduce reporting and reconciliation exceptions by approximately 60%, identify approximately AED 1.5M in annual operational-efficiency opportunity, improve same-day visibility across the investment portfolio, and support reduction of top-10 concentration toward 33% while preserving portfolio return objectives.",
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
