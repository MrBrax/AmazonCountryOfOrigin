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

    /^Motorola One Zoom/,
    
    // broad range
    'Holife',
    'PASONOMI',
    'TOPELEK',
    'Anker',
    'AmazonBasics',
    'EasyULT',
    'VicTsing',
    'UtechSmart'
  ],
  'taiwan': [
    'SteelSeries QcK'
  ],
  'thailand': [
    /Sony MDR-?ZX310/,
    'HP Tango'
  ],
  'korea': [
    /^Nvidia Shield.? TV/i,
  ],
  'vietnam': [
    /Korg TM-?60/i
  ],
  'indonesia': [

  ]
};

let flags = {
  "china": "🇨🇳",
  "taiwan": "🇹🇼",
  "thailand": "🇹🇭",
  "korea": "🇰🇷",
  "vietnam": "🇻🇳",
  "indonesia": "🇮🇩",
};

let titles = document.querySelectorAll("span.a-size-medium, span.a-text-normal, #productTitle");

if( titles.length == 0){
  console.error("Found no titles");
}

for( let title of titles ){

  let found = false;
  let flag_string = "";

  for( let country in database){
    let products = database[country];
    for( let product of products){
      if( typeof title == "string" ? ( title.innerText.toLowerCase().indexOf(product.toLowerCase()) !== -1 ) : ( title.innerText.match(product) ) ){
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