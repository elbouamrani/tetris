/* eslint-disable no-unused-vars */
import TETRIMINOS from "./tetriminos";

const DEFAULT_CELL = {
	color: "#eaeaea",
	type: "empty",
};

const TetrisService = {
	generateGrid: (width, height, defaultCell) => {
		const grid = [];

		for (let index = 0; index < height; index++) {
			const row = [];
			for (let jndex = 0; jndex < width; jndex++) {
				row.push(defaultCell);
			}
			grid.push(row);
		}
		return grid;
	},
	rotateShape: (grid, shape, position) => {
		const xMax = position.x + shape.grid.length - grid[0].length;
		const xToShift = xMax > 0 ? xMax : 0;

		let xPosition = position;

		// console.log({ xMax, xToShift });

		if (xToShift) {
			xPosition = TetrisService.shiftShapePosition(
				grid,
				shape,
				position,
				{
					x: -xToShift,
					y: 0,
				}
			);
		}

		const matrix = [];
		for (let jndex = 0; jndex < shape.grid[0].length; jndex++) {
			const row = [];
			for (let index = 0; index < shape.grid.length; index++) {
				row.push(shape.grid[shape.grid.length - index - 1][jndex]);
			}
			matrix.push(row);
		}

		return { shape: { ...shape, grid: matrix }, position: xPosition };
	},
	shiftShapePosition: (grid, shape, position, direction = { x: 0, y: 1 }) => {
		const x_min = position.x + direction.x;
		const x_max = position.x + direction.x + shape.grid[0].length;
		const y_max = position.y + direction.y + shape.grid.length;

		const x_min_eval = x_min >= 0;
		const x_max_eval = x_max <= grid[0].length;
		const y_max_eval = y_max <= grid.length;

		let noCollisions = !TetrisService.checkShapeCollision(
			grid,
			shape,
			position,
			direction
		);

		if (noCollisions && x_min_eval && x_max_eval && y_max_eval) {
			// console.log("shift is possible");
			return { x: position.x + direction.x, y: position.y + direction.y };
		} else {
			return null;
		}
	},
	checkShapeCollision(grid, shape, position, direction) {
		let collision = false;

		for (let jndex = 0; jndex < shape.grid.length; jndex++) {
			for (let index = 0; index < shape.grid[0].length; index++) {
				const pos = {
					y: position.y + jndex + direction.y,
					x: position.x + index + direction.x,
				};

				if (shape.grid[jndex][index] && pos.y < grid.length) {
					const type = grid[pos.y][pos.x].type;
					if (type != "empty") {
						collision = true;
					}
					// console.log(JSON.stringify({ pos, type }));
				}
			}
		}

		return collision;
	},
	placeShape(matrix, shape, position) {
		//create a deep copy of grid array objects
		const grid = JSON.parse(JSON.stringify(matrix));

		for (let index = 0; index < shape.grid.length; index++) {
			for (let jndex = 0; jndex < shape.grid[0].length; jndex++) {
				if (shape.grid[index][jndex]) {
					grid[index + position.y][jndex + position.x] = {
						color: shape.color,
						type: "tetrimino",
					};
				}
			}
		}

		return TetrisService.evaluateGrid(grid, shape, position);
	},
	renderShape: (matrix, shape, position) => {
		//create a deep copy of grid array objects
		const grid = JSON.parse(JSON.stringify(matrix));

		for (let index = 0; index < shape.grid.length; index++) {
			for (let jndex = 0; jndex < shape.grid[0].length; jndex++) {
				if (shape.grid[index][jndex]) {
					grid[index + position.y][jndex + position.x] = {
						color: shape.color,
					};
				}
			}
		}

		return grid;
	},
	evaluateGrid: (matrix) => {
		//create a deep copy of grid array objects
		const grid = JSON.parse(JSON.stringify(matrix));

		let completeRows = [];

		for (let jndex = 0; jndex < grid.length; jndex++) {
			let isCompleteRow = true;

			for (let index = 0; index < grid[0].length; index++) {
				if (grid[jndex][index].type === "empty") {
					// console.log(grid[jndex][index]);
					isCompleteRow = false;
					break;
				}
			}

			if (isCompleteRow) {
				completeRows.push(jndex);
			}
		}

		completeRows.forEach((rowIndex) => {
			const row = grid[0].map(() => {
				return DEFAULT_CELL;
			});

			grid.splice(rowIndex, 1);

			grid.unshift(row);
		});

		const score = Math.round(completeRows.length * 1.4);

		return { grid, score };
	},
	tetriminos: TETRIMINOS,
};

export default TetrisService;
