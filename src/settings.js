function saveOptions(e) 
{
	let value = document.querySelector("#engine").value;
	
	browser.extension.getBackgroundPage().saveData("engine", value);
	e.preventDefault();
}

function restoreOptions() 
{
	browser.extension.getBackgroundPage().getData("engine")
	.then((res) => {
		document.querySelector("#engine").value = res.engine || 'https://www.google.com/maps/search/?api=1&query='
	});
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);