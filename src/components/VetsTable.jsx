import * as React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Row from './Row'
import Paper from '@mui/material/Paper';
import { Card, Button, Box, useRadioGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

import { makeGetRequest } from '../util';

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const tableHeads = ['İsim', 'Yildiz']

export default function VetsTable() {
	const [isLoaded, setLoaded] = useState(false);
	const [data, setData] = useState([]);
	const [comment, setComment] = useState([]);
	const [open, setOpen] = useState(false);
	const [openSecond, setOpenSecond] = useState(false);
	const [openThird, setOpenThird] = useState(false);
	const [currentData, setCurrentData] = useState(false)
	const [expanded, setExpanded] = React.useState(false);

	const [notFound, setNotFound] = useState(false)

	const handleOpen = (e) => {
		console.log(e.target)
		setOpen(true)
	};

	const getVets = async () => {
		const getData = axios.get("http://localhost:8000/vets/get_vets")
			.then(res => {
				const persons = res.data;
				setData(persons);
			})
		
	}

	const getComments = async (vet) => {

		const getComments = await axios.get(`http://localhost:8000/comments/get_comments/`)
		const result = getComments.data
		await setComment(result);
		setLoaded(true)
	}

	const handleClose = () => setOpen(false);

	useEffect(() => {
		getVets()
		getComments()
	}, [])
	useEffect(() => {

	}, [isLoaded])

	function avgStar(coms) {
		let length = coms.length;
		let sum = 0
		for(var i=0; i < length; ++i) {
			sum += coms[i].star;
		}
		return sum/length;
	}

	const renderTableData = () => {
		console.log("Data: " , data)
		return data.map( (vet, index) => {
			const coms = comment.filter(comment => Number(comment.vet.slice(comment.vet.length - 2).replace("/", "")) === Number(vet.id) )
			const id = vet.id;
			const name = vet.name;
			const star = avgStar(coms);
			return (
				<Row key={id} name={name} star={star} coms={coms} >
				</Row>
			)
		})
	}
	
	return (
		<TableContainer>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell>Isim</TableCell>
						<TableCell>Yildiz</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{isLoaded === true ? renderTableData() : ""}
				</TableBody>
			</Table>
		</TableContainer>
	);
}