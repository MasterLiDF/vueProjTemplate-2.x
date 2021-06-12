const API = (data) => { 
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(data);
		}, 300)
	})
}
export default API;
