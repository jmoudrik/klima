function make_data () {

// Obecne statistiky o Ceske Republice
// [1] https://www.czso.cz/csu/czso/spotreba-paliv-a-energii-v-domacnostech
// kolik protopi prumerna domacnost
this.cr_domacnost_topeni_avg = 12.78; // MWh / rok
// TODO
this.cr_domacnost_topeni_byt_avg = 8; // MWh / rok
this.cr_domacnost_topeni_dum_avg = 15; // MWh / rok
this.cr_domacnosti_byty = 2473489;
this.cr_domacnosti_domy = 1830684;
this.cr_domacnosti_pocet = 4304173;
console.assert(this.cr_domacnosti_domy + this.cr_domacnosti_byty == this.cr_domacnosti_pocet )
this.cr_obyvatelstvo = 10566653;

// # Celkove emise v CR per capita
// [2] https://data.oecd.org/czech-republic.htm
// - to zahrnuje i prumysl, exportovane energie, ...
// v podstate == celkove_emise_na_uzemi_CR / pocet_obyvatel
this.cr_total_per_cap = 9.6 * 1000;     // kg CO2 / rok / per-capita

// # Celkove emise per capita v Somalsku, pro srovnani
// [3] https://en.wikipedia.org/wiki/List_of_countries_by_carbon_dioxide_emissions_per_capita
this.somalia_total_per_cap = 0.1 * 1000;    // radove

//
// Dopravni prostredky
//
// # Emise letadla
// [4] https://www.carbonindependent.org/22.html
// ekvivalent 250 kg CO2 / hodinu; pri rychlosti 900 km/h
// nejspis je tohle spis nejaky horni odhad - vyssi kvantil ~ 60 ?
// (zapocitava efekty 2. radu - emise jsou ve velkych vyskach)
// popularni prehled
// [5] https://www.bbc.com/news/science-environment-49349566
this.letadlo_co2_km_equiv = 250 / 900; 	// = 0.27 kg co2 / km
// efekt ciste emisni je (viz carbonindependent ^)
// 90 kg CO2 / hodinu; pri rychlosti 900 km/h
this.letadlo_co2_km_1st_order = 90 / 900; 	// = 0.1 kg co2 / km

// # Automobil
// [6] https://www.carbonindependent.org/17.html
this.palivo_co2_l = 2.4; // kg co2 / litr paliva
// pri spotrebe 5 l / 100km
// (to je spis spodni odhad prumerneho osobniho auta, takze motoristum urcite nekrivdime)
this.auto_co2_km_avg = this.palivo_co2_l * 5 / 100; // kg co2 / km

// # Verejna doprava
// [7] https://www.carbonindependent.org/21.html
// [8] https://www.eea.europa.eu/media/infographics/co2-emissions-from-passenger-transport/view
// [9] https://www.bbc.com/news/science-environment-49349566
// rekneme, ze rozumny odhad pro verejnou dopravu muze byt 40 g CO2 /km
// (obzvlaste vzhledem k tomu, jak je v CR spinava elektrina)
this.public_co2_km_avg = 0.04; // kg co2 / km

// # Pocet pasazeru v aute
// [10] https://www.eea.europa.eu/data-and-maps/indicators/occupancy-rates-of-passenger-vehicles/occupancy-rates-of-passenger-vehicles
// viz tento graf ^
// v ceske republice je obecne mene aut, nez na zapade
// viz [11] https://en.wikipedia.org/wiki/List_of_countries_by_vehicles_per_capita
this.auto_naplnenost_avg_eu = 1.4;
// a v bohatsich zemich (== vic aut na rodinu) se da cekat, ze bude naplnenost mensi, nez v cechach
// tak dejme tomu 1.5, at mame jistotu dolniho odhadu emisi
// (nechceme krivdit motoristum)
this.auto_naplnenost_cr_est = 1.5;
// odhad toho, v kolika lidech jezdi cesi v prumeru na dovolenou autem
// zdrojem je soukroma statistika v rodine
// (/ vycucano z prstu, tzn je to predpoklad, spis nez sound evidence-based)
this.auto_naplnenost_dovolena_cr_est = 3;

// # Emise z Paliv
// [12] https://www.mpo.cz/dokument6794.html
// vse v t CO2 / MWh 
this.plyn_emise = 0.2;
this.hnede_uhli_emise = 0.36;
this.cerne_uhli_emise = 0.33;
this.topny_olej_emise = 0.265;

// # Emise z vyroby Elektricke energie
// [13] https://www.mpo.cz/dokument6794.html
// [14] http://www.ekoblog.cz/?q=node/284
// priblizne, v odkazech vyse stara data, ale v roce 2019
// to neni to o moc lepsi nez pred 10 lety, viz
// [15] https://cs.wikipedia.org/wiki/Energetika_v_%C4%8Cesku
this.elektrina_cr_mix_emise  = 1.1; // t CO2 / MWh

// # Data ze studie Matustik, Koci
// [16] https://doi.org/10.1016/j.scitotenv.2018.07.233
// Matuštík, Kočí.
// "Environmental impact of personal consumption from life cycle perspective–A Czech Republic case study."

// # Matustik - energie
// prumerne emise na osobu, vse v kg CO2 / rok
this.mat_cr_avg_energy_total = 2000;
this.mat_cr_avg_teplo = 996;
this.mat_cr_avg_tepla_voda = 418;

// TODO + spotrebice ; double check s CSU (aktualne)
this.cr_energy_doma = this.mat_cr_avg_teplo + this.mat_cr_avg_tepla_voda;

// # Matustik - jidlo
// pro jidlo Matustik asi ne zcela duveryhodny - vysledky dost jinde, nez
// [17] UK : https://link.springer.com/article/10.1007%2Fs10584-014-1169-1
// [18] Germany : https://www.sciencedirect.com/science/article/pii/S0959652617309666
// [19] Sweden: https://www.mdpi.com/2071-1050/9/12/2227/htm
// proto dole vlastni odhad
this.mat_cr_avg_jidlo = 778;				// excl. biogenic-carbon 
this.mat_cr_avg_jidlo_maso_prop = 0.47;  // excl. biogenic-carbon 
this.mat_cr_avg_jidlo_mliko_prop = 0.25;	// excl. biogenic-carbon

// # Matustik - maso
// spotreba masa ; kg za rok
this.mat_cr_avg_veprovy = 42.8;
this.mat_cr_avg_hovezi = 8.5;
this.mat_cr_avg_kureci = 32.3;

// # Matustik - doprava
// pro dopravgu Matustik asi ne-duveryhodny
// (chybi osobni doprava)
// proto dole vlastni odhad
this.mat_cr_avg_doprava = 362;
this.mat_cr_avg_doprava_auto = 0; // na auto asi zapomneli
this.mat_cr_avg_doprava_public = 257;

// # Matustik - letadlo
// protoze 105 / 916 = 0.115 kg/km 
// tak asi nepouzivaji "radiative forcing", to odpovida this.letadlo_co2_km_1st_order 
// viz https://www.carbonindependent.org/22.html
this.mat_cr_avg_doprava_letadlo = 105;
this.mat_cr_letadlo_km_per_cap = 916;

// # Jidlo - emise
// [20] http://static.ewg.org/reports/2011/meateaters/pdf/methodology_ewg_meat_eaters_guide_to_health_and_climate_2011.pdf
// TODO - lepsi data by byla uzitecna - vic konzistentni, lepsi odhad pro CR
// Je to super hruby odhad, zalezi na tom cim se krmi, atp
// Rozptyl dat z ruznych zdroju na internetu je obrovsky, e.g. napriklad [17] ma vyrazne vic
this.hovezi_kg_co2 = 27;
this.veprovy_kg_co2 = 12;
this.kureci_kg_co2 = 7;

//
//		Doprava - odhad
//
this.cr_avg_doprava_letadlo_est = this.mat_cr_letadlo_km_per_cap * this.letadlo_co2_km_equiv;
// [21] https://www.odyssee-mure.eu/publications/efficiency-by-sector/transport/passenger-mobility-per-capita.html
// mobility per capita (passenger-km/year)
this.cr_auto_mobility_per_cap = 10000;
this.cr_public_per_cap = 3000;
// kg CO2 / osobu / rok
this.cr_avg_doprava_auto_est = this.cr_auto_mobility_per_cap * this.auto_co2_km_avg  / this.auto_naplnenost_cr_est;
this.cr_avg_doprava_public_est = this.cr_public_per_cap * this.public_co2_km_avg;

this.cr_avg_doprava_est = this.cr_avg_doprava_public_est + this.cr_avg_doprava_auto_est + this.cr_avg_doprava_letadlo_est;

console.log("auto " + this.cr_avg_doprava_auto_est);
console.log("doprava " + this.cr_avg_doprava_est);

//
//		Jidlo - odhad
//
// odhad
// https://docs.google.com/spreadsheets/d/11ycKaiOyciznR5F-IYGSz-_JwiBuXcArox4qTV7c74s/edit#gid=560756490
this.cr_avg_jidlo_est = 1200;

//
//		Celkovy impact
//
// TODO - co ostatni vlivy - jina statistika treba
// TODO - zkontrolovat energie 
// Per capita ma ceska republika emise 9.6 tun
// s 1.2 faktorem je cr_avg_total_est ~ 5.2 tun;
// zbytek odpovida ostatnim rozpocitanym faktorum ("spolecne")
// 		- export energie, prumysl, infrastrukture, vzdelavani, zdravotnictvi, vlada, ...
//
// 1.2 faktor se snazi zohlednit jine "prime == ne spolecne" efekty nez "energie, doprava, jidlo",
// e.g. konzumni zbozi - elektronika, obleceni
// - jejich efekt je vyrazne mensi nez jidlo, doprava, energie - TODO reference
this.cr_avg_total_est = 1.2 * (this.mat_cr_avg_energy_total + this.cr_avg_doprava_est + this.cr_avg_jidlo_est);
console.log("total " + this.cr_avg_total_est );

// jidlo kg CO2/den
// maso ~= 40 % ; mliko ~= 25%
//   - zdroj tohohle je studie z nemecka ^ (viz vyse)
//	 - Matustik uvadi 47% maso, 25% mleko
//		- modulo chyba je to asi stejny

this.jidlo_maso_ratio = 0.4;
this.jidlo_mleko_ratio = 0.25;
this.vegan_ratio = 1 - this.jidlo_maso_ratio - this.jidlo_mleko_ratio;
this.vegetarian_ratio = 1 - this.jidlo_maso_ratio;
this.jidlo_vegan_den = this.vegan_ratio * this.cr_avg_jidlo_est / 365;
this.jidlo_vegetarian_den = this.vegetarian_ratio * this.cr_avg_jidlo_est / 365;
this.jidlo_avg_den = this.cr_avg_jidlo_est / 365;
this.jidlo_masozrout_den = 4;


//
//		Spotrebni elektronika
//
// https://docs.google.com/spreadsheets/d/1duR9HEHm2OMQwuLBl-h6GEjrIyv3D3x27NLPjFLFxHA/edit#gid=973728864
this.mobil_vyroba = 35.82;
// https://carboncatalogue.coclear.co/?sector=Computer%2C%20IT%20%26%20telecom&company=Dell%20Inc.&year=2015&sort=sector
this.dell_lattitude_e7440_lca = 276;

// Ostatni
this.letecke_vzdalenosti = {
    // vse v km
	'Praha > Londýn': 1034,
	'Praha > Moskva': 1668,
	'Praha > New York': 6568,
	'Praha > Madrid': 1760,
	'Praha > Ankara': 1830,
	'Praha > Bangkok': 8660,
	'Praha > Káhira': 2634,
    'Praha > Athény': 1560,
}
this.autem_vzdalenosti = {
    // zdroj Mapy.cz
    'Praha > Zadar': 964,
    'Praha > Řím': 1303,
    'Praha > Budapešť': 525,
}
}

var DATA = new make_data();
