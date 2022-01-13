+++
title = "Téma: Plasty a globální oteplování"
description = "Škodí plasty? Jaký vliv má používání plastů na klimatickou změnu? Špiní plasty moře? Co plastový odpad?"
date = 2022-01-11
draft = false
[extra]
czdate = "leden 2022"
fronttext = """
Plasty jsou zcela nepochybně jedním z největších vynálezů lidstva,
které výrazně zlepšují naše životy. Jsou levné, hygienické,
lehké, pevné, tvárné, a obecně jsou nesmírně variabilním
materiálem, kterému z velké části vděčíme za naše pohodlí a
bohatství. Samozřejmě, používání plastových materiálů má i
své stinné stránky, související hlavně s tím, že se v přírodě
rozkládají jen pomalu.
</p><p>
Pojďme se nyní na tyto stinné stránky &mdash; související hlavně s
koncem životního cyklu plastů &mdash; podívat.
"""
+++

<script>
var refs = {
'Plastic pollution report': [1, 'https://ourworldindata.org/plastic-pollution', 'Our World in Data, 2018'],
'Třídění odpadu v ČR': [2,'https://www.samosebou.cz/2021/05/21/jak-jsme-v-cr-tridili-a-recyklovali-odpady-v-roce-2020/', 'samosebou.cz, 2020'],
'Exkurze do třídírny odpadů': [3,'https://tv.idnes.cz/domaci/trideni-plastu-zlute-kontejnery-zpracovani-tridici-linka-benatky.V181010_073611_xman_smls', 'idnes.tv, 2018'],
'PVC Briefing': [4,'https://zerowasteeurope.eu/wp-content/uploads/2021/08/2021-06-22-PVC-briefing-FINAL.pdf', 'Zero Waste Europe, 2021'],
'Skladba směsného odpadu': [5,'https://www.ekokom.cz/skladba-smesneho-komunalniho-odpadu-z-domacnosti-cr/#', 'Ekokom, 2021'],
'Produkce odpadu v ČR': [6,'https://www.samosebou.cz/2021/02/11/kolik-odpadu-vyprodukuje-prumerne-kazdy-cech/', 'samosebou, 2021'],
'Emise z plastů': [7,'https://www.eionet.europa.eu/etcs/etc-wmge/products/greenhouse-gas-emissions-and-natural-capital-implications-of-plastics-including-biobased-plastics/@@download/file/ETC_2.1.2.1._GHGEmissionsOfPlastics_FinalReport_v7.0_ED.pdf', 'EU Environment Agency, 2021'],
'Mismanaged Plastic': [8,'https://ourworldindata.org/grapher/inadequately-managed-plastic', 'Our World in Data, 2010'],
'Plasticizers': [9,'https://en.wikipedia.org/wiki/Plasticizer', 'wikipedia, 2021'],
'Spalovny a CO2 z odpadů': [10,'https://www.hnutiduha.cz/sites/default/files/publikace/typo3/CO2_odpad.pdf', 'Hnutí duha, '],
'Incineration: Hidden emissions': [11,
'https://www.researchgate.net/publication/332246919_Hidden_emissions_A_story_from_the_Netherlands_Case_Study', 'Abel Arkenbout, Netherlands, 2018'],

'3R se obrací na vládu': [12,'https://arnika.org/o-nas/tiskove-zpravy/koalice-pro-3r-se-obraci-na-novou-vladu', 'Arnika, 2021'],
'Incineration: Toxic Ash': [13,'https://ipen.org/sites/default/files/documents/After_incineration_the_toxic_ash_problem_2015.pdf', 'ipen.org, 2015'],

/*
'': [10,'', ''],
*/
}
</script>

Abychom věděli, jak velké negativní efekty plastů jsou, potřebujeme nejprve
zjistit, kolik plastů se vůbec v domácnostech používá.

## Kolik plastového odpadu vyprodukují české domácnosti?

Podle <span data-bind="html: render_ref('Produkce odpadu v ČR')"></span> vytřídí
průměrný Čech za rok **65kg** odpadu, z toho je přibližně **15kg** plastů. To je
množství, které odpovídá **1 vytříděné PET láhvi za den**.

Kolik plastů pak vyhodíme do směsného odpadu? 
Podle <span data-bind="html: render_ref('Produkce odpadu v ČR')"></span>
vyprodukujeme každý za rok zhruba **550kg** směsného odpadu, z toho plastů není
v průměru více než 10%, viz
<span data-bind="html: render_ref('Skladba směsného odpadu')"></span>.
To tedy odpovídá přibližně **55kg** nevytříděných plastů, aneb množství
odpovídající **3.5 nevytříděné PET láhve za den**.

