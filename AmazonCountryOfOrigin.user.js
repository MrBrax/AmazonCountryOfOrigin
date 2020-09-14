// ==UserScript==
// @name        AmazonCountryOfOrigin
// @namespace   MrBrax
// @match       https://www.amazon.de/*
// @match       https://www.amazon.com/*
// @match       https://www.amazon.co.uk/*
// @grant       none
// @version     1.0
// @author      -
// @description 14/09/2020, 15:30:49
// ==/UserScript==

let database = {
  'china': [
    'Logitech M185',
    'Logitech M187',
    'Logitech M100',
    'Logitech B100',
    'Logitech M705',
    'Logitech MX Ergo',
    
    'SteelSeries Rival 100',
    'SteelSeries Rival 310',
    
    'Apple Magic Mouse 2',
    
    'Microsoft Bluetooth Mouse',
    
    'Razer DeathAdder',

    /^Motorola One Zoom/i,

    /DualShock 4/i,
    /^xbox one wireless controller/i,
    /^Xbox Elite Wireless Controller/i,
    /^Xbox Wireless Controller/i,
    
    /Nintendo Switch Pro Controller/i,
    
    // broad range
    'Holife',
    'PASONOMI',
    'TOPELEK',
    'Anker',
    'AmazonBasics',
    'EasyULT',
    'VicTsing',
    'UtechSmart',
    /^JAMSWALL/i,
    /^Xiaomi/i,
    /^Huawei/i
  ],
  'taiwan': [
    'SteelSeries QcK',
  ],
  'thailand': [
    /Sony MDR-?ZX310/,
    'HP Tango',
    /^(WD|Western Digital) Elements Desktop/i,
    /^(WD|Western Digital) [0-9+]TB Elements Desktop/i,
  ],
  'korea': [
    /^Nvidia Shield.? TV/i,
  ],
  'vietnam': [
    /Korg TM-?60/i
  ],
  'indonesia': [

  ],
  'malaysia': [
    /^(WD|Western Digital) Elements (Portable|External)/i,
    /^(WD|Western Digital) My Passport/i
  ]
};

let flags = {
  "china": "🇨🇳",
  "taiwan": "🇹🇼",
  "thailand": "🇹🇭",
  "korea": "🇰🇷",
  "vietnam": "🇻🇳",
  "indonesia": "🇮🇩",
  "malaysia": "🇲🇾"
};

let titles = document.querySelectorAll("span.a-size-medium, span.a-text-normal, #productTitle");

if( titles.length == 0){
  console.error("Found no titles");
}

for( let title of titles ){

  let found = false;
  let flag_string = "";

  let text = title.innerText;

  if( text.substring(0, 1) == "€" || text.substring(0, 1) == "$" ) continue;

  for( let country in database){
    let products = database[country];
    for( let product of products){
      if( typeof title == "string" ? ( text.toLowerCase().indexOf(product.toLowerCase()) !== -1 ) : ( text.match(product) ) ){
        found = true;
        flag_string = country;
        break;
      }
    }
  }

  let flag = document.createElement("span");
  flag.className = "flag";
  flag.innerHTML = flag_string ? flags[flag_string] : "❓";
  flag.title = flag_string;
  flag.style.display = "inline-block";
  flag.style.marginRight = "3px";
  flag.style.fontSize = "1em";
  title.prepend(flag);

  if( flag_string == "china" ){
    title.style.color = "#f00";
  }

}