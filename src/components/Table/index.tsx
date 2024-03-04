import { ChangeEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	TableContainer,
	Paper,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableFooter,
	TablePagination,
	TableHead,
	Button,
	Typography,
} from '@mui/material';

import ArticleIcon from '@mui/icons-material/Article';

import TablePaginationActions from './TablePaginationActions';
import { DataTable, Title } from '~/models';

interface TableComponetProps {
	titles: Title;
	data: DataTable[];
	handleOpenDialog?: (id: string) => void;
	linkDetail?: string;
}

function TableComponet(props: TableComponetProps) {
	const { titles, data, handleOpenDialog, linkDetail } = props;

	const navigate = useNavigate();

	const titleTable = Object.keys(titles);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

	const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		event?.persist;
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleClickOpenInformation = (id: string) => {
		localStorage.setItem('id', id);
		linkDetail && navigate(`${linkDetail}${id}`);
	};

	return (
		<>
			<TableContainer component={Paper} sx={{ borderRadius: 4 }}>
				<Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
					<TableHead sx={{ bgcolor: '#ddd' }}>
						<TableRow>
							{titleTable.map((key) => {
								if (titles[key] === '') {
									return;
								}

								return (
									<TableCell align="center" key={key} sx={{ fontWeight: 600, color: '#7f7f7f' }}>
										{titles[key]}
									</TableCell>
								);
							})}
							<TableCell colSpan={2}></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{(rowsPerPage > 0
							? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: data
						).map((row: DataTable) => {
							const titleRows = Object.keys(row);
							return (
								<TableRow key={row['_id']}>
									{titleRows.map((value: string) => {
										if (value === '_id') {
											return;
										}
										if (value === 'img_url') {
											return (
												<TableCell key={value} component="th" scope="row" align="center">
													{row.img_url && (
														<img src={row.img_url.img_url} width={100} height={100} />
													)}
												</TableCell>
											);
										}
										let limitedValue: string;

										if (row[value] !== undefined) {
											limitedValue =
												row[value].toString().length <= 20
													? row[value]?.toString() || ''
													: `${row[value]?.toString().slice(0, 20)}...`;
										} else {
											limitedValue = '';
										}
										return (
											<TableCell key={value} component="td" scope="row" align="center">
												<Typography variant="body1">{limitedValue}</Typography>
											</TableCell>
										);
									})}

									<TableCell component="td" scope="row">
										<Button
											variant="outlined"
											color="primary"
											startIcon={<ArticleIcon />}
											onClick={(event) => {
												event.stopPropagation();
												handleClickOpenInformation(row._id);
												handleOpenDialog && handleOpenDialog(row._id);
											}}
										>
											Xem
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
								count={data.length}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									inputProps: {
										'aria-label': 'rows per page',
									},
									native: true,
								}}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</>
	);
}

export type { Title };

export default TableComponet;
