export const tryParseJSON = (str: string, ifErrorReturn: Boolean | object = false) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return ifErrorReturn;
	}
	return JSON.parse(str);
};
