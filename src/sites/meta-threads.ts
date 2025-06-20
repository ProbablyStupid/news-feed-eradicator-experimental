import injectUI, { isAlreadyInjected } from '../lib/inject-ui';
import { isEnabled } from '../lib/is-enabled';
import { Store } from '../store';

export function checkSite(): boolean {
	console.log("checking!");
	return window.location.host.includes('threads.com');
}

export function eradicate(store: Store) {
	console.log("Eradicating!");

	function removeChildren(container: Element) {
		// const children = container.children;
		// Array.from(children).forEach((el) => {
		// 	el.remove();
		// });

		// This is a little crude, but effective
		container.innerHTML = "";
		console.log("removing children.");
	}

	function eradicateRetry() {
		console.log("Eradication retry!!");
		const settings = store.getState().settings;
		if (settings == null || !isEnabled(settings))
			return;

		var screenWidth = window.innerWidth;
		// The width at which Meta-Threads transitions to a mobile layout. (tested in Google Chrome)
		const mobileTransitionWidth = 700;

		console.log(screenWidth);

		if (screenWidth >= mobileTransitionWidth) {
			// desktop

			// The issue with this is that it removes the 'new-post' section at the top too.
			// This doesn't hurt the functionality, but it's nicer if we can just eradicate
			// everything below that.
			// var containerQuerySelector = '[aria-label="Column body"]';	

			// This should be the classes for the desktop site.
			var containerQuerySelector = '[class="x1c1b4dv x13dflua x11xpdln"]';

			
		}
		else {
			// mobile
			// This query selector is only available when the user is not signed in.
			// var containerQuerySelector = '[data-nosnippet="true"]';
			
			// this should be the classes
			var containerQuerySelector = '[class="x78zum5 xdt5ytf x1iyjqo2 x1n2onr6"]';
			console.log("mobile screen width!");
		}

		// Alternatively, [data-pressable-container="true"] gets one of the containers of every post, mobile and desktop.
		// The fourth parent of the 'data-pressable' posts is the column container.
		// The issue wit that approach however, is that this applies to every post, even in the search tab.

		const feed = document.querySelector(containerQuerySelector);
		if (feed == null) {
			console.log("feed is null!");
			console.log('Query: ', containerQuerySelector);
			console.log(feed);
			return;
		}

		console.log('Query: ', containerQuerySelector);
		console.log(feed);

		if (!isAlreadyInjected()) {
			removeChildren(feed);
			injectUI(feed, store);
		}
		else {
			console.log("UI is already injected");
		}
	}

	setInterval(eradicateRetry, 1000);
}