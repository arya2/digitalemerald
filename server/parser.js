/*
Waterloo API key: b32d2161094c1f1df25b15d41ae54730 
https://api.uwaterloo.ca/v2/courses/ACC.json?key=b32d2161094c1f1df25b15d41ae54730*/

var Firebase = require("firebase");
var myFirebaseRef;
var count=0;

myFirebaseRef = new Firebase("https://digitalemerald.firebaseio.com/all/");

function createRef(query){
    return "https://api.uwaterloo.ca/v2/" + query +".json?key=b32d2161094c1f1df25b15d41ae54730";
}
var request = require('request');
request(createRef("codes/subjects"), function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var data = (JSON.parse(body)).data;        
        var len = data.length;
        for (var i = 0; i<len; i++){
            request(createRef("courses/"+data[i].subject),
                function(error, response, body){
                    if (!error && response.statusCode == 200) {
                        var data = (JSON.parse(body)).data;
                        var len = data.length;
                        
                        var d = {};
                        
                        for (var i = 0; i<len; i++){
                            d = data[i];
                            var title = d.title;
                            var course_id = d.course_id;
                            var desc = d.description;

                            if (d){
                                var apiUrl = createRef("courses/" + d.subject + "/" + d.catalog_number + "/schedule")                                
                                request(apiUrl, function (course_id, title, desc, e, res, body) { 
                                    count++;
                                    console.log('count = ' + count);
                                    
                                    var d = (JSON.parse(body)).data;
                                    if (d.length){
                                        d = d[0];
                                        myFirebaseRef.child(course_id).set({
                                            title: title,
                                            desc: desc,
                                            classes: d.classes,
                                            class_number: d.class_number,
                                            enrollment_capacity: d.enrollment_capacity,
                                            enrollment_total: d.enrollment_total
                                        });
                                        console.log({
                                            title: title,
                                            desc: desc,
                                            classes: d.classes,
                                            class_number: d.class_number,
                                            enrollment_capacity: d.enrollment_capacity,
                                            enrollment_total: d.enrollment_total
                                        });
                                    }
                                }.bind(undefined, course_id, title, desc));
                            } 
                        }
                    }
                }
            )
        }
    }
})


course = {
    courseName: '',
    courseCode: '',
    courseDesc: '',
    preReqs: [
        {           
            courseName: '',
            courseCode: ''
        }
    ],
    units: '',
    academicLevel: '',
    
}