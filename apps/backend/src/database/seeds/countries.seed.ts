import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { combinedSchema } from "../schemas/index";
import * as countrySchema from "../schemas/country.schema";

// Charger les variables d'environnement
config();

const countriesData = [
  { code: "AD", nameFr: "Andorre", nameEn: "Andorra" },
  { code: "AE", nameFr: "Emirats arabes unis", nameEn: "United Arab Emirates" },
  { code: "AF", nameFr: "Afghanistan", nameEn: "Afghanistan" },
  { code: "AG", nameFr: "Antigua-et-Barbuda", nameEn: "Antigua and Barbuda" },
  { code: "AL", nameFr: "Albanie", nameEn: "Albania" },
  { code: "AM", nameFr: "Armenie", nameEn: "Armenia" },
  { code: "AO", nameFr: "Angola", nameEn: "Angola" },
  { code: "AR", nameFr: "Argentine", nameEn: "Argentina" },
  { code: "AT", nameFr: "Autriche", nameEn: "Austria" },
  { code: "AU", nameFr: "Australie", nameEn: "Australia" },
  { code: "AZ", nameFr: "Azerbaidjan", nameEn: "Azerbaijan" },
  {
    code: "BA",
    nameFr: "Bosnie-Herzegovine",
    nameEn: "Bosnia and Herzegovina",
  },
  { code: "BB", nameFr: "Barbade", nameEn: "Barbados" },
  { code: "BD", nameFr: "Bangladesh", nameEn: "Bangladesh" },
  { code: "BE", nameFr: "Belgique", nameEn: "Belgium" },
  { code: "BF", nameFr: "Burkina Faso", nameEn: "Burkina Faso" },
  { code: "BG", nameFr: "Bulgarie", nameEn: "Bulgaria" },
  { code: "BH", nameFr: "Bahrein", nameEn: "Bahrain" },
  { code: "BI", nameFr: "Burundi", nameEn: "Burundi" },
  { code: "BJ", nameFr: "Benin", nameEn: "Benin" },
  { code: "BN", nameFr: "Brunei", nameEn: "Brunei" },
  { code: "BO", nameFr: "Bolivie", nameEn: "Bolivia" },
  { code: "BR", nameFr: "Bresil", nameEn: "Brazil" },
  { code: "BS", nameFr: "Bahamas", nameEn: "Bahamas" },
  { code: "BT", nameFr: "Bhoutan", nameEn: "Bhutan" },
  { code: "BW", nameFr: "Botswana", nameEn: "Botswana" },
  { code: "BY", nameFr: "Bielorussie", nameEn: "Belarus" },
  { code: "BZ", nameFr: "Belize", nameEn: "Belize" },
  { code: "CA", nameFr: "Canada", nameEn: "Canada" },
  {
    code: "CD",
    nameFr: "Republique democratique du Congo",
    nameEn: "Democratic Republic of the Congo",
  },
  {
    code: "CF",
    nameFr: "Republique centrafricaine",
    nameEn: "Central African Republic",
  },
  {
    code: "CG",
    nameFr: "Republique du Congo",
    nameEn: "Republic of the Congo",
  },
  { code: "CH", nameFr: "Suisse", nameEn: "Switzerland" },
  { code: "CI", nameFr: "Cote d'Ivoire", nameEn: "Ivory Coast" },
  { code: "CL", nameFr: "Chili", nameEn: "Chile" },
  { code: "CM", nameFr: "Cameroun", nameEn: "Cameroon" },
  { code: "CN", nameFr: "Chine", nameEn: "China" },
  { code: "CO", nameFr: "Colombie", nameEn: "Colombia" },
  { code: "CR", nameFr: "Costa Rica", nameEn: "Costa Rica" },
  { code: "CU", nameFr: "Cuba", nameEn: "Cuba" },
  { code: "CV", nameFr: "Cap-Vert", nameEn: "Cape Verde" },
  { code: "CY", nameFr: "Chypre", nameEn: "Cyprus" },
  { code: "CZ", nameFr: "Republique tcheque", nameEn: "Czech Republic" },
  { code: "DE", nameFr: "Allemagne", nameEn: "Germany" },
  { code: "DJ", nameFr: "Djibouti", nameEn: "Djibouti" },
  { code: "DK", nameFr: "Danemark", nameEn: "Denmark" },
  { code: "DM", nameFr: "Dominique", nameEn: "Dominica" },
  {
    code: "DO",
    nameFr: "Republique dominicaine",
    nameEn: "Dominican Republic",
  },
  { code: "DZ", nameFr: "Algerie", nameEn: "Algeria" },
  { code: "EC", nameFr: "Equateur", nameEn: "Ecuador" },
  { code: "EE", nameFr: "Estonie", nameEn: "Estonia" },
  { code: "EG", nameFr: "Egypte", nameEn: "Egypt" },
  { code: "ER", nameFr: "Erythree", nameEn: "Eritrea" },
  { code: "ES", nameFr: "Espagne", nameEn: "Spain" },
  { code: "ET", nameFr: "Ethiopie", nameEn: "Ethiopia" },
  { code: "FI", nameFr: "Finlande", nameEn: "Finland" },
  { code: "FJ", nameFr: "Fidji", nameEn: "Fiji" },
  { code: "FR", nameFr: "France", nameEn: "France" },
  { code: "GA", nameFr: "Gabon", nameEn: "Gabon" },
  { code: "GB", nameFr: "Royaume-Uni", nameEn: "United Kingdom" },
  { code: "GD", nameFr: "Grenade", nameEn: "Grenada" },
  { code: "GE", nameFr: "Georgie", nameEn: "Georgia" },
  { code: "GH", nameFr: "Ghana", nameEn: "Ghana" },
  { code: "GM", nameFr: "Gambie", nameEn: "Gambia" },
  { code: "GN", nameFr: "Guinee", nameEn: "Guinea" },
  { code: "GQ", nameFr: "Guinee equatoriale", nameEn: "Equatorial Guinea" },
  { code: "GR", nameFr: "Grece", nameEn: "Greece" },
  { code: "GT", nameFr: "Guatemala", nameEn: "Guatemala" },
  { code: "GW", nameFr: "Guinee-Bissau", nameEn: "Guinea-Bissau" },
  { code: "GY", nameFr: "Guyana", nameEn: "Guyana" },
  { code: "HN", nameFr: "Honduras", nameEn: "Honduras" },
  { code: "HR", nameFr: "Croatie", nameEn: "Croatia" },
  { code: "HT", nameFr: "Haiti", nameEn: "Haiti" },
  { code: "HU", nameFr: "Hongrie", nameEn: "Hungary" },
  { code: "ID", nameFr: "Indonesie", nameEn: "Indonesia" },
  { code: "IE", nameFr: "Irlande", nameEn: "Ireland" },
  { code: "IL", nameFr: "Israel", nameEn: "Israel" },
  { code: "IN", nameFr: "Inde", nameEn: "India" },
  { code: "IQ", nameFr: "Irak", nameEn: "Iraq" },
  { code: "IR", nameFr: "Iran", nameEn: "Iran" },
  { code: "IS", nameFr: "Islande", nameEn: "Iceland" },
  { code: "IT", nameFr: "Italie", nameEn: "Italy" },
  { code: "JM", nameFr: "Jamaique", nameEn: "Jamaica" },
  { code: "JO", nameFr: "Jordanie", nameEn: "Jordan" },
  { code: "JP", nameFr: "Japon", nameEn: "Japan" },
  { code: "KE", nameFr: "Kenya", nameEn: "Kenya" },
  { code: "KG", nameFr: "Kirghizistan", nameEn: "Kyrgyzstan" },
  { code: "KH", nameFr: "Cambodge", nameEn: "Cambodia" },
  { code: "KI", nameFr: "Kiribati", nameEn: "Kiribati" },
  { code: "KM", nameFr: "Comores", nameEn: "Comoros" },
  {
    code: "KN",
    nameFr: "Saint-Christophe-et-Nieves",
    nameEn: "Saint Kitts and Nevis",
  },
  { code: "KP", nameFr: "Coree du Nord", nameEn: "North Korea" },
  { code: "KR", nameFr: "Coree du Sud", nameEn: "South Korea" },
  { code: "KW", nameFr: "Koweit", nameEn: "Kuwait" },
  { code: "KZ", nameFr: "Kazakhstan", nameEn: "Kazakhstan" },
  { code: "LA", nameFr: "Laos", nameEn: "Laos" },
  { code: "LB", nameFr: "Liban", nameEn: "Lebanon" },
  { code: "LC", nameFr: "Sainte-Lucie", nameEn: "Saint Lucia" },
  { code: "LI", nameFr: "Liechtenstein", nameEn: "Liechtenstein" },
  { code: "LK", nameFr: "Sri Lanka", nameEn: "Sri Lanka" },
  { code: "LR", nameFr: "Liberia", nameEn: "Liberia" },
  { code: "LS", nameFr: "Lesotho", nameEn: "Lesotho" },
  { code: "LT", nameFr: "Lituanie", nameEn: "Lithuania" },
  { code: "LU", nameFr: "Luxembourg", nameEn: "Luxembourg" },
  { code: "LV", nameFr: "Lettonie", nameEn: "Latvia" },
  { code: "LY", nameFr: "Libye", nameEn: "Libya" },
  { code: "MA", nameFr: "Maroc", nameEn: "Morocco" },
  { code: "MC", nameFr: "Monaco", nameEn: "Monaco" },
  { code: "MD", nameFr: "Moldavie", nameEn: "Moldova" },
  { code: "ME", nameFr: "Montenegro", nameEn: "Montenegro" },
  { code: "MG", nameFr: "Madagascar", nameEn: "Madagascar" },
  { code: "MH", nameFr: "Iles Marshall", nameEn: "Marshall Islands" },
  { code: "MK", nameFr: "Macedoine du Nord", nameEn: "North Macedonia" },
  { code: "ML", nameFr: "Mali", nameEn: "Mali" },
  { code: "MM", nameFr: "Myanmar", nameEn: "Myanmar" },
  { code: "MN", nameFr: "Mongolie", nameEn: "Mongolia" },
  { code: "MR", nameFr: "Mauritanie", nameEn: "Mauritania" },
  { code: "MT", nameFr: "Malte", nameEn: "Malta" },
  { code: "MU", nameFr: "Maurice", nameEn: "Mauritius" },
  { code: "MV", nameFr: "Maldives", nameEn: "Maldives" },
  { code: "MW", nameFr: "Malawi", nameEn: "Malawi" },
  { code: "MX", nameFr: "Mexique", nameEn: "Mexico" },
  { code: "MY", nameFr: "Malaisie", nameEn: "Malaysia" },
  { code: "MZ", nameFr: "Mozambique", nameEn: "Mozambique" },
  { code: "NA", nameFr: "Namibie", nameEn: "Namibia" },
  { code: "NE", nameFr: "Niger", nameEn: "Niger" },
  { code: "NG", nameFr: "Nigeria", nameEn: "Nigeria" },
  { code: "NI", nameFr: "Nicaragua", nameEn: "Nicaragua" },
  { code: "NL", nameFr: "Pays-Bas", nameEn: "Netherlands" },
  { code: "NO", nameFr: "Norvege", nameEn: "Norway" },
  { code: "NP", nameFr: "Nepal", nameEn: "Nepal" },
  { code: "NR", nameFr: "Nauru", nameEn: "Nauru" },
  { code: "NZ", nameFr: "Nouvelle-Zelande", nameEn: "New Zealand" },
  { code: "OM", nameFr: "Oman", nameEn: "Oman" },
  { code: "PA", nameFr: "Panama", nameEn: "Panama" },
  { code: "PE", nameFr: "Perou", nameEn: "Peru" },
  {
    code: "PG",
    nameFr: "Papouasie-Nouvelle-Guinee",
    nameEn: "Papua New Guinea",
  },
  { code: "PH", nameFr: "Philippines", nameEn: "Philippines" },
  { code: "PK", nameFr: "Pakistan", nameEn: "Pakistan" },
  { code: "PL", nameFr: "Pologne", nameEn: "Poland" },
  { code: "PT", nameFr: "Portugal", nameEn: "Portugal" },
  { code: "PW", nameFr: "Palaos", nameEn: "Palau" },
  { code: "PY", nameFr: "Paraguay", nameEn: "Paraguay" },
  { code: "QA", nameFr: "Qatar", nameEn: "Qatar" },
  { code: "RO", nameFr: "Roumanie", nameEn: "Romania" },
  { code: "RS", nameFr: "Serbie", nameEn: "Serbia" },
  { code: "RU", nameFr: "Russie", nameEn: "Russia" },
  { code: "RW", nameFr: "Rwanda", nameEn: "Rwanda" },
  { code: "SA", nameFr: "Arabie saoudite", nameEn: "Saudi Arabia" },
  { code: "SB", nameFr: "Iles Salomon", nameEn: "Solomon Islands" },
  { code: "SC", nameFr: "Seychelles", nameEn: "Seychelles" },
  { code: "SD", nameFr: "Soudan", nameEn: "Sudan" },
  { code: "SE", nameFr: "Suede", nameEn: "Sweden" },
  { code: "SG", nameFr: "Singapour", nameEn: "Singapore" },
  { code: "SI", nameFr: "Slovenie", nameEn: "Slovenia" },
  { code: "SK", nameFr: "Slovaquie", nameEn: "Slovakia" },
  { code: "SL", nameFr: "Sierra Leone", nameEn: "Sierra Leone" },
  { code: "SM", nameFr: "Saint-Marin", nameEn: "San Marino" },
  { code: "SN", nameFr: "Senegal", nameEn: "Senegal" },
  { code: "SO", nameFr: "Somalie", nameEn: "Somalia" },
  { code: "SR", nameFr: "Suriname", nameEn: "Suriname" },
  { code: "SS", nameFr: "Soudan du Sud", nameEn: "South Sudan" },
  {
    code: "ST",
    nameFr: "Sao Tome-et-Principe",
    nameEn: "Sao Tome and Principe",
  },
  { code: "SV", nameFr: "Salvador", nameEn: "El Salvador" },
  { code: "SY", nameFr: "Syrie", nameEn: "Syria" },
  { code: "SZ", nameFr: "Eswatini", nameEn: "Eswatini" },
  { code: "TD", nameFr: "Tchad", nameEn: "Chad" },
  { code: "TG", nameFr: "Togo", nameEn: "Togo" },
  { code: "TH", nameFr: "Thailande", nameEn: "Thailand" },
  { code: "TJ", nameFr: "Tadjikistan", nameEn: "Tajikistan" },
  { code: "TL", nameFr: "Timor oriental", nameEn: "East Timor" },
  { code: "TM", nameFr: "Turkmenistan", nameEn: "Turkmenistan" },
  { code: "TN", nameFr: "Tunisie", nameEn: "Tunisia" },
  { code: "TO", nameFr: "Tonga", nameEn: "Tonga" },
  { code: "TR", nameFr: "Turquie", nameEn: "Turkey" },
  { code: "TT", nameFr: "Trinite-et-Tobago", nameEn: "Trinidad and Tobago" },
  { code: "TV", nameFr: "Tuvalu", nameEn: "Tuvalu" },
  { code: "TW", nameFr: "Taiwan", nameEn: "Taiwan" },
  { code: "TZ", nameFr: "Tanzanie", nameEn: "Tanzania" },
  { code: "UA", nameFr: "Ukraine", nameEn: "Ukraine" },
  { code: "UG", nameFr: "Ouganda", nameEn: "Uganda" },
  { code: "US", nameFr: "Etats-Unis", nameEn: "United States" },
  { code: "UY", nameFr: "Uruguay", nameEn: "Uruguay" },
  { code: "UZ", nameFr: "Ouzbekistan", nameEn: "Uzbekistan" },
  { code: "VA", nameFr: "Vatican", nameEn: "Vatican" },
  {
    code: "VC",
    nameFr: "Saint-Vincent-et-les-Grenadines",
    nameEn: "Saint Vincent and the Grenadines",
  },
  { code: "VE", nameFr: "Venezuela", nameEn: "Venezuela" },
  { code: "VN", nameFr: "Vietnam", nameEn: "Vietnam" },
  { code: "VU", nameFr: "Vanuatu", nameEn: "Vanuatu" },
  { code: "WS", nameFr: "Samoa", nameEn: "Samoa" },
  { code: "YE", nameFr: "Yemen", nameEn: "Yemen" },
  { code: "ZA", nameFr: "Afrique du Sud", nameEn: "South Africa" },
  { code: "ZM", nameFr: "Zambie", nameEn: "Zambia" },
  { code: "ZW", nameFr: "Zimbabwe", nameEn: "Zimbabwe" },
];

async function seedCountries() {
  try {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is required");
    }

    const pool = new Pool({
      connectionString,
    });

    const database = drizzle(pool, {
      schema: combinedSchema,
    });

    console.log("🌍 Debut du seed des pays...");

    await database
      .insert(countrySchema.countries)
      .values(countriesData)
      .onConflictDoNothing();

    console.log(
      `✅ ${countriesData.length} pays ont ete ajoutes avec succes !`
    );

    await pool.end();
  } catch (error) {
    console.error("❌ Erreur lors du seed des pays:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedCountries();
}

export { seedCountries };
