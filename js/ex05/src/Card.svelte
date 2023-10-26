<script lang="ts">
	import LineChart from './LineChart.svelte';
	
	export let symbol = "TVL";
	export let image = "images/tvl.png";
	export let total_volume = 4860000000;
	export let date = new Date();

	// const CURRENT_LOCALE = document.documentElement.lang;
	const CURRENT_LOCALE = "en";
		const DEFAULT_NUMBER_FORMATTER_OPTIONS = {
		style: "currency",
		currency: "USD",
		notation: "compact",
		maximumFractionDigits: 1,
	};
	var NUMBER_FORMATTER = new Intl.NumberFormat(
		CURRENT_LOCALE,
		DEFAULT_NUMBER_FORMATTER_OPTIONS,
	);
	const DATE_FORMATTER = new Intl.DateTimeFormat(CURRENT_LOCALE, {
		dateStyle: "short",
	});
	
</script>

			<section class="chart">
				<header class="chart__header">
					<img class="chart__header__profile" alt={symbol} src={image} />
					<div class="chart__header__details">
						<h2 class="chart__header__details__subtitle">{symbol}</h2>
						<h1 class="chart__header__details__title">{NUMBER_FORMATTER.format(total_volume)}</h1>
					</div>
					<h3 class="chart__header__details__date">{DATE_FORMATTER.format(date)}</h3>
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
				<LineChart></LineChart>
			</section>

<style>
	/* fonts */
@font-face {
	font-family: "Readex Pro";
	src: url(./fonts/ReadexPro.ttf) format("truetype");
}

:root {
	--palette-blue-50: #e4f1ff;
	--palette-blue-100: #bfdbfe;
	--palette-blue-200: #99c6fc;
	--palette-blue-300: #76aff8;
	--palette-blue-400: #619ef5;
	--palette-blue-500: #558df1;
	--palette-blue-600: #527fe2;
	--palette-blue-700: #4d6dce;
	--palette-blue-800: #495cbb;
	--palette-blue-800: #403d9a;

	--palette-blue-gray-50: #f8fafc;
	--palette-blue-gray-200: #e2e8f0;
	--palette-blue-gray-500: #64748b;
	--palette-blue-gray-600: #475569;
	--palette-blue-gray-700: #334155;
	--palette-blue-gray-800: #1e293b;
	--palette-blue-gray-900: #0f172a;

	--palette-orange-400: #fb923c;

	--palette-red-400: #f87171;
	--palette-red-500: #ef4444;
	--palette-red-700: #b91c1c;

	--palette-white-900: #ffffff;

	--palette-bg-alpha: 10%;
	--palette-text-main: --palette-white-900;
}
	
.chart {
	margin: 1rem 0.5rem;
	padding: 1rem;
	border-radius: 12px;
	background: var(--palette-blue-gray-800, #1e293b);
	flex: 1 1 auto;
}

.chart__header {
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	margin: 0 0 0.75rem 0;
}

.chart__header__profile {
	height: 3rem;
}
.chart__header__details {
	margin: 0 0.5rem;
	flex: 1;
}

.chart__header__details__subtitle {
	color: var(--palette-blue-gray-500, #64748b);
	font-size: 0.875rem;
	font-weight: 400;
	margin-block-start: 0;
	margin-block-end: 0;
}

.chart__header__details__date {
	color: var(--palette-blue-gray-500, #64748b);
	font-size: 0.75rem;
	font-weight: 400;
	margin-block-start: 0;
	margin-block-end: 0;
}

.chart__header__details__title {
	font-weight: 400;
	font-size: 1.375rem;
	margin-block-start: 0;
	margin-block-end: 0;
	color: white;
}

.icon-button {
	/* height: 100%; */
	width: 3rem;
	background: none;
	border: none;
	color: white;
	border-radius: 100%;
}

.icon-button svg {
	width: 1.5rem;
	height: 1.5rem;
}

.icon-button:hover {
	color: var(--palette-blue-200, #bddbff);
	background-color: color-mix(
		in srgb,
		var(--palette-blue-200) var(--palette-bg-alpha),
		transparent
	);
	transition: all 0.25s;
}

.icon-button:active {
	color: var(--palette-blue-400, #5b7da5);
	background-color: color-mix(
		in srgb,
		var(--palette-blue-400) var(--palette-bg-alpha),
		transparent
	);
	transition: all 0.125s;
}

.icon-button__icon {
	width: 75%;
}
</style>

