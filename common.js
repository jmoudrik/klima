
var lety = {
	'Praha > Londýn': 1034,
	'Praha > Moskva': 1668,
	'Praha > New York': 6568,
}

var ref_let = 'Praha > New York';


function format_cena(kc) {
	return "<b>" + kc.toFixed(0) + ",- Kč</b>" ;
}


// TODO hezci widgety na letadlo & auto

function letadlem_html(tuny_co2) {
		var let_co2 = lety[ref_let] * DATA.letadlo_co2_km_equiv / 1000;
		var ratio = tuny_co2 / let_co2;

		return "<b>" + ratio.toFixed(1) + "</b> letů <b>" + ref_let + "</b>";
}

function somalci_html(tuny_co2) {
		var ratio = tuny_co2 * 1000 / DATA.somalia_total_per_cap ;

		return "<b>" + ratio.toFixed(0) + "</b> Somálců za celý rok";
}

function mobil_html(tuny_co2) {
		var ratio = tuny_co2 * 1000 / DATA.mobil_vyroba ;

		return "<b>" + ratio.toFixed(1) + "</b> vyrobených mobilů";
}

function autem_html(tuny_co2) {
		var auto_km = 1000 * tuny_co2 / DATA.auto_co2_km_avg;
		// XXX
		var auto_str = (auto_km - auto_km % (Math.floor(auto_km))).toLocaleString('en').replace(/,/g,' ');

		//var auto_str = auto_km.toFixed(0);

	// TODO tohle nejak divne zaokrouhluje - vegan 10 km za den , 3500 km za rok - WTF
		return "<b>" + auto_str + " km</b> ujetých autem";
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
		wrap_li(letadlem_html(tuny_co2)) +
		wrap_li(somalci_html(tuny_co2)) +
		wrap_li(mobil_html(tuny_co2)) +
	    wrap_li(autem_html(tuny_co2)));
}

function format_co2_cmp_pop(tuny_co2) {
	// TODO popoverupdates are broken
	//
	//
	return '<a class="popoverData selector="true" text-primary" href="#" data-html="true" data-content="'+cmp_html(tuny_co2)+'" rel="popover" data-placement="bottom" data-trigger="hover">'+format_co2(tuny_co2) +'</a>';
};

var typy_jidelnicku = ['vegan', 'vegetarián', 'průměr ČR', 'masožrout'];
var jidelnicek = {
'vegan':DATA.jidlo_vegan_den,
'vegetarián':DATA.jidlo_vegetarian_den,
'průměr ČR':DATA.jidlo_avg_den,
'masožrout':DATA.jidlo_masozrout_den
};


// Reference & odkazy ze stranky
var refs = {
	'Atlas Masa' : [1, 'https://www.foeeurope.org/meat-atlas/'],
	'Rostlinné Bílkoviny' :  [2, 'https://veganskaspolecnost.cz/vyziva/bilkoviny/']
}

function render_ref(key){
	var val = refs[key];
	var num = val[0];
	var url = val[1];
	//return "<a href='#"+num+"'>["+num+"]</a>";
	// ten popover zmizi kdyz se na nej najede, ergo ne moc uzitecny, unless fix
	//
	var popover_html = '['+num+'] ' + key ; //+ ": <a href='"+url+"'>"+key+'</a>';
	return '<a class="popoverData text-primary" href="'+url+'" data-html="true" data-content="'+popover_html+'" rel="popover" data-placement="bottom" data-trigger="hover">['+num+']</a>';
}

function render_refs(){
	var ret = ["<ul>"];

	for (key in refs) {
		var num = refs[key][0];
		var url = refs[key][1];

		ret.push("<li>");
		ret.push("<a name='"+num+"'>["+num+"]</a>");
		ret.push(key + ": <a href='"+url+"'>"+url+"</a>");
		ret.push("</li>");
	}
	ret.push("</ul>");
	return ret.join("\n");
}

