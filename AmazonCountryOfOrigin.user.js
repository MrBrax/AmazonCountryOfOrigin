// ==UserScript==
// @name        AmazonCountryOfOrigin
// @namespace   MrBrax
// @match       https://www.amazon.de/*
// @match       https://www.amazon.com/*
// @match       https://www.amazon.co.uk/*
// @match       https://www.inet.se/*
// @match       https://www.netonnet.se/*
// @match       https://www.prisjakt.nu/*
// @grant       none
// @updateURL   https://github.com/MrBrax/AmazonCountryOfOrigin/raw/master/AmazonCountryOfOrigin.user.js
// @version     1.08
// @author      -
// @description 14/09/2020, 15:30:49
// ==/UserScript==

let database = {
	'china': [
		/^Logitech M185/i,
		/^Logitech M187/i,
		/^Logitech M100/i,
		/^Logitech B100/i,
		/^Logitech M705/i,
		/^Logitech G203/i,
		/^Logitech MX Ergo/i,
		/^Logitech MX Master/i,
		/^Logitech K280e/i,
		/^Logitech G PRO/i,
		
		'SteelSeries Rival 100',
		'SteelSeries Rival 310',
		
		'Apple Magic Mouse 2',
		
		'Microsoft Bluetooth Mouse',
		
		/Razer DeathAdder/i,
		/Razer Basilisk/i,

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
		/^Apple iPad/i,
		/^Apple Pencil/i,
		/^Apple MacBook/i,

		/^Samsung Galaxy/i, // charged until proven guilty

		/^SanDisk (Ultra|Extreme)/i,

		/^Fujifilm X-T/i,

		/^NETGEAR Nighthawk/i,
		
		// broad range
		/^Anker/i,
		/^AmazonBasics/i,
		/^Xiaomi/i,
		/^OPPO/i,
		/^POCO/i,
		/^OnePlus^/i,
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
		/^(QueenDer|VOXON|Rii|Jelly Comb|Speedlink|LeadsaiL|OneOdio|Soundcore|JAMSWALL|UtechSmart|VicTsing|EasyULT|TOPELEK|PASONOMI|Holife|AOMEES|CSL|RuoCherg|VOGEK|Teck?Net|Leolee|VAYDEER|Inphic|JETech|TedGem|Idesion)\s/i, // whitelabel
	],
  	'taiwan': [
		'SteelSeries QcK',
		/^Corsair\sVengeance/i,
		// /^ASUS/i,
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
  	],
  	'indonesia': [

  	],
  	'malaysia': [
    	/^(WD|Western Digital) Elements (Portable|External)/i,
    	/^(WD|Western Digital) My Passport/i,
    	/^AMD Ryzen/i,
  	],
  	'uk': [
    	/^Raspberry\sPi\s4/i,
  	],
  	'multiple': [
    	/^Varta/i,
    	/^Samsung (Electronics)? EVO Select/i,
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
		// flag.style.fontFamily = "Twitter Color Emoji, Arial";
		flag.style.letterSpacing = 0;
		titleElement.prepend(flag);
	  
		if( flag_string == "china" ){
			this.applyWarning( titleElement, baseElement );
		}
	  
		baseElement.applied = true;
	  
	}

	applyWarning( titleElement, baseElement ){
		titleElement.style.color = "#f00";
		baseElement.style.backgroundColor = '#fdb1b1';
	}

	runScript(){
		console.error("No site");	
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
				let title = element.querySelector("span.a-size-medium");
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

		let productPage = document.querySelector("#ppd");
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
		console.log("Found " + results.length + " results");
		for( let element of results ){
			let title = element.querySelector("h3");
			if(title) this.applyFlag(element, title);
		}
		
		let productPage = document.querySelector("div.product-leftInfo");
		if( productPage ){
			let title = productPage.querySelector("div.subTitle h1");
			if(title) this.applyFlag(productPage, title);
		}
	}

}

let coc;

let url = window.location.hostname;

if( url == "www.netonnet.se" ){
	coc = new NetOnNet();
}

if( url == "www.inet.se" ){
	coc = new Inet();
}

if( url.startsWith("www.amazon.") ){
	coc = new Amazon();
}

if( url == "www.prisjakt.nu" ){
	coc = new Prisjakt();
}

if( coc ){
	coc.runScript();
	setInterval(coc.runScript.bind(coc), 5000); // find a better way to do this
}else{
	console.error("No site found");
}
