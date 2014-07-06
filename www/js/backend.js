<script>

	/*Local stored apiURL,username,token,schoolid*/
	var apiURL='http://demo.learningdata.net/apis/classis';
	var user='admin2';
	var token='132fbdf473cd76432357a3e146032b28';
	var schoolid='demoes';
	var classid=document.userclass.class.value;
	var componentid= document.usercomponent.component.value;
	var profileid=document.userprofile.profile.value;

	function statementsbody(){
		document.getElementById('statementsbody').style.display='block';

		/*Get classes*/
		var xmlhttpc=new XMLHttpRequest();
		xmlhttpc.onreadystatechange=function(){
			if(xmlhttpc.readyState==4 && xmlhttpc.status==200){
				var data=JSON.parse(xmlhttpc.responseText);
				if(data.success){
					console.log(data.classes);
					}
				}
			}
		xmlhttpc.open("GET",apiURL+"?schoolid="+schoolid+"&username="+user+"&token="+token+"&action=getclasses",true);
		xmlhttpc.send();

/*Get students*/
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				var data=JSON.parse(xmlhttp.responseText);
				if(data.success){
					console.log(data.students);
					
					for(i=0;i<data.students.length;i++){
						//var studentdiv=document.createElement('div');
						//studentdiv.id="student";
						//studentdiv.innerHTML=data.students[i].forename+" "+data.students[i].surname+"</br>";
						//document.getElementById('students').appendChild(studentdiv);
						var stusel=document.createElement("option");
						//stusel.value="student"
						stusel.innerHTML="<option value='"+data.students[i].sid+"'>"+data.students[i].forename+" "+data.students[i].surname+"</option>";
						//stusel.innerHTML="<option>"+data.students[i].forename+" "+data.students[i].surname"</option>";
						document.getElementById('students').appendChild(stusel);
						}
					}
				else{
					for(i=0;i<data.errors.length;i++){
						console.log(data.errors);
						alert(data.errors[i]);
						}
					}
				}
			}
		xmlhttp.open("GET",apiURL+"?schoolid="+schoolid+"&username="+user+"&token="+token+"&action=getstudents&classid="+classid,true);
		xmlhttp.send();
 /*$.ajaxSetup({
    dataFilter: function(data, type) {
        if (type === 'json') {
            data.replace('for (#);', '');
            return JSON.parse(data);
        }

        return data;
    }
});*/       
        
/*Get statements*/
		var xmlhttps=new XMLHttpRequest();
		xmlhttps.onreadystatechange=function(){
			if(xmlhttps.readyState==4 && xmlhttps.status==200){
				var data=JSON.parse(xmlhttps.responseText);
				if(data.success){
					console.log(data.statements);
					for(i=0;i<data.statements.length;i++){
						var statesel=document.createElement('option');
						statesel.innerHTML="<option value='"+data.statements[i].skillid+"'>"+data.statements[i].statement+"</option>";
						document.getElementById('statements').appendChild(statesel);

						/*var statementdiv=document.createElement('div');
						statementdiv.id="statement";
						statementdiv.innerHTML="<input type='radio' name='statement' value='"+data.statements[i].skillid+"'>"+data.statements[i].statement;
						document.getElementById('statements').appendChild(statementdiv);*/
						}

					}
				}
			}
		xmlhttps.open("GET",apiURL+"?schoolid="+schoolid+"&username="+user+"&token="+token+"&action=getstatements&componentid="+componentid+"&profileid="+profileid,true);
		xmlhttps.send();
		}
    
    
		/*Upload pictures*/
		var upload=function() {
			var photo=document.getElementById("photo");
			var files=photo.files;
			var imagesdata={};
			for(var i=0;i<files.length;i++){
				var reader=new FileReader();
				reader.onload = (function(theFile){
					var fileName=theFile.name;
					var count=i;
					var filesno=files.length-1;
					return function(e){
						imagesdata[count]={};
						imagesdata[count]['photo']=e.target.result;
						imagesdata[count]['name']=fileName;
						document.getElementById('preview').src=e.target.result;
						if(count==filesno){
							var checkboxes=document.getElementsByName('students[]');
							var checkedCheckboxes={};
							for(var i=0; i<checkboxes.length; i++) {
								if(checkboxes[i].checked){
									checkedCheckboxes[i]=checkboxes[i].value;
									}
								}

							var radiobuttons=document.getElementsByName('statement');
							var checkedRadio='';
							for (var i=0; i<radiobuttons.length; i++) {
								if(radiobuttons[i].checked){
									checkedRadio=radiobuttons[i].value;
									}
								}

							var xmlhttpf=new XMLHttpRequest();
							xmlhttpf.onreadystatechange=function(){
								if(xmlhttpf.readyState==4 && xmlhttpf.status==200){
									console.log(xmlhttpf.responseText);
									var data=JSON.parse(xmlhttpf.responseText);
									console.log(data);
									if(data.success){
										alert('File uploaded');
										}
									}
								};
							xmlhttpf.open("POST",apiURL+"?schoolid="+schoolid+"&username="+user+"&token="+token+"&action=poststatementphoto&post=true",true);
							xmlhttpf.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
							xmlhttpf.send(JSON.stringify({students:checkedCheckboxes,photos:imagesdata,skillid:checkedRadio}));
							}
						};
					})(files[i]);

				reader.readAsDataURL(files[i]);
				}

			return false;
			};
    
    
		document.getElementById('register').style.display='block';
		function register(){
			/*Makes call to get the schools: http://demo.learningdata.net/apis/classis?email=EMAIL&action=getschools*/
			/*Stores the schoolid and email on the phone*/
			document.getElementById('register').style.display='none';
			document.getElementById('config').style.display='block';
			/*Sends query with email and schoolid*/
			/*Receives username and token by email to insert them in the next step*/
			}

		function configure(){
			document.getElementById('config').style.display='none';
			/*Stores the username and token for api calls*/
			document.getElementById('params').style.display='block';
			}

		function submit(){
			document.getElementById('params').style.display='none';
			/*Makes the calls sending the necessary parameters*/
			/*No need for storing any parameter*/
			statementsbody();
			}
</script>