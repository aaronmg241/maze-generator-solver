import './App.css';
import { useEffect, useState } from 'react';
import { prims } from './PrimsAlgorithm';
import { shortestPath } from './Djikstra';

function changeSquareByClick(e, mode) {
	if (mode === 'walls') {
		if (e.target.classList.contains('wall')) {
			e.target.classList = 'grid-square';
		} else {
			e.target.classList = 'grid-square wall';
		}
	} else if (mode === 'start') {
		clearClass(['start', 'finish-path']);
		e.target.classList = 'grid-square start';
	} else if (mode === 'finish') {
		clearClass(['finish', 'finish-path']);
		e.target.classList = 'grid-square finish';
	}
}

function changeSquareByDrag(e, mode) {
	if (mode !== 'walls' || e.buttons !== 1) return;

	e.target.classList = 'grid-square wall';
}

function clearBoard() {
	const squares = document.getElementsByClassName('grid-square');

	for (const square of squares) {
		square.style = {
			transitionDelay: '0s',
		};
		square.classList = 'grid-square';
	}
}

function clearClass(names) {
	const squares = document.getElementsByClassName('grid-square');

	for (const square of squares) {
		square.style.transitionDelay = '0s';

		for (const name of names) {
			if (square.classList.contains(name)) {
				square.classList.remove(name);
			}
		}
	}
}

function App() {
	const [mode, setMode] = useState('walls');
	const [numRows, setNumRows] = useState(0);
	const [numCols, setNumCols] = useState(0);

	useEffect(() => {
		determineGridSize(window);
		window.addEventListener('resize', (e) => determineGridSize(e.target));
	}, []);

	function determineGridSize(viewport) {
		const newNumRows = Math.round((viewport.innerHeight * 0.7) / 10);
		const newNumCols = Math.round((viewport.innerWidth * 0.7) / 10);

		const grid = document.getElementsByClassName('path-grid')[0];
		grid.style.gridTemplateRows = 'repeat(' + newNumRows + ', 10px)';
		grid.style.gridTemplateColumns = 'repeat(' + newNumCols + ', 10px)';

		setNumCols(newNumCols);
		setNumRows(newNumRows);
	}

	return (
		<div className='App'>
			<div className='options-menu'>
				<button className='option' style={mode === 'start' ? { opacity: 0.6 } : {}} onClick={() => setMode('start')}>
					Set Start
				</button>

				<button className='option' style={mode === 'finish' ? { opacity: 0.6 } : {}} onClick={() => setMode('finish')}>
					Set Finish
				</button>

				<button className='option' style={mode === 'walls' ? { opacity: 0.6 } : {}} onClick={() => setMode('walls')}>
					Draw Walls
				</button>
			</div>

			<div className='options-menu'>
				<button
					className='option'
					onClick={() => {
						const grid = prims(numRows, numCols);

						for (const row in grid) {
							for (const col in grid[row]) {
								const index = parseInt(row) * numCols + parseInt(col) + 1;
								const cell = document.getElementById(index);

								if (grid[row][col] === 1) cell.classList = 'grid-square maze-path';
								else cell.classList = 'grid-square wall';
							}
						}
					}}
				>
					Generate Maze
				</button>

				<button className='option' style={{ background: '#2ecc71' }} onClick={() => shortestPath(numRows, numCols)}>
					Solve
				</button>

				<button className='option' style={{ background: '#c0392b' }} onClick={() => clearBoard()}>
					Clear Board
				</button>
			</div>

			<div className='path-grid'>
				{[...Array(numCols * numRows)].map((e, i) => (
					<button
						className='grid-square'
						key={i}
						id={i + 1}
						onMouseOver={(e) => changeSquareByDrag(e, mode)}
						onMouseDown={(e) => changeSquareByClick(e, mode)}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
