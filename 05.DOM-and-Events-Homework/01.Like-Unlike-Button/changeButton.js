function changeButton () {
	if (document.getElementById('button').value == 'Like') {
        document.getElementById('button').value ='Unlike';
    }
    else {
        document.getElementById('button').value = 'Like';
    }
}