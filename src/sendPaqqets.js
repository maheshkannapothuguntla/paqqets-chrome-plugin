import React, { useState, useEffect } from 'react';
import './paqqets.css'
import Login from './login';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import * as jwt_decode from "jwt-decode";
import Contacts from './contacts';
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { getToken, getuserName,getOrgId } from './Utils/Common';
import { useCookies } from "react-cookie";

var arrayfiles = [];
var inputfiles = [];
var existingPaqqetsPerDayLimit;
function Paqqets(props) {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [islogin, setIslogin] = useState(false);
  const [contacts, setContacts] = useState(false);
  const [serchName, setSerchName] = useState('');
  const [responderName, setResponderName] = useState('');
  const [channel, setChannel] = useState('');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState(false);
  const [errorMessage, setErrormessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [CountOfFields, setCountOfFields] = useState(1);
  const [getInputBoxId, setInputBoxId] = useState(1);
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [error, setError] = useState(false);
  const [saveContactvalue, setSaveContactvalue] = useState(0);
  const [saveFavoriteValue, setSaveFavoriteValue] = useState(0);
  const [optionalMessage, setOptionalMessage] = useState('');
  const [showemailFactor, setShowemailFactor] = useState(false);
  const [showphoneFactor, setShowphoneFactor] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [messages, setMessages] = useState('');
  const [fileselection, setFileselection] = useState(false);
  const [fromContactsScreen, setFromContactsScreen] = useState(false);
  const [showNone, setShowNone] = useState(false);
  const [rsName, setRsName] = useState(false);
  const [showemailError, setShowemailError] = useState(false);
  const [showPhoneMessage, setShowPhoneMessage] = useState('');
  const [searchId, setSearchId] = useState('');
  const [contactChecked, setContactChecked] = useState(false);
  const [faveContactChecked, setFaveContactChecked] = useState(false);
  const [sendfiles, setSendfiles] = useState(false);
  const [fileType, setFileType] = useState("push");
  const [getPlanAccessLimit, setGetPlanAccessLimit] = useState("1");
  const [getPlanDwellLimit, setGetPlanDwellLimit] = useState("");
  const [getFilesPerPaqqetLimit, setGetFilesPerPaqqetLimit] = useState("");
  const [getSecureMessageLimit, setGetSecureMessageLimit] = useState("");
  const [getPaqqetContentLimit, setGetPaqqetContentLimit] = useState("");
  const [color, setColor] = useState('');
  const [factorType, setFactorType] = useState('');
  const [getFilesToPush, SetFilesToPush] = useState([]);
  const [getFileDescriptiontopush, setFileDescriptiontopush] = useState([]);
  const [cookies,setCookie, removeCookie] = useCookies(["RefreshToken"]);

  const [country, setCountry] = useState([
    {
      "name": "United Kingdom",
      "dial_code": "+44",
      "code": "GB(+44)"
    },
    {
      "name": "United States",
      "dial_code": "+1",
      "code": "US(+1)"
    },
    {
      "name": "India",
      "dial_code": "+91",
      "code": "IN(+91)"
    },
    {
      "name": "Israel",
      "dial_code": "+972",
      "code": "IL(+972)"
    },
    {
      "name": "Afghanistan",
      "dial_code": "+93",
      "code": "AF(+93)"
    },
    {
      "name": "Albania",
      "dial_code": "+355",
      "code": "AL(+355)"
    },
    {
      "name": "Algeria",
      "dial_code": "+213",
      "code": "DZ(+213)"
    },
    {
      "name": "AmericanSamoa",
      "dial_code": "+1 684",
      "code": "AS(+1684)"
    },


    {
      "name": "Antigua and Barbuda",
      "dial_code": "+1268",
      "code": "AG(+1268)"
    },
    {
      "name": "Argentina",
      "dial_code": "+54",
      "code": "AR(+54)"
    },
    {
      "name": "Australia",
      "dial_code": "+61",
      "code": "AU(+61)"
    },
    {
      "name": "Austria",
      "dial_code": "+43",
      "code": "AT(+43)"
    },
    {
      "name": "Azerbaijan",
      "dial_code": "+994",
      "code": "AZ(+994)"
    },

    {
      "name": "Bahrain",
      "dial_code": "+973",
      "code": "BH(+973)"
    },
    {
      "name": "Bangladesh",
      "dial_code": "+880",
      "code": "BD(+880)"
    },
    {
      "name": "Barbados",
      "dial_code": "+1 246",
      "code": "BB(+1246)"
    },
    {
      "name": "Belarus",
      "dial_code": "+375",
      "code": "BY(+375)"
    },
    {
      "name": "Belgium",
      "dial_code": "+32",
      "code": "BE(+32)"
    },
    {
      "name": "Belize",
      "dial_code": "+501",
      "code": "BZ(+501)"
    },
    {
      "name": "Benin",
      "dial_code": "+229",
      "code": "BJ(+229)"
    },
    {
      "name": "Bermuda",
      "dial_code": "+1 441",
      "code": "BM(+441)"
    },
    {
      "name": "Bhutan",
      "dial_code": "+975",
      "code": "BT(+975)"
    },
    {
      "name": "Bosnia and Herzegovina",
      "dial_code": "+387",
      "code": "BA(+387)"
    },
    {
      "name": "Botswana",
      "dial_code": "+267",
      "code": "BW(+267)"
    },
    {
      "name": "Brazil",
      "dial_code": "+55",
      "code": "BR(+55)"
    },
    {
      "name": "British Indian Ocean Territory",
      "dial_code": "+246",
      "code": "IO(+246)"
    },
    {
      "name": "Bulgaria",
      "dial_code": "+359",
      "code": "BG(+359)"
    },
    {
      "name": "Burkina Faso",
      "dial_code": "+226",
      "code": "BF(+226)"
    },
    {
      "name": "Burundi",
      "dial_code": "+257",
      "code": "BI(+257)"
    },
    {
      "name": "Cambodia",
      "dial_code": "+855",
      "code": "KH(+855)"
    },
    {
      "name": "Cameroon",
      "dial_code": "+237",
      "code": "CM(+237)"
    },
    {
      "name": "Canada",
      "dial_code": "+1",
      "code": "CA(+1)"
    },
    {
      "name": "Cape Verde",
      "dial_code": "+238",
      "code": "CV(+238)"
    },
    {
      "name": "Cayman Islands",
      "dial_code": "+ 345",
      "code": "KY(+345)"
    },
    {
      "name": "Central African Republic",
      "dial_code": "+236",
      "code": "CF(+236)"
    },
    {
      "name": "Chad",
      "dial_code": "+235",
      "code": "TD"
    },

    {
      "name": "China",
      "dial_code": "+86",
      "code": "CN(+86)"
    },
    {
      "name": "Christmas Island",
      "dial_code": "+61",
      "code": "CX(+61)"
    },
    {
      "name": "Colombia",
      "dial_code": "+57",
      "code": "CO(+57)"
    },
    {
      "name": "Comoros",
      "dial_code": "+269",
      "code": "KM(+269)"
    },
    {
      "name": "Congo",
      "dial_code": "+242",
      "code": "CG(+242)"
    },
    {
      "name": "Cook Islands",
      "dial_code": "+682",
      "code": "CK(+682)"
    },
    {
      "name": "Costa Rica",
      "dial_code": "+506",
      "code": "CR(+506)"
    },
    {
      "name": "Croatia",
      "dial_code": "+385",
      "code": "HR(+385)"
    },
    {
      "name": "Cuba",
      "dial_code": "+53",
      "code": "CU(+53)"
    },
    {
      "name": "Cyprus",
      "dial_code": "+537",
      "code": "CY(+537)"
    },
    {
      "name": "Czech Republic",
      "dial_code": "+420",
      "code": "CZ(+420)"
    },
    {
      "name": "Denmark",
      "dial_code": "+45",
      "code": "DK(+45)"
    },
    {
      "name": "Djibouti",
      "dial_code": "+253",
      "code": "DJ(+253)"
    },

    {
      "name": "Ecuador",
      "dial_code": "+593",
      "code": "EC(+593)"
    },
    {
      "name": "Egypt",
      "dial_code": "+20",
      "code": "EG(+20)"
    },
    {
      "name": "El Salvador",
      "dial_code": "+503",
      "code": "SV(+503)"
    },

    {
      "name": "Fiji",
      "dial_code": "+679",
      "code": "FJ(+679)"
    },
    {
      "name": "Finland",
      "dial_code": "+358",
      "code": "FI(+358)"
    },
    {
      "name": "France",
      "dial_code": "+33",
      "code": "FR(+33)"
    },
    {
      "name": "French Guiana",
      "dial_code": "+594",
      "code": "GF(+594)"
    },
    {
      "name": "French Polynesia",
      "dial_code": "+689",
      "code": "PF(+689)"
    },
    {
      "name": "Gabon",
      "dial_code": "+241",
      "code": "GA(+241)"
    },
    {
      "name": "Gambia",
      "dial_code": "+220",
      "code": "GM(+220)"
    },
    {
      "name": "Georgia",
      "dial_code": "+995",
      "code": "GE(+995)"
    },
    {
      "name": "Germany",
      "dial_code": "+49",
      "code": "DE(+49)"
    },
    {
      "name": "Ghana",
      "dial_code": "+233",
      "code": "GH(+233)"
    },
    {
      "name": "Gibraltar",
      "dial_code": "+350",
      "code": "GI(+350)"
    },
    {
      "name": "Greece",
      "dial_code": "+30",
      "code": "GR(+30)"
    },
    {
      "name": "Greenland",
      "dial_code": "+299",
      "code": "GL(+299)"
    },

    {
      "name": "Haiti",
      "dial_code": "+509",
      "code": "HT(+509)"
    },
    {
      "name": "Honduras",
      "dial_code": "+504",
      "code": "HN(+504)"
    },
    {
      "name": "Hungary",
      "dial_code": "+36",
      "code": "HU(+36)"
    },
    {
      "name": "Iceland",
      "dial_code": "+354",
      "code": "I(+354)"
    },

    {
      "name": "Indonesia",
      "dial_code": "+62",
      "code": "ID(+62)"
    },
    {
      "name": "Iraq",
      "dial_code": "+964",
      "code": "IQ(+964)"
    },
    {
      "name": "Ireland",
      "dial_code": "+353",
      "code": "IE(+353)"
    },
    {
      "name": "Israel",
      "dial_code": "+972",
      "code": "IL(+972)"
    },
    {
      "name": "Italy",
      "dial_code": "+39",
      "code": "IT(+39)"
    },

    {
      "name": "Japan",
      "dial_code": "+81",
      "code": "JP(+81)"
    },
    {
      "name": "Jordan",
      "dial_code": "+962",
      "code": "JO(+962)"
    },
    {
      "name": "Kazakhstan",
      "dial_code": "+7 7",
      "code": "KZ(+7 7)"
    },
    {
      "name": "Kenya",
      "dial_code": "+254",
      "code": "KE(+254)"
    },

    {
      "name": "Kuwait",
      "dial_code": "+965",
      "code": "KW(+965)"
    },
    {
      "name": "Kyrgyzstan",
      "dial_code": "+996",
      "code": "KG(+996)"
    },
    {
      "name": "Latvia",
      "dial_code": "+371",
      "code": "LV(+371)"
    },
    {
      "name": "Lebanon",
      "dial_code": "+961",
      "code": "LB(+961)"
    },
    {
      "name": "Lesotho",
      "dial_code": "+266",
      "code": "LS(+266)"
    },
    {
      "name": "Liberia",
      "dial_code": "+231",
      "code": "LR(+231)"
    },
    {
      "name": "Liechtenstein",
      "dial_code": "+423",
      "code": "LI(+423)"
    },
    {
      "name": "Lithuania",
      "dial_code": "+370",
      "code": "LT(+370)"
    },

    {
      "name": "Madagascar",
      "dial_code": "+261",
      "code": "MG(+261)"
    },
    {
      "name": "Malawi",
      "dial_code": "+265",
      "code": "MW(+265)"
    },
    {
      "name": "Malaysia",
      "dial_code": "+60",
      "code": "MY(+60)"
    },
    {
      "name": "Maldives",
      "dial_code": "+960",
      "code": "MV(+960)"
    },
    {
      "name": "Mali",
      "dial_code": "+223",
      "code": "ML(+223)"
    },
    {
      "name": "Malta",
      "dial_code": "+356",
      "code": "MT(+356)"
    },
    {
      "name": "Marshall Islands",
      "dial_code": "+692",
      "code": "MH(+692)"
    },
    {
      "name": "Martinique",
      "dial_code": "+596",
      "code": "MQ(+596)"
    },

    {
      "name": "Mexico",
      "dial_code": "+52",
      "code": "MX(+52)"
    },
    {
      "name": "Monaco",
      "dial_code": "+377",
      "code": "MC(+377)"
    },
    {
      "name": "Mongolia",
      "dial_code": "+976",
      "code": "MN(+976)"
    },
    {
      "name": "Montenegro",
      "dial_code": "+382",
      "code": "ME(+382)"
    },
    {
      "name": "Montserrat",
      "dial_code": "+1664",
      "code": "MS(+1664)"
    },
    {
      "name": "Morocco",
      "dial_code": "+212",
      "code": "MA(+212)"
    },
    {
      "name": "Myanmar",
      "dial_code": "+95",
      "code": "MM(+95)"
    },
    {
      "name": "Namibia",
      "dial_code": "+264",
      "code": "NA(+264)"
    },
    {
      "name": "Nauru",
      "dial_code": "+674",
      "code": "NR(+674)"
    },
    {
      "name": "Nepal",
      "dial_code": "+977",
      "code": "NP(+977)"
    },
    {
      "name": "Netherlands",
      "dial_code": "+31",
      "code": "NL(+31)"
    },

    {
      "name": "New Zealand",
      "dial_code": "+64",
      "code": "NZ"
    },
    {
      "name": "Nicaragua",
      "dial_code": "+505",
      "code": "NI(+505)"
    },
    {
      "name": "Niger",
      "dial_code": "+227",
      "code": "NE(+227)"
    },
    {
      "name": "Nigeria",
      "dial_code": "+234",
      "code": "NG(+234)"
    },

    {
      "name": "Pakistan",
      "dial_code": "+92",
      "code": "PK(+92)"
    },
    {
      "name": "Palau",
      "dial_code": "+680",
      "code": "PW(+680)"
    },
    {
      "name": "Panama",
      "dial_code": "+507",
      "code": "PA(+507)"
    },
    {
      "name": "Papua New Guinea",
      "dial_code": "+675",
      "code": "PG+(675)"
    },
    {
      "name": "Paraguay",
      "dial_code": "+595",
      "code": "PY(+595)"
    },

    {
      "name": "Poland",
      "dial_code": "+48",
      "code": "PL(+48)"
    },
    {
      "name": "Portugal",
      "dial_code": "+351",
      "code": "PT(+351)"
    },

    {
      "name": "Qatar",
      "dial_code": "+974",
      "code": "QA(+974)"
    },
    {
      "name": "Romania",
      "dial_code": "+40",
      "code": "RO(+40)"
    },
    {
      "name": "Rwanda",
      "dial_code": "+250",
      "code": "RW(+250)"
    },
    {
      "name": "Samoa",
      "dial_code": "+685",
      "code": "WS(+685)"
    },
    {
      "name": "San Marino",
      "dial_code": "+378",
      "code": "SM(+378)"
    },
    {
      "name": "Saudi Arabia",
      "dial_code": "+966",
      "code": "SA(+966)"
    },
    {
      "name": "Senegal",
      "dial_code": "+221",
      "code": "SN(+221)"
    },
    {
      "name": "Serbia",
      "dial_code": "+381",
      "code": "RS(+381)"
    },
    {
      "name": "Seychelles",
      "dial_code": "+248",
      "code": "SC(+248)"
    },
    {
      "name": "Sierra Leone",
      "dial_code": "+232",
      "code": "SL(+232)"
    },
    {
      "name": "Singapore",
      "dial_code": "+65",
      "code": "SG(+65)"
    },
    {
      "name": "South Africa",
      "dial_code": "+27",
      "code": "ZA(+27)"
    },
    {
      "name": "South Georgia and the South Sandwich Islands",
      "dial_code": "+500",
      "code": "GS(+500)"
    },
    {
      "name": "Spain",
      "dial_code": "+34",
      "code": "ES(+34)"
    },
    {
      "name": "Sri Lanka",
      "dial_code": "+94",
      "code": "LK(+94)"
    },
    {
      "name": "Sudan",
      "dial_code": "+249",
      "code": "SD(+249)"
    },
    {
      "name": "Suriname",
      "dial_code": "+597",
      "code": "SR(+597)"
    },
    {
      "name": "Swaziland",
      "dial_code": "+268",
      "code": "SZ(+268)"
    },
    {
      "name": "Sweden",
      "dial_code": "+46",
      "code": "SE(+46)"
    },
    {
      "name": "Switzerland",
      "dial_code": "+41",
      "code": "CH(+41)"
    },
    {
      "name": "Tajikistan",
      "dial_code": "+992",
      "code": "TJ(+992)"
    },
    {
      "name": "Thailand",
      "dial_code": "+66",
      "code": "TH(+66)"
    },
    {
      "name": "Togo",
      "dial_code": "+228",
      "code": "TG(+228)"
    },
    {
      "name": "Tokelau",
      "dial_code": "+690",
      "code": "TK(+690)"
    },
    {
      "name": "Tonga",
      "dial_code": "+676",
      "code": "TO(+676)"
    },
    {
      "name": "Trinidad and Tobago",
      "dial_code": "+1 868",
      "code": "TT(+676)"
    },
    {
      "name": "Tunisia",
      "dial_code": "+216",
      "code": "TN(+216)"
    },
    {
      "name": "Turkey",
      "dial_code": "+90",
      "code": "TR(90)"
    },
    {
      "name": "Turkmenistan",
      "dial_code": "+993",
      "code": "TM(+993)"
    },
    {
      "name": "Turks and Caicos Islands",
      "dial_code": "+1 649",
      "code": "TC(+649)"
    },
    {
      "name": "Tuvalu",
      "dial_code": "+688",
      "code": "TV(+688)"
    },
    {
      "name": "Uganda",
      "dial_code": "+256",
      "code": "UG(+256)"
    },
    {
      "name": "Ukraine",
      "dial_code": "+380",
      "code": "UA(+380)"
    },
    {
      "name": "United Arab Emirates",
      "dial_code": "+971",
      "code": "AE(+971)"
    },


    {
      "name": "Sao Tome and Principe",
      "dial_code": "+239",
      "code": "ST(+239)"
    },
    {
      "name": "Somalia",
      "dial_code": "+252",
      "code": "SO(+252)"
    },
    {
      "name": "Svalbard and Jan Mayen",
      "dial_code": "+47",
      "code": "SJ(+47)"
    },
    {
      "name": "Syrian Arab Republic",
      "dial_code": "+963",
      "code": "SY(+963)"
    },
    {
      "name": "Taiwan, Province of China",
      "dial_code": "+886",
      "code": "TW(+886)"
    },
    {
      "name": "Tanzania, United Republic of",
      "dial_code": "+255",
      "code": "TZ(+255)"
    },
    {
      "name": "Timor-Leste",
      "dial_code": "+670",
      "code": "TL(+670)"
    },
    {
      "name": "Venezuela, Bolivarian Republic of",
      "dial_code": "+58",
      "code": "VE(+58)"
    },
    {
      "name": "Viet Nam",
      "dial_code": "+84",
      "code": "VN(+84)"
    },
    {
      "name": "Virgin Islands, British",
      "dial_code": "+1 284",
      "code": "VG(+1284)"
    },
    {
      "name": "Virgin Islands, U.S.",
      "dial_code": "+1 340",
      "code": "VI(+340)"
    }
  ]);

  const [arryDiv, setArryDiv] = useState([
    <div className=" file-bspace row " id="input" key="input">
      <div className="col-xs-6">
        <input className="file-desc" type="text" data-id="input" id="input" onChange={(e) => multipleFilesDescription(e)} placeholder="File Description" form="novalidatedform" />
      </div>
      <div className="col-xs-6">
        <input className="input-hide files-upload" onChange={(e) => multipleFiles(e)} type="file" id="input" key="Key2" />
        <span className="space-delete" id={"input"}></span>
      </div>
    </div>
  ]);
  const [getJSONArray, setJSONArray] = useState([
    <div className="file-bspace row" id={"input"} key={"input"}>
      <div className="col-xs-6">
        <input className="file-desc" type="text" data-id="input" id="input" onChange={(e) => multipleFilesDescription(e)} placeholder="File Description" form="novalidatedform" />
      </div>
      <div className="col-xs-6">
        <input className="input-hide files-upload" onChange={(e) => multipleFiles(e)} type="file" id="input" key="Key2" />
        <span className="space-delete" id={"input"}></span>
      </div>
    </div>
  ]);
  const [getFilesUpload, setFilesUpload] = useState([
    <div className="file-bspace row" id={"input"} key={"input"}>
      <div className="col-xs-6">
        <input className="file-desc" type="text" data-id="input" id="input" onChange={(e) => multipleFilesDescription(e)} placeholder="File Description" form="novalidatedform" />
      </div>
      <div className="col-xs-6">
        <input className="input-hide files-upload" onChange={(e) => multipleFiles(e)} type="file" id="input" key="Key2" />
        <span className="space-delete" id={"input"}></span>
      </div>
    </div>
  ]);
  const [pullFiles, setPullFiles] = useState([
    <div className=" file-bspace row " id="input" key="input">

      <div className="col-xs-6">
        <input className="input-hide files-upload" data-id="input" placeholder="File Description" onChange={(e) => multipleFilesDescription(e)} type="text" id="input" key="Key2" />
        <span className="space-delete" id={"input"}></span>
      </div>
    </div>
  ]);
  const [getJSONArraydes, setJSONArraydes] = useState([
    <div className=" file-bspace row " id="input" key="input">

      <div className="col-xs-6">
        <input className="input-hide files-upload" data-id="input" placeholder="File Description" onChange={(e) => multipleFilesDescription(e)} type="text" id="input" key="Key2" />
        <span className="space-delete" id={"input"}></span>
      </div>
    </div>
  ]);
  const [getFileDescription, setFileDescription] = useState([
    <div className=" file-bspace row " id="input" key="input">

      <div className="col-xs-6">
        <input className="input-hide files-upload" data-id="input" placeholder="File Description" onChange={(e) => multipleFilesDescription(e)} type="text" id="input" key="Key2" />
        <span className="space-delete" id={"input"}></span>
      </div>
    </div>
  ])
  useEffect(() => {
    validate();
    inputfiles = [];
    setShowemailFactor(true);
    setFactorType('email');
    setCountryCode("+1");
    setChannel('email');
    if (responderName.trim() === '') {
      setRsName(true);
    } else {
      setRsName(false);

    }
    if (props.rowData !== undefined && props.rowData.length !== 0) {
      setFromContactsScreen(true);
      setResponderName(props.rowData.contactName);
      setSearchId(props.rowData.id);
      if (props.rowData.contactName !== '') {
        setRsName(false);
      } else {
        setRsName(true);
      }
      if (!props.email && props.rowData.contactPhoneNumber !== '' && props.rowData.contactPhoneNumber !== undefined) {
        const str = props.rowData.contactCountryCode;
        setCountryCode(str);
        setShowPhone(true);
        setShowphoneFactor(true);
        setShowemailFactor(false);
        setFactorType('phone');
        setChannel('phone');
        setPhone(props.rowData.contactPhoneNumber);
        setPhoneValid(false);
      }
      if (props.email && props.rowData.contactEmailAddress !== '' && props.rowData.contactEmailAddress !== undefined) {
        setShowPhone(false);
        setChannel('email');
        setValue(props.rowData.contactEmailAddress);
        setEmailValid(false);
      }
    } else {
      setChannel('email');
      if (responderName.trim() === '') {
        setRsName(true);
      } else {
        setRsName(false);

      }
    }

  }, [0]);

  const validate = () => {
    axios
      .get(`https://api.paqqets.com/demo/v1/paqqets/validate?orgId=${getOrgId()}`, {
        headers: {
          Authorization: getToken()
        }
      }).then((response) => {
        if (response.status === 200) {
          const FeatureDetails = response.data.planFeatures;
          const AccessLimit = FeatureDetails.filter(x => x.featureName === "Access Limit");
          setGetPlanAccessLimit(AccessLimit[0].featureLimit);
          const DwellLimit = FeatureDetails.filter(x => x.featureName === "Dwell Limit");
          localStorage.setItem("DwellLimit", DwellLimit[0].featureLimit);
          setGetPlanDwellLimit(DwellLimit[0].featureLimit + " minutes");
          const FilesPerPaqqetLimit = FeatureDetails.filter(x => x.featureName === "Files per Paqqet Limit");
          setGetFilesPerPaqqetLimit(FilesPerPaqqetLimit[0].featureLimit);
          const FileContentLimit = FeatureDetails.filter(x => x.featureName === "File Content Limit");
          const tempContentLimit = FileContentLimit[0].featureLimit;

          const todayTransactionsCount = response.data.todayTransactionsCount;
          const paqqetPerDayLimit = FeatureDetails.filter(x => x.featureName === "Paqqets per Day Limit");
          const perDayLimit = paqqetPerDayLimit[0].featureLimit;
          existingPaqqetsPerDayLimit = perDayLimit - todayTransactionsCount;
          const SecureMessageLimit = FeatureDetails.filter(x => x.featureName === "Secure Message Limit");
          setGetSecureMessageLimit(SecureMessageLimit[0].featureLimit);
          const PaqqetSizeLimit = FeatureDetails.filter(x => x.featureName === "Paqqet Content Limit");
          setGetPaqqetContentLimit(PaqqetSizeLimit[0].featureLimit);
      
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
           setErrormessage(error.response.data.errors[0].message);
           setLoading(false);
        }
        if (error.response.data.status === "FAILURE") {
          setErrormessage(error.response.data.errors[0].message);
          setLoading(false);
        }
      })
  }
  const contact = () => {
    setSerchName(responderName);
    setContacts(true);
    setIslogin(false);
    if (contacts) {
      return <Contacts />

    }
  }

  const logout = () => {
    localStorage.clear();
    setContacts(false);
    setIslogin(true);
    removeCookie("RefreshToken");
    return <Login />
  }

  const refresh = () => {
    setResponderName('');
    setLoading(false);
    setValue('');
    setPhone('');
    inputfiles = [];
    arrayfiles = [];
    setSaveContactvalue(0);
    setSaveFavoriteValue(0);
    setContactChecked(false);
    setFaveContactChecked(false);
    setFileselection('');
    setOptionalMessage('');
    getFilesToPush.splice(0, getFilesToPush.length);
    getJSONArray.splice(0, getJSONArray.length);
    getJSONArraydes.splice(0, getJSONArraydes.length);
    getFileDescriptiontopush.splice(0, getFileDescriptiontopush.length);
    setJSONArray([]);
    setFilesUpload([]);
    setJSONArraydes([]);
    setJSONArraydes([
      <div className=" file-bspace row " id="input" key="input">
        <div className="col-xs-6">
          <input className="input-hide files-upload" data-id="input" placeholder="File Description" onChange={(e) => multipleFilesDescription(e)} type="text" id="input" key="Key2" />
          <span className="space-delete" id={"input"}></span>
        </div>
      </div>])
    setJSONArray([<div className="file-bspace row" id={"input"} key={"input"}>
      <div className="col-xs-6">
        <input className="file-desc" type="text" data-id="input" id="input" onChange={(e) => multipleFilesDescription(e)} placeholder="File Description" form="novalidatedform" />
      </div>
      <div className="col-xs-6">
        <input className="input-hide files-upload" onChange={(e) => multipleFiles(e)} type="file" id="input" key="Key2" />
        <span className="space-delete" id={"input"}></span>
      </div>
    </div>])
    setJSONArray([<div className="file-bspace row" id={"input"} key={"input"}>
      <div className="col-xs-6">
        <input className="file-desc" type="text" data-id="input" id="input" onChange={(e) => multipleFilesDescription(e)} placeholder="File Description" form="novalidatedform" />
      </div>
      <div className="col-xs-6">
        <input className="input-hide files-upload" onChange={(e) => multipleFiles(e)} type="file" id="input" key="Key2" />
        <span className="space-delete" id={"input"}></span>
      </div>
    </div>])
    setFilesUpload([
      <div className=" file-bspace row " id="input" key="input">
        <div className="col-xs-6">
          <input className="input-hide files-upload" data-id="input" placeholder="File Description" onChange={(e) => multipleFilesDescription(e)} type="text" id="input" key="Key2" />
          <span className="space-delete" id={"input"}></span>
        </div>
      </div>
    ]);
  }

  const multipleFilesDescription = (event) => {
    if (sendfiles === true) {
      const dis = [...getJSONArraydes]
      const desc = event.target.value
      const index = dis.findIndex(x => x.key === event.target.id);
      getFileDescriptiontopush[index === -1 ? 0 : index] = desc
      setFileDescriptiontopush(getFileDescriptiontopush);
    } else {
      const desc = event.target.value
      const JSONArray = [...getJSONArray]
      const index = JSONArray.findIndex(x => x.props.id === event.target.id);
      getFileDescriptiontopush[index === -1 ? 0 : index] = desc
      setFileDescriptiontopush(getFileDescriptiontopush);
    }
  }

  const multipleFiles = (event) => {
    const files = event.target.files[0];
    const JSONArray = [...getJSONArray]
    const index = JSONArray.findIndex(x => x.props.id === event.target.id);
    getFilesToPush[index === -1 ? 0 : index] = files
    SetFilesToPush(getFilesToPush);
  }

  const deleteFunction = (e) => {
    let jsonindeX = getJSONArray.findIndex(x => x.key === e.currentTarget.id);
    if (getJSONArray.length) {
      getJSONArray.splice(jsonindeX, 1);
      const data = [...getFileDescriptiontopush]
      if (data.length > 1) {
        const desc = getFileDescriptiontopush.splice(jsonindeX, 1);
        const deletefiles = getFileDescriptiontopush.filter((x) => x !== desc);
        setFileDescriptiontopush(deletefiles)
      }
      if (getFilesToPush.length > 1) {
        const data = getFilesToPush;
        const pushdelete = data.splice(jsonindeX, 1);
        const deletedfiles = data.filter((x) => x !== pushdelete);
        SetFilesToPush(deletedfiles)
      }
    }
    var noteList = [...getFilesUpload];
    let mainFilter = getFilesUpload.filter(x => {
      return x.props.id !== e.currentTarget.id
    });
    setFilesUpload(mainFilter)
    if (noteList.length >= 1) {
      let index = jsonindeX + 1;
      noteList.splice(index, 1);
      setFilesUpload(noteList)
    }
  }
  const deletePullFunction = (e) => {
    let jsonindeX = getJSONArraydes.findIndex(x => x.key === e.currentTarget.id);
    if (getJSONArraydes.length) {
      getJSONArraydes.splice(jsonindeX, 1);
      const data = [...getFileDescriptiontopush]
      if (data.length > 1) {
        const desc = getFileDescriptiontopush.splice(jsonindeX, 1);
        const deletefiles = getFileDescriptiontopush.filter((x) => x !== desc);
        setFileDescriptiontopush(deletefiles)
      }
      var noteList = [...getFileDescription];
      if (noteList.length >= 1) {
        let index = jsonindeX;
        noteList.splice(index, 1);
        setFileDescription(noteList)
      }
    }
  }
  const optionalChange = (event) => {
    setOptionalMessage(event.target.value);
    if (event.target.value !== "") {
      setMessage(false);
      setError(false);
    }
  }
  const OnClickAddAnotherFileDescription = () => {
    let JSONArray = getJSONArraydes;
    let arryDiv = [...getFileDescription];
    let InputBoxIDs = getInputBoxId + 1;
    // let formjson = {};
    if (getJSONArraydes.length <= getFilesPerPaqqetLimit - 1) {
      setCountOfFields(CountOfFields + 1)

      // formjson = {
      //   key: `input${InputBoxIDs}`, value: <div className=" file-bspace col-xs-12 ">
      //     <input className="input-hides" type="text" id={"input" + InputBoxIDs} key="Key2" onChange={multipleFilesDescription} />
      //     <span className="space-delete" data-id={"input" + InputBoxIDs} id={"input" + InputBoxIDs} onClick={(e) => deletePullFunction(e)}><button className="strong-x"><i class="fa fa-minus" aria-hidden="true"></i></button></span>
      //   </div>
      // }
      JSONArray.push(
        <div className=" file-bspace row " key={"input" + InputBoxIDs}>
          <div className="col-xs-6">
            <input className="file-desc" type="text" data-id={"input" + InputBoxIDs} id={"input" + InputBoxIDs} placeholder="File Description" form="novalidatedform" onChange={multipleFilesDescription} />
            <span className="space-delete" data-id={"input" + InputBoxIDs} id={"input" + InputBoxIDs} onClick={(e) => deletePullFunction(e)}><button className="strong-x"><i class="fa fa-minus" aria-hidden="true"></i></button></span>
          </div>
        </div>)
      setInputBoxId(getInputBoxId + 1, arryDiv.JSONArray);
      setInputBoxId(getInputBoxId + 1)
    }
  }
  const OnClickAddAnotherFile = () => {
    let JSONArray = getJSONArray;
    let arryDiv = [...getFilesUpload];
    let InputBoxID = getInputBoxId + 1;
    // let formjson = {};
    if (getJSONArray.length <= getFilesPerPaqqetLimit - 1) {
      setCountOfFields(CountOfFields + 1)

      // formjson = {
      //   key: `input${InputBoxID}`, value: <div className=" file-bspace col-xs-12 ">
      //     <div className="row " id={"input" + InputBoxID}>
      //       <div className="col-xs-6">
      //         <input className="file-desc" type="text" placeholder="File Description" data-id={"input" + InputBoxID} onChange={multipleFilesDescription} id={"input" + InputBoxID} key="Key2" form="novalidatedform" />
      //       </div>
      //       <div className="col-xs-6">
      //         <input className="input-hides files-upload" id={"input" + InputBoxID} type="file" key="Key2" onChange={multipleFiles} />
      //         <span className="space-delete" data-id={"input" + InputBoxID} id={"input" + InputBoxID} onClick={(e) => deleteFunction(e)}><button className="strong-x"><i class="fa fa-minus" aria-hidden="true"></i></button></span>
      //       </div>
      //     </div>
      //   </div>
      // }
      JSONArray.push(
        <div className="row " id={"input" + InputBoxID} key={"input" + InputBoxID}>
          <div className="col-xs-6">
            <input className="file-desc" type="text" placeholder="File Description1" data-id={"input" + InputBoxID} onChange={multipleFilesDescription} id={"input" + InputBoxID} key="Key2" form="novalidatedform" />
          </div>

          <div className="col-xs-6 mb-1">
            <input className="input-hides files-upload" data-id={"input" + InputBoxID} id={"input" + InputBoxID} type="file" key="Key2" required onChange={multipleFiles} />
            <span className="space-delete" data-id={"input" + InputBoxID} id={"input" + InputBoxID} onClick={(e) => deleteFunction(e)}><button className="strong-x"><i class="fa fa-minus" aria-hidden="true"></i></button></span>
          </div>
        </div>)
      setInputBoxId(getInputBoxId + 1, arryDiv.JSONArray);
      setInputBoxId(getInputBoxId + 1)
    }
  }
  const handlechannel = (event) => {
    setChannel(event.target.value);
    if (event.target.value === 'phone') {
      setShowPhone(true);
      if (phone === '') {
        setPhoneValid(true);
      }
      if (props.rowData !== undefined && props.rowData.phoneNumber !== '' && props.rowData.phoneNumber !== undefined && fromContactsScreen) {
        setPhone(props.rowData.phoneNumber);
        const str = props.rowData.countryCode.substr(1);
        setCountryCode(countryCode);
        validatePhoneNumber('+' + countryCode + ' ' + phone);
      } else {
        if (props.rowData !== undefined && props.rowData.emailAddress !== '' && props.rowData.emailAddress !== undefined) {
          setValue(props.rowData.emailAddress);
        }
      }
      if (!showPhone && phone !== '') {
        validatePhoneNumber('+' + countryCode + ' ' + phone);
      }
      if (!showPhone && showphoneFactor) {
        setIsValid(false);
        setEmailValid(false);
      }
      if (!showPhone && showemailFactor) {
        setIsValid(false);
        if (phone === '')
          setPhoneValid(true);
      }
      if (!showPhone && showNone) {
        setIsValid(false);
      }
      if (event.target.value === 'phone' && showNone) {
        setIsValid(false);
        setShowemailError(false);
        setEmailValid(false);
        setShowPhoneMessage(false);
      }

      if (event.target.value === 'phone' && showemailFactor) {
        setShowPhoneMessage('')
      }
      if (event.target.value === 'phone' && showemailFactor) {
        if (value === '') {
          setEmailValid(true);
        }
      }

    } else {
      setShowPhone(false);


      if (value === '' && !showPhone && showemailFactor) {
        setEmailValid(true);
      }
      if (showPhone && showemailFactor) {
        setMessages('');
        setShowPhoneMessage('');
        setPhoneValid(false);
      }
      if (showPhone && showNone) {
        setMessages('');
        setShowPhoneMessage('');
      }
      if (phone === '') {
        setMessages('');
        setShowPhoneMessage('');
      }
      if (!showPhone && value === '') {

        setEmailValid(true);
      }
      if (!showPhone && showphoneFactor) {
        setPhoneValid(false);
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (value === '') {
          setIsValid(false);
          setEmailValid(false);
        }
        if (value !== "") {
          if (!pattern.test(value)) {
            setIsValid(true);
            setEmailValid(true);
            setPhoneValid(false);
          } if (pattern.test(value)) {
            setIsValid(false);
            setEmailValid(false);
            setPhoneValid(false);
          }
        }
        if (!showPhone && showemailFactor) {
          setPhoneValid(false);
        }
        if (event.target.value === 'email' && showphoneFactor) {
          if (phone !== "") {
            validatePhoneNumber(countryCode + ' ' + phone);
          }
        }
        setMessage('');
      } if (value !== "" && !showemailFactor && !showphoneFactor && !showPhone) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(value)) {
          setIsValid(true);
          setEmailValid(true);
          setPhoneValid(false);
        } if (pattern.test(value)) {
          setIsValid(false);
          setEmailValid(false);
          setPhoneValid(false);
        }
      }
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (value === '') {
        setIsValid(false);
        setEmailValid(false);
      }
      if (value !== "") {
        if (!pattern.test(value)) {
          setIsValid(true);
          setEmailValid(true);
        } if (pattern.test(value)) {
          setIsValid(false);
          setEmailValid(false);
        }
      }
      if (event.target.value === 'email' && showphoneFactor) {
        if (phone === "") {
          setPhoneValid(true);
        } else {
           validatePhoneNumber(countryCode + ' ' + phone);
        }
      }
      if (props.rowData !== undefined && props.rowData.emailAddress !== '' && props.rowData.emailAddress !== undefined) {
        setValue(props.rowData.emailAddress);
        if (value !== "") {
          if (!pattern.test(value)) {
            setIsValid(true);
            setEmailValid(true);
          } if (pattern.test(value)) {
            setIsValid(false);
            setEmailValid(false);
          }
        }
      } else {
        if (props.rowData !== undefined && props.rowData.countryCode !== undefined && props.rowData.phoneNumber !== '' && props.rowData.phoneNumber !== undefined) {
          setPhone(props.rowData.phoneNumber)
          const str = props.rowData.countryCode.substr(1);
          setCountryCode(countryCode);
          validatePhoneNumber('+' + countryCode + ' ' + phone);
        }
      }
      if (showphoneFactor && event.target.value === 'email') {
        setMessages('');
      }
      if (value === '') {
        setEmailValid(true);
      }
    }
  }
  const saveContact = (event) => {
    setContactChecked(event.target.checked);
    if (event.target.checked === true) {
      setSaveContactvalue(1);
    } else {
      setSaveContactvalue(0);
    }
  }
  const saveFavorite = (event) => {
    setFaveContactChecked(event.target.checked);
    if (event.target.checked === true) {
      setSaveFavoriteValue(1);
    } else {
      setSaveFavoriteValue(0);
    }
  }
  const transactionChange = (event) => {
    if (event.target.value === "push") {
      setFileType(event.target.value);
      setSendfiles(false);
    }
    if (event.target.value === "pull") {
      setFileType(event.target.value);
      setSendfiles(true);
    }
  }
  const countyCodeChange = (event) => {
    setCountryCode(event.target.value);
    if (phone !== '') {
      validatePhoneNumber('+' + event.target.value + ' ' + phone);
    }
    if (showphoneFactor && !showPhone) {
      setMessages('');
    }
    if (!showphoneFactor && showPhone) {
      setShowPhoneMessage('');
    }
  }
  const contactsearch = () => {
    setContacts(true)
  }

  const handlevalue = (event) => {
    setValue(event.target.value.trim());
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (event.target.value.trim() !== "" && !showPhone) {
      if (!pattern.test(event.target.value.trim())) {
        setIsValid(true);
        setShowemailError(false);
        setEmailValid(true);
      } if (pattern.test(event.target.value.trim())) {
        setIsValid(false);
        setShowemailError(false);
        setEmailValid(false);
      }
    }
    if (event.target.value.trim() !== "" && showemailFactor) {
      if (!pattern.test(event.target.value.trim())) {
        setShowemailError(true);
        setEmailValid(true);
      } if (pattern.test(event.target.value.trim())) {
        setShowemailError(false);
        setEmailValid(false);
      }
    } if (event.target.value.trim() === '' && showemailFactor) {
      setShowemailError(false);
      setEmailValid(true);
    } if (event.target.value.trim() !== '' && !showemailFactor && !showphoneFactor && !showPhone) {
      if (!pattern.test(event.target.value.trim())) {
        setIsValid(true);
        setShowemailError(false);
        setEmailValid(true);

      } if (pattern.test(event.target.value.trim())) {
        setIsValid(false);
        setShowemailError(false);
        setEmailValid(false);
      }
    }
    if (event.target.value.trim()) {
      setFromContactsScreen(false);
      setValue(event.target.value.trim());
      if (props.rowData !== undefined) {
        props.rowData.emailAddress = event.target.value.trim();
      }
    }
    if (event.target.value.trim() === "") {
      setIsValid(false);
      setEmailValid(true);
      setShowemailError(false);
    } else {
      setMessage('');
      setError(false);
    }
  }
  const handleFactorChange = (event) => {
    setFactorType(event.target.value);
    if (event.target.value === 'email') {
      if (event.target.value === 'email' && value === '') {
        setShowemailError(false);
        setEmailValid(true);
      }
      sendpaqqetshow({ factorType: 'email' })
      setShowemailFactor(true);
      setShowphoneFactor(false);
      setShowNone(false);
      if (!showPhone && !showemailFactor) {
        setMessages('');
        setShowPhoneMessage('');
        setPhoneValid(false);
      }
      if (event.target.value === 'email' && showPhone) {
        setShowPhoneMessage('');
      }
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (value !== "") {
        if (!pattern.test(value)) {
          setShowemailError(true);
          setEmailValid(true);
        } if (pattern.test(value)) {
          setShowemailError(false);
          setEmailValid(false);
        }
      }
      if (event.target.value === 'email' && showPhone) {
        if (value === '') {
          setEmailValid(true);
        }
      }
    } if (event.target.value === 'phone') {
      setShowphoneFactor(true);
      setShowemailFactor(false);
      setShowNone(false);
      if (!showphoneFactor && phone !== '') {
        validatePhoneNumber('+' + countryCode + ' ' + phone);
      }
      if (showPhone && !showphoneFactor) {
        setShowemailFactor(false);
      }
      if (showPhone && event.target.value === 'phone') {
        setShowemailFactor(false);
        setEmailValid(false);
      }

      if (!showPhone && event.target.value === 'phone') {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (value !== "") {
          setShowemailFactor(false);
        }
        if (value === '') {
          setEmailValid(true);
        }
        if (phone !== '') {
          validatePhoneNumber('+' + countryCode + ' ' + phone);
        }
        if (showphoneFactor && !showPhone) {
          setMessages('');
        }
        if (phone === '') {
          setPhoneValid(true);
        }
        setMessages('');
      }
    }
    if (event.target.value === 'NONE') {
      setShowNone(true);
      if (showPhone && event.target.value === 'NONE') {
        setIsValid(false);
        setShowemailError(false);
        setEmailValid(false);
        if (phone !== '') {
          validatePhoneNumber('+' + countryCode + ' ' + phone);
        }
        setShowPhoneMessage('');
      }
      if (!showPhone && event.target.value === 'NONE') {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (value !== "") {
          setShowemailError(false);
        }
        setMessages('');
        setShowPhoneMessage('');
        setPhoneValid(false);
      }
      setShowphoneFactor(false);
      setShowemailFactor(false);
    }
  }
  const handleresponderName = (event) => {
    setResponderName(event.target.value);
    if (event.target.value.trim() === '') {
      setRsName(true);
    } else {
      setRsName(false);
      setMessage(false);
      setError(false);
    }
  }

  const phoneChange = (event) => {
    setPhone(event.target.value);
    if (event.target.value === '') {
      setMessages('');
      setPhoneValid(true);
    }
    if (event.target.value) {
      setFromContactsScreen(false);
      setPhone(event.target.value);
      if (props.rowData !== undefined) {
        props.rowData.phoneNumber = event.target.value;
        validatePhoneNumber('+' + countryCode + ' ' + event.target.value);
      }
    }
    if (event.target.value !== '') {
      validatePhoneNumber('+' + countryCode + ' ' + event.target.value);
      setMessage(false);
      setError(false);
    } else {
      setMessages('');
      setShowPhoneMessage('');
    }
    if (showPhone && showemailFactor) {
      validatePhoneNumber('+' + countryCode + ' ' + event.target.value);
      setShowPhoneMessage('');
    }
    if (showphoneFactor && !showPhone) {
      setMessages('');
    }
    if (showPhone && showNone) {
      if (phone === '') {
        setShowPhoneMessage('');
      }
    }
    if (showPhone && event.target.value === '') {
      setMessages('');
    }
  }

  const sendpaqqetshow = () => {
    setIslogin(false);
  }
  const handleSubmit = async (event) => {
    if (value !== '' && !showPhone) {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(value)) {
        setIsValid(true);
      }
      else {
        sendpaqqetflow();
      }
    } if (phone !== '' && showPhone) {
      sendpaqqetflow();
    }
  }

  const sendpaqqetflow = async () => {
    setIsValid(false);
    setMessage(false);
    setLoading(true);
    setError(false);
    setErrormessage("");
    const decode = jwt_decode(getToken());
    // const userLogedIn = decode.username;
    var selectedFile = Object.assign([], arrayfiles);
    // var selectedfileLength = selectedFile.length;

    if (sendfiles === false) {
      var paqqet = {}
      let fileInfodata = []
      for (let i = 0; i < getFilesToPush.length && getFileDescriptiontopush.length; i++) {
        fileInfodata.push(

          {
            fileDescription: getFileDescriptiontopush[i],
            fileName: getFilesToPush[i].name
          }
        )
      }
      if (!showPhone && !showemailFactor && !showphoneFactor) {
        paqqet = {
          orgId: getOrgId(),
          "referenceId": "referenceId1",

          "transactionType": 'push',

          "subscription": {

            "initiatorSubscriptionId": "1"

          },

          "subject": "Sending Paqqet Information",
          "initiator": {

            "userName": getuserName(),
            "notifications": {

              "channel": 'email',

              "value": getuserName()

            },

            "verificationFactors": [

              {

                "factorType": 'NONE'

              }

            ]

          },

          "responder": [
            {

              "paqqetRefId": 1,
              "searchId": searchId,
              "responderName": responderName.trim(),
              "saveContact": saveContactvalue,
              "saveAsFavourite": saveFavoriteValue,

              "notifications": {

                "notificationType": "paqqet-api",

                "channel": channel,

                "value": value

              },
              "verificationFactors": [

                {

                  "factorType": "NONE"

                }

              ]

            }
          ],

          "policy": [

            {

              "paqqetExpiryDuration": getPlanDwellLimit,

              "fileAccessLimit": getPlanAccessLimit,
              "msgAccessLimit": getPlanAccessLimit,
            }

          ],

          "fileInfo": fileInfodata,
          "messageText": optionalMessage
        }
      }

      if (showPhone && !showemailFactor && !showphoneFactor) {
        paqqet = {
          orgId: getOrgId(),
          "referenceId": "referenceId1",

          "transactionType": 'push',

          "subscription": {

            "initiatorSubscriptionId": "1"

          },

          "subject": "Sending Paqqet Information",
          "initiator": {
            "userName": getuserName(),
            "notifications": {

              "channel": 'email',

              "value": getuserName()

            },


            "verificationFactors": [

              {

                "factorType": 'NONE'

              }

            ]

          },

          "responder": [
            {
              "paqqetRefId": 1,
              "searchId": searchId,
              "responderName": responderName.trim(),
              "saveContact": saveContactvalue,
              "saveAsFavourite": saveFavoriteValue,
              "notifications": {
                "notificationType": "paqqet-api",
                "channel": channel,
                "countryCode": countryCode,
                "value": phone
              },
              "verificationFactors": [
                {
                  "factorType": "NONE"
                }
              ]
            }

          ],

          "policy": [

            {

              "paqqetExpiryDuration": getPlanDwellLimit,

              "fileAccessLimit": getPlanAccessLimit,
              "msgAccessLimit": getPlanAccessLimit,
            }

          ],

          "fileInfo": fileInfodata,
          "messageText": optionalMessage
        }
      }
      if (showemailFactor && !showPhone) {
        paqqet = {
          orgId: getOrgId(),
          "referenceId": "referenceId1",

          "transactionType": 'push',

          "subscription": {

            "initiatorSubscriptionId": "1"

          },

          "subject": "Sending Paqqet Information",
          "initiator": {
            "userName": getuserName(),
            "notifications": {

              "channel": 'email',

              "value": getuserName()

            },

            "verificationFactors": [

              {

                "factorType": 'NONE'

              }

            ]

          },

          "responder": [
            {
              "paqqetRefId": 1,
              "searchId": searchId,
              "responderName": responderName.trim(),
              "saveContact": saveContactvalue,
              "saveAsFavourite": saveFavoriteValue,
              "notifications": {
                "notificationType": "paqqet-api",
                "channel": channel,
                "value": value
              },
              "verificationFactors": [
                {
                  "factorType": "AUTH_CODE",
                  "channel": factorType,
                  "value": value,
                }
              ]
            }

          ],

          "policy": [

            {

              "paqqetExpiryDuration": getPlanDwellLimit,

              "fileAccessLimit": getPlanAccessLimit,
              "msgAccessLimit": getPlanAccessLimit,
            }

          ],

          "fileInfo": fileInfodata,
          "messageText": optionalMessage
        }
      }

      if (showphoneFactor && showPhone) {
        paqqet = {
          orgId: getOrgId(),
          "referenceId": "referenceId1",

          "transactionType": 'push',

          "subscription": {

            "initiatorSubscriptionId": "1"

          },

          "subject": "Sending Paqqet Information",
          "initiator": {
            "userName": getuserName(),
            "notifications": {

              "channel": 'email',

              "value": getuserName()

            },

            "verificationFactors": [

              {

                "factorType": 'NONE'

              }

            ]

          },

          "responder": [
            {
              "paqqetRefId": 1,
              "searchId": searchId,
              "responderName": responderName.trim(),
              "saveContact": saveContactvalue,
              "saveAsFavourite": saveFavoriteValue,
              "notifications": {
                "notificationType": "paqqet-api",
                "channel": channel,
                "countryCode": countryCode,
                "value": phone
              },

              "verificationFactors": [
                {
                  "factorType": "AUTH_CODE",

                  "channel": factorType,
                  "countryCode": countryCode,
                  "value": phone

                }
              ]
            }

          ],

          "policy": [

            {

              "paqqetExpiryDuration": getPlanDwellLimit,

              "fileAccessLimit": getPlanAccessLimit,
              "msgAccessLimit": getPlanAccessLimit,
            }

          ],

          "fileInfo": fileInfodata,
          "messageText": optionalMessage
        }
      }

      if (showemailFactor && showPhone) {
        paqqet = {
          orgId: getOrgId(),
          "referenceId": "referenceId1",

          "transactionType": 'push',

          "subscription": {

            "initiatorSubscriptionId": "1"

          },

          "subject": "Sending Paqqet Information",
          "initiator": {
            "userName": getuserName(),
            "notifications": {

              "channel": 'email',

              "value": getuserName()

            },


            "verificationFactors": [

              {

                "factorType": 'NONE'

              }

            ]

          },

          "responder": [
            {
              "paqqetRefId": 1,
              "searchId": searchId,
              "responderName": responderName.trim(),
              "saveContact": saveContactvalue,
              "saveAsFavourite": saveFavoriteValue,
              "notifications": {
                "notificationType": "paqqet-api",
                "channel": channel,
                "countryCode": countryCode,
                "value": phone
              },
              "verificationFactors": [
                {
                  "factorType": "AUTH_CODE",

                  "channel": factorType,
                  "value": value
                }
              ]
            }

          ],

          "policy": [

            {

              "paqqetExpiryDuration": getPlanDwellLimit,

              "fileAccessLimit": getPlanAccessLimit,
              "msgAccessLimit": getPlanAccessLimit,
            }

          ],

          "fileInfo": fileInfodata,
          "messageText": optionalMessage
        }
      }
      if (showphoneFactor && !showPhone && optionalMessage === '') {
        paqqet = {
          orgId: getOrgId(),
          "referenceId": "referenceId1",

          "transactionType": 'push',

          "subscription": {

            "initiatorSubscriptionId": "1"

          },

          "subject": "Sending Paqqet Information",
          "initiator": {
            "userName": getuserName(),
            "notifications": {

              "channel": 'email',

              "value": getuserName()

            },

            "verificationFactors": [

              {

                "factorType": 'NONE'

              }

            ]

          },

          "responder": [
            {
              "paqqetRefId": 1,
              "searchId": searchId,
              "responderName": responderName.trim(),
              "saveContact": saveContactvalue,
              "saveAsFavourite": saveFavoriteValue,
              "notifications": {
                "notificationType": "paqqet-api",
                "channel": channel,
                "value": value

              },
              "verificationFactors": [
                {
                  "factorType": "AUTH_CODE",

                  "channel": factorType,
                  "countryCode": countryCode,
                  "value": phone
                }
              ]
            }

          ],

          "policy": [

            {

              "paqqetExpiryDuration": getPlanDwellLimit,

              "fileAccessLimit": getPlanAccessLimit,
              "msgAccessLimit": getPlanAccessLimit,
            }

          ],

          "fileInfo": fileInfodata,
          "messageText": optionalMessage
        }
      }
      let batchId;
      await axios.post(`https://api.paqqets.com/demo/v1/paqqets`, paqqet, {
        headers: { 'Authorization': getToken() }

      }).then(async (response) => {
        if (response.data.status === "SUCCESS") {
          batchId = response.data.batchTransactionId
          let uploadFileStatus = [];
          if (response.data.batchTransactionId) {
            for (let i = 0; i <= getFilesToPush.length - 1; i++) {
              const location = response.data.details[0].contentDetails[i].fileUploadURL;
              if (location) {
                var uploadpaqqetFile = await fetch(`${location}`, {
                  method: 'PUT',
                  body: getFilesToPush[i]
                });
                uploadFileStatus.push(uploadpaqqetFile.status);
              }
            }
            var check = uploadFileStatus.every(function (status) {
              return status === 200;
            });
            if (check) {
              setTimeout(function () {
                let finalcall = fetch(`https://api.paqqets.com/demo/v1/paqqets/${batchId}`, {
                  method: 'PUT',
                  headers: new Headers({ 'Authorization': getToken() })
                }).then(response => {
                  // if (response.status === 200) {
                  setLoading(false);
                  // setState({ message: true });
                  setMessage(true);
                  setErrormessage(false)
                  refresh();
                  // refresh();
                  // /}
                  setResponderName('');
                  setLoading(false);
                  setValue('');
                  setPhone('');
                  inputfiles = [];
                  arrayfiles = [];
                  setSaveContactvalue(0);
                  setSaveFavoriteValue(0);
                  setContactChecked(false);
                  setFaveContactChecked(false);
                  setFileselection('');
                  setOptionalMessage('');
                  setArryDiv([
                    <div className=" file-bspace row " id="input" key="input">
                      <div className="col-xs-6">
                        <input className="file-desc" type="text" data-id="input" id="input" onChange={multipleFilesDescription} placeholder="File Description" form="novalidatedform" />
                      </div>
                      <div className="col-xs-6">
                        <input className="input-hide files-upload" onChange={multipleFiles} type="file" id="input" key="Key2" />
                        <span className="space-delete" id={"input"}></span>
                      </div>
                    </div>
                  ]);
                  setPullFiles([
                    <div className=" file-bspace row " id="input" key="input">

                      <div className="col-xs-6">
                        <input className="input-hide files-upload" data-id="input" placeholder="File Description" onChange={multipleFilesDescription} type="text" id="input" key="Key2" />
                        <span className="space-delete" id={"input"}></span>
                      </div>
                    </div>
                  ]);
                }).catch((error) => {

                  setLoading(false);
                  refresh();
                });

              }, 2000);
            }
          }
        }
      }).catch((error) => {
      setLoading(false);
        // refresh();
        setErrormessage(error.response.data.errors[0].message)
      })
    }
    if (sendfiles === true) {
      var paqqet = {}
      let fileInfodata = []
      for (let i = 0; i < getFileDescriptiontopush.length; i++) {
        fileInfodata.push(
          {
            fileDescription: getFileDescriptiontopush[i],
          }
        )
      }
      if (!showPhone && !showemailFactor && !showphoneFactor) {
        paqqet = {
          orgId: getOrgId(),
          "referenceId": "referenceId1",

          "transactionType": 'pull',

          "subscription": {

            "initiatorSubscriptionId": "1"

          },

          "subject": "Sending Paqqet Information",
          "initiator": {

            "userName": getuserName(),
            "notifications": {

              "channel": 'email',

              "value": getuserName()

            },

            "verificationFactors": [

              {

                "factorType": 'NONE'

              }

            ]

          },

          "responder": [
            {

              "paqqetRefId": 1,
              "searchId": searchId,
              "responderName": responderName.trim(),
              "saveContact": saveContactvalue,
              "saveAsFavourite": saveFavoriteValue,

              "notifications": {

                "notificationType": "paqqet-api",

                "channel": channel,

                "value": value

              },
              "verificationFactors": [

                {

                  "factorType": "NONE"

                }

              ]

            }
          ],

          "policy": [

            {

              "paqqetExpiryDuration": getPlanDwellLimit,

              "fileAccessLimit": getPlanAccessLimit,
              "msgAccessLimit": getPlanAccessLimit,
            }

          ],

          "fileInfo": fileInfodata,
        }
      }

      if (showPhone && !showemailFactor && !showphoneFactor) {
        paqqet = {
          orgId: getOrgId(),
          "referenceId": "referenceId1",

          "transactionType": 'pull',

          "subscription": {

            "initiatorSubscriptionId": "1"

          },

          "subject": "Sending Paqqet Information",
          "initiator": {
            "userName": getuserName(),
            "notifications": {

              "channel": 'email',

              "value": getuserName()

            },


            "verificationFactors": [

              {

                "factorType": 'NONE'

              }

            ]

          },

          "responder": [
            {
              "paqqetRefId": 1,
              "searchId": searchId,
              "responderName": responderName.trim(),
              "saveContact": saveContactvalue,
              "saveAsFavourite": saveFavoriteValue,
              "notifications": {
                "notificationType": "paqqet-api",
                "channel": channel,
                "countryCode": countryCode,
                "value": phone
              },
              "verificationFactors": [
                {
                  "factorType": "NONE"
                }
              ]
            }

          ],

          "policy": [

            {

              "paqqetExpiryDuration": getPlanDwellLimit,

              "fileAccessLimit": getPlanAccessLimit,
              "msgAccessLimit": getPlanAccessLimit,
            }

          ],

          "fileInfo": fileInfodata,
        }
      }
      if (showemailFactor && !showPhone) {
        paqqet = {
          orgId: getOrgId(),
          "referenceId": "referenceId1",

          "transactionType": 'pull',

          "subscription": {

            "initiatorSubscriptionId": "1"

          },

          "subject": "Sending Paqqet Information",
          "initiator": {
            "userName": getuserName(),
            "notifications": {

              "channel": 'email',

              "value": getuserName()

            },

            "verificationFactors": [

              {

                "factorType": 'NONE'

              }

            ]

          },

          "responder": [
            {
              "paqqetRefId": 1,
              "searchId": searchId,
              "responderName": responderName.trim(),
              "saveContact": saveContactvalue,
              "saveAsFavourite": saveFavoriteValue,
              "notifications": {
                "notificationType": "paqqet-api",
                "channel": channel,
                "value": value
              },
              "verificationFactors": [
                {
                  "factorType": "AUTH_CODE",
                  "channel": factorType,
                  "value": value,
                }
              ]
            }

          ],

          "policy": [

            {

              "paqqetExpiryDuration": getPlanDwellLimit,

              "fileAccessLimit": getPlanAccessLimit,
              "msgAccessLimit": getPlanAccessLimit,
            }

          ],

          "fileInfo": fileInfodata,
        }
      }

      if (showphoneFactor && showPhone) {
        paqqet = {
          orgId: getOrgId(),
          "referenceId": "referenceId1",

          "transactionType": 'pull',

          "subscription": {

            "initiatorSubscriptionId": "1"

          },

          "subject": "Sending Paqqet Information",
          "initiator": {
            "userName": getuserName(),
            "notifications": {

              "channel": 'email',

              "value": getuserName()

            },

            "verificationFactors": [

              {

                "factorType": 'NONE'

              }

            ]

          },

          "responder": [
            {
              "paqqetRefId": 1,
              "searchId": searchId,
              "responderName": responderName.trim(),
              "saveContact": saveContactvalue,
              "saveAsFavourite": saveFavoriteValue,
              "notifications": {
                "notificationType": "paqqet-api",
                "channel": channel,
                "countryCode": countryCode,
                "value": phone
              },

              "verificationFactors": [
                {
                  "factorType": "AUTH_CODE",

                  "channel": factorType,
                  "countryCode": countryCode,
                  "value": phone

                }
              ]
            }

          ],

          "policy": [

            {

              "paqqetExpiryDuration": getPlanDwellLimit,

              "fileAccessLimit": getPlanAccessLimit,
              "msgAccessLimit": getPlanAccessLimit,
            }

          ],

          "fileInfo": fileInfodata,
        }
      }

      if (showemailFactor && showPhone) {
        paqqet = {
          orgId: getOrgId(),
          "referenceId": "referenceId1",

          "transactionType": 'pull',

          "subscription": {

            "initiatorSubscriptionId": "1"

          },

          "subject": "Sending Paqqet Information",
          "initiator": {
            "userName": getuserName(),
            "notifications": {

              "channel": 'email',

              "value": getuserName()

            },


            "verificationFactors": [

              {

                "factorType": 'NONE'

              }

            ]

          },

          "responder": [
            {
              "paqqetRefId": 1,
              "searchId": searchId,
              "responderName": responderName.trim(),
              "saveContact": saveContactvalue,
              "saveAsFavourite": saveFavoriteValue,
              "notifications": {
                "notificationType": "paqqet-api",
                "channel": channel,
                "countryCode": countryCode,
                "value": phone
              },
              "verificationFactors": [
                {
                  "factorType": "AUTH_CODE",

                  "channel": factorType,
                  "value": value
                }
              ]
            }

          ],

          "policy": [

            {

              "paqqetExpiryDuration": getPlanDwellLimit,

              "fileAccessLimit": getPlanAccessLimit,
              "msgAccessLimit": getPlanAccessLimit,
            }

          ],

          "fileInfo": fileInfodata,
        }
      }
      if (showphoneFactor && !showPhone && optionalMessage === '') {
        paqqet = {
          orgId: getOrgId(),
          "referenceId": "referenceId1",

          "transactionType": 'pull',

          "subscription": {

            "initiatorSubscriptionId": "1"

          },

          "subject": "Sending Paqqet Information",
          "initiator": {
            "userName": getuserName(),
            "notifications": {

              "channel": 'email',

              "value": getuserName()

            },

            "verificationFactors": [

              {

                "factorType": 'NONE'

              }

            ]

          },

          "responder": [
            {
              "paqqetRefId": 1,
              "searchId": searchId,
              "responderName": responderName.trim(),
              "saveContact": saveContactvalue,
              "saveAsFavourite": saveFavoriteValue,
              "notifications": {
                "notificationType": "paqqet-api",
                "channel": channel,
                "value": value

              },
              "verificationFactors": [
                {
                  "factorType": "AUTH_CODE",

                  "channel": factorType,
                  "countryCode": countryCode,
                  "value": phone
                }
              ]
            }

          ],

          "policy": [

            {

              "paqqetExpiryDuration": getPlanDwellLimit,

              "fileAccessLimit": getPlanAccessLimit,
              "msgAccessLimit": getPlanAccessLimit,
            }

          ],

          "fileInfo": fileInfodata,

        }
      }
      let batchId;
      await axios.post(`https://api.paqqets.com/demo/v1/paqqets`, paqqet, {
        headers: { 'Authorization': getToken() }

      }).then(async (response) => {
        if (response.data.status === "SUCCESS") {
          batchId = response.data.batchTransactionId
          if (response.data.batchTransactionId) {

            setTimeout(function () {
              let finalcall = fetch(`https://api.paqqets.com/demo/v1/paqqets/${batchId}`, {
                method: 'PUT',
                headers: new Headers({ 'Authorization': getToken() })
              }).then(data => {
                setLoading(false);
                setMessage(true);
              }).catch((error) => {
                setLoading(false);
                setError(true)
                // refresh();
              });
            }, 2000);
            refresh();
          }
        }
      }).catch((error) => {
        setErrormessage(error.response.data.errors[0].message);
        setLoading(false);
        // refresh();
      })
    }
  }


  const validatePhoneNumber = (phoneNumber) => {
    /*
    Phone number validation using google-libphonenumber
    */
    let valid = false;
    try {
      const phoneUtil = PhoneNumberUtil.getInstance();
      valid = phoneUtil.isValidNumber(phoneUtil.parse(phoneNumber));
    } catch (e) {
      valid = false;
    }
    if (valid) {
      setMessages("");
      setColor("");

      setShowPhoneMessage('');
      setPhoneValid(false);
    } else {
      setMessages('Phone number' + phoneNumber + ' is not valid');
      setColor('red');
      setShowPhoneMessage('Phone number ' + phoneNumber + ' is not valid');

      setPhoneValid(true);
    }
  }

  const getValidNumber = (phoneNumber) => {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const parsedNumber = phoneUtil.parse(phoneNumber);
    return phoneUtil.format(parsedNumber, PhoneNumberFormat.INTERNATIONAL)
  }

  if (!islogin && !contacts) {
    return (
      <div className="card-widths">
        <div className="header">
          {/* <span className="pq-bird"></span> */}
          <div className="form-row">
            <div className="form-group col-xs-6">
              <img className="logo-image" src={require('./paqqet-logo.png')} />
            </div>

            <div className="form-group col-xs-6">
              {/* <i className="fas fa-home embar"></i> */}
              <Menu>
                <MenuButton className="menu-button">
                  <i className="fas fa-bars embar"></i>
                </MenuButton>
                <MenuList>
                  <MenuItem className="menu-label">Hi {user}</MenuItem>
                  <MenuItem onSelect={sendpaqqetshow} className="menu-label"><i className="fas fa-paper-plane  menu-icon"></i>Send Paqqet</MenuItem>
                  <MenuItem onSelect={contact} className="menu-label"><i className="fas fa-users menu-icon"></i>Contacts</MenuItem>
                  <MenuItem onSelect={logout} className="menu-label"><i className="fas fa-sign-out-alt menu-icon"></i>
                    logout
                    </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
        <div className="paq">
          <div className="form-row">
            <div className="form-group col-xs-11">
              <input type="text" id="responderName" className="to" placeholder="To Name(*)" name="responderName" value={responderName} onChange={handleresponderName} required  ></input>
            </div>
            <div className="form-group col-xs-1 btn-search">
              <input type="button" className="btns btn-search-primary" value={'Search'} onClick={contactsearch} /><br />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-xs-3">
              <select name="channel" value={channel} onChange={handlechannel} required>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
            </div>
            <div className="form-group col-xs-9 value-address">
              {!showPhone && <input type="text" className="email-value value-address" id="value" required name="value" value={value} onChange={handlevalue} placeholder="Email(*)" />}
              {showPhone &&
                <select value={countryCode} className="drop-down country-drop " onChange={countyCodeChange} required>
                  {country.map((items) => {

                    return (

                      <option value={items.dial_code} >{items.code}</option>
                    )
                  })}
                </select>
              }
              {showPhone && <input type="text" className="phone-field" id="value" maxlength="10" required name="value" value={phone} onChange={phoneChange} placeholder="Phone(*)" />}
            </div>
            {isValid && <div className="errortext err"> Please enter  valid email address</div>}
            <div className="errortext err" style={{ color: color }}>
              {messages}
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-xs-12">
              <label>Send verification  code for content retrieval to:</label>
            </div>
          </div>
          <div className="form-row row-sep">
            <div className="form-group col-xs-3">
              <select value={factorType} onChange={handleFactorChange} name="factorType" required>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="NONE">None</option>
              </select>
            </div>
            <div className="form-group col-xs-2"></div>
            <div className="form-group col-xs-7 group">
              {!showemailFactor && !showphoneFactor && <input id="auth" disabled={!showemailFactor && !showphoneFactor} className="address" />}
              {showemailFactor && <input id="auth" className="address" value={value} onChange={handlevalue} placeholder="Email(*)" />}
              {showphoneFactor &&
                <select name="code" className="phone-drop" value={countryCode} onChange={countyCodeChange} required>
                  {country.map((items) => {
                    return (
                      <option value={items.dial_code} key={items.dial_code}>{items.code}</option>
                    )
                  })}
                </select>
              }
              {showphoneFactor && <input type="text" min="1" className="phone-field" id="value" required name="value" maxlength="10" value={phone} onChange={phoneChange} placeholder="Phone(*)" />}
            </div>
            {showemailError && <div className="errortext err"> Please enter  valid email address</div>}
            <div className="errortext err" style={{ color: color }}>
              {showPhoneMessage}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-xs-4">
              <input className="checkk-box-toggle" type="checkbox" checked={faveContactChecked} value={faveContactChecked} onChange={saveFavorite} />

            </div>
            <label className="checkbox">
              Save to favorites
              </label>


            <div className="form-group col-xs-4 check-box">
              <input onChange={saveContact} checked={contactChecked} value={contactChecked} className="checkk-box-toggle" type="checkbox" />
            </div>
            <label className="checkbox">
              Save to contacts
              </label>
            <div className="form-group col-xs-4">
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-xs-6">
              <select value={fileType} onChange={transactionChange} name="factorType" required>
                <option value="push">Send Files</option>
                <option value="pull">Retrive Files</option>
              </select>
            </div>
          </div>
          {sendfiles === false && <div className="form-row">
            <div className="form-group col-xs-12">
              <textarea id="sendMessage" placeholder="Optional Message" className="text-area" value={optionalMessage} onChange={optionalChange}></textarea>
            </div>
          </div>}

          <div className="form-row">
            <div className="bottom-space">
              {sendfiles === false && <div >{getJSONArray}</div>}
              {sendfiles === true && <div className={getJSONArraydes.length >= 2 ? "applyHeight" : ""} >{getJSONArraydes}</div>}

            </div>
            <div className="form-group col-xs-6 add-send">
              {sendfiles === false && <button id="add" value="Add" className="btns-add" onClick={OnClickAddAnotherFile} disabled={getJSONArray.length === getFilesPerPaqqetLimit}>+ Add Another File</button>}
              {sendfiles === true && <button id="add" value="Add" className="btns-add" onClick={OnClickAddAnotherFileDescription} disabled={getJSONArraydes.length === getFilesPerPaqqetLimit}>+ Add Another File</button>}
            </div>
            <div className="form-group col-xs-6 add-send send">
              <input type="button" onClick={handleSubmit} className="btn btn-paq btn-send btn-nav" value={loading ? 'Sending.....' : 'Send Paqqet'} disabled={responderName === '' || value === '' && (phone === '' || phoneValid) || emailValid || rsName || phoneValid} />
            </div>
            <div className="form-group col-xs-12">
              {message ? <span className="popuptext" id="myPopup">Paqqet sent successfully.</span> : ''}
              {errorMessage ? <span className="errortext" id="myPopup">{errorMessage}</span> : ''}
              {error ? <span className="errortext" id="myPopup">Sending paqqet failed</span> : ''}
            </div>

          </div>
        </div>
        <div className="footer">
          <p className="copy-right"> © {new Date().getFullYear()} Paqqets, LLC | All Rights Reserved.</p>
        </div>
      </div>
    )
  }
  else if (contacts && !islogin) {
    return <Contacts searchedName={responderName} />
  }
  else {
    return <Login />
  }
}
export default Paqqets;