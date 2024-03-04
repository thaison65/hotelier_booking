export interface SearchResult {
	_id: string;
	name: string;
	area: string;
	nameCity?: string;
}

export interface SearchTouristResult {
	_id: string;
	name: string;
	img_url?: string;
}

export interface PLaceState {
	_id: string;
	name?: string;
}
