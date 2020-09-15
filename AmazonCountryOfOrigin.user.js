// ==UserScript==
// @name        AmazonCountryOfOrigin
// @namespace   MrBrax
// @match       https://www.amazon.de/*
// @match       https://www.amazon.com/*
// @match       https://www.amazon.co.uk/*
// @grant       none
// @updateURL   https://github.com/MrBrax/AmazonCountryOfOrigin/raw/master/AmazonCountryOfOrigin.user.js
// @version     1.04
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
    /^Logitech K280e/i,
    
    'SteelSeries Rival 100',
    'SteelSeries Rival 310',
    
    'Apple Magic Mouse 2',
    
    'Microsoft Bluetooth Mouse',
    
    'Razer DeathAdder',

    /Sony MDR-?ZX310AP\s/i,

    /^Motorola One Zoom/i,

    /DualShock 4/i,
    /^xbox one wireless controller/i,
    /^Xbox Elite Wireless Controller/i,
    /^Xbox Wireless Controller/i,
    /^Xbox\s360\sController/i,
    
    /Nintendo Switch Pro Controller/i,

    /^Apple AirPods/i,
    /^Apple iPhone/i,
    /^Apple Pencil/i,

    /^Samsung Galaxy/i, // charged until proven guilty

    /^SanDisk (Ultra|Extreme)/i,

    /^Fujifilm X-T/i,
    
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
    /^OPPO/i,
    /^POCO/i,
    /^OnePlus^/i,
    /^Huawei/i,
    /^Soundcore/i,
    /^OneOdio/i,
    /^JBL/i, // unsure
    /^AUKEY/i, // unsure
    /^TP\-Link/i,
    /^ZTE/i,
    /^DJI/i,
    /^LeadsaiL/i,
    /^Speedlink/i,
    /^Jelly Comb/i,
    /^Hisense/i,
    /^Fiio/i,
    /^Lenovo/i,
    /^Motorola/i,
    /^HKC/i,
    /^HiQuick/i,
    /^Intenso/i, // unsure
  ],
  'taiwan': [
    'SteelSeries QcK',
    // /^ASUS/i,
  ],
  'thailand': [
    /Sony MDR-?ZX310\s/,
    'HP Tango',
    /^(WD|Western Digital) Elements Desktop/i,
    /^(WD|Western Digital) [0-9]+\s?TB (Elements Desktop|My Cloud)/i,
    /^(WD|Western Digital) [0-9]+\s?TB /i,
    /^(WD|Western Digital) Red Internal/i,
    /^(WD|Western Digital) Blue/i,
    /^My Book Desktop/i,
  ],
  'korea': [
    /^Nvidia Shield.? TV/i,
    /^Samsung EVO Select/i,
  ],
  'vietnam': [
    /Korg TM-?60/i
  ],
  'indonesia': [

  ],
  'malaysia': [
    /^(WD|Western Digital) Elements (Portable|External)/i,
    /^(WD|Western Digital) My Passport/i
  ],
  'uk': [
    /^Raspberry\sPi\s4/i,
  ],
  'multiple': [
    /^Varta/i
  ]
};

let flags = {
  "china": "🇨🇳",
  "taiwan": "🇹🇼",
  "thailand": "🇹🇭",
  "korea": "🇰🇷",
  "vietnam": "🇻🇳",
  "indonesia": "🇮🇩",
  "malaysia": "🇲🇾",
  "uk": "🇬🇧",
  "multiple": "❗",
};

function applyFlag( baseElement, titleElement ){

  console.debug("apply flag", baseElement, titleElement);

  if(baseElement.applied){
    console.debug("already applied", baseElement);
    return;
  }

  let found = false;
  let flag_string = "";

  let text = titleElement.innerText.toLowerCase().trim();

  if( text.substring(0, 1) == "€" || text.substring(0, 1) == "$" ) return;

  console.debug( titleElement, text );

  for( let country in database){
    let products = database[country];
    for( let product of products){
      if( typeof product == "string" ? ( text.indexOf(product.toLowerCase()) !== -1 ) : ( text.match(product) ) ){
        console.log("found", text, country);
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
  titleElement.prepend(flag);

  if( flag_string == "china" ){
    titleElement.style.color = "#f00";
    baseElement.style.backgroundColor = '#fdb1b1';
  }

  baseElement.applied = true;

}

let isProductPage = location.href.match("/dp/");

/*
let titles;

if( isProductPage ){
  titles = document.querySelectorAll("#productTitle");
}else{
  titles = document.querySelectorAll("span.a-size-medium, span.a-text-normal, h2.s-access-title, #productTitle");
}

for( let title of titles ){
  console.debug("Titles");
  applyFlag(title);
}
*/

function runScript(){

  let searchResults = document.querySelectorAll("div.s-result-item");
  if( searchResults ){
    for( let element of searchResults ){
      let title = element.querySelector("span.a-size-medium");
      if(title) applyFlag(element, title);
    }
  }

  let octopus = document.querySelectorAll("li.octopus-pc-item");
  if( octopus ){
    for( let element of octopus ){
      let title = element.querySelector("div.octopus-pc-asin-title");
      if(title) applyFlag(element, title);
    }
  }

  let historyBoxes = document.querySelectorAll("div.asin_container");
  if( historyBoxes ){
    for( let element of historyBoxes ){
      let title = element.querySelector("div.p13n-sc-truncated");
      if(title) applyFlag(element, title);
    }
  }

  let carouselContainers = document.querySelectorAll("ol.a-carousel");
  if( carouselContainers ){
    for( let element of carouselContainers ){
      let carouselCards = element.querySelectorAll("li.a-carousel-card");
      for( let card of carouselCards ){
        let title = card.querySelector("span.a-text-normal, div.sponsored-products-truncator-truncated, div.p13n-sc-truncated");
        if(title) applyFlag(card, title);
      }
    }
  }

  let productPage = document.querySelector("#ppd");
  if( productPage ){
    let title = productPage.querySelector("#productTitle");
    if(title) applyFlag(productPage, title);
  }

}

runScript();

setInterval(runScript, 5000); // find a better way to do this


/*
let comparisonTitles = document.querySelectorAll("th.comparison_image_title_cell span.a-size-base");
if( comparisonTitles ){
  for( let title of comparisonTitles ){
    console.debug("Comparison titles");
    applyFlag(title);
  }
}

let alsoViewedTitles = document.querySelectorAll("li.a-carousel-card div.p13n-sc-truncate-mobile-type");
if( alsoViewedTitles ){
  for( let title of alsoViewedTitles ){
    console.debug("Also viewed titles");
    applyFlag(title);
  }
}
*/