/*jslint devel: true, bitwise: true, regexp: true, browser: true, confusion: true, unparam: true, eqeq: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
/*globals jQuery, $ */

/*
 * MRUList
 *
 * Copyright (c) 2011-2012 Martijn W. van der Lee
 * Licensed under the MIT.
 *
 * Most-recently-used list using localStorage (with fallback to Cookies)
 * The MRUList is shared amonst all other instances of the same names list on
 * the same domain in real-time.
 */
var MRUList = function(_prefix, _size, _callback) {
	"use strict";

	var state,
		key			= _prefix + '.MRUList',
		size		= _size || 4,
		use_storage = false,
		callback	= _callback,
		prune		= function() {
						while (state.length > size) {
							state.shift();
						}
					},
		load		= function() {
						var json = localStorage.getItem(key);

						state = json === null ? [] : $.parseJSON(json);

						prune();
					},
		save		= function() {
						prune();

						var json = JSON.stringify(state);

						localStorage.setItem(key, json);

						$(window).trigger({
							'type': key
						,	'originalEvent': {
								'key':		key
							,	'newValue': json
							}
						});
					};

	this.add = function(item) {
		state.push(item);
		save();
	};

	this.count = function() {
		return state.length;
	};

	this.get = function(index) {
		return state[index];
	};

	this.all = function() {
		return state;
	};

	this.clear = function() {
		state = [];
		save();
	};

	this.resize = function(s) {
		size = s;
		prune();
	}

	$(window).on('storage '+key, function (e) {
		if (e.originalEvent.key == key) {
			load();
			if (callback) {
				callback(state);
			}
		}
	});

	// Enable localStorage support?
	try {
		use_storage = 'localStorage' in window && window['localStorage'] !== null;
	} catch(e) {}

	// Initialize
	load();
};