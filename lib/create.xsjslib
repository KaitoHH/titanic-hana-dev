function createModel(param) {
	var after = param.afterTableName;
	var connection = $.hdb.getConnection();
	var createModel = connection.loadProcedure('TITANIC', 'MODEL_CREATE');
	var pStmt = param.connection.prepareStatement('select * from "' + after
			+ '"');
	pStmt.executeQuery();
	var rs = pStmt.executeQuery();
	if (rs.next()) {
		var name = rs.getString(2);
		var result = createModel(name, 0);
		var model_id = result['OUT_MODEL_ID'];
		connection.commit();
		pStmt = param.connection.prepareStatement('update "' + after
				+ '" set MODEL_ID=' + model_id);
		pStmt.executeUpdate();
		pStmt.close();
	}
	rs.close();
}
