

var current_fs, next_fs, previous_fs; 
var left, opacity, scale; 
var animating; 
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("datePickerId").setAttribute("max", today);

function nextt(x){
	if(animating) return false;
	animating = true;
	
	current_fs = $(x).parent();
	next_fs = $(x).parent().next();
	
	
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	
	next_fs.show(); 
	
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			
			scale = 1 - (1 - now) * 0.2;
			left = (now * 50)+"%";
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		easing: 'easeInOutBack'
	});
}
$(".next").click(function(){
	nextt(this);
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	
	previous_fs.show(); 
	
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			
			scale = 0.8 + (1 - now) * 0.2;
			
			left = ((1-now) * 50)+"%";
			
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
})

function precise_round(num, dec){
 
	if ((typeof num !== 'number') || (typeof dec !== 'number')) 
  return false; 
  
	var num_sign = num >= 0 ? 1 : -1;
	  
	return (Math.round((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec);
}  

$( "#marksobt" ).keyup(function() {
	var markstot = $('#markstot', $(this).closest("div.acadDetails")).val();
	var marksobt = $(this).val();
	if(markstot != '' && marksobt != ''){
		if (markstot == 10){
			if (marksobt <= 10 ){
				$('#marks', $(this).closest("div.acadDetails")).val(parseFloat((marksobt * 9.5)).toFixed(2));
			} else {
				$('#marks', $(this).closest("div.acadDetails")).val("Enter Valid Marks Obtained (Range 0 to 10)");
			}
		} else {
			$('#marks', $(this).closest("div.acadDetails")).val(parseFloat((marksobt/markstot) * 100).toFixed(2));
		}
		$('#marks', $(this).closest("div.acadDetails")).show();
	}
});
$( "#markstot" ).keyup(function() {
	var markstot = $(this).val();
	var marksobt = $('#marksobt', $(this).closest("div.acadDetails")).val();
	if(markstot != '' && marksobt != ''){
		if (markstot == 10){
			if (marksobt <= 10 ){
				$('#marks', $(this).closest("div.acadDetails")).val(parseFloat((marksobt * 9.5)).toFixed(2));
			} else {
				$('#marks', $(this).closest("div.acadDetails")).val("Enter Valid Marks Obtained (Range 0 to 10)");
			}
		} else {
			$('#marks', $(this).closest("div.acadDetails")).val(parseFloat((marksobt/markstot) * 100).toFixed(2));
		}
		$('#marks', $(this).closest("div.acadDetails")).show();
	}
});

$('#basicDetails').click(function (event) {
	var uname = $('#uname').val();
	var email = $('#uemail').val();
	var mobno = $('#umobno').val();
	var objective = $('#uobjective').val();
	if (uname == "" || email == "" || mobno == "" || objective == ""){
		alert("Enter all the information")
	} else{
		console.log(uname);
		$.ajax({
			url: '/addbasic',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log("success");
			},
			error: function(error){
				console.log(error);
			}
		});
		nextt('#basicDetails');
	}
});
$('#personalDetails').click(function (event) {
	var fname = $('#fname').val();
	var dob = $('#dob').val();
	var sex = $('#sex').val();
	var nationality = $('#nationality').val();
	$.ajax({
		url: '/addPersonal',
		data : {
			fname : $('#fname').val(),
			dob : $('#dob').val(),
			sex : $('#sex').val(),
			nationality : $('#nationality').val()
		},
		type: 'POST',
		success: function(response){
			console.log("success");
		},
		error: function(error){
			console.log(error);
		}
	});
	nextt('#personalDetails');
});
$( document ).ready(function() {
	$("#addCourse").click(function(){
		$('.acadDetails:first').clone(true).find("input:text").val("").end().appendTo('.acadFormD');
	});

	$("#addReference").click(function(){
		$('.references:first').clone(true).find("input:text").val("").end().appendTo('.referencesForm');
	});

	$("#addHAI").click(function(){
		$('.uhobbies:first').clone(true).find("input:text").val("").end().appendTo('.hobbiesForm');
	});

	$("#addAct").click(function(){
		$('.uactivities:first').clone(true).find("input:text").val("").end().appendTo('.activitiesForm');
	});

	$("#addMoreSkills").click(function(){
		$('.uskills:first').clone(true).find("input:text").val("").end().appendTo('.skillsForm');
	});

	$("#addach").click(function(){
		$('.uachievements:first').clone(true).find("input:text").val("").end().appendTo('.achievementsForm');
	});

	$("#addWorkExp").click(function(){
		$('.workexperience:first').clone(true).find("input:text").val("").end().appendTo('.workExperienceForm');
	});

	$(".removeWE").click(function(){
		var ename = $('#ename', $(this).closest("div.workexperience")).val();
		var etype = $('#etype', $(this).closest("div.workexperience")).val();
		var joindate = $('#datePickerId', $(this).closest("div.workexperience")).val();
		var enddate = $('#enddate', $(this).closest("div.workexperience")).val();
		var designation = $('#designation', $(this).closest("div.workexperience")).val();
		var duties = $('#duties', $(this).closest("div.workexperience")).val();
		$.ajax({
			url: '/delWE',
			data : {
				ename : $('#ename', $(this).closest("div.workexperience")).val(),
				etype : $('#etype', $(this).closest("div.workexperience")).val(),
				joindate : $('#datePickerId', $(this).closest("div.workexperience")).val(),
				enddate : $('#enddate', $(this).closest("div.workexperience")).val(),
				designation : $('#designation', $(this).closest("div.workexperience")).val(),
				duties : $('#duties', $(this).closest("div.workexperience")).val(),
			},
			type: 'POST',
			success: function(response){
				console.log("success");
			},
			error: function(error){
				console.log(error);
			}
		});
		$(this).parent().remove();
	});

	$(".removeFromDB").click(function(){
		var course = $('#course', $(this).closest("div.acadDetails")).val();
		var degree = $('#degree', $(this).closest("div.acadDetails")).val();
		$.ajax({
			url: '/delAcad',
			data : {
				course : $('#course', $(this).closest("div.acadDetails")).val(),
				degree : $('#degree', $(this).closest("div.acadDetails")).val(),
			},
			type: 'POST',
			success: function(response){
				console.log("success");
			},
			error: function(error){
				console.log(error);
			}
		});
		$(this).parent().remove();
	});

	$(".addToDB").click(function(){
		var course = $('#course', $(this).closest("div.acadDetails")).val();
		var degree = $('#degree', $(this).closest("div.acadDetails")).val();
		var year = $('#year', $(this).closest("div.acadDetails")).val();
		var uniname = $('#wuniname', $(this).closest("div.acadDetails")).val();
		var specialization = $('#specialization', $(this).closest("div.acadDetails")).val();
		var marksobt = $('#marksobt', $(this).closest("div.acadDetails")).val();
		var markstot = $('#markstot', $(this).closest("div.acadDetails")).val();
		var marks = $('#marks', $(this).closest("div.acadDetails")).val();
		if (course == "" || degree == "" || year == "" || uniname == "" || specialization == "" || marksobt == "" || markstot == "" || marks == ""){
			alert("Enter all the information")
		} else{
			$.ajax({
				url: '/addAcad',
				data : {
					course : $('#course', $(this).closest("div.acadDetails")).val(),
					degree : $('#degree', $(this).closest("div.acadDetails")).val(),
		      year : $('#year', $(this).closest("div.acadDetails")).val(),
		      uniname : $('#uniname', $(this).closest("div.acadDetails")).val(),
					specialization : $('#specialization', $(this).closest("div.acadDetails")).val(),
					marksobt : $('#marksobt', $(this).closest("div.acadDetails")).val(),
					markstot : $('#markstot', $(this).closest("div.acadDetails")).val(),
					marks : $('#marks', $(this).closest("div.acadDetails")).val(),
				},
				type: 'POST',
				success: function(response){
					console.log("success");
				},
				error: function(error){
					console.log(error);
				}
			});
		}
		});

		$(".addWE").click(function(){
			var ename = $('#ename', $(this).closest("div.workexperience")).val();
			var etype = $('#etype', $(this).closest("div.workexperience")).val();
			var joindate = $('#datePickerId', $(this).closest("div.workexperience")).val();
			var enddate = $('#enddate', $(this).closest("div.workexperience")).val();
			var designation = $('#designation', $(this).closest("div.workexperience")).val();
			var duties = $('#duties', $(this).closest("div.workexperience")).val();
			if (etype == "" || joindate == "" || enddate == "" || designation == "" || duties == ""){
				alert("Enter all the information")
			} else{
				$.ajax({
					url: '/addWE',
					data : {
						ename : $('#ename', $(this).closest("div.workexperience")).val(),
						etype : $('#etype', $(this).closest("div.workexperience")).val(),
						joindate : $('#datePickerId', $(this).closest("div.workexperience")).val(),
						enddate : $('#enddate', $(this).closest("div.workexperience")).val(),
						designation : $('#designation', $(this).closest("div.workexperience")).val(),
						duties : $('#duties', $(this).closest("div.workexperience")).val(),
					},
					type: 'POST',
					success: function(response){
						console.log("success");
					},
					error: function(error){
						console.log(error);
					}
				});
			}
		});
		$(".addSkills").click(function(){
			var skills = $('#skills', $(this).closest("div.uskills")).val();
			if (skills == ""){
				alert("You have not entered any skills.")
			} else{
				$.ajax({
					url: '/addSkills',
					data : {
						skills : $('#skills', $(this).closest("div.uskills")).val()
					},
					type: 'POST',
					success: function(response){
						console.log("success");
					},
					error: function(error){
						console.log(error);
					}
				});
			}
		});
		$(".delSkills").click(function(){
			var skills = $('#skills', $(this).closest("div.uskills")).val();
			$.ajax({
				url: '/delSkills',
				data : {
					skills : $('#skills', $(this).closest("div.uskills")).val(),
				},
				type: 'POST',
				success: function(response){
					console.log("success");
				},
				error: function(error){
					console.log(error);
				}
			});
			$(this).parent().remove();
		});

		$(".addactivities").click(function(){
			var activities = $('#activities', $(this).closest("div.uactivities")).val();
			if (activities == ""){
				alert("You have not entered any activity.")
			} else{
				$.ajax({
					url: '/addactivities',
					data : {
						activities : $('#activities', $(this).closest("div.uactivities")).val()
					},
					type: 'POST',
					success: function(response){
						console.log("success");
					},
					error: function(error){
						console.log(error);
					}
				});
			}
		});

	$(".delactivities").click(function(){
		var activities = $('#activities', $(this).closest("div.uactivities")).val();
		$.ajax({
			url: '/delactivities',
			data : {
				activities : $('#activities', $(this).closest("div.uactivities")).val()
			},
			type: 'POST',
			success: function(response){
				console.log("success");
			},
			error: function(error){
				console.log(error);
			}
		});
		$(this).parent().remove();
	});

	$(".addachievements").click(function(){
		var achievements = $('#achievements', $(this).closest("div.uachievements")).val();
		if (achievements == ""){
			alert("You have not entered any activity.")
		} else{
			$.ajax({
				url: '/addachievements',
				data : {
					achievements : $('#achievements', $(this).closest("div.uachievements")).val()
				},
				type: 'POST',
				success: function(response){
					console.log("success");
				},
				error: function(error){
					console.log(error);
				}
			});
		}
	});

	$(".delachievements").click(function(){
		var achievements = $('#achievements', $(this).closest("div.uachievements")).val();		
		$.ajax({
			url: '/delachievements',
			data : {
				achievements : $('#achievements', $(this).closest("div.uachievements")).val()
			},
			type: 'POST',
			success: function(response){
				console.log("success");
			},
			error: function(error){
				console.log(error);
			}
		});
		$(this).parent().remove();
	});

	$(".addhobbies").click(function(){
		var hobbies = $('#hobbies', $(this).closest("div.uhobbies")).val();
		if (hobbies == ""){
			alert("You have not entered any hobby.")
		} else{
			$.ajax({
				url: '/addhobbies',
				data : {
					hobbies : $('#hobbies', $(this).closest("div.uhobbies")).val()
				},
				type: 'POST',
				success: function(response){
					console.log("success");
				},
				error: function(error){
					console.log(error);
				}
			});
		}
	});

	$(".delhobbies").click(function(){
		var hobbies = $('#hobbies', $(this).closest("div.uhobbies")).val();	
		$.ajax({
			url: '/delhobbies',
			data : {
				hobbies : $('#hobbies', $(this).closest("div.uhobbies")).val()
			},
			type: 'POST',
			success: function(response){
				console.log("success");
			},
			error: function(error){
				console.log(error);
			}
		});
		$(this).parent().remove();
	});

	$(".addref").click(function(){
		var rname = $('#rname', $(this).closest("div.references")).val();
		var rorg = $('#rorg', $(this).closest("div.references")).val();
		var rnum = $('#rnum', $(this).closest("div.references")).val();
		var remail = $('#remail', $(this).closest("div.references")).val();
		console.log(rname);
		$.ajax({
			url: '/addref',
			data : {
				rname : $('#rname', $(this).closest("div.references")).val(),
				rorg : $('#rorg', $(this).closest("div.references")).val(),
				rnum : $('#rnum', $(this).closest("div.references")).val(),
				remail : $('#remail', $(this).closest("div.references")).val()
			},
			type: 'POST',
			success: function(response){
				console.log("success");
			},
			error: function(error){
				console.log(error);
			}
		});
	});

	$(".delref").click(function(){
		var rname = $('#rname', $(this).closest("div.references")).val();
		var rorg = $('#rorg', $(this).closest("div.references")).val();
		var rnum = $('#rnum', $(this).closest("div.references")).val();
		var remail = $('#remail', $(this).closest("div.references")).val();
		$.ajax({
			url: '/delref',
			data : {
				rname : $('#rname', $(this).closest("div.references")).val(),
				rorg : $('#rorg', $(this).closest("div.references")).val(),
				rnum : $('#rnum', $(this).closest("div.references")).val(),
				remail : $('#remail', $(this).closest("div.references")).val()
			},
			type: 'POST',
			success: function(response){
				console.log("success");
			},
			error: function(error){
				console.log(error);
			}
		});
		$(this).parent().remove();
	});

});