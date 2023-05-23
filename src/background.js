var currentEngine;
init();

browser.storage.onChanged.addListener(init);

browser.contextMenus.create(
	{
        id: "Addressaurus",
        title: "Find address...",
        contexts: ["selection"],
    },
    // See https://extensionworkshop.com/documentation/develop/manifest-v3-migration-guide/#event-pages-and-backward-compatibility
    // for information on the purpose of this error capture.
    () => void browser.runtime.lastError,
);

browser.contextMenus.onClicked.addListener((info, tab) => 
{
    if (info.menuItemId === "Addressaurus") 
	{
		const mapUrl = currentEngine + encodeURIComponent(info.selectionText);
       
		browser.tabs.create({ url: mapUrl })
		.then(tab => {
			console.log(`New tab: ${tab}`);
		})
		.catch(error => {
			console.error(`Error creating new tab: ${error}`);
		});
    }
});

function init()
{
	getData("engine")
	.then((res) => 
	{
		currentEngine = res.engine || 'https://www.google.com/maps/search/?api=1&query=';
	});
}

function saveData(key, value) 
{
  browser.storage.local.set({ [key]: value });
}

function getData(key) 
{
  return browser.storage.local.get(key);
}