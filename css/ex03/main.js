/*
 * Format a number using a suffix
 * Adapted from
 * https://reacthustle.com/blog/how-to-convert-number-to-kmb-format-in-javascript
 */
function formatNumber(num, precision = 2) {
	const map = [
		{ suffix: "T", threshold: 1e12 },
		{ suffix: "B", threshold: 1e9 },
		{ suffix: "M", threshold: 1e6 },
		{ suffix: "K", threshold: 1e3 },
		{ suffix: "", threshold: 1 },
	];

	const found = map.find((x) => Math.abs(num) >= x.threshold);
	if (found) {
		const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
		return formatted;
	}

	return num;
}

function make_crypto_card(info, date = new Date()) {
	let price = formatNumber(info.total_volume, 1);
	let date_string = date.toLocaleString();
	const html = `
			<section class="chart">
				<header class="chart__header">
					<img class="chart__header__profile" alt="${info.symbol}" src="${info.image}" />
					<div class="chart__header__details">
						<h2 class="chart__header__details__subtitle">${info.symbol}</h2>
						<h1 class="chart__header__details__title">$ ${price}</h1>
					</div>
					<h3 class="chart__header__details__date">${date_string}</h3>
					<button class="icon-button">
						<svg
							class="icon-button__icon"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clip-path="url(#clip0_13413_1274)">
								<path
									d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
									fill="currentColor"
								/>
							</g>
							<defs>
								<clipPath id="clip0_13413_1274">
									<rect width="24" height="24" fill="currentColor" />
								</clipPath>
							</defs>
						</svg>
					</button>
				</header>
				<img class="chart__chart" src="chart-overview.svg" />
			</section>
`;
	return html;
}

const CRYPTO_API = "https://api.coingecko.com/api/v3/";
async function fetch_crypto_info() {
	const res = await fetch(CRYPTO_API + "coins/markets?vs_currency=usd", {
		mode: "cors", // no-cors, *cors, same-origin
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await res.json();
}

function add_crypto_charts(infos) {
	const chart_elem = document.getElementsByClassName("chart-view")[0];
	const charts = infos.map((c) => make_crypto_card(c));
	chart_elem.innerHTML = charts.join("");
}

function openNav() {
	const elem = document.getElementById("sitenav");
	elem.style.opacity = "100%";
	elem.style.display = "flex";
}

function closeNav() {
	const elem = document.getElementById("sitenav");
	elem.style.opacity = "0";
	elem.style.display = "none";
}

function kill_loader() {
	const elem = document.getElementById("loader");
	elem.classList.add("loader--done");
	setTimeout(() => elem.remove(), 1000);
}

function filter_crypto(event) {
	const filtered = CRYPTO_INFOS.filter((c) =>
		c.symbol.startsWith(event.target.value),
	);
	add_crypto_charts(filtered);
}
var CRYPTO_INFOS;
fetch_crypto_info().then((d) => {
	CRYPTO_INFOS = d;
	add_crypto_charts(CRYPTO_INFOS);
	kill_loader();
});

const search_elem = document.getElementsByClassName("appbar__search__input")[0];
search_elem.addEventListener("input", filter_crypto);
