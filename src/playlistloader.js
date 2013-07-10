(function(base) {

	base.playlistloader = function(playerApi) {
		var _this = this;
		var index = 0;
		var playlist = [];

		this.load = function(videos) {
			_this.videos = formatForVimeoAPI(videos);
			loadNextVideo();
			return playlist;
		};

		function formatForVimeoAPI(videos) {
			for (var i = 0; i < videos.length; i++) {
				var apiV2 = "vimeo.com/api/v2/";
                videos[i].api_url = videos[i].url
                videos[i].api_url = videos[i].api_url.replace(/vimeo.com\/(\d+)$/i, apiV2 + 'video/$1.json');
                videos[i].api_url = videos[i].api_url.replace(/vimeo.com\/([A-Z0-9]+)([\?A-Z0-9=]*)$/i, apiV2 + '$1/videos.json$2');
                videos[i].api_url = videos[i].api_url.replace(/vimeo.com\/groups\/([A-Z0-9]+)([\?A-Z0-9=]*)$/i, apiV2 + 'group/$1/videos.json$2');
                videos[i].api_url = videos[i].api_url.replace(/vimeo.com\/channels\/([A-Z0-9]+)([\?A-Z0-9=]*)$/i, apiV2 + 'channel/$1/videos.json$2');
                videos[i].api_url = videos[i].api_url.replace(/vimeo.com\/album\/([A-Z0-9]+)([\?A-Z0-9=]*)$/i, apiV2 + 'album/$1/videos.json$2');
			}
			return videos;
		}

		function loadNextVideo() {
            url = _this.videos[index++].api_url;
            params = {};
            callback = mergeVideo;


			base.utils.jsonp(url, params, callback);
		}

		function mergeVideo(json) {
            options = _this.videos[index-1];
            base.utils.extend(json[0], options);
			playlist = playlist.concat(json);

			if (index < _this.videos.length) {
                loadNextVideo();
			} else {
				playerApi.events.playlist.dispatch(playlist);
				playerApi.events.playlist.remove();
			}
		}
	};

})(vimeowrap);
