#!/bin/sh

cd $(dirname $0)

uglifyjs src/vimeowrap.js \
	src/playlistloader.js \
	src/utils.js \
	src/signal.js \
	src/froogaloop.js \
	-o vimeowrap.js -m
	
uglifyjs src/plugins/carousel/carousel.js \
	src/plugins/carousel/noclickdelay.js \
	src/plugins/carousel/Tween.js \
	-o vimeowrap.carousel.js -m
	
uglifyjs src/plugins/lightsout/lightsout.js \
	src/plugins/lightsout/fade.js \
	-o vimeowrap.lightsout.js -m

uglifyjs src/plugins/playlist/playlist.js \
	src/plugins/playlist/noclickdelay.js \
	src/plugins/playlist/skinny-scroll.js \
	-o vimeowrap.playlist.js -m

uglifyjs src/plugins/infobox/infobox.js \
	-o vimeowrap.infobox.js -m
	