function AppViewModel() {
    // MWh / rok
	this.dum_spotreba = ko.observable(Math.ceil(DATA.cr_domacnost_topeni_avg));
	this.cerpadlo_cop = ko.observable(3.5);       // topny faktor cerpadla
	this.cerpadlo_cena = ko.observable(220000);
	// TODO XXX v html tooltipu co ukazuje cenu je to staticky
	this.cena_kwh = ko.observable(3);         // kc / kwh
	this.elektrina_cr_mix_emise = ko.observable(DATA.elektrina_cr_mix_emise);
	this.ucinnost_kotel_uhli = ko.observable(0.5);
	this.ucinnost_kotel_plyn = ko.observable(0.95);

    // emise jednotlivych zpusobu topeni
    // vse v t CO2 / rok

    this.elektrokotel_co2 = ko.computed(function() {
		return this.dum_spotreba() * this.elektrina_cr_mix_emise();
	}, this);

    this.kotel_na_plyn_co2 = ko.computed(function() {
		return this.dum_spotreba() * DATA.plyn_emise / this.ucinnost_kotel_plyn();
	}, this);

    this.kotel_na_uhli_co2 = ko.computed(function() {
		return this.dum_spotreba() * DATA.hnede_uhli_emise / this.ucinnost_kotel_uhli();
	}, this);

    this.cerpadlo_co2 = ko.computed(function() {
		return this.dum_spotreba() * this.elektrina_cr_mix_emise() / this.cerpadlo_cop();
	}, this);

    // kolik rocne cerpadlem setrim CZK oproti elektrickymu kotli
    this.cerpadlo_setrim = ko.computed(function() {
        var cena_zaklad = this.dum_spotreba() * 1000 * this.cena_kwh();
		return cena_zaklad - (cena_zaklad / this.cerpadlo_cop());
	}, this);

    // za kolik let se navrati investice do cerpadla
    this.cerpadlo_navratnost = ko.computed(function() {
		return this.cerpadlo_cena() / this.cerpadlo_setrim();
	}, this);

    // procenta o kolik zateplim
	this.zatepleni_uspora = ko.observable(20);

    // kg co2 uspora
	this.zatepleni_uspora_kg = ko.computed(function() {
		var uspora = this.zatepleni_uspora() / 100 * this.kotel_na_uhli_co2() * 1000;
		return uspora;
	}, this);

    // procenta teply vody co si odpustim
	this.tepla_voda_uspora = ko.observable(50);

    // kg co2 uspora
	this.tepla_voda_uspora_kg = ko.computed(function() {
		var uspora = this.tepla_voda_uspora() / 100 * DATA.mat_cr_avg_tepla_voda;
		return uspora;
	}, this);

    // procenta veprovyho & hoveziho, co si odpustim
	this.vepr_hovezi_uspora = ko.observable(20);

    // kg co2 uspora
	this.vepr_hovezi_uspora_kg = ko.computed(function() {
	    // kolik veprovyho a hoveziho jim celkem
	    var vepr_hovezi_celkem_avg = (DATA.mat_cr_avg_veprovy * DATA.veprovy_kg_co2
	                                + DATA.mat_cr_avg_hovezi * DATA.hovezi_kg_co2);

	    var kure_misto_toho =  DATA.kureci_kg_co2 * (
	                    // kolik veprovyho & hoveziho si odpustim
	                DATA.mat_cr_avg_veprovy * this.vepr_hovezi_uspora() / 100
	                + DATA.mat_cr_avg_hovezi * this.vepr_hovezi_uspora() / 100);

        // to vepr/hovezi co jeste porad jim, i po omezeni
        var zbytek_vepr_hovezi = (100 - this.vepr_hovezi_uspora()) / 100 * vepr_hovezi_celkem_avg;
		var jim_ted = zbytek_vepr_hovezi + kure_misto_toho;

		var uspora = vepr_hovezi_celkem_avg - jim_ted;
		return uspora;
	}, this);

    // stupne celsia o ktery min topim
	this.teplota_snizena = ko.observable(2);

    // kg co2 uspora
	this.teplota_uspora_kg = ko.computed(function() {
        // detailnejsi rozbor viz e.g. https://forum.tzb-info.cz/121298-zvyseni-teploty-domu-o-1st-6-a-realita/vsechny-prispevky
		// radove neco jako 1 stupen ~= 6% uspory energie
		var uspora = this.teplota_snizena() * 0.06 * DATA.mat_cr_avg_teplo;
		return uspora;
	}, this);

    // kolik procent autem ujetych km nahradim hromadnou dopravou
	this.auto_mhd_uspora = ko.observable(20);

    // kg co2 uspora
	this.auto_mhd_uspora_kg = ko.computed(function() {
		var usetreno_za_auto = this.auto_mhd_uspora() / 100 * DATA.cr_avg_doprava_auto_est ;
        var pridano_za_mhd = this.auto_mhd_uspora() / 100 * DATA.cr_auto_mobility_per_cap * DATA.public_co2_km_avg;
		var uspora = usetreno_za_auto - pridano_za_mhd;
		return uspora;
	}, this);

    // pocet dni v tydnu bez masa/mleka
	this.maso_mleko_uspora = ko.observable(2);

    // kg co2 uspora
	this.maso_mleko_uspora_kg = ko.computed(function() {
	    // celkove emise za maso & mleko
	    var maso_mleko_celkem = ( DATA.jidlo_maso_ratio + DATA.jidlo_mleko_ratio ) * DATA.cr_avg_jidlo_est;
		var uspora = this.maso_mleko_uspora() / 7 * maso_mleko_celkem;
		return uspora;
	}, this);

    // kam bych jel na dovolenou
	this.sel_dovolena = ko.observable(destinace_dovolena[3]);

    // kolik kg usporim tim, ze misto toho zustanu v cechach
    // data viz `common.js/dovolena`
	this.dovolena_uspora_kg = ko.computed(function() {
        // predpokladame, ze cesta po cechach je "zadarmo"
        // pro letadlo je to rozumne:
            // vzdalenost kterou lidi ujedou z domova na letiste by ujeli po cechach, tzn
            // (to je imo celkem ok predpoklad, cesta po cechach je vyrazne kratsi
            // a min zatezujici, nez litani, takze se to ztrati).
            // kdyztak muzem pripocitat 100 km, nebo tak
            // navic na dovolenou autem se vetsinou jede ve vic lidech a tim je
            // jizda na osobo-kilometr vyrazne levnejsi (~ 40 g/km pri 3 lidech v aute)
        // autem je to trosku blbejsi odhad, ale nevime, kde bydli, atp, kam jedou
        // stejne tak, pocitame vzdalenost z Prahy (ktera je priblizne veprostred, takze
        // se ty chyby pravdepodobne nejak odectou a +- je to ok

        // 2 * pze jedem/letime tam a zpet
	    var dist = 2* dovolena[this.sel_dovolena()];
	    // XXX hack to update the popover
	    // could not find event that triggers the "change" for the <select> reliably
	    // (and it is not 'onchange'), for this to be updated by <... data-bind="... event:{onchange:updatePopover...}">
	    // we update the popover 200ms after return from this method, hoping that
	    // the new popover will be by then inserted to DOM.
	    updatePopoverDelayed();
	    return dist;
	}, this);
};


// Activates knockout.js
var model = new AppViewModel();
ko.applyBindings(model);

//
model.dum_spotreba(Math.ceil(DATA.cr_domacnost_topeni_avg));
model.zatepleni_uspora(20);

