import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Box, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import useDebounce from '~/hooks/use-debounce';
import { SearchTouristResult } from '~/models';
import { fetchTourist } from '~/services/placeService';

type InputTabProps = {
	label: string;
	name: string;
	id: string;
	onData: (data: SearchTouristResult) => void;
	textData?: string;
};

const InputTab = (props: InputTabProps) => {
	const { label, name, id, onData, textData } = props;

	const [searchResult, setSearchResult] = useState<SearchTouristResult[]>([]);
	const [text, setText] = useState<string>(textData || '');

	const [anchorSearch, setAnchorSearch] = useState<boolean>(false);

	const debounce = useDebounce({ value: text, delay: 500 });

	const inputRef = useRef<HTMLInputElement>(null);
	const boxRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		textData && setText(textData);
	}, [textData]);

	useEffect(() => {
		const handleMouseDown = (event: any | TouchEvent) => {
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
				const data = await fetchTourist(debounce);
				setSearchResult(data);
			};

			getPost();
		} catch (error) {
			console.log(error);
		}
	}, [debounce]);

	const handleSetSearchID = (result: SearchTouristResult) => {
		onData(result);
		setText('');
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
							<Stack direction={'row'} spacing={1} alignItems={'center'}>
								<Stack direction={'row'}>
									<img src={result.img_url} alt={result.name} width={100} height={50} />
								</Stack>
								<Typography fontWeight={500}>{result.name}</Typography>
							</Stack>
						</MenuItem>
					);
				})}
			</Box>
		</>
	);
};

export default InputTab;
