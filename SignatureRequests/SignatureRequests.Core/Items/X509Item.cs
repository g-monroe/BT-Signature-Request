using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Items
{
    public class X509Item
    {
        /// <summary>
        /// This Entity class is for the standards of X09 Certification.
        /// To read more about this standard we can look at the documentation found her:
        /// https://people.eecs.berkeley.edu/~jonah/bc/org/bouncycastle/asn1/x509/X509Name.html
        /// -> cont.
        /// We overall have important information to  communicate to the certification.
        /// This information given is not required and ranges but not limited to:
        /// -> cont.
        /// BUSINESS_CATEGORY(1-128 String) business category, C(2 String) country code
        /// CN(1-64 string) common name, DATE_OF_BIRTH(YYYMMDD000000Z)
        /// EmailAddress(RSA PKCS #9 Extension) or E, GENDER(M, F, m, f string)
        /// INITIALS(string), COUNTRY_OF_RESIDENCE(2 string), CountryOfCitizenship(2 string)
        /// UID(LDAP User id), OIDLookUp(used for deletition), ST(1-64 string) State,
        /// SERIALNUMBER(1-64 String) or SN, T(string) title, O(1-64 string) organization
        ///->
        /// PURPOSE:
        /// The purpose of this class is to overall create a modal that returns the X09Name
        /// standard string for the certification
        /// </summary>

        public enum Country //src: https://gist.github.com/lsancho/6b34fe18e2b1b0169786
        {
            ///<sumary>
            /// Andorra
            ///</sumary>
            AD,
            ///<sumary>
            /// United Arab Emirates
            ///</sumary>
            AE,
            ///<sumary>
            /// Afghanistan
            ///</sumary>
            AF,
            ///<sumary>
            /// Antigua and Barbuda
            ///</sumary>
            AG,
            ///<sumary>
            /// Anguilla
            ///</sumary>
            AI,
            ///<sumary>
            /// Albania
            ///</sumary>
            AL,
            ///<sumary>
            /// Armenia
            ///</sumary>
            AM,
            ///<sumary>
            /// Angola
            ///</sumary>
            AO,
            ///<sumary>
            /// Antarctica
            ///</sumary>
            AQ,
            ///<sumary>
            /// Argentina
            ///</sumary>
            AR,
            ///<sumary>
            /// American Samoa
            ///</sumary>
            AS,
            ///<sumary>
            /// Austria
            ///</sumary>
            AT,
            ///<sumary>
            /// Australia
            ///</sumary>
            AU,
            ///<sumary>
            /// Aruba
            ///</sumary>
            AW,
            ///<sumary>
            /// Åland Islands
            ///</sumary>
            AX,
            ///<sumary>
            /// Azerbaijan
            ///</sumary>
            AZ,
            ///<sumary>
            /// Bosnia and Herzegovina
            ///</sumary>
            BA,
            ///<sumary>
            /// Barbados
            ///</sumary>
            BB,
            ///<sumary>
            /// Bangladesh
            ///</sumary>
            BD,
            ///<sumary>
            /// Belgium
            ///</sumary>
            BE,
            ///<sumary>
            /// Burkina Faso
            ///</sumary>
            BF,
            ///<sumary>
            /// Bulgaria
            ///</sumary>
            BG,
            ///<sumary>
            /// Bahrain
            ///</sumary>
            BH,
            ///<sumary>
            /// Burundi
            ///</sumary>
            BI,
            ///<sumary>
            /// Benin
            ///</sumary>
            BJ,
            ///<sumary>
            /// Saint Barthélemy
            ///</sumary>
            BL,
            ///<sumary>
            /// Bermuda
            ///</sumary>
            BM,
            ///<sumary>
            /// Brunei Darussalam
            ///</sumary>
            BN,
            ///<sumary>
            /// Bolivia, Plurinational State of
            ///</sumary>
            BO,
            ///<sumary>
            /// Bonaire, Sint Eustatius and Saba
            ///</sumary>
            BQ,
            ///<sumary>
            /// Brazil
            ///</sumary>
            BR,
            ///<sumary>
            /// Bahamas
            ///</sumary>
            BS,
            ///<sumary>
            /// Bhutan
            ///</sumary>
            BT,
            ///<sumary>
            /// Bouvet Island
            ///</sumary>
            BV,
            ///<sumary>
            /// Botswana
            ///</sumary>
            BW,
            ///<sumary>
            /// Belarus
            ///</sumary>
            BY,
            ///<sumary>
            /// Belize
            ///</sumary>
            BZ,
            ///<sumary>
            /// Canada
            ///</sumary>
            CA,
            ///<sumary>
            /// Cocos (Keeling) Islands
            ///</sumary>
            CC,
            ///<sumary>
            /// Congo, the Democratic Republic of the
            ///</sumary>
            CD,
            ///<sumary>
            /// Central African Republic
            ///</sumary>
            CF,
            ///<sumary>
            /// Congo
            ///</sumary>
            CG,
            ///<sumary>
            /// Switzerland
            ///</sumary>
            CH,
            ///<sumary>
            /// Côte d'Ivoire
            ///</sumary>
            CI,
            ///<sumary>
            /// Cook Islands
            ///</sumary>
            CK,
            ///<sumary>
            /// Chile
            ///</sumary>
            CL,
            ///<sumary>
            /// Cameroon
            ///</sumary>
            CM,
            ///<sumary>
            /// China
            ///</sumary>
            CN,
            ///<sumary>
            /// Colombia
            ///</sumary>
            CO,
            ///<sumary>
            /// Costa Rica
            ///</sumary>
            CR,
            ///<sumary>
            /// Cuba
            ///</sumary>
            CU,
            ///<sumary>
            /// Cabo Verde
            ///</sumary>
            CV,
            ///<sumary>
            /// Curaçao
            ///</sumary>
            CW,
            ///<sumary>
            /// Christmas Island
            ///</sumary>
            CX,
            ///<sumary>
            /// Cyprus
            ///</sumary>
            CY,
            ///<sumary>
            /// Czech Republic
            ///</sumary>
            CZ,
            ///<sumary>
            /// Germany
            ///</sumary>
            DE,
            ///<sumary>
            /// Djibouti
            ///</sumary>
            DJ,
            ///<sumary>
            /// Denmark
            ///</sumary>
            DK,
            ///<sumary>
            /// Dominica
            ///</sumary>
            DM,
            ///<sumary>
            /// Dominican Republic
            ///</sumary>
            DO,
            ///<sumary>
            /// Algeria
            ///</sumary>
            DZ,
            ///<sumary>
            /// Ecuador
            ///</sumary>
            EC,
            ///<sumary>
            /// Estonia
            ///</sumary>
            EE,
            ///<sumary>
            /// Egypt
            ///</sumary>
            EG,
            ///<sumary>
            /// Western Sahara
            ///</sumary>
            EH,
            ///<sumary>
            /// Eritrea
            ///</sumary>
            ER,
            ///<sumary>
            /// Spain
            ///</sumary>
            ES,
            ///<sumary>
            /// Ethiopia
            ///</sumary>
            ET,
            ///<sumary>
            /// Finland
            ///</sumary>
            FI,
            ///<sumary>
            /// Fiji
            ///</sumary>
            FJ,
            ///<sumary>
            /// Falkland Islands (Malvinas)
            ///</sumary>
            FK,
            ///<sumary>
            /// Micronesia, Federated States of
            ///</sumary>
            FM,
            ///<sumary>
            /// Faroe Islands
            ///</sumary>
            FO,
            ///<sumary>
            /// France
            ///</sumary>
            FR,
            ///<sumary>
            /// Gabon
            ///</sumary>
            GA,
            ///<sumary>
            /// United Kingdom of Great Britain
            ///</sumary>
            GB,
            ///<sumary>
            /// Grenada
            ///</sumary>
            GD,
            ///<sumary>
            /// Georgia
            ///</sumary>
            GE,
            ///<sumary>
            /// French Guiana
            ///</sumary>
            GF,
            ///<sumary>
            /// Guernsey
            ///</sumary>
            GG,
            ///<sumary>
            /// Ghana
            ///</sumary>
            GH,
            ///<sumary>
            /// Gibraltar
            ///</sumary>
            GI,
            ///<sumary>
            /// Greenland
            ///</sumary>
            GL,
            ///<sumary>
            /// Gambia
            ///</sumary>
            GM,
            ///<sumary>
            /// Guinea
            ///</sumary>
            GN,
            ///<sumary>
            /// Guadeloupe
            ///</sumary>
            GP,
            ///<sumary>
            /// Equatorial Guinea
            ///</sumary>
            GQ,
            ///<sumary>
            /// Greece
            ///</sumary>
            GR,
            ///<sumary>
            /// South Georgia and the South Sandwich Islands
            ///</sumary>
            GS,
            ///<sumary>
            /// Guatemala
            ///</sumary>
            GT,
            ///<sumary>
            /// Guam
            ///</sumary>
            GU,
            ///<sumary>
            /// Guinea-Bissau
            ///</sumary>
            GW,
            ///<sumary>
            /// Guyana
            ///</sumary>
            GY,
            ///<sumary>
            /// Hong Kong
            ///</sumary>
            HK,
            ///<sumary>
            /// Heard Island and McDonald Islands
            ///</sumary>
            HM,
            ///<sumary>
            /// Honduras
            ///</sumary>
            HN,
            ///<sumary>
            /// Croatia
            ///</sumary>
            HR,
            ///<sumary>
            /// Haiti
            ///</sumary>
            HT,
            ///<sumary>
            /// Hungary
            ///</sumary>
            HU,
            ///<sumary>
            /// Indonesia
            ///</sumary>
            ID,
            ///<sumary>
            /// Ireland
            ///</sumary>
            IE,
            ///<sumary>
            /// Israel
            ///</sumary>
            IL,
            ///<sumary>
            /// Isle of Man
            ///</sumary>
            IM,
            ///<sumary>
            /// India
            ///</sumary>
            IN,
            ///<sumary>
            /// British Indian Ocean Territory
            ///</sumary>
            IO,
            ///<sumary>
            /// Iraq
            ///</sumary>
            IQ,
            ///<sumary>
            /// Iran, Islamic Republic of
            ///</sumary>
            IR,
            ///<sumary>
            /// Iceland
            ///</sumary>
            IS,
            ///<sumary>
            /// Italy
            ///</sumary>
            IT,
            ///<sumary>
            /// Jersey
            ///</sumary>
            JE,
            ///<sumary>
            /// Jamaica
            ///</sumary>
            JM,
            ///<sumary>
            /// Jordan
            ///</sumary>
            JO,
            ///<sumary>
            /// Japan
            ///</sumary>
            JP,
            ///<sumary>
            /// Kenya
            ///</sumary>
            KE,
            ///<sumary>
            /// Kyrgyzstan
            ///</sumary>
            KG,
            ///<sumary>
            /// Cambodia
            ///</sumary>
            KH,
            ///<sumary>
            /// Kiribati
            ///</sumary>
            KI,
            ///<sumary>
            /// Comoros
            ///</sumary>
            KM,
            ///<sumary>
            /// Saint Kitts and Nevis
            ///</sumary>
            KN,
            ///<sumary>
            /// Korea, Democratic People's Republic of
            ///</sumary>
            KP,
            ///<sumary>
            /// Korea, Republic of
            ///</sumary>
            KR,
            ///<sumary>
            /// Kuwait
            ///</sumary>
            KW,
            ///<sumary>
            /// Cayman Islands
            ///</sumary>
            KY,
            ///<sumary>
            /// Kazakhstan
            ///</sumary>
            KZ,
            ///<sumary>
            /// Lao People's Democratic Republic
            ///</sumary>
            LA,
            ///<sumary>
            /// Lebanon
            ///</sumary>
            LB,
            ///<sumary>
            /// Saint Lucia
            ///</sumary>
            LC,
            ///<sumary>
            /// Liechtenstein
            ///</sumary>
            LI,
            ///<sumary>
            /// Sri Lanka
            ///</sumary>
            LK,
            ///<sumary>
            /// Liberia
            ///</sumary>
            LR,
            ///<sumary>
            /// Lesotho
            ///</sumary>
            LS,
            ///<sumary>
            /// Lithuania
            ///</sumary>
            LT,
            ///<sumary>
            /// Luxembourg
            ///</sumary>
            LU,
            ///<sumary>
            /// Latvia
            ///</sumary>
            LV,
            ///<sumary>
            /// Libya
            ///</sumary>
            LY,
            ///<sumary>
            /// Morocco
            ///</sumary>
            MA,
            ///<sumary>
            /// Monaco
            ///</sumary>
            MC,
            ///<sumary>
            /// Moldova, Republic of
            ///</sumary>
            MD,
            ///<sumary>
            /// Montenegro
            ///</sumary>
            ME,
            ///<sumary>
            /// Saint Martin (French part)
            ///</sumary>
            MF,
            ///<sumary>
            /// Madagascar
            ///</sumary>
            MG,
            ///<sumary>
            /// Marshall Islands
            ///</sumary>
            MH,
            ///<sumary>
            /// Macedonia
            ///</sumary>
            MK,
            ///<sumary>
            /// Mali
            ///</sumary>
            ML,
            ///<sumary>
            /// Myanmar
            ///</sumary>
            MM,
            ///<sumary>
            /// Mongolia
            ///</sumary>
            MN,
            ///<sumary>
            /// Macao
            ///</sumary>
            MO,
            ///<sumary>
            /// Northern Mariana Islands
            ///</sumary>
            MP,
            ///<sumary>
            /// Martinique
            ///</sumary>
            MQ,
            ///<sumary>
            /// Mauritania
            ///</sumary>
            MR,
            ///<sumary>
            /// Montserrat
            ///</sumary>
            MS,
            ///<sumary>
            /// Malta
            ///</sumary>
            MT,
            ///<sumary>
            /// Mauritius
            ///</sumary>
            MU,
            ///<sumary>
            /// Maldives
            ///</sumary>
            MV,
            ///<sumary>
            /// Malawi
            ///</sumary>
            MW,
            ///<sumary>
            /// Mexico
            ///</sumary>
            MX,
            ///<sumary>
            /// Malaysia
            ///</sumary>
            MY,
            ///<sumary>
            /// Mozambique
            ///</sumary>
            MZ,
            ///<sumary>
            /// Namibia
            ///</sumary>
            NA,
            ///<sumary>
            /// New Caledonia
            ///</sumary>
            NC,
            ///<sumary>
            /// Niger
            ///</sumary>
            NE,
            ///<sumary>
            /// Norfolk Island
            ///</sumary>
            NF,
            ///<sumary>
            /// Nigeria
            ///</sumary>
            NG,
            ///<sumary>
            /// Nicaragua
            ///</sumary>
            NI,
            ///<sumary>
            /// Netherlands
            ///</sumary>
            NL,
            ///<sumary>
            /// Norway
            ///</sumary>
            NO,
            ///<sumary>
            /// Nepal
            ///</sumary>
            NP,
            ///<sumary>
            /// Nauru
            ///</sumary>
            NR,
            ///<sumary>
            /// Niue
            ///</sumary>
            NU,
            ///<sumary>
            /// New Zealand
            ///</sumary>
            NZ,
            ///<sumary>
            /// Oman
            ///</sumary>
            OM,
            ///<sumary>
            /// Panama
            ///</sumary>
            PA,
            ///<sumary>
            /// Peru
            ///</sumary>
            PE,
            ///<sumary>
            /// French Polynesia
            ///</sumary>
            PF,
            ///<sumary>
            /// Papua New Guinea
            ///</sumary>
            PG,
            ///<sumary>
            /// Philippines
            ///</sumary>
            PH,
            ///<sumary>
            /// Pakistan
            ///</sumary>
            PK,
            ///<sumary>
            /// Poland
            ///</sumary>
            PL,
            ///<sumary>
            /// Saint Pierre and Miquelon
            ///</sumary>
            PM,
            ///<sumary>
            /// Pitcairn
            ///</sumary>
            PN,
            ///<sumary>
            /// Puerto Rico
            ///</sumary>
            PR,
            ///<sumary>
            /// Palestine, State of
            ///</sumary>
            PS,
            ///<sumary>
            /// Portugal
            ///</sumary>
            PT,
            ///<sumary>
            /// Palau
            ///</sumary>
            PW,
            ///<sumary>
            /// Paraguay
            ///</sumary>
            PY,
            ///<sumary>
            /// Qatar
            ///</sumary>
            QA,
            ///<sumary>
            /// Réunion
            ///</sumary>
            RE,
            ///<sumary>
            /// Romania
            ///</sumary>
            RO,
            ///<sumary>
            /// Serbia
            ///</sumary>
            RS,
            ///<sumary>
            /// Russian Federation
            ///</sumary>
            RU,
            ///<sumary>
            /// Rwanda
            ///</sumary>
            RW,
            ///<sumary>
            /// Saudi Arabia
            ///</sumary>
            SA,
            ///<sumary>
            /// Solomon Islands
            ///</sumary>
            SB,
            ///<sumary>
            /// Seychelles
            ///</sumary>
            SC,
            ///<sumary>
            /// Sudan
            ///</sumary>
            SD,
            ///<sumary>
            /// Sweden
            ///</sumary>
            SE,
            ///<sumary>
            /// Singapore
            ///</sumary>
            SG,
            ///<sumary>
            /// Saint Helena, Ascension and Tristan da Cunha
            ///</sumary>
            SH,
            ///<sumary>
            /// Slovenia
            ///</sumary>
            SI,
            ///<sumary>
            /// Svalbard and Jan Mayen
            ///</sumary>
            SJ,
            ///<sumary>
            /// Slovakia
            ///</sumary>
            SK,
            ///<sumary>
            /// Sierra Leone
            ///</sumary>
            SL,
            ///<sumary>
            /// San Marino
            ///</sumary>
            SM,
            ///<sumary>
            /// Senegal
            ///</sumary>
            SN,
            ///<sumary>
            /// Somalia
            ///</sumary>
            SO,
            ///<sumary>
            /// Suriname
            ///</sumary>
            SR,
            ///<sumary>
            /// South Sudan
            ///</sumary>
            SS,
            ///<sumary>
            /// Sao Tome and Principe
            ///</sumary>
            ST,
            ///<sumary>
            /// El Salvador
            ///</sumary>
            SV,
            ///<sumary>
            /// Sint Maarten (Dutch part)
            ///</sumary>
            SX,
            ///<sumary>
            /// Syrian Arab Republic
            ///</sumary>
            SY,
            ///<sumary>
            /// Swaziland
            ///</sumary>
            SZ,
            ///<sumary>
            /// Turks and Caicos Islands
            ///</sumary>
            TC,
            ///<sumary>
            /// Chad
            ///</sumary>
            TD,
            ///<sumary>
            /// French Southern Territories
            ///</sumary>
            TF,
            ///<sumary>
            /// Togo
            ///</sumary>
            TG,
            ///<sumary>
            /// Thailand
            ///</sumary>
            TH,
            ///<sumary>
            /// Tajikistan
            ///</sumary>
            TJ,
            ///<sumary>
            /// Tokelau
            ///</sumary>
            TK,
            ///<sumary>
            /// Timor-Leste
            ///</sumary>
            TL,
            ///<sumary>
            /// Turkmenistan
            ///</sumary>
            TM,
            ///<sumary>
            /// Tunisia
            ///</sumary>
            TN,
            ///<sumary>
            /// Tonga
            ///</sumary>
            TO,
            ///<sumary>
            /// Turkey
            ///</sumary>
            TR,
            ///<sumary>
            /// Trinidad and Tobago
            ///</sumary>
            TT,
            ///<sumary>
            /// Tuvalu
            ///</sumary>
            TV,
            ///<sumary>
            /// Taiwan, Province of China
            ///</sumary>
            TW,
            ///<sumary>
            /// Tanzania, United Republic of
            ///</sumary>
            TZ,
            ///<sumary>
            /// Ukraine
            ///</sumary>
            UA,
            ///<sumary>
            /// Uganda
            ///</sumary>
            UG,
            ///<sumary>
            /// United States Minor Outlying Islands
            ///</sumary>
            UM,
            ///<sumary>
            /// United States of America
            ///</sumary>
            US,
            ///<sumary>
            /// Uruguay
            ///</sumary>
            UY,
            ///<sumary>
            /// Uzbekistan
            ///</sumary>
            UZ,
            ///<sumary>
            /// Holy See
            ///</sumary>
            VA,
            ///<sumary>
            /// Saint Vincent and the Grenadines
            ///</sumary>
            VC,
            ///<sumary>
            /// Venezuela, Bolivarian Republic of
            ///</sumary>
            VE,
            ///<sumary>
            /// Virgin Islands, British
            ///</sumary>
            VG,
            ///<sumary>
            /// Virgin Islands, U.S.
            ///</sumary>
            VI,
            ///<sumary>
            /// Viet Nam
            ///</sumary>
            VN,
            ///<sumary>
            /// Vanuatu
            ///</sumary>
            VU,
            ///<sumary>
            /// Wallis and Futuna
            ///</sumary>
            WF,
            ///<sumary>
            /// Samoa
            ///</sumary>
            WS,
            ///<sumary>
            /// Yemen
            ///</sumary>
            YE,
            ///<sumary>
            /// Mayotte
            ///</sumary>
            YT,
            ///<sumary>
            /// South Africa
            ///</sumary>
            ZA,
            ///<sumary>
            /// Zambia
            ///</sumary>
            ZM,
            ///<sumary>
            /// Zimbabwe
            ///</sumary>
            ZW
        }
        public Country? CountryOfCitizenship { get; set; } //Country of Citizenship
        public Country? CountryOfResidence { get; set; } //Country of Residence
        public Country? C { get; set; }//Country
        public string CN { get; set; } //Common Name
        public DateTime? DateAtBirth { get; set; } //Date of Birth
        public string E { get; set; } //EmailAddress
        public string Gender { get; set; }//Gender
        public string Initials { get; set; } //Initials
        public string ST { get; set; }//State
        public string SN { get; set; } //Serial Number
        public string T { get; set; } //Title
        public string O { get; set; } //Organization
        public X509Item(Country? country_of_citizenship, Country? country_of_residence , Country? country , string common_name, DateTime? date_of_birth, string email, string gender, string initials, string state, string serialnumber, string title, string organization)
        {
            CountryOfCitizenship = country_of_citizenship;
            CountryOfResidence = country_of_residence;
            C = country;
            CN = common_name;
            DateAtBirth = date_of_birth;
            E = email;
            Gender = gender;
            Initials = initials;
            ST = state;
            SN = serialnumber;
            T = title;
            O = organization;
        }
        public X509Item()
        {

        }
        public string Get()
        {
            string result = "";
            //Country
            result = (C != null) ? result + "C=" + C.ToString() : result;
            //Country of CitizenShip
            result = (CountryOfCitizenship != null) ? result + ", " + "CountryOfCitizenship=" + CountryOfCitizenship.ToString() : result;
            //Country of Residence
            result = (CountryOfResidence != null) ? result + ", " + "CountryOfResidence=" + CountryOfResidence.ToString() : result;
            //CommonName
            result = (CN != null) ? result + ", " + "CN=" + CN.ToString() : result;
            //Date of Birth
            result = (DateAtBirth != null) ? result + ", " + "DateOfBirth=" + String.Format("{0:yyyyMMddHHmmss}", DateAtBirth) : result;
            //Email
            result = (E != null) ? result + ", " + "E=" + E  : result;
            //Gender
            result = (Gender != null) ? result + ", " + "Gender=" + Gender : result;
            //Initials
           result = (Initials != null) ? result + ", " + "Initials=" + Initials : result;
            //State
            result = (ST != null) ? result + ", " + "ST=" + ST : result;
            //Serial Number
           result = (SN != null) ? result + ", " + "SerialNumber=" + SN : result;
            //Title
            result = (T != null) ? result + ", " + "T=" + T : result;
            //Organization
            result = (O != null) ? result + ", " + "O=" + O : result;
            if (result.Length == 0)
            {
                //Return at least something.
                return "C=" + Country.US.ToString();
            }
            return result;
        }
    }
}
