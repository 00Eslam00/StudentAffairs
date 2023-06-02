// Pad a string with zeros to a specified width
function zfill(str, width) {
	while (str.length < width) {
		str = '0' + str;
	}
	return str;
}
