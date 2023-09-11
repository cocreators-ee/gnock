<script lang="ts">
	import { Button, FluidForm, TextInput } from 'carbon-components-svelte';
	import Checkmark from 'carbon-icons-svelte/lib/Checkmark.svelte';
	import Hourglass from 'carbon-icons-svelte/lib/Hourglass.svelte';

	const WAIT_BETWEEN_MS = 250;

	let buttonIcon = undefined;
	let log: string[] = [];
	let portsText = '';
	let address = '';

	function sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	function clearState() {
		buttonIcon = undefined;
		log = [];
	}

	function addLog(text: string) {
		log.push(text);
		log = log; // Trigger reactivity
	}

	async function knockPort(port: string) {
		try {
			// Create a very basic request to the target
			const url = `http://${address.trim()}:${port}`;
			addLog(`Knocking on ${url}`);
			await fetch(url, {
				cache: 'no-cache',
				redirect: 'manual',
				referrerPolicy: 'no-referrer'
			});
		} catch (e) {
			// We don't want errors
		}
	}

	async function knock() {
		clearState();

		buttonIcon = Hourglass;

		// Split by " " or , and then trim each entry, then remove empties
		const ports = portsText
			.split(/[ ,]/)
			.map((v) => v.trim())
			.filter((v) => v);
		addLog(`Knocking on ${ports.length} ports`);

		let wait = false;
		for (let port of ports) {
			if (wait) {
				await sleep(WAIT_BETWEEN_MS);
			}

			// Knock but ignore promise
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			knockPort(port).then(() => {});

			wait = true;
		}

		addLog(`Done...`);
		buttonIcon = Checkmark;
	}
</script>

<FluidForm
	on:submit={(e) => {
		e.preventDefault();
		knock();
	}}
>
	<TextInput
		bind:value={address}
		helperText="Domain or IP address to knock"
		labelText="Address"
		on:change={clearState}
		placeholder="Enter target hostname or IP..."
	/>
	<TextInput
		bind:value={portsText}
		helperText="List of ports, separated by spaces or commas"
		labelText="Ports"
		on:change={clearState}
		placeholder="List ports, separated by spaces or commas..."
	/>
</FluidForm>

<div>
	<Button icon={buttonIcon} on:click={knock}>Knock</Button>
</div>

<div class="log">
	{#each log as line}
		<p>{line}</p>
	{/each}
</div>

<style lang="scss">
	div {
		margin: 1rem 0;
	}
</style>
