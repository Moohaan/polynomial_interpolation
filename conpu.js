$(function() {
  $('#numberOfvalues').keyup(function() {
    getBoxes();
  });

  $('#gplot').click(function() {
      graphPlot();
  });
});

// 
function getBoxes() {
  iDeg = Number($('#numberOfvalues').val());
  if (!isInt(iDeg)) {
    $('#ErrorMessage').html('<p>Number you just entered must be an integer.</p>');
    $('#ErrorMessage').show();
    return false;
  } else {
    $('#ErrorMessage').hide();
  }
  /*Build Polynomial Equation and Inputs*/
  var sInputs = '';
  var sInput= '';
  sInputs += '<label for="xmin xmax">X-Range</label>';
  sInputs += '<input type="text" id="xmin" name="xmin" size="2"/></div>';
  sInputs += '<input type="text" id="xmax" name="xmax" size="2" /></div>';
  sInputs+= '<div class="title"><p>Years</p><p>India</p><p>China</p></div>'
  for (var i = iDeg; i >= 0; i--) {
    if (i !== 0) {
    sInputs += '<input type="text" id="a' + i + '" title ="Year in four latters" placeholder = "year'+i+'" name="a[' + i + ']" size="3"  aria-required="true"  required>';
    sInputs += '<input type="text" id="b' + i + '" title = "Pupulation in billions" placeholder = "IndPop'+i+'" name="b[' + i + ']" size="5" aria-required="true"  required>';
    sInputs += '<input type="text" id="c' + i + '" title = "population in billions" placeholder = "ChinaP'+i+'" name="c[' + i + ']" size="5" aria-required="true"  required>';
  }}
  $('#sInputs').html(sInputs);
}
// Is int function
function isInt(n) {
  return typeof n == "number" && isFinite(n) && n % 1 === 0;
}
/*GLOBAL VARIABLES*/

var iDeg, xmin, xmax;
//************calculate the vaule of polynomial at x **************
function Poly(x, a, b) {
  var Pol=0;
  for (i=0; i < a.length; i++) {
    var L =1;
    for (j=0; j<a.length; j++) {
      if(i!==j) {
        L=L*(x-a[j])/(a[i]-a[j]);
      }
    }
      Pol+=b[i]*L;
    };
    return Pol;
  }
// ***********Calculations function ends here*************
function mod(a) {
  if (a<0) {
    a =-a;
  }
  else{
    a = a;
  }
  return a;
}

// The function called when you click calculate
function graphPlot(){
  var aForm = $('form#googleForm').serializeArray();
  xmin = aForm[1].value;
  xmax = aForm[2].value;
  var y = 0;
  var z=0;
  var a = new Array();
  var b = new Array();
  var c = new Array();
  var Years = new Array();
  var IndPopuLation = new Array(); 
  var ChinaPopuLation = new Array();
  // Put years in array a and population in array b
  for (var i = 3; i <aForm.length;i+=3) {
    a.push(aForm[i].value);
  };
  for (var i = 4; i <aForm.length;i+=3) {
    b.push(aForm[i].value);
  };
  for (var i = 5; i <aForm.length;i+=3) {
    c.push(aForm[i].value);
  };
  // Calculate all the y values for each x
  for (var x = xmin; x <= xmax; x++){
    y = Poly(x,a,b);
    z = Poly(x,a,c);
    Years[x-xmin]=x;
    IndPopuLation[x-xmin]=y;
    ChinaPopuLation[x-xmin]=z;
  }
var trace1 = {
  x: Years, 
  y: IndPopuLation, 
  type: 'scatter',
  name: 'India'
};
var trace2 = {
  x: Years, 
  y: ChinaPopuLation, 
  type: 'scatter',
  name: 'China'
};
var data = [trace1, trace2];
Plotly.newPlot('myCanvas', data);
var g1 = parseFloat(prompt("Please enter x1","2000"));
var g2 = parseFloat(prompt("Please enter x2","2050"));
var f = prompt("Please Enter the tolerance value", "0.001");
var tol= parseFloat(f);
var mid = (g1+g2)/2;
while( mod( Poly((g1+g2)/2, a, b) - Poly((g1+g2)/2, a, c))>=tol){
  if ((Poly(g1, a, b) - Poly(g1, a, c))*(Poly((g1+g2)/2, a, b) - Poly((g1+g2)/2, a, c))>0) {
    g1=(g1+g2)/2;
    g2=g2;
  }
  else if ((Poly(g2, a, b) - Poly(g2, a, c))*(Poly((g1+g2)/2, a, b) - Poly((g1+g2)/2, a, c))>0) {
    g2=(g1+g2)/2;
    g1=g1;
 }
}
result+='<div id ="result"><h4>India will take over China (population-wise) in year__' +(g1+g2)/2+'</h4><div>';
$('#result').html(result);
}