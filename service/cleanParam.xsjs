function serviceInit() {
	$.import("titanic/lib/util","util");
}

function process() {
	if ($.titanic.lib.util.validateMethod()) {
		var connection = $.hdb.getConnection();
		var model_id = $.request.parameters.get("model_id");
		if ($.titanic.lib.util.parameterExist(model_id)) {
			try {
				var rows = connection
						.executeUpdate(
								'DELETE FROM "TITANIC"."Model.Param" WHERE MODEL_ID = ?',
								model_id);
			} catch (e) {
				return e.toString();
			}
			connection.commit();
			if (rows > 0) {
				$.response.status = $.net.http.NO_CONTENT;
				return "";
			} else {
				$.response.status = $.net.http.NOT_FOUND;
				return "rows not found";
			}
		} else {
			$.response.status = $.net.http.BAD_REQUEST;
			return "please sepecify model_id";
		}
	} else {
		$.response.status = $.net.http.METHOD_NOT_ALLOWED;
		return "this service MUST be request with POST method.";
	}
}

function main() {
	serviceInit();
	$.response.setBody(process());
}

main();
