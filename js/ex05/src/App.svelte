<script>
	import Card from "./Card.svelte";
	let name = 'world';

	let CRYPTO_API = "https://api.coingecko.com/api/v3/";
	let currencies = fetch_crypto_info();

	async function fetch_crypto_info() {
		const res = await fetch(CRYPTO_API + "coins/markets?vs_currency=usd", {
			mode: "cors", // no-cors, *cors, same-origin
			headers: {
				"Content-Type": "application/json",
			},
		});
		return await res.json();
	}

</script>

<h1>Hello {name}!</h1>

{#await currencies}
	Loading
{:then currencies}
	{#each currencies as { symbol, image, total_volume }}
		<Card {symbol} {image} {total_volume}></Card>
	{/each}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}