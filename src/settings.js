
function saveOptions(e) 
{
	let value = document.querySelector("#mapselect").value;
	
	localStorage.setItem('engine', value);
	console.log('save to engine ' + value);
}

function restoreOptions() 
{
	let value = localStorage.getItem('engine');
	if (value)
	{
		document.querySelector("#mapselect").value = value;
		console.log('load from engine ' + value);
	}
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("#btnSave").addEventListener("click", saveOptions);