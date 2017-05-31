function validateMethod() {
	// return $.request.method == $.net.http.POST
	return true;
}

function parameterExist(param) {
	return param != null && param.length > 0;
}
