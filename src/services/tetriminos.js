const TETRIMINOS = [
	{
		name: "O",
		width: 2,
		height: 2,
		color: "red",
		grid: [
			[1, 1],
			[1, 1],
		],
	},
	{
		name: "I",
		width: 4,
		height: 1,
		color: "blue",
		grid: [[1, 1, 1, 1]],
	},
	{
		name: "T",
		width: 3,
		height: 2,
		color: "green",
		grid: [
			[1, 1, 1],
			[0, 1, 0],
		],
	},
	{
		name: "L",
		width: 2,
		height: 3,
		color: "purple",
		grid: [
			[1, 0],
			[1, 0],
			[1, 1],
		],
	},
	{
		name: "J",
		width: 2,
		height: 3,
		color: "yellow",
		grid: [
			[0, 1],
			[0, 1],
			[1, 1],
		],
	},
	{
		name: "S",
		width: 3,
		height: 2,
		color: "brown",
		grid: [
			[0, 1, 1],
			[1, 1, 0],
		],
	},
	{
		name: "Z",
		width: 3,
		height: 2,
		color: "orange",
		grid: [
			[1, 1, 0],
			[0, 1, 1],
		],
	},
];

export default TETRIMINOS;
