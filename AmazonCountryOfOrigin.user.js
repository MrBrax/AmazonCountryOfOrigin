// ==UserScript==
// @name        AmazonCountryOfOrigin
// @namespace   MrBrax
// @match       https://www.amazon.se/*
// @match       https://www.amazon.de/*
// @match       https://www.amazon.com/*
// @match       https://www.amazon.co.uk/*
// @match       https://www.inet.se/*
// @match       https://www.netonnet.se/*
// @match       https://www.prisjakt.nu/*
// @match       https://www.komplett.se/*
// @grant       none
// @updateURL   https://github.com/MrBrax/AmazonCountryOfOrigin/raw/master/AmazonCountryOfOrigin.user.js
// @version     1.18
// @author      -
// @description 14/09/2020, 15:30:49
// ==/UserScript==

let hideEntries = false;

let database = {
    'china': [

        // mice
        /^Logitech (M90|M185|M187|M100|B100|B220|M235|M310|M325|M705|M570|G203|MX Ergo|MX Master|K280e|G PRO)/i,
        /^SteelSeries Rival (100|310|650|710|3\s)/i,
        /^SteelSeries Sensei Ten/i,
        /^Microsoft (Bluetooth Mouse|Pro IntelliMouse)/i,
        /^Svive Proteus 3360/i,
        /^ASUS ROG (PUGIO II|Gladius II)/i,
        /^Razer (Basilisk|Mamba Elite)/i,
        /^HyperX (Pulsefire Surge|Pulsefire Dart)/i,
        /^Corsair Gaming (Harpoon|Dark Core)/i,
        /^iiglo (M310|M320WL)/i,
        /^ROCCAT Kain 120/i,

        // headphones
        /Sony MDR-?ZX310AP\s/i,
        /^Marshall Major III/i,

        // controllers
        /DualShock 4/i,
        /^xbox one wireless controller/i,
        /^(Microsoft\s)?Xbox Elite Wireless Controller/i,
        /^Microsoft Xbox One Elite Controller/i,
        /^Xbox Wireless Controller/i,
        /^Xbox\s360\sController/i,
        /Nintendo Switch Pro Controller/i,

        // monitors
        /^LG 27UL850/i,

        // all apple stuff is made in china
        /^Apple AirPods/i,
        /^Apple iPhone/i,
        /^Apple iPad/i,
        /^Apple Pencil/i,
        /^Apple MacBook/i,
        /^Apple Magic Trackpad/i,
        /^Apple Magic Mouse 2/i,

        // phones
        /^Sony Xperia 5 II/i,
        /^Motorola One Zoom/i,
        /^Nokia 7\.2/i,

        /^Samsung Galaxy/i, // charged until proven guilty

        /^SanDisk (Ultra|Extreme)/i,

        // cameras
        /^Fujifilm X-T/i,

        /^NETGEAR Nighthawk/i,

        // laptops
        /^Asus VivoBook/i,
        /^Asus ZenBook/i,
        /^Acer (Aspire|Nitro|Swift)/i,
        /^Aspire (3|5|7)/i, // acer
        /^MSI G(L|E|F|S)([0-9]{2})/i,

        /^Elgato Thunderbolt/i,
        
        // broad range
        /^Anker/i,
        /^AmazonBasics/i,
        /^Xiaomi/i,
        /^OPPO/i,
        /^POCO/i,
        /^OnePlus/i,
        /^Huawei/i,
        /^JBL/i, // unsure
        /^AUKEY/i, // unsure
        /^TP\-Link/i,
        /^ZTE/i,
        /^DJI/i,
        /^Hisense/i,
        /^Fiio/i,
        /^Lenovo/i,
        /^Motorola/i,
        /^HKC/i,
        /^HiQuick/i,
        /^Intenso/i, // unsure
        /^Roku/i, // assembled in china
        /^Ubiquiti/i, // unsure
        /^AOC/i, // owned by TPV technology,
        /^TCL/i,
        /^Andersson/i, // netonnet
        /^Divoom/i,
        /^8Bitdo/i,
        /^OTL\s/i, // pretty sure - https://www.otltechnologies.com/about
        /^MPOW\s/i,
        /^ENACFIRE/i,
        /^HONOR/i,
        /^DoCooler/i,
        // /^Elgato/i, // hong kong
        /^(QueenDer|VOXON|Rii|Jelly Comb|Speedlink|LeadsaiL|OneOdio|Soundcore|JAMSWALL|UtechSmart|VicTsing|EasyULT|TOPELEK|PASONOMI|Holife|AOMEES|CSL|RuoCherg|VOGEK|Teck?Net|Leolee|VAYDEER|Inphic|JETech|TedGem|Idesion|EasySMX|BIMONK|Gezimetie|PowerLead|ipega)\s/i, // whitelabel
    ],
    'taiwan': [
        /^Elgato Game Capture HD60 PRO/i,
        /^Elgato Game Capture HD60 S/i,
        
        'SteelSeries QcK',
        /^Corsair\sVengeance/i,
        /^Razer Naga Trinity/i, // unsure
    ],
    'thailand': [
        /Sony MDR-?ZX310\s/,
        'HP Tango',
        /^(WD|Western Digital) Elements Desktop/i,
        /^(WD|Western Digital) [0-9]+\s?TB (Elements Desktop|My Cloud)/i,
        /^(WD|Western Digital) [0-9]+\s?TB /i,
        /^(WD|Western Digital) Red Internal/i,
        /^(WD|Western Digital) (Blue|Red|Black|Gold)/i,
        /^My Book Desktop/i,
        /^Seagate (BarraCuda|IronWolf|FireCuda)/i,
    ],
    'korea': [
        /^Nvidia Shield.?\s?(Android)?\s?TV/i,
        /^Samsung ([0-9]+) EVO/i,
    ],
    'vietnam': [
        /Korg TM-?60/i,
        /^Google Nest/i,
        /^Google Pixel 4a/i,
        /^Sony WH-CH510/i, // unsure
    ],
    'indonesia': [

    ],
    'malaysia': [
        /^(WD|Western Digital) Elements (Portable|External)/i,
        /^(WD|Western Digital) My Passport/i,
        /^AMD Ryzen/i,
        /^Sony WH-CH510/i, // unsure
    ],
    'uk': [
        /^Raspberry\sPi\s4/i,
    ],
    'multiple': [
        /^Varta/i,
        /^Samsung (Electronics)? EVO Select/i,
        /^Razer (Viper|Deathadder)/i,
    ],
    'israel': [
        // carbonation
        // /^Soda\s?Stream (Spirit|Jet|Power|Genesis|Cool|Crystal)/i,
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

class CountryOfOrigin {

    constructor(){
        this.warningBackground = '#fdb1b1';
    }

    applyFlag( baseElement, titleElement ){

        // console.debug("apply flag", baseElement, titleElement);
      
        if( baseElement.querySelector("span.flag") ){
            // console.debug("already applied", baseElement);
            return;
        }
      
        let found = false;
        let flag_string = "";
      
        let text = titleElement.innerText.toLowerCase().trim();
      
        if( text.substring(0, 1) == "€" || text.substring(0, 1) == "$" ) return;
      
        console.debug( baseElement, titleElement, text );

        let flags_key = [];
        
        for( let country in database){
            let products = database[country];
            for( let product of products){
                if( typeof product == "string" ? ( text.indexOf(product.toLowerCase()) !== -1 ) : ( text.match(product) ) ){
                    // console.log("found", text, country);
                    // found = true;
                    // flag_string = country;
                    flags_key.push(country);
                    // break;
                }
            }
        }

        for(let flag_string of flags_key ){
            let flag = document.createElement("span");
            flag.className = "flag";
            flag.innerHTML = flag_string ? flags[flag_string] : "❓";
            flag.title = flag_string;
            flag.style.display = "inline-block";
            flag.style.marginRight = "3px";
            flag.style.fontSize = "1em";
            // flag.style.fontFamily = "Twitter Color Emoji, Arial";
            flag.style.letterSpacing = 0;
            titleElement.prepend(flag);
        }
      
        if( flags_key.indexOf("china") !== -1 ){
            if( hideEntries ) baseElement.style.display = "none";
            this.applyWarning( titleElement, baseElement );
        }
      
        baseElement.applied = true;
      
    }

    applyWarning( titleElement, baseElement ){
        titleElement.style.color = "#f00";
        baseElement.style.backgroundColor = '#fdb1b1';
    }

    runScript(){
        // console.error("No site");	
    }

}

class Amazon extends CountryOfOrigin {

    constructor(){
        super();
    }

    runScript(){
        let searchResults = document.querySelectorAll("div.s-result-item");
        if( searchResults ){
            for( let element of searchResults ){
                console.log(element);
                let title = element.querySelector("span.a-size-medium, span.a-text-normal");
                if(title) this.applyFlag(element, title);
            }
        }

        let octopus = document.querySelectorAll("li.octopus-pc-item");
        if( octopus ){
            for( let element of octopus ){
                let title = element.querySelector("div.octopus-pc-asin-title");
                if(title) this.applyFlag(element, title, "octopus");
            }
        }

        let resultList = document.querySelectorAll("li.s-result-item");
        if( resultList ){
            for( let element of resultList ){
                let title = element.querySelector("h2.s-access-title");
                if(title) this.applyFlag(element, title);
            }
        }

        let historyBoxes = document.querySelectorAll("div.asin_container");
        if( historyBoxes ){
            for( let element of historyBoxes ){
                let title = element.querySelector("div.p13n-sc-truncated");
                if(title) this.applyFlag(element, title);
            }
        }

        let carouselContainers = document.querySelectorAll("ol.a-carousel");
        if( carouselContainers ){
            for( let element of carouselContainers ){
                let carouselCards = element.querySelectorAll("li.a-carousel-card");
                for( let card of carouselCards ){
                    let title = card.querySelector("span.a-text-normal, div.sponsored-products-truncator-truncated, div.p13n-sc-truncated");
                    if(title) this.applyFlag(card, title);
                }
            }
        }

        let productPage = document.querySelector("#ppd, #centerCol");
        if( productPage ){
            let title = productPage.querySelector("#productTitle");
            if(title) this.applyFlag(productPage, title);
        }
    }

    applyWarning( titleElement, baseElement, source ){
        titleElement.style.color = "#f00";
        baseElement.style.backgroundColor = '#fdb1b1';
        if( source == "octopus" ) baseElement.querySelector("div.octopus-pc-asin-info-section").style.backgroundColor = this.warningBackground;
    }	
    
}

class Inet extends CountryOfOrigin {

    constructor(){
        super();
    }

    runScript(){
        let results = document.querySelectorAll("div.product-list ul li");
        for( let element of results ){
            let title = element.querySelector("h4");
            if(title) this.applyFlag(element, title);
        }
        
        let productPage = document.querySelector("article.product-page");
        if( productPage ){
            let title = productPage.querySelector("header h1");
            if(title) this.applyFlag(productPage, title);
        }
    }

}

class Komplett extends CountryOfOrigin {

    constructor(){
        super();
    }

    runScript(){
        let results = document.querySelectorAll("div.product-list-item");
        for( let element of results ){
            let title = element.querySelector("div.text-content h2");
            if(title) this.applyFlag(element, title);
        }
        
        let productPage = document.querySelector("div.product-page");
        if( productPage ){
            let title = productPage.querySelector("h1.product-main-info-webtext1");
            if(title) this.applyFlag(productPage, title);
        }
    }

}

class NetOnNet extends CountryOfOrigin {

    constructor(){
        super();
    }

    runScript(){
        let results = document.querySelectorAll("div.cProductItem");
        for( let element of results ){
            let title = element.querySelector("div.panel-body div.subTitle");
            if(title) this.applyFlag(element, title);
        }
        
        let productPage = document.querySelector("div.product-leftInfo");
        if( productPage ){
            let title = productPage.querySelector("div.subTitle h1");
            if(title) this.applyFlag(productPage, title);
        }
    }

    applyWarning( titleElement, baseElement ){
        titleElement.style.color = "#f00";
        baseElement.style.backgroundColor = this.warningBackground;
        baseElement.querySelector("div.panel").style.backgroundColor = this.warningBackground;
        baseElement.querySelector("div.footer").style.backgroundColor = this.warningBackground;
    }

}

class Prisjakt extends CountryOfOrigin {

    constructor(){
        super();
    }

    runScript(){
        let results = document.querySelectorAll("tr.Tr-sc-1stvbsu-1");
        // console.log("Found " + results.length + " results");
        for( let element of results ){
            let title = element.querySelector("h3");
            if(title) this.applyFlag(element, title);
        }
        
        let productPage = document.querySelector("header.product-header");
        if( productPage ){
            let title = productPage.querySelector("div.product-header--content h1");
            if(title) this.applyFlag(productPage, title);
        }
    }

}

let coc;

let url = window.location.hostname;

if( url == "www.netonnet.se" ){
    coc = new NetOnNet();
}else if( url == "www.inet.se" ){
    coc = new Inet();
}else if( url.startsWith("www.amazon.") ){
    coc = new Amazon();
}else if( url == "www.prisjakt.nu" ){
    coc = new Prisjakt();
}else if( url == "www.komplett.se" ){
    coc = new Komplett();
}else{
    console.error("Found no matching site");
}

if( coc ){
    coc.runScript();
    setInterval(coc.runScript.bind(coc), 5000); // find a better way to do this

    window.addEventListener('urlchange', (info) => {
        console.debug("url changed", info);
        coc.runScript();
    });

    window.addEventListener('popstate', (info) => {
        console.debug("popstate", info);
        coc.runScript();
    });

    window.addEventListener('hashchange', (info) => {
        console.debug("hash changed", info);
        coc.runScript();
    });
    
}else{
    console.error("No site found");
}