<br>
<br>

## Jak přispívá používání plastů ke globálnímu oteplování?

V předchozím bodě jsme odhadli, že průměrný Čech vyprodukuje v domácnosti
za rok přibližně **70 kg** plastového odpadu.

**Výroba 1kg plastů** vyprodukuje zhruba 3kg oxidu uhličitého,
a tedy výroba plastů, které jednotlivec spotřebuje za rok
odpovídá na osobu asi <span data-bind="html: format_co2_cmp_pop(210 / 1000, 1)"></span>
emisí za rok,
<span data-bind="html: render_ref('Emise z plastů')"></span>.


**Omezením spotřeby plastů**
o <input type="range"
   data-bind="value: plasty_uspora, valueUpdate: 'input', event: {touchend: updatePopover, keypress: updatePopover, mouseout: updatePopover }"
   min="0" max="100" step="10"> &nbsp; <b data-bind="text: plasty_uspora() + ' %'"></b>
sníží průměrný Čech své celkové roční emise CO2 o
<b data-bind='text: format_perc1(70 * plasty_uspora_na_kg() / DATA.cr_avg_total_est)'></b>
&ndash;
<span data-bind="html: format_co2_cmp_pop(70 * plasty_uspora_na_kg() / 1000)"></span>.

<div class="alert alert-info">
<p>
<i class="material-icons">info</i>
Ve výpočtu zde nezahrnujeme efekt recyklace, protože recyklovaný plast 
má jen malý podíl na celkovém množství použitých plastů, asi polovina
vytříděného odpadu. To odpovídá <b>půlce zrecyklované PET láhve na den</b>.
S rostoucím podílem recyklovaného plastu budou
emise z výroby plastů klesat.
</p>
<p class="mb-0">
<i class="material-icons">help</i>
<b>Proč nezapočítáváme i emise CO2 z pálení plastů ve spalovnách?</b>
&mdash;
Spálení 1 kg plastu vyprodukuje sice zhruba 2.7 kg oxidu uhličitého,
ale je potřeba vzít v potaz, že spalovny generují teplo a elektřinu,
a to docela účinně. Spalování plastů zde tak nezapočítáváme, protože
už je započteno v emisích ze spotřeby elektřiny (třeba na vytápění).
</p>
</div>


<br>
<br>

## Co se u nás děje s plastovým odpadem?

To záleží především na tom, kam plastový odpad vyhazujeme &mdash; třídíme, nebo ne?
V průměru je Česká republika v třídění odpadu docela dobrá, odpad třídí 
většina domácností, viz <span data-bind="html: render_ref('Třídění odpadu v ČR')"></span>.

1. Plast vyhozený do **tříděného odpadu** &mdash;
se cca z poloviny recykluje, cca 25 % se odveze na skládky a zhruba 15% se spálí.
Recyklují se hlavně plastové nádoby a obaly (e.g. PETky, nádoby na aviváže), folie a tvrdé plasty,
viz např. <span data-bind="html: render_ref('Exkurze do třídírny odpadů')"></span>.

2. Plast vyhozený do **směsného odpadu** &mdash;
Směsný odpad putuje zvětšiny přímo na skládku nebo do spalovny,
podle lokální odpadové infrastruktury. Směsného odpadu je hodně a recyklace drahá,
takže směsný odpad se z velké míry už netřídí a nerecykluje.

### Recyklace: Jak funguje?

Recyklace je **preferovaným** způsobem zpracování odpadů, teoreticky šetří náklady
na výrobu materiálů a umožňuje jejich opakované znovupoužití.

Recyklace má v současnosti několik problémů. Je drahá, protože například třídění se zatím do velké
míry dělá ručně, viz např. <span data-bind="html: render_ref('Třídění odpadu v ČR')"></span>.
Vyprodukovaná druhotná surovina není navíc tak čistá (a levná) jako nový plast,
který se vyrábí ve velkých množstvích a automaticky. To znamená, že ani poptávka po
recyklovaných plastech není moc velká.

Tyto problémy jsou velkou příležitostí pro: 
- **inovace** &mdash; automatizace třídění a zpracování i recyklace ve větším měřítku
	způsobí, že recyklovaný produkt bude levnější a kvalitnější.
