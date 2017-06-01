function validateMethod() {
	// return $.request.method == $.net.http.POST
	return true;
}

function parameterExist(param) {
	return param != null && param.length > 0;
}

function generalizeParam(param) {
	return parameterExist(param) ? param : null;
}