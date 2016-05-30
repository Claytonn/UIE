# UIE - User Intent Events
#### Extended browser events for common page actions.

#### Usage

** UIE Starts On Document Ready **

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

- [ ] Improve Data Provided To Events
- [ ] Cross Browsers Testing