- **regulace** &mdash; nové plasty jsou levné protože jejich cena zahrnuje jen náklady na
	výrobu, nikoliv náklady na jejich likvidaci. Kdyby regulace dobře nacenily tyto
	externí náklady (které teď platíme všichni zhoršeným životním prostředím), tak se trh
	přizpůsobí a výsledkem bude výrazně lepší hospodaření s plasty, inovace v 
	recyklaci a čistší životní prostředí.

### Skládky: Jak špatné je skládkování plastového odpadu?

Skládkování je obecně složité téma, které má nevýhody i výhody.

Hlavní **výhodou** je, že uhlík obsažený v plastech zůstane uložen
v zemi na dlouhou dobu, a není tak spálen a uvolněn do atmosféry.
To znamená, že životní cyklus uhlíku v takových plastech je:
- ropa ze země -> plastový granulát -> plastový produkt -> plast v zemi

Dá se navíc předpokládat, že v budoucnosti se budou skládky zpětně těžit za účelem
získávání surovin.

Hlavní **nevýhodou** je pak to, že různé druhy plastů 
obsahují špatně vázané příměsi, které se při skládkování
uvolňují do půdy a do vzduchu.
Velkým rizikem skládek jsou i **požáry**, které produkují katastrofální
množství jedovatých látek (narozdíl od řízeného spalování
ve spalovnách).

<div class="alert alert-info">
<p class="mb-0">
<i class="material-icons">info</i>
Největším problémem je PVC, jehož produkce používá velkou většinu všech vyrobených příměsí
<span data-bind="html: render_ref('PVC Briefing')"></span>.
Tyto příměsi navíc nejsou vázané chemicky, takže se časem z PVC uvolňují.
U nových výrobků z PVC (z Evropské Unie) už toto není tak velký problém,
protože se vlivem regulací používají bezpečnější sloučeniny,
viz <span data-bind="html: render_ref('Plasticizers')"></span>.
</p>
</div>


### Spalovny: Jak špatné je spalování plastového odpadu?

Spalování ve spalovnách je také složité téma, výhody a nevýhody
záleží na tom, podle jakých kritérií spalování hodnotíme.

**Výhody** spalování ve spalovnách pramení z toho, že spalovny produkují z odpadu teplo a elektřinu.
- pálení plastů je (co se emisí CO2 týká) někde mezi plynovými a uhelnými
elektrárnami <span data-bind="html: render_ref('Spalovny a CO2 z odpadů')"></span>.
Je to tím, že plasty jsou dobré palivo (v principu relativně čisté uhlovodíky,
lepší než uhlí), které navíc ještě před spálením velmi dobře slouží.
- to znamená, že dokud se spaluje obrovské množství jiných fosilních paliv
&mdash; uhlí (horší než plasty), LPG (o trochu lepší než plasty) &mdash;
tak je z pohledu CO2 spalování ve spalovnách v pohodě.


**Nevýhody** spalování ve spalovnách pramení hlavně ze špatného regulačního
prostředí spojeného s emisemi škodlivin.
- Emise jedovatých látek do ovzduší jsou pro spalovny měřeny zcela nedostatečně
&mdash; symbolických 18 hodin 2 krát ročně. To rozhodně není
dobrý statistický vzorek, protože:
	- hodně jedů může vznikat při málo častých událostech, jako je třeba 
		zapalování spalovny, než se technologie zahřeje na provozní teplotu.
		Stabilní a velká teplota je jedním z hlavních mechanizmů jak spalovna
		snižuje emise jedovatých látek. To v podstatě klidně může znamenat,
		že 1 zapálení za měsíc vyprodukuje víc škodlivin, než zbytek měsíce dohromady,
		viz <span data-bind="html: render_ref('Incineration: Hidden emissions')"></span>.
	- obsah jedů závisí na materiálu, který zrovna spalujeme. Ten může být
		různorodý &mdash; představte si rozdíl mezi
		várkou komunálního odpadu 
		a várkou stavebního odpadu (který může obsahovat velké množství PVC).
	- to znamená, že i kdyby si spalovna emise při měření přímo "nepohlídala" skladbou
		vstupní suroviny (což nejspíš částečně může),
		tak pravděpodobnost že se s takto málo častým měřením trefíme do chvíle
		kdy spalovna hodně "špiní" je malá.
- Rozhodně tak potřebujeme, aby spalovny byly monitorovány co nejčastěji
	(nejlépe kontinuálně). To spolu s **přísnými** limity může být hnacím motorem
	pro implementaci inovativních technologií čištění.
