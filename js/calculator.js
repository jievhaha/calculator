var globalVar = {
    witchDate:1,//填充日
    witchFullYear:1970,//当前年
    witchMonth:0,//当前月
    saveX:0,//最后一天在二维数组的位置
    saveY:0,
    firstX:0,//填充空白后第一天所在的行
    lastX:0,//填充空白后最后一天所在的行
    array:new Array(),//存放日期
    rows:document.getElementsByTagName("tr"),
    tdRows:document.getElementsByTagName("td"),
    dateNum:[31,28,31,30,31,30,31,31,30,31,30,31]//每月天数
}
window.onload = function () {
    setInterval(getTime,1000);

    globalVar.rows[9].cells[4].onclick = stepDate;
    globalVar.rows[9].cells[3].onkeydown = EnterPress;
    globalVar.rows[9].cells[0].onclick = goToday;//也可以直接获取td，globalVar.tdRows[55].onclik = goToday;

    for(var i = 0; i < 7; i++){
        globalVar.array[i] = new Array();
    }//定义存放日期的二维数组

    var date = new Date();
    globalVar.oldDate = date.getDate();
    date.setDate(1);

    var witchDay = date.getDay();//周几
    globalVar.witchMonth = date.getMonth();
    globalVar.witchFullYear = date.getFullYear();

    all(witchDay);

    differentDay();

    globalVarValue();
};

//----------------------------------- Begin ------------------------------------------
var all = function (witchDay) {
    /*
    判断2月份天数及当前月份天数
     */
    isLeapYear(globalVar.witchFullYear);
    var totalDate = globalVar.dateNum[globalVar.witchMonth];

    definedLocal(witchDay,totalDate);

    fullArray(witchDay);//witchDay确定每月第一天的Y轴，决定是否在前边添加上月后几天日期


    fullTable();

    addOnclick();
};
//----------------------------------- End --------------------------------------------

//----------------------------------- Begin ------------------------------------------
/*
获取系统时间
 */
var getTime = function () {
    var dateTime = new Date();

    var hours = dateTime.getHours();
    var minutes = dateTime.getMinutes();
    var seconds = dateTime.getSeconds();
    if(hours < 10){
        hours = "0" + hours;
    }
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    if(document.getElementById("timeFont1").style.display =="none"){
        document.getElementById("timeFont1").style.display = "";
        document.getElementById("timeFont2").style.display = "none";
    }else if(document.getElementById("timeFont2").style.display == "none"){
        document.getElementById("timeFont2").style.display = "";
        document.getElementById("timeFont1").style.display = "none";
    }

    var time = hours + ":" + minutes + ":" + seconds;
    var timeValue = document.getElementsByClassName("timeValue");
    for(var i = 0; i < timeValue.length; i++){
        timeValue[i].innerHTML = time;
    }


}
//----------------------------------- End --------------------------------------------

//----------------------------------- Begin ------------------------------------------
/*
输入框添加监听回车事件
 */
var EnterPress = function(){
    if(event.keyCode == 13){
        stepDate();
    }
}
//----------------------------------- End --------------------------------------------

//----------------------------------- Begin ------------------------------------------
/*
输入日期跳转
 */
var stepDate = function () {
    deleteColor();

    var inputValue = document.getElementById("inputValue").value;
    var inputArray = inputValue.split(".");
    globalVar.witchFullYear = inputArray[0];
    globalVar.witchMonth = inputArray[1] - 1;
    var dateDay = inputArray[2];
    var date = new Date();
    date.setFullYear(globalVar.witchFullYear);
    date.setMonth(globalVar.witchMonth);
    date.setDate(1);
    var witchDay = date.getDay();

    all(witchDay);

    differentDate();

    globalVarValue();
};
//----------------------------------- End --------------------------------------------

//----------------------------------- Begin ------------------------------------------
/*
返回至今天
 */
