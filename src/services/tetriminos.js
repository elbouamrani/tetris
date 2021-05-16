const TETRIMINOS = [
	{
		name: "O",
		width: 2,
		height: 2,
		color: "#ef641a",
		grid: [
			[1, 1],
			[1, 1],
		],
	},
	{
		name: "I",
		width: 4,
		height: 1,
		color: "#1791f1",
		grid: [[1, 1, 1, 1]],
	},
	{
		name: "T",
		width: 3,
		height: 2,
		color: "#12bf12",
		grid: [
			[1, 1, 1],
			[0, 1, 0],
		],
	},
	{
		name: "L",
		width: 2,
		height: 3,
		color: "#b706b7",
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
		color: "#ffda00",
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
		color: "#d01818",
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
