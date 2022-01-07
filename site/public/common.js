var ref_let = 'Praha > New York';

function letadlem_html(tuny_co2) {
		var let_co2 = DATA.letecke_vzdalenosti[ref_let] * DATA.letadlo_co2_km_equiv / 1000;
		var ratio = tuny_co2 / let_co2;
		return "<b>" + ratio.toFixed(1) + "</b> letů <b>" + ref_let + "</b>";
}

function somalci_html(tuny_co2) {
		var ratio = tuny_co2 * 1000 / DATA.somalia_total_per_cap ;
        var integral = ratio.toFixed(0);
		return "<b>" + ratio.toFixed(1) + "</b> Somálců za celý rok";
		//return "<b>" + ratio.toFixed(1) + "</b> " + format_somali(integral) + " za celý rok";
}

function cesi_html(tuny_co2) {
    var ratio = tuny_co2 * 1000 / DATA.cr_avg_total_est ;
    if (tuny_co2 * 1000 >= DATA.cr_avg_total_est){
        var integral = ratio.toFixed(0);
		return "<b>" + ratio.toFixed(1) + "</b> Čechů za celý rok";
		//return "<b>" + ratio.toFixed(1) + "</b> " + format_czechs(integral) + " za celý rok";
    } else {
		return "<b>" + (100*ratio).toFixed(1) + " %</b> ročních emisí průměrného Čecha.";
    }
}

function mobil_html(tuny_co2) {
		var ratio = tuny_co2 * 1000 / DATA.mobil_vyroba ;

		return "<b>" + ratio.toFixed(1) + "</b> vyrobených mobilů";
}

function format_num_czech(float_num) {
		return Math.floor(float_num).toLocaleString('en').replace(/,/g,'&nbsp;');
}

function format_cena(kc) {
	return "<b>" + format_num_czech(kc) + " Kč</b>" ;
}

function autem_html(tuny_co2) {
		var auto_km = 1000 * tuny_co2 / DATA.auto_co2_km_avg;

        // TODO tohle nejak divne zaokrouhluje - vegan 10 km za den , 3500 km za rok - WTF
		return "<b>" + format_num_czech(auto_km) + " km</b> ujetých autem";
}

function vysklonuj(num, tvary) {
    if(num <= 0) return tvary[0];
    if(num == 1) return  tvary[1];
    if(num <= 4) return  tvary[2];
    return tvary[0];
}

function format_days(day) {
    var tvary = ['dní', 'den', 'dny'];
    return day + " " + vysklonuj(day, tvary)
}

function format_czechs(day) {
    var tvary = ['Čechů', 'Čech', 'Češi'];
    return vysklonuj(day, tvary);
}

function format_somali(day) {
    var tvary = ['Somálců', 'Somálec', 'Somálci'];
    return vysklonuj(day, tvary);
}

function format_perc(stuff){
	return (100*stuff).toFixed(0) + "%";
}

function format_perc1(stuff){
	return (100*stuff).toFixed(1) + "%";
}

function format_co2(tuny_co2) {
	return tuny_co2.toFixed(2) + " tun CO<sub>2</sub>";
};

function wrap_li(stuff) {
	return "<li>"+stuff+"</li>";
}

function format_co2_cmp(tuny_co2) {
	var cmp_html = "</b>, stejně jako " + letadlem_html(tuny_co2) + ", nebo " + autem_html(tuny_co2);
	return "za rok <b>" + format_co2(tuny_co2) + cmp_html;
};

function cmp_html(tuny_co2){
	//return "Stejně jako " + letadlem_html(tuny_co2) + ", nebo " + autem_html(tuny_co2) + ".";
	return ("Stejně jako: <ul>" +
	    wrap_li(cesi_html(tuny_co2)) +
		wrap_li(letadlem_html(tuny_co2)) +
		wrap_li(somalci_html(tuny_co2)) +
		wrap_li(mobil_html(tuny_co2)) +
	    wrap_li(autem_html(tuny_co2)));
}

/*
            <a class="popoverData under_dot" selector="true" data-html="false"
               data-content="Efekty se budou pravděpodobně výrazně lišit podle konkrétních parametrů zateplovaného domu."
               rel="popover" data-placement="bottom" data-trigger="hover">
                jaký efekt může v takovém domě velmi zhruba mít:
            </a>
			*/
function format_co2_cmp_pop(tuny_co2) {
	// TODO popoverupdates are broken
	return '<a class="popoverData popover_bold text-primary" selector="true" data-html="true" data-content="'+cmp_html(tuny_co2)+'" rel="popover" data-placement="bottom" data-trigger="hover">'+format_co2(tuny_co2) +'</a>';
};