var goToday = function () {
    var newDate = new Date();
    globalVar.witchFullYear = newDate.getFullYear();
    globalVar.witchMonth = newDate.getMonth();
    newDate.setDate(1);
    var witchDay = newDate.getDay();

    all(witchDay);

    differentDay();

    globalVarValue();
};
//----------------------------------- End --------------------------------------------

//----------------------------------- Begin ------------------------------------------
/*
给td添加事件并去掉空白td处事件
 */
var addOnclick = function () {

    for(var i = 12; i < globalVar.tdRows.length-6; i++){
        globalVar.tdRows[i].onclick = function changeColor(obj){
            for(var i = 4; i < this.parentNode.parentNode.parentNode.childNodes[1].childNodes.length;i += 2){
                for(var j = 1; j < this.parentNode.parentNode.parentNode.childNodes[1].childNodes[i].childNodes.length; j += 2){
                    this.parentNode.parentNode.parentNode.childNodes[1].childNodes[i].childNodes[j].className += " " +"colorNow";
                    this.parentNode.parentNode.parentNode.childNodes[1].childNodes[i].childNodes[j].setAttribute("id","");
                }
            }
            this.setAttribute("id","actived");

            differentDay();
        };
    }//给td标签添加点击事件更改背景颜色

    var bacColor = document.getElementsByClassName("bacColor");
    if(bacColor.length > 0){
        for(var i = 0; i < bacColor.length; i++){
            bacColor[i].onclick = function changeColor(obj) {

            }
        }
    }//去掉灰色td事件
};
//----------------------------------- End ---------------------------------------------

//----------------------------------- Begin ------------------------------------------
/*
全局变量恢复默认值
 */
var globalVarValue = function () {
    globalVar.saveX = 0;
    globalVar.saveY = 0;
    globalVar.witchDate = 1;
    globalVar.lastX = 0;
    globalVar.firstX = 0;
}
//----------------------------------- End --------------------------------------------

//----------------------------------- Begin -------------------------------------------
/*
选择日期后，比较与当前系统相差天数，并显示选中的日期
 */
var differentDay = function () {
    var dateFirst = new Date();
    dateFirst.setFullYear(globalVar.witchFullYear);
    dateFirst.setMonth(globalVar.witchMonth);

    /*var dateSelected = document.getElementsByClassName("actived");
    var dateSelectedValue = dateSelected[0].firstChild.innerHTML;*/
    var dateSelected = document.getElementById("actived");
    var dateSelectedValue = dateSelected.firstChild.innerHTML;
    dateFirst.setDate(dateSelectedValue);
    var dateSecond = new Date();

    var differentDay = Math.abs(Math.floor((dateSecond.getTime() - dateFirst.getTime())/1000/3600/24));
    var month = globalVar.witchMonth + 1;
    var dateAll = "";

    if(month < 10){
        month = "0" + month;
    }
    if(dateSelectedValue < 10){
        dateSelectedValue = "0" + dateSelectedValue;
    }
    if(differentDay < 10){
        if(differentDay == 0){
            dateAll = globalVar.witchFullYear + "年" + month + "月" + dateSelectedValue + "日";
        }else{
            differentDay = "0" + differentDay;
            dateAll = globalVar.witchFullYear + "年" + month + "月" + dateSelectedValue + "日    和系统时间相差" + differentDay + "天";
        }
    }else{
        dateAll = globalVar.witchFullYear + "年" + month + "月" + dateSelectedValue + "日    和系统时间相差" + differentDay + "天";
    }
    globalVar.rows[8].cells[0].firstChild.innerHTML = dateAll;
};
//----------------------------------- End ---------------------------------------------

//----------------------------------- Begin -------------------------------------------
/*
改变年份月份底部显示日期
 */
var differentDate = function () {
    var year = globalVar.witchFullYear;
    var month = globalVar.witchMonth + 1;
    if(month < 10){
        month = "0" + month;
    }
    var dateAll = year + "年" +month + "月";
    globalVar.rows[8].cells[0].firstChild.innerHTML = dateAll;
};
//----------------------------------- End ---------------------------------------------

