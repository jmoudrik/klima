var DATA = {

// https://www.czso.cz/csu/czso/spotreba-paliv-a-energii-v-domacnostech
cr_domacnost_topeni_avg : 12.78, // MWh / rok
cr_domacnosti_pocet : 4304173,
cr_domacnosti_byty : 2473489,
cr_domacnosti_domy : 1830684,
cr_obyvatelstvo : 10566653,

// https://www.carbonindependent.org/22.html
// ekvivalent 250 kg / hodinu; pri rychlosti 900 km/h
letadlo_co2_km_avg : 250 / 900, // kg co2 / km

// https://www.carbonindependent.org/17.html
palivo_co2_l : 2.4, // kg co2 / litr paliva
// pri spotrebe 5 l / 100km
auto_co2_km_avg : 2.4 * 5 / 100, // kg co2 / km


// https://www.mpo.cz/dokument6794.html
// vse v t CO2 / MWh 
plyn_emise : 0.2,
hnede_uhli_emise : 0.36,
cerne_uhli_emise : 0.33,
topny_olej_emise : 0.265,

// https://www.mpo.cz/dokument6794.html
// http://www.ekoblog.cz/?q=node/284
// priblizne, v odkazech vyse stara data, ale v roce 2019
// to neni to o moc lepsi nez pred 10 lety, viz
// https://cs.wikipedia.org/wiki/Energetika_v_%C4%8Cesku
elektrina_cr_mix_emise  : 1.1,


// https://doi.org/10.1016/j.scitotenv.2018.07.233
// Matuštík, Kočí. "Environmental impact of personal consumption from life cycle perspective–A Czech Republic case study."
// prumerne emise na osobu, vse v kg CO2 / rok
cr_avg_total : 2000,
cr_avg_teplo : 996,
cr_avg_tepla_voda : 418,


cr_avg_doprava : 362,
cr_avg_doprava_auto : 257,
cr_avg_doprava_letadlo : 105,

// neduveryhodny? uplne jinde, nez
// UK : https://link.springer.com/article/10.1007%2Fs10584-014-1169-1
// Germany : https://www.sciencedirect.com/science/article/pii/S0959652617309666
cr_avg_jidlo : 778,			// excl. biogenic-carbon 
cr_avg_jidlo_maso_prop : 0.47,
cr_avg_jidlo_mliko_prop : 0.25,	// excl. biogenic-carbon 


// jidlo kg CO2/den
jidlo_vegan_den : 1.5,
jidlo_vegetarian_den : 2.5,
jidlo_avg_den : 4,
jidlo_masozrout_den : 5,
}
