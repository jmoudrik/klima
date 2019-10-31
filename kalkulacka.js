function AppViewModel() {
	this.tepla_voda_uspora = ko.observable(50);

	this.tepla_voda_uspora_kg = ko.computed(function() {
		var ret = this.tepla_voda_uspora() / 100 * DATA.mat_cr_avg_tepla_voda;
		return ret;
	}, this);


	this.teplota_snizena = ko.observable(1);

	this.teplota_uspora_kg = ko.computed(function() {
		// 1 stupen ~= 6% uspory energie
		var ret = this.teplota_snizena() * 0.06 * DATA.mat_cr_avg_teplo;
		return ret;
	}, this);

	this.trigger_hack = ko.computed(function() {
		// XXX omfg - this hack relies on the assumption that knockout processes 
		// sequentially and that the popout created by index.html when tepla_voda_uspora_kg
		// is updated, but turned off; here we hope the _hack function runs 
		// after all bindings for tepla_voda_uspora_kg are processed and thus that
		// the popover we aare enabling is already created
		// Q: is there a nicer way??
		var ignored = this.tepla_voda_uspora() + this.teplota_uspora_kg();
		// need to enable the popover
		$('.popoverData').popover();
	}, this);

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