//----------------------------------- Begin -------------------------------------------
/*
改变年份或者月份的时候去掉选中日期的背景色
*/
var deleteColor = function () {

    var oldColorRows = document.getElementById("actived");
    if(oldColorRows != undefined && oldColorRows != null && oldColorRows != ""){
        oldColorRows.setAttribute("id","");
    }

}
//----------------------------------- End ---------------------------------------------

//----------------------------------- Begin -------------------------------------------
/*
改变年份
*/
var changeYear = function (str) {
    globalVar.rows[9].cells[3].firstChild.value = "";//清空输入框

    deleteColor();
    var date = new Date();
    if(str !=undefined && str!=null && str == "-"){
        globalVar.witchFullYear -= 1;
    }else if (str !=undefined && str!=null && str == "+"){
        globalVar.witchFullYear += 1;
    }else {
        return false;
    }
    date.setFullYear(globalVar.witchFullYear);
    date.setMonth(globalVar.witchMonth);
    date.setDate(1);
    var witchDay = date.getDay();

    all(witchDay);

    differentDate();

    globalVarValue();
}
//----------------------------------- End ---------------------------------------------

//----------------------------------- Begin -------------------------------------------
/*
改变月份
*/
var changeMonth = function (str) {
    globalVar.rows[9].cells[3].firstChild.value = "";//清空输入框

    deleteColor();

    var date = new Date();
    if(str !=undefined && str!=null && str == "-"){
        globalVar.witchMonth -= 1;
    }else if (str !=undefined && str!=null && str == "+"){
        globalVar.witchMonth += 1;
    }else {
        return false;
    }
    if(globalVar.witchMonth == -1){
        globalVar.witchFullYear -= 1;
        globalVar.witchMonth = 11;
    }else if(globalVar.witchMonth == 12){
        globalVar.witchFullYear += 1;
        globalVar.witchMonth = 0;
    }
    date.setFullYear(globalVar.witchFullYear);
    date.setMonth(globalVar.witchMonth);
    date.setDate(1);
    var witchDay = date.getDay();

    all(witchDay);

    differentDate();

    globalVarValue();
}
//----------------------------------- End ---------------------------------------------

//----------------------------------- Begin -------------------------------------------
/*
给日历赋值
 */
var fullTable = function () {
    var clearBacColor = document.getElementsByClassName("bacColor");
    if(clearBacColor.length > 0){
        for(var i = clearBacColor.length - 1; i >= 0 ; i--){
            clearBacColor[i].className = "colorNow";
        }
    }

    for(var i = 2; i < globalVar.rows.length - 2; i++){
        for(var j = 0; j < 7; j++){
            globalVar.rows[i].cells[j].firstChild.innerHTML = globalVar.array[i - 2][j];
        }
    }
    var witchMonth = globalVar.witchMonth + 1;
    var dateAll = globalVar.witchFullYear + "年" + witchMonth + "月";
    globalVar.rows[0].cells[2].firstChild.innerHTML = dateAll;
   /*
   给当天系统时间添加背景颜色
    */
    var date = new Date();
    var newFullYear = date.getFullYear();
    var newMonth = date.getMonth();
    if(newFullYear == globalVar.witchFullYear && newMonth == globalVar.witchMonth){
        var dateValue = date.getDate();
        for(var i = 12; i < globalVar.tdRows.length - 6; i++){
            if(globalVar.tdRows[i].firstChild.innerHTML == dateValue){
                globalVar.tdRows[i].setAttribute("id","actived");
            }
        }
    }

    var date1 = new Date(globalVar.witchFullYear,globalVar.witchMonth,1);

    var dayNum = date1.getDay();

    if(globalVar.firstX > 0){
        for(var i = 0; i < 7; i++){
            globalVar.rows[2].cells[i].className = "bacColor";
        }
    }else{
        for(var i = 0; i < dayNum; i++){
            globalVar.rows[2].cells[i].className = "bacColor";
        }
    }
    if(globalVar.lastX == 4){
        if(globalVar.saveY == 6){
            for(var i = 0; i < 7; i++){
                globalVar.rows[7].cells[i].className = "bacColor";
            }
        }else{
            for(var i = globalVar.saveY + 1; i < 7; i++){
                globalVar.rows[6].cells[i].className = "bacColor";
            }
            for(var i = 0; i < 7; i++){
                globalVar.rows[7].cells[i].className = "bacColor";
            }
        }
    }else{
        for(var i = globalVar.saveY + 1; i < 7; i++){
            globalVar.rows[7].cells[i].className = "bacColor";
        }
    }
}
//----------------------------------- End ---------------------------------------------