function format_cena_ref(cenakwh, cena_tot) {
	return (
	'<a class="popoverData" selector="true" data-html="true" '+
	'data-content="Při ceně <b>'+cenakwh.toFixed(1)+' Kč</b> za 1 kWh" '+
	'rel="popover" data-placement="bottom" data-trigger="hover">'+
	's náklady na elektřinu '+
    format_cena(cena_tot)
	+'</a>');
}


var typy_jidelnicku = ['vegan', 'vegetarián', 'průměr ČR', 'masožrout'];
var jidelnicek = {
    'vegan':DATA.jidlo_vegan_den,
    'vegetarián':DATA.jidlo_vegetarian_den,
    'průměr ČR':DATA.jidlo_avg_den,
    'masožrout':DATA.jidlo_masozrout_den
};

// top destiance vybrany z
// TODO chorvatsko, atp
// https://www.idnes.cz/cestovani/kolem-sveta/turiste-dovolena-zebricek-destinaci-nejoblibenejsi-destinace-2018.A190410_160855_kolem-sveta_hig
// this.sel_dovolena = ko.observable(destinace_dovolena[0]);
var destinace_dovolena = [
    'autem do Chorvatska',
    'autem do Itálie',
    'autem do Maďarska',
    'letecky do Egypta',
    'letecky do Řecka',
    'letecky do Španělska',
    'letecky do Turecka',
        'letecky do Thajska',
];
var auto_passenger_co2 = DATA.auto_co2_km_avg / DATA.auto_naplnenost_dovolena_cr_est;

var dovolena = {
    // pouzivame Praha > Zadar, protoze Zahreb neni u more, takze Zadar (veprostred pobrezi) je lepsi odhad
    'autem do Chorvatska' : DATA.autem_vzdalenosti['Praha > Zadar'] * auto_passenger_co2,
    'autem do Itálie' : DATA.autem_vzdalenosti['Praha > Řím'] * auto_passenger_co2,
    'autem do Maďarska' : DATA.autem_vzdalenosti['Praha > Budapešť'] * auto_passenger_co2,
    'letecky do Egypta' : DATA.letecke_vzdalenosti['Praha > Káhira']* DATA.letadlo_co2_km_equiv,
    'letecky do Řecka' :DATA.letecke_vzdalenosti['Praha > Athény']* DATA.letadlo_co2_km_equiv,
    'letecky do Španělska' :DATA.letecke_vzdalenosti['Praha > Madrid']* DATA.letadlo_co2_km_equiv,
    'letecky do Turecka' : DATA.letecke_vzdalenosti['Praha > Ankara']* DATA.letadlo_co2_km_equiv,
    'letecky do Thajska' : DATA.letecke_vzdalenosti['Praha > Bangkok']* DATA.letadlo_co2_km_equiv,
};

// Reference & odkazy ze stranky
var refs = {
	'Zpráva o životním prostředí ČR':  [1, 'https://www.mzp.cz/C1257458002F0DC7/cz/zpravy_o_stavu_zivotniho_prostredi_publikace/$FILE/SOPSZP-Zprava_ZP_CR_2015-20170301.pdf', 'MZP ČR, 2015'],
	'Energetika v Česku' : [2, 'https://cs.wikipedia.org/wiki/Energetika_v_%C4%8Cesku', 'wikipedia, 2019'],
	'Atlas Masa' : [3, 'https://www.foeeurope.org/meat-atlas/', ''],
	'Rostlinné Bílkoviny' :  [4, 'https://veganskaspolecnost.cz/vyziva/bilkoviny/', 'Česká veganská společnost'],
}

function render_ref(key){
	var val = refs[key];
	var num = val[0];
	var url = val[1];
	var suff = val[2];
	//return "<a href='#"+num+"'>["+num+"]</a>";
	// ten popover zmizi kdyz se na nej najede, ergo ne moc uzitecny, unless fix
	//
	var popover_html = '<b>['+num+']</b> ' + key + (suff ? ", " + suff:''); //+ ": <a href='"+url+"'>"+key+'</a>'
	return '<a class="popoverData popover_bold text-primary" href="'+url+'" data-html="true" data-content="'+popover_html+'" rel="popover" data-placement="bottom" data-trigger="hover">['+num+']</a>';
}

function render_refs(){
	var ret = [];

	//ret.push("<ul>");
	for (key in refs) {
		var num = refs[key][0];
		var url = refs[key][1];

		ret.push("<li>");
		ret.push("<b><a name='"+num+"'>["+num+"]</a></b>");
		ret.push(key + ": <a href='"+url+"'>"+url+"</a>");
		ret.push("</li>");
	}
	//ret.push("</ul>");
	return ret.join("\n");
}

function updatePopover() {
        $('.popoverData').popover();
}

function updatePopoverDelayedPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
    updatePopover();
    }, 200);
  });
};

var updatePopoverDelayed = async function() {
    var stuff = await updatePopoverDelayedPromise();
};
