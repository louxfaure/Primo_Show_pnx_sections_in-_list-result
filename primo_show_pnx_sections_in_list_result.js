javascript:(function() {
    /*Choix de la section pnx à afficher*/
    var pnxSection = 'frbr';
    /*On récupère l'élément où on va positionner les informations*/
    var showPnxLinkElem = document.querySelectorAll('prm-brief-result-container');
    /*Pour chae résultat*/
    for (var i=0, j=showPnxLinkElem.length; i < j; i++) {
        /*On prépare l'élément html où on mettra les informations*/
        var showPnxRecId = showPnxLinkElem[i].querySelector('.list-item-primary-content').getAttribute('data-recordid'),
        recordIdSpan = document.createElement("div");
        recordIdSpan.className = "show-recordid";
        recordIdSpan.innerHTML = showPnxRecId;
        recordIdSpan.style.padding = "2em 0 0 0";
        var keylist = document.createElement("ul");  
        console.log(showPnxRecId);
        /*Construction du lien vers la notice pnx*/
        if (/openurl/.test(location) === true) {
            var templocation = location.href,
            showPnxLinkHref = templocation.replace(/primo-explore/, "primo_library/libweb/action")+"&showPnx=true";
        } else {
            /* Make use of new urlToXmlPnx */
            showPnxLinkHref = showPnxLinkElem[i].querySelector('.urlToXmlPnx').getAttribute('data-url');
        }
        /*Pn vachercher notre notice pnx*/
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", showPnxLinkHref, false );
        xmlHttp.send( null );
        /*On parse le xml*/
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(xmlHttp.responseText,"text/xml");
        /*Teste si la section existe*/
        if (xmlDoc.getElementsByTagName(pnxSection)[0] == undefined){
            var keyelement = document.createElement("span");
            keyelement.innerHTML = "<b>Pas d'éléments pour la section "+pnxSection + " pour cette notice.</b>";
            recordIdSpan.appendChild(keyelement);
        }
        else{
            /*On récupère et affiche tous les éléments*/
            var children = xmlDoc.getElementsByTagName(pnxSection)[0].childNodes;
            for(child in children){	
                if ((children[child].nodeName != '#text') && (children[child].nodeName != undefined)){
                    var keyelement = document.createElement("li");
                    keyelement.innerHTML = "<b>"+children[child].nodeName + " : </b>" + children[child].textContent;
                    keylist.appendChild(keyelement);
                    console.log("<b>"+children[child].nodeName + " :</b> " + children[child].textContent);
                }
            }
            recordIdSpan.appendChild(keylist);
        }
        showPnxLinkElem[i].parentNode.appendChild(recordIdSpan);
    }
  })();