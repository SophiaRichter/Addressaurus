var currentEngine;


browser.contextMenus.create(
	{
        id: "Addressaurus",
        title: "Browse address %s",
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
		currentEngine = localStorage.getItem('engine');
		if (!currentEngine) 
		{
			currentEngine = 'https://www.google.com/maps/search/?api=1&query=';
		}
		const mapUrl = currentEngine + encodeURIComponent(info.selectionText);
        
		browser.tabs.create({ url: mapUrl })
		.then(tab => {
			//console.log(`New tab: ${tab}`);
		})
		.catch(error => {
			console.error(`Error creating new tab: ${error}`);
		});
    }
});
