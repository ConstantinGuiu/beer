// CALLING THE FUNCTION THAT GETS DATA

window.onload = setInterval(getInfo, 500);

let ids = [];
let hefeBeer = 0;
let fairyBeer = 0;
let gitBeer = 0;
let hollaBeer = 0;
let hoppiBeer = 0;
let mowinBeer = 0;
let rowBeer = 0;
let ruinBeer = 0;
let sleighBeer = 0;
let steamBeer = 0;
let spent0and5 = 0;
let spent5and15 = 0;
let spent15and35 = 0;
let spent35 = 0;

let layer = document.querySelector("#toplayer");

// GETTING DATA FUNCTION

function getInfo(){

    // I USED JSON.parse() TO TRANSFORM THE DATA INTO A JASON
    let info = JSON.parse(FooBar.getData(true));
    // console.log(info);
    
    // SHOWING THE QUEUE

    let queue = info.queue.length;
    let served = info.serving[0].id;
    document.querySelector('#queue span').textContent = queue;
    let percentQueue = queue*4;
    layer.style.width= percentQueue+"%";
    document.querySelector('#served span').textContent = served;

    // ARROW FUNCTION USED TO CHANGE THE TAP IMAGES IN THE TEMPLATE RELATED TO THE BARTENDERS STATUS
    
    const templateBartender = document.querySelector('#bartenderTemplate').content;
    const parentBartender = document.querySelector('#taps');
    parentBartender.innerHTML = '';
    info.bartenders.forEach(bartender=>{
        const tapStatus = bartender.statusDetail;
        tapImageSrc = "images/taps/tap_" + tapStatus + ".png";
            //I HAVE MORE IMAGES RENAMED BY THE BARTENDERS STATUS.
        const cloneTap = templateBartender.cloneNode(true);
        const currentTap = cloneTap.querySelector('.tap');
        currentTap.setAttribute('src', tapImageSrc);
        cloneTap.querySelector('#bartenderNameSpan').textContent = bartender.name;
        cloneTap.querySelector('#bartenderStatusSpan').textContent = bartender.statusDetail;
        parentBartender.appendChild(cloneTap);
    })

    // ARROW FUNCTION TO SHOW THE STATUS OF THE KEGS

    const templateKeg = document.querySelector('#kegTemplate').content;
    const parentKeg = document.querySelector('#kegs');
    parentKeg.innerHTML = '';
    info.taps.forEach(tap=>{
        const beerName = String(tap.beer).replace(/\s+/g, '');
            // I HAD TO USE .replace  BECAUSE THE BEERS WITH A SPACE OR MORE IN THE NAME
            // DID'T WORK
            // https://css-tricks.com/snippets/javascript/strip-whitespace-from-string/
        const beerTypeSrc = "images/kegs/" + beerName;
            // CALCULATE THE LEVEL IN PERCENTAGE SO I CAN PLAY LATER WITH IT
        const beerTypeLvl = 100 - tap.level * .04;
        const beerLvlInLitres = tap.level / 100;
        
        const cloneKeg = templateKeg.cloneNode(true);
        const beerLvlContainer = cloneKeg.querySelector('span');
        const beerFullLabel = cloneKeg.querySelector('.fullkeg');
        const emptyKeg = cloneKeg.querySelector('.kegimg');

        beerLvlContainer.textContent = beerLvlInLitres;
        beerFullLabel.setAttribute('src', beerTypeSrc + "_full.png");
        emptyKeg.style.backgroundImage = `url(${beerTypeSrc}_empty.png)`;
        beerFullLabel.style.clipPath = `inset(${beerTypeLvl}% 0 0 0)`;

        parentKeg.appendChild(cloneKeg);
    });

    // TOP BEER


    info.serving.forEach(topBeer=>{
        const customerID = topBeer.id;
        let q = ids.indexOf(customerID);
        if (q < 0){
            
            let timeServed = info.timestamp;
            let timeStartQueue = topBeer.startTime;
            let timeSpent = ((timeServed - timeStartQueue)/1000).toFixed(0);

            console.log(`customer ${customerID} spent `, timeSpent, `seconds`);

            if(timeSpent >= 0 && timeSpent <= 5){
                spent0and5++;
            }
            else if(timeSpent > 5 && timeSpent <= 15){
                spent5and15++;
            }
            else if(timeSpent > 15 && timeSpent <= 35){
                spent15and35++;
            }
            else if(timeSpent > 35){
                spent35++;
            }

            console.log(spent0and5, spent5and15, spent15and35, spent35);

            document.querySelector("#lessThan5 span").textContent = spent0and5;
            document.querySelector("#between5and15 span").textContent = spent5and15;
            document.querySelector("#between15and35 span").textContent = spent15and35;
            document.querySelector("#aLot span").textContent = spent35;



            ids.push(customerID);
            topBeer.order.forEach(beer=>{

                if(beer == "El Hefe"){
                    hefeBeer++;
                }
                else if(beer == "Fairy Tale Ale"){
                    fairyBeer++;
                }
                else if(beer == "GitHop"){
                    gitBeer++;
                }
                else if(beer == "Hollaback Lager"){
                    hollaBeer++;
                }
                else if(beer == "Hoppily Ever After"){
                    hoppiBeer++;
                }
                else if(beer == "Mowintime"){
                    mowinBeer++;
                }
                else if(beer == "Row 26"){
                    rowBeer++;
                }
                else if(beer == "Ruined Childhood"){
                    ruinBeer++;
                }
                else if(beer == "Sleighride"){
                    sleighBeer++;
                }
                else if(beer == "Steampunk"){
                    steamBeer++;
                }
                
            })
        }
        // console.log("hefe:", hefeBeer);
        // console.log("fairy:", fairyBeer);
        // console.log("git:", gitBeer);
        // console.log("holla:", hollaBeer);
        // console.log("hoppi:", hoppiBeer);
        // console.log("mowin:", mowinBeer);
        // console.log("row:", rowBeer);
        // console.log("ruin:", ruinBeer);
        // console.log("sleigh:", sleighBeer);
        // console.log("steam:", steamBeer);
        
        beerNameArray = ['El Hefe', 'Fairy Tale Ale', 'GitHop', 'Hollaback Lager', 'Hoppily Ever After', 'Mowintime', 'Row 26', 'Ruined Childhood', 'Sleighride', 'Steampunk'];
        beerSoldArray = [hefeBeer, fairyBeer, gitBeer, hollaBeer, hoppiBeer, mowinBeer, rowBeer, ruinBeer, sleighBeer, steamBeer];
        let beerSold = 0;
        for (var i = 0; i < beerSoldArray.length; i++) {
            beerSold += beerSoldArray[i];
        }
        // console.log(beerSold);

        document.querySelector('#beersSold span').textContent = beerSold;

        const templateTop = document.querySelector('#topTemplate').content;
        const parentTop = document.querySelector('#tops');
        parentTop.innerHTML = '';
        
        beerNameArray.forEach(e=>{
            let q = beerNameArray.indexOf(e);
            const quantityOfBeer = beerSoldArray[q];
            // console.log(e, "beers sold:", quantityOfBeer);

            const cloneTop = templateTop.cloneNode(true);
            let beerNameTop = cloneTop.querySelector('.beerNameSpan');
            let beerQuantityTop = cloneTop.querySelector('.beersSoldSpan');
            let beerQuantityPercentage = cloneTop.querySelector(".beerPercentageSpan");
            let beerTopBar = cloneTop.querySelector('.topBar');
            let beerPercentage = (100 / (beerSold / quantityOfBeer)).toFixed(2);
            // toFixed IS USED TO GET ONLY 2 DECIMALS, NOT 1000
            
            beerTopBar.style.width = `${beerPercentage}%`;
            beerNameTop.textContent = e;
            beerQuantityTop.textContent = quantityOfBeer;
            beerQuantityPercentage.textContent = beerPercentage;
            parentTop.appendChild(cloneTop);
        })
       


        // let hefePercent = 100 / (beerSold / hefeBeer);
        // let fairyPercent = 100 / (beerSold / fairyBeer);
        // let gitPercent = 100 / (beerSold / gitBeer);
        // let hollaPercent = 100 / (beerSold / hollaBeer);
        // let hoppiPercent = 100 / (beerSold / hoppiBeer);
        // let mowinPercent = 100 / (beerSold / mowinBeer);
        // let rowPercent = 100 / (beerSold / rowBeer);
        // let ruinPercent = 100 / (beerSold / ruinBeer);
        // let sleighPercent = 100 / (beerSold / sleighBeer);
        // let steamPercent = 100 / (beerSold / steamBeer);


    })

}

