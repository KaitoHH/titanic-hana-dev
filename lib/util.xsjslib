function validateMethod() {
	return $.request.method == $.net.http.POST
}

function parameterExist(param) {
	return param != null && param.length > 0;
}