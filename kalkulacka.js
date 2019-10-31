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


	this.teplota_snizena = ko.observable(2);

	this.teplota_uspora_kg = ko.computed(function() {
		// 1 stupen ~= 6% uspory energie
		var ret = this.teplota_snizena() * 0.06 * DATA.mat_cr_avg_teplo;
		return ret;
	}, this);

	this.updatePopover = function() {
		console.log("update pops");
		$('.popoverData').popover();
	};

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

