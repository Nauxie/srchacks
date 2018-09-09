
// Used to check if a property is empty
const isNullOrEmpty = obj => !obj || (Object.keys(obj).length === 0 && obj.constructor === Object);

// const objectToArray = obj => Object.entries(obj).map(value => ({ ...value[1], id: value[0] }));

// DEPRECATED - USE user.score attribute
// const getUserScore = user => Object.values(user.history)
// 	.map(value => value.points)
// 	.reduce(
// 		(accumulator, currentValue) => accumulator + currentValue,
// 	); 

export default {
	isNullOrEmpty,
};
