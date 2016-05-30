# UIE - User Intent Events
#### Extended browser events for common page actions.

#### Events
- mouseLeftPage - User's mouse exited the page or browser.
- mouseOverExitingLink - User moused over an external link.
- mouseClickExitingLink	- User clicked an extenral link.

#### Example Settings
```
		UIE.settings({
			events: {
				mouseLeftPage: {
					enabled: true,
					callback: function(event, exitSide){
						console.log("Settings Callback: Mouse Left Page/Browser on the " + exitSide + " side");
					}
				},
				mouseOverExitingLink: {
					enabled: true,
					callback: function(event, opensInNewTab){
						console.log("Settings Callback: Mouse Over Exiting Link - Opens In New Tab? (" + opensInNewTab + ")");
					}
				},
				mouseClickExitingLink: {
					enabled: true,
					preventDefault: true,
					callback: function(event, opensInNewTab){
						console.log("Settings Callback: Mouse Clicked Exiting Link - Opens In New Tab? (" + opensInNewTab + ")");
					}
				}
			}
		});

```
#### To Do

- [ ] Extend Settings
- [ ] Improve Data Provided To Events
- [ ] Cross Browser Testing