//----------------------------------- Begin -------------------------------------------
/*
给数组没有值的位置赋值
 */
var fullArray = function (dayNum) {
    var tempBeginDate = 31;
    var tempEndDate = 1;
    var tempSaveX = globalVar.saveX;//存放最后一行是否为5
    var tempArray = new Array();
    globalVar.lastX = globalVar.saveX;
    if(globalVar.witchMonth == 0){//当当前月为一月份，直接前边从31补充（毕竟每12月都有31天）
        tempBeginDate = 31;
    }else{//假如在本年，只需从global.dateNum[]中获取global.witchMonth - 1月的天数
        tempBeginDate = globalVar.dateNum[globalVar.witchMonth - 1];
    }
    if(dayNum > 0){//假如当前月第一天不是周日，则直接在前边添加上月末尾天数
        for(var i = dayNum -1 ; i >= 0; i--){
            globalVar.array[0][i] = tempBeginDate--;
        }
    }else{//假如当前月第一天星期日则在数组前添加一行
        for(var i = 6; i >= 0; i--){
            tempArray[i] = tempBeginDate--;
        }
        tempSaveX++;
        globalVar.array.unshift(tempArray);
        globalVar.firstX = globalVar.firstX + 1;
        globalVar.lastX = globalVar.lastX + 1;
    }
    if(tempSaveX == 5){//tempSaveX只会有两种情况4和5,有可能是因为最前边添加了一行变为了5.
         if(globalVar.saveY == 6){
             //不做任何操作
         }else{
             for(var i = globalVar.saveY + 1; i < 7; i++){
                 globalVar.array[5][i] = tempEndDate++;
             }
         }
    }else{
        if(globalVar.saveY == 6){
            for(var i = 0; i < 7; i++){
                globalVar.array[5][i] = tempEndDate++;
            }
        }else{
            for(var i = globalVar.saveY + 1; i < 7;i++){
                globalVar.array[4][i] = tempEndDate++;
            }
            for(var i = 0; i < 7; i++){
                globalVar.array[5][i] = tempEndDate++;
            }
        }
    }
};
//----------------------------------- End ---------------------------------------------

//----------------------------------- Begin -------------------------------------------
/*
确定某月所有天的位置
*/
var definedLocal = function (witchDay,totalDate) {
    for(var i = 0; i < 6; i++){ //每月一周为一行，共6行
        for(; witchDay < 7; witchDay++){ //一周7天
            globalVar.array[i][witchDay] = globalVar.witchDate;
            if(globalVar.witchDate < totalDate + 1){
                globalVar.witchDate++;
                globalVar.saveX = i;
                globalVar.saveY = witchDay;
            }
        }
        witchDay = 0;
    }
}
//----------------------------------- End ---------------------------------------------

//----------------------------------- Begin -------------------------------------------
/*
是否是闰年
 */
var isLeapYear = function (year) {
    if((year % 4 == 0 && year % 100 == 0) || (year % 400 == 0)){
        globalVar.dateNum[1] = 29;
    }else{
        globalVar.dateNum[1] = 28;
    }
};
//----------------------------------- End ---------------------------------------------
