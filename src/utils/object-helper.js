export const updateObjArr = (obj, itemId, objPropName, newObjProps) => {
	return obj.map(user => {
		if (user[objPropName] === itemId) {
			return {...user, ...newObjProps}
		} else return user;
	})
}