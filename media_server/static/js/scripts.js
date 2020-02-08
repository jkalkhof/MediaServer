window.onload = () => {
	if (document.getElementById('results')){
		load_content(
			'movies',
			'list'
		)
	}
	if (document.getElementById('tagger')) {
		new FileTagger( document.getElementById('tagger') );
	}
};

bodyonload = () => {

};

search = () => {
	console.log('script: search');
	let search = document.getElementById('search');
	console.log(search.value);
	if (search.value.length >= 3){
		// reduce unneceesary queries with large quantities of results
		load_content(
			document.getElementsByClassName('selected')[0].classList.item(0),
			'search'
		);
	} else {
		load_content(
			document.getElementsByClassName('selected')[0].classList.item(0),
			'list'
		);
	}
};

force_search = () => {
	console.log('script: force_search');
	// this is only called when the search button is pressed
	load_content(
		document.getElementsByClassName('selected')[0].classList.item(0),
		'search'
	);
}

rescan_folder = (elem) => {
	console.log('script: rescan_folder');
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
		if(xhr.readyState === XMLHttpRequest.DONE) {
			console.log(xhr.responseText);
		}
	}
	xhr.open('POST',`rescan_dir/${elem.innerHTML.toLowerCase()}`,true);
	xhr.send(null);
}

collapse_content = (elem) => {
	console.log('script: collapse_content');
	jwplayer().remove();
	let content = elem.parentElement.children[1];
	content.innerHTML = "";
	elem.classList.remove('expanded');
}

build_jwplayer = (elem,fname) => {
	jwplayer(elem).setup({
		"file": fname,
		"width": elem.parentElement.clientWidth,
		"height": elem.parentElement.clientWidth / 2
	});
}

expand_video = (event) => {
	console.log('script: expand_video');
	let elem = event.target||event.srcElement;
	let content = elem.parentElement.children[1];
	let type = document.getElementsByClassName('selected')[0].classList[0];

	if(elem.classList.contains('expanded') ){
		collapse_content(elem);
	} else {
        let old_elems = document.getElementsByClassName('expanded');
        for(let i = 0; i < old_elems.length; i++){
            collapse_content(old_elems[i]);
        }

        if (type == 'movies') {
        	build_jwplayer(content,`movies/${elem.id}`);
        } else {
        	let season = elem.parentElement.parentElement.children[0].innerText;
        	let series = elem.parentElement.parentElement.parentElement.children[0].innerText;
        	build_jwplayer(content,`tv/${series}/${season}/${elem.id}`);
        }
        elem.classList.add('expanded');
    }
}

toggle_item = (event) => {
	console.log('script: toggle_item');
	let elem = event.target||event.srcElement;
	let content = Array.from(elem.parentElement.children);

	if (elem.classList.contains('show')){
		content.forEach( (entry,index) => {
			if(index >= 1){
				entry.style.display = 'none';
			}
		});
		elem.classList.remove('show');
		elem.classList.add('hide');

	} else if (elem.classList.contains('hide')){
		content.forEach( (entry,index) => {
			if(index >= 1){
				entry.style.display = 'block';
			}
		});
		elem.classList.remove('hide');
		elem.classList.add('show');
	}
}

build_item = (entry,tv) => {
	console.log('script: build_item');
	let item = document.createElement('div');
	item.className = "item";
	if (tv) item.style.display = 'none';

	let header = document.createElement('div');
	header.className = 'header hide';
	header.id = entry['file'];
	// header.innerText = entry['name'];
	header.innerText = entry['plot_group']+':'+entry['plot'];
	header.addEventListener('click', event => {
		expand_video(event);
	});

	let content = document.createElement('div');
	content.className = 'content';

	item.appendChild(header);
	item.appendChild(content);

	return item;
}

build_season = (entry) => {
	let season_header = document.createElement('div');
	season_header.className = 'header hide';
	season_header.innerText = entry['season'];
	season_header.addEventListener('click',(event) => {
		toggle_item(event);
	});

	let season = document.createElement('div');
	season.className = 'item';
	season.id = entry['season'].replace(/^/g, 'm').replace(/[\',]/g, '').replace(/[\.\s]/g, '-').toLowerCase();

	season.style.display = 'none';

	season.appendChild(season_header);

	return season;
}

build_series = entry => {
	let series_header = document.createElement('div');
	series_header.className = 'header hide';
	series_header.innerText = entry['series'];
	series_header.addEventListener('click',(event) => {
		toggle_item(event);
	});

	let series = document.createElement('div');
	series.className = 'item';
	series.id = entry['series'].replace(/^/g, 'm').replace(/[\',]/g, '').replace(/[\.\s]/g, '-').toLowerCase();

	series.appendChild(series_header);

	return series;
}

load_content = (category,mode) => {
	console.log('script: load_content');
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
		if(xhr.readyState === XMLHttpRequest.DONE) {
			results.innerHTML = "";
			data = xhr.responseText;
			try {
				var data = JSON.parse(xhr.responseText);
			} catch(e) {
				console.log(e);
			}
			if (category == 'movies') {
				data.forEach( (entry) => {
					results.appendChild( build_item( JSON.parse(entry), false ) );
				});
			}
			else if (category == 'tv') {
				data.forEach( (entry) => {
					entry = JSON.parse(entry);
					let item = build_item( entry, true);

					let series = results.querySelector(`#${entry['series'].replace(/^/g, 'm').replace(/[\',]/g, '').replace(/[\.\s]/g, '-').toLowerCase()}`);

					if (series) {
						let season = series.querySelector(`#${entry['season'].replace(/^/g, 'm').replace(/[\',]/g, '').replace(/[\.\s]/g, '-').toLowerCase()}`);

						if (season) {
							season.appendChild(item);

						} else {
							let season = build_season(entry);

							season.appendChild(item);

							series.appendChild(season);
						}
					} else {
						let series = build_series(entry);
						let season = build_season(entry);

						season.appendChild(item);

						series.appendChild(season);

						results.appendChild(series);
					}
				});
			}
			else if (category == 'books') {
				data.forEach( (entry) => {
					entry = JSON.parse(entry);

					let p = document.createElement('p');
					let a = document.createElement('a');
					a.href = `books/${entry['file']}`;
					a.innerText = entry['name'];
					p.appendChild(a);
					results.appendChild(p);
				});
			}
		}
	};
	if (mode == 'list'){
		xhr.open('POST',`search/${category}/`,true);
	}
	else if (mode == 'search'){
		xhr.open('POST',`search/${document.getElementsByClassName('selected')[0].classList.item(0)}/${document.getElementById('search').value}`,true);
	}
	xhr.send(null);
}

switch_tab = (elem) => {
	console.log('script: switch_tab');
	let category;
	if (elem.classList.contains('movies')) {
		category = 'movies';
	} else if (elem.classList.contains('tv')) {
		category = 'tv';
	} else if (elem.classList.contains('books')) {
		category = 'books';
	}

	load_content(category,'list');

	document.getElementById('search').value = "";

	document.getElementsByClassName("selected")[0].classList.remove("selected");
	elem.classList.add("selected");
}
