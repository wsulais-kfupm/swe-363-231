const LICENSE_URL =
	'https://raw.githubusercontent.com/spdx/license-list-data/main/json/licenses.json';

const SELECT_OPTIONS = document.getElementById('license');
const SELECT_LIBRE = document.getElementById('license-libre');
const SELECT_OSI = document.getElementById('license-osi');
const SELECT_OTHER = document.getElementById('license-other');
const OTHER_LICENSES = document.getElementById('license-other-set');

SELECT_OPTIONS.addEventListener('change', (e) => {
	OTHER_LICENSES.disabled = SELECT_OPTIONS.value !== 'other';
	console.log(SELECT_OPTIONS.value);
});

async function get_licenses() {
	const res = await fetch(LICENSE_URL);
	const json = await res.json();
	return json.licenses;
}

function add_licenses(licenses) {
	for (const license of licenses) {
		const elem = document.createElement('option');
		elem.value = license.licenseId;
		elem.innerText = license.name;
		if (license.isFsfLibre) {
			SELECT_LIBRE.appendChild(elem);
		} else if (license.isOsiApproved) {
			SELECT_OSI.appendChild(elem);
		} else {
			SELECT_OTHER.prepend(elem);
		}
	}
}

get_licenses().then(add_licenses);