- Dalším problémem spaloven je nakládání s pevnými zbytky jako je popílek,
	materiál z filtrů škodlivin a další. Tyto materiály obsahují rakovinotvorné
	dioxiny a furany, těžké kovy a další jedovaté látky, které se špatně rozkládají
	(viz <span data-bind="html: render_ref('Incineration: Toxic Ash')"></span>).
	Na jednu stranu se například popílky výhodně používají jako příměs do betonů (to
	snižuje množství potřebného cementu, zlepšuje vlastnosti betonu
	a zároveň to nejspíš výrazně snižuje uvolňování jedů do prostředí),
	ale každopádně platí, že tyto látky jsou obecně velkým problémem
	s prostorem pro lepší regulaci, viz
	<span data-bind="html: render_ref('3R se obrací na vládu')"></span>.

Obecně můžeme říct, že je nutné, aby externí náklady (jedovaté látky vypouštěné
do vzduchu, vod, apod.) byly zahrnuty do nákladů spaloven a neplatili jsme je my všichni
zhoršeným životním prostředím.

<div class="alert alert-info">
<p class="mb-0">
<i class="material-icons">info</i>
PVC je v podstatě nejproblematičtější z používaných plastů
i pro spalovny (<span data-bind="html: render_ref('PVC Briefing')"></span>).
Kromě změkčovadel tvoří totiž více než polovinu hmotnosti PVC chlór.
Ten při spalování vytváří super-jedovaté zplodiny, které musí
spalovny řešit speciální technologií.
<br>
<i class="material-icons">warning</i>
PVC <b>NIKDY</b> nespalujte na ohni, nebo v kamnech. Domácí spalování
ostatních plastů je špatný nápad, domácí spalování PVC je super
špatný nápad (nádech, výdech, poleptané plíce).
</p>
</div>


<br>
<br>

## Přispívá používání plastů v ČR k znečištění moře?

Asi všem je jasné, že plastový odpad v mořích je problém.
Je ale tento argument relevantní i v otázce používání plastů v ČR?

Podívejme se na to, jak vypadají zdroje plastového odpadu v oceánech.
Podle <span data-bind="html: render_ref('Plastic pollution report')"></span>
pochází drtivá většina plastového odpadu v mořích z Asie (asi 80%), na Evropu
připadá množství menší než 1%. To znamená, že evropský plastový odpad
v podstatě není žádný problém. A to lze celkem bezpečně předpokládat,
že přímořské státy mají
na jednoho obyvatele mnohem větší vliv,
než suchozemská Česká Republika, kde navíc žije jen cca 2% evropských občanů.

Můžeme tak bezpečně říct, že **používání plastů v ČR má na znečišťování
moří zcela zanedbatelný vliv**. 

<div class="alert alert-info">
<p>
<i class="material-icons">lightbulb</i>
Plastový odpad v mořích je velmi emotivní téma. Když je tento argument 
použit v diskusi, často vyvolává pocit urgence a úzkosti.
Nechci tvrdit, že plasty v mořích nejsou problém (jsou, velký),
jen je zcela nerelevantní v českých (a v podstatě i v evropských) poměrech.
</p>
<p class="mb-0">
Je podle mne třeba nepoužívat (vlastně podpásově) tento argument v Čechách, a budovat
tak kulturu zavádějící argumentace, ale naopak přemýšlet
o opravdovém &mdash; těžkém &mdash; problému plastů v mořích.
Problém plastů v mořích je totiž třeba řešit předně zavedením
jakéhokoliv odpadového hospodářství v zemích, které odpad do moří vyhazují ve velkém.
Zjednodušeně lze říct, že je třeba pomoci tomu, aby lidé v
Asii a dalších rozvojových zemích (viz.
<span data-bind="html: render_ref('Mismanaged Plastic')"></span>)
neházeli odpad do řeky nebo moře, ale třeba spálili ve spalovně, nebo skládkovali.
To samozřejmě souvisí i s tím, že tito lidé jsou často chudí, a mají pochopitelně
úplně jiné starosti.
</p>
</div>

<br>
<br>

---

<br>

## Odkazy &amp; zdroje

<ul>
<div data-bind="html: render_refs()"></div>
</ul>



<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.0/knockout-min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<script src="/data.js"></script>
<script src="/kalkulacka.js"></script>

<script type="text/javascript">
	var triggers = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltips = triggers.map(function (tooltipTriggerEl) { return new bootstrap.Tooltip(tooltipTriggerEl) });
</script>
