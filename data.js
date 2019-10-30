function make_data () {

// https://www.czso.cz/csu/czso/spotreba-paliv-a-energii-v-domacnostech
this.cr_domacnost_topeni_avg = 12.78; // MWh / rok
this.cr_domacnosti_pocet = 4304173;
this.cr_domacnosti_byty = 2473489;
this.cr_domacnosti_domy = 1830684;
this.cr_obyvatelstvo = 10566653;


// https://data.oecd.org/czech-republic.htm
// kg CO2 / rok / per-capita
this.cr_total_per_cap = 9.6 * 1000;

// https://www.carbonindependent.org/22.html
// ekvivalent 250 kg CO2 / hodinu; pri rychlosti 900 km/h
// nejspis je tohle spis nejaky horni odhad - vyssi kvantil ~ 60 ?
// (zapocitava efekty 2. radu - emise jsou ve velkych vyskach)
// popularni prehled
// https://www.bbc.com/news/science-environment-49349566
this.letadlo_co2_km_equiv = 250 / 900; 	// = 0.27 kg co2 / km
// efekt ciste emisni je (viz carbonindependent ^)
// 90 kg CO2 / hodinu; pri rychlosti 900 km/h
this.letadlo_co2_km_1st_order = 90 / 900; 	// = 0.1 kg co2 / km

// https://www.carbonindependent.org/17.html
this.palivo_co2_l = 2.4; // kg co2 / litr paliva
// pri spotrebe 5 l / 100km 
this.auto_co2_km_avg = this.palivo_co2_l * 5 / 100; // kg co2 / km

// pocet pasazeru v aute
// https://www.eea.europa.eu/data-and-maps/indicators/occupancy-rates-of-passenger-vehicles/occupancy-rates-of-passenger-vehicles
// viz tento graf ^
// v ceske republice je obecne mene aut, nez na zapade
// viz https://en.wikipedia.org/wiki/List_of_countries_by_vehicles_per_capita
this.auto_naplnenost_avg_eu = 1.4;
// a v bohatsich zemich (== vic aut na rodinu) se da cekat, ze bude naplnenost mensi, nez v cechach
// tak dejme tomu 1.5, at mame jistotu dolniho odhadu emisi
// (== nechceme krivdit motoristum)
this.auto_naplnenost_cr_est = 1.5;

// https://www.mpo.cz/dokument6794.html
// vse v t CO2 / MWh 
this.plyn_emise = 0.2;
this.hnede_uhli_emise = 0.36;
this.cerne_uhli_emise = 0.33;
this.topny_olej_emise = 0.265;

// https://www.mpo.cz/dokument6794.html
// http://www.ekoblog.cz/?q=node/284
// priblizne, v odkazech vyse stara data, ale v roce 2019
// to neni to o moc lepsi nez pred 10 lety, viz
// https://cs.wikipedia.org/wiki/Energetika_v_%C4%8Cesku
this.elektrina_cr_mix_emise  = 1.1;

// https://doi.org/10.1016/j.scitotenv.2018.07.233
// Matuštík, Kočí. "Environmental impact of personal consumption from life cycle perspective–A Czech Republic case study."
// prumerne emise na osobu, vse v kg CO2 / rok
this.mat_cr_avg_energy_total = 2000;
this.mat_cr_avg_teplo = 996;
this.mat_cr_avg_tepla_voda = 418;

// pro jidlo Matustik asi ne zcela duveryhodny - vysledky dost jinde, nez
// UK : https://link.springer.com/article/10.1007%2Fs10584-014-1169-1
// Germany : https://www.sciencedirect.com/science/article/pii/S0959652617309666
// Sweden: https://www.mdpi.com/2071-1050/9/12/2227/htm
// proto dole vlastni odhad
this.mat_cr_avg_jidlo = 778;				// excl. biogenic-carbon 
this.mat_cr_avg_jidlo_maso_prop = 0.47;  // excl. biogenic-carbon 
this.mat_cr_avg_jidlo_mliko_prop = 0.25;	// excl. biogenic-carbon 

// pro dopravgu Matustik asi ne-duveryhodny
// (chybi osobni doprava)
// proto dole vlastni odhad
this.mat_cr_avg_doprava = 362;
this.mat_cr_avg_doprava_auto = 0; // na auto asi zapomneli
this.mat_cr_avg_doprava_public = 257;

// protoze 105 / 916 = 0.115 kg/km 
// tak asi nepouzivaji "radiative forcing", to odpovida this.letadlo_co2_km_1st_order 
// viz https://www.carbonindependent.org/22.html
this.mat_cr_avg_doprava_letadlo = 105;
this.mat_cr_letadlo_km_per_cap = 916;

//
//		Doprava - odhad
//
this.cr_avg_doprava_letadlo_est = this.mat_cr_letadlo_km_per_cap * this.letadlo_co2_km_equiv;
// https://www.odyssee-mure.eu/publications/efficiency-by-sector/transport/passenger-mobility-per-capita.html 
// mobility per capita (passenger-km/year)
this.cr_mobility_per_cap = 10000;
this.cr_public_per_cap = 3000;
this.cr_avg_doprava_auto_est = this.cr_mobility_per_cap * this.auto_co2_km_avg  / this.auto_naplnenost_cr_est;
// https://www.carbonindependent.org/21.html
// https://www.eea.europa.eu/media/infographics/co2-emissions-from-passenger-transport/view
// https://www.bbc.com/news/science-environment-49349566
// rekneme, ze rozumny odhad pro verejnou dopravu muze byt 40 g CO2 /km
// (obzvlaste vzhledem k tomu, jak je v CR spinava elektrina)
this.cr_avg_doprava_public_est = this.cr_public_per_cap * 0.04;

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
this.cr_avg_total_est = this.mat_cr_avg_energy_total + this.cr_avg_doprava_est + this.cr_avg_jidlo_est;
console.log("total " + this.cr_avg_total_est );

// jidlo kg CO2/den
// maso ~= 40 % ; mliko ~= 25%
//   - zdroj tohohle je studie z nemecka ^ (viz vyse)
//	 - Matustik uvadi 47% maso, 25% mleko
//		- modulo chyba je to asi stejny

this.jidlo_vegan_den = (1-0.4-0.25) * this.cr_avg_jidlo_est / 365;
this.jidlo_vegetarian_den = (1-0.4) * this.cr_avg_jidlo_est / 365;
this.jidlo_avg_den = this.cr_avg_jidlo_est / 365;
this.jidlo_masozrout_den = 4;
}

var DATA = new make_data();
