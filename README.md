mrulist
=======
jQuery Most-Recently-Used plugin using browser local storage.
Requires browser-support for localStorage and JSON.stringify.
Requires jQuery (any old version should do).

Usage:
var mru = new MRUList('identifier', 5, function(list) {
	// list contains MRU objects, old-to-new
});

identifier is used to uniquely identify (per domain/browser) this list.
next is the number of items to remember
finally (optionally) a callback function returning a list of all MRU objects.

Now use mru.add(object) to add any string, number, array or object.

mru.count()			returns the number of object currently in the MRU list.
mru.get(index)		get the item at the specified position (old-to-new).
mru.clear()			clear the MRU list.
mru.all()			get a list of all items, same as the list returned in the callback.
mru.resize(size)	change the size of the MRU list.
