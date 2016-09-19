module.exports = {
	oauth: {
		client_id: "",
		client_secret:  "",
		grant_type: "authorization_code",
		redirect_uri: "",
		code: ""
	},
	server: {
		host: "http://localhost",
		port: 8080
	},
	db: {
		url: "mongodb://localhost:27017/hash_search"
	}
};
