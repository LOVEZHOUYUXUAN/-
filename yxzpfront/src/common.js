export default {
	fet(url,data)
	{
		return fetch(url,{method:data.method,
		                  body:JSON.stringify(data.obj),
						  headers: new Headers({
                         'Content-Type': 'application/json'
                           })
						   }).then(res => res.json())
	}
}