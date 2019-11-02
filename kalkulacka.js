function AppViewModel() {
	this.zatepleni_uspora = ko.observable(30);

	this.zatepleni_uspora_kg = ko.computed(function() {
		var ret = this.zatepleni_uspora() / 100 * DATA.mat_cr_avg_teplo;
		return ret;
	}, this);

	this.tepla_voda_uspora = ko.observable(50);

	this.tepla_voda_uspora_kg = ko.computed(function() {
		var ret = this.tepla_voda_uspora() / 100 * DATA.mat_cr_avg_tepla_voda;
		return ret;
	}, this);

	this.vepr_hovezi_uspora= ko.observable(20);

	this.vepr_hovezi_uspora_kg = ko.computed(function() {
	    var vepr_hovezi_celkem_avg = (DATA.mat_cr_avg_veprovy * DATA.veprovy_kg_co2
	                                + DATA.mat_cr_avg_hovezi * DATA.hovezi_kg_co2);
	    //console.log(vepr_hovezi_celkem_avg + DATA.mat_cr_avg_kureci * DATA.kureci_kg_co2);

	    var kure_misto_toho =  DATA.kureci_kg_co2 * (
	                    // kolik veprovyho & hoveziho si odpustim
	                DATA.mat_cr_avg_veprovy * this.vepr_hovezi_uspora() / 100
	                + DATA.mat_cr_avg_hovezi * this.vepr_hovezi_uspora() / 100);
	    //console.log(kure_misto_toho);

		var jim_ted = (100 - this.vepr_hovezi_uspora()) / 100 * vepr_hovezi_celkem_avg + kure_misto_toho;
	    //console.log(jim_ted);

		// formulujem jako uspora, tzn to co ji prumerny cech - to co jim ted
		return vepr_hovezi_celkem_avg - jim_ted;
	}, this);

	this.teplota_snizena = ko.observable(2);

	this.teplota_uspora_kg = ko.computed(function() {
		// 1 stupen ~= 6% uspory energie
		var ret = this.teplota_snizena() * 0.06 * DATA.mat_cr_avg_teplo;
		return ret;
	}, this);

	this.auto_mhd_uspora = ko.observable(20);

	this.auto_mhd_uspora_kg = ko.computed(function() {
		var usetreno_za_auto = this.auto_mhd_uspora() / 100 * DATA.cr_avg_doprava_auto_est ;
        var pridano_za_mhd = this.auto_mhd_uspora() / 100 * DATA.cr_auto_mobility_per_cap * DATA.public_co2_km_avg;
		return usetreno_za_auto - pridano_za_mhd;
	}, this);

	this.maso_mleko_uspora = ko.observable(2);

	this.maso_mleko_uspora_kg = ko.computed(function() {
	    var maso_mleko_celkem = ( DATA.jidlo_maso_ratio + DATA.jidlo_mleko_ratio ) * DATA.cr_avg_jidlo_est;
		var ret = this.maso_mleko_uspora() / 7 * maso_mleko_celkem;
		return ret;
	}, this);

	this.sel_dovolena = ko.observable(destinace_dovolena[3]);

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
	    updatePopoverDelayed();
	    return dist;
	}, this);
    // helper

    // old

	this.dum_spotreba = ko.observable(DATA.cr_domacnost_topeni_avg);

	this.cerpadlo_cop = ko.observable(3);
	this.cena_kwh = ko.observable(3);		// kc / kwh
	this.ucinnost_kotel_uhli = ko.observable(0.9); 

    this.elektrokotel_co2 = ko.computed(function() {
		return this.dum_spotreba() * DATA.elektrina_cr_mix_emise;
	}, this);

    this.kotel_na_plyn_co2 = ko.computed(function() {
		return this.dum_spotreba() * DATA.plyn_emise / 0.95;
	}, this);

    this.kotel_na_uhli_co2 = ko.computed(function() {
		return this.dum_spotreba() * DATA.hnede_uhli_emise / this.ucinnost_kotel_uhli();
	}, this);

    this.cerpadlo_co2 = ko.computed(function() {
		return this.dum_spotreba() * DATA.elektrina_cr_mix_emise / this.cerpadlo_cop();
	}, this);

}

// Activates knockout.js
ko.applyBindings(new AppViewModel());  

