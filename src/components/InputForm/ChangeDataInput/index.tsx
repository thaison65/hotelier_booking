import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { Typography, Box, Paper, MenuItem, Stack, TextField } from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';

import useDebounce from '~/hooks/use-debounce';
import { SearchResult } from '~/models';
import { fetchPlace } from '~/services/placeService';

type ChangeDataInputProps = {
	label: string;
	name: string;
	id: string;
	onData: (data: SearchResult) => void;
	textData?: string;
};

function ChangeDataInput(props: ChangeDataInputProps) {
	const { label, name, id, onData, textData } = props;

	const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
	const [text, setText] = useState<string>(textData || '');

	const [anchorSearch, setAnchorSearch] = useState<boolean>(false);

	const debounce = useDebounce({ value: text, delay: 500 });

	const inputRef = useRef<HTMLInputElement>(null);
	const boxRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		textData && setText(textData);
	}, [textData]);

	useEffect(() => {
		const handleMouseDown = (event: MouseEvent | TouchEvent) => {
			if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
				setAnchorSearch(false);
			}
		};
		window.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('touchstart', handleMouseDown);
		return () => {
			window.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('touchstart', handleMouseDown);
		};
	}, []);

	useEffect(() => {
		if (!debounce.trim()) {
			setSearchResult([]);
			return;
		}

		try {
			const getPost = async () => {
				const data = await fetchPlace(debounce);
				setSearchResult(data);
			};

			getPost();
		} catch (error) {
			console.log(error);
		}
	}, [debounce]);

	const handleSetSearchID = (result: SearchResult) => {
		onData(result);
		setText(result.name);
		handleCloseSearch();
	};

	const handleCloseSearch = () => {
		setAnchorSearch(false);
	};

	const handleChangeInputtext = (event: ChangeEvent<HTMLInputElement>) => {
		setText(event.target.value as string);
		setAnchorSearch(true);
	};

	return (
		<>
			<Stack direction={'row'} alignItems={'flex-end'}>
				<TextField
					fullWidth
					label={label}
					type="text"
					id={id}
					name={name}
					ref={inputRef}
					spellCheck={false}
					value={text}
					onChange={handleChangeInputtext}
					required={true}
				/>
			</Stack>
			<Box
				component={Paper}
				zIndex={10}
				position={'absolute'}
				ref={boxRef}
				display={`${text !== '' && anchorSearch ? 'block' : 'none'}`}
				width={500}
			>
				<Box py={2} mx={3}>
					<Typography fontWeight={600} textAlign={'start'}>
						Hãy chọn {label} bạn muốn
					</Typography>
				</Box>
				<Box mx={1}>
					<Typography>{!searchResult && 'Xin chờ đợi...'}</Typography>
				</Box>
				{searchResult.map((result) => {
					return (
						<MenuItem key={result._id} onClick={() => handleSetSearchID(result)} sx={{ mx: 1 }}>
							<Stack direction={'column'}>
								<Stack direction={'row'}>
									<LocationOnIcon color="primary" />
									<Typography fontWeight={600} marginLeft={1}>
										{result.name}
									</Typography>
								</Stack>
								<Typography fontWeight={200}>{`${result.nameCity ? `${result.nameCity}, ` : ''}${
									result.area
								}`}</Typography>
							</Stack>
						</MenuItem>
					);
				})}
			</Box>
		</>
	);
}

export default ChangeDataInput;
