var globalVar = {
    witchDate:1,//填充日
    witchFullYear:1970,//当前年
    witchMonth:0,//当前月
    saveX:0,//最后一天在二维数组的位置
    saveY:0,
    array:new Array(),//存放日期
    rows:document.getElementsByTagName("tr"),
    tdRows:document.getElementsByTagName("td"),
    dateNum:[31,28,31,30,31,30,31,31,30,31,30,31]//每月天数
}
window.onload = function () {
    setInterval(getTime,1000);

    globalVar.rows[9].cells[4].onclick = stepDate;
    globalVar.tdRows[55].onclick = goToday;

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

    fullArray(witchDay,globalVar.saveX,globalVar.saveY);

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
    var time = hours + ":" + minutes + ":" + seconds;
    globalVar.tdRows[56].firstChild.innerHTML = time;
}
//----------------------------------- End --------------------------------------------

//----------------------------------- Begin ------------------------------------------
/*
输入日期跳转
 */
var stepDate = function () {
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

    var date = new Date();
    var dateDay = date.getDate();
    for(var i = 2; i < globalVar.rows.length - 2; i++){
        for(var j = 0; j < 7; j++){
            if(globalVar.rows[i].cells[j].firstChild.innerHTML == dateDay){
                globalVar.rows[i].cells[j].className = "actived";
            }else{
                globalVar.rows[i].cells[j].className = "colorNow";
            }
        }
    }

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
                    this.parentNode.parentNode.parentNode.childNodes[1].childNodes[i].childNodes[j].className = "colorNow";
                }
            }
            this.className = "actived";

            for(var i = 2; i < globalVar.rows.length - 2; i++){
                for(var j = 0; j < globalVar.rows[i].cells.length; j++){
                    if(globalVar.rows[i].cells[j].firstChild.innerHTML == ""){
                        globalVar.rows[i].cells[j].onclick = function() {};
                        globalVar.rows[i].cells[j].className = "deleteCursor";
                    }
                }
            }

            differentDay();
        };
    }//给td标签添加点击事件更改背景颜色


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

    var dateSelected = document.getElementsByClassName("actived");
    var dateSelectedValue = dateSelected[0].firstChild.innerHTML;
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
        if(differentDay === 0){
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
    var oldColorRows = document.getElementsByClassName("actived");
    if(oldColorRows.length > 0 ){
        for(var i = 0; i < oldColorRows.length; i++){
            oldColorRows[i].className = "colorNow";
        }
    }
}
//----------------------------------- End ---------------------------------------------

//----------------------------------- Begin -------------------------------------------
/*
改变年份
*/
var changeYear = function (str) {
    deleteColor();
    var date = new Date();
    if(str !=undefined && str!=null && str === "-"){
        globalVar.witchFullYear -= 1;
    }else if (str !=undefined && str!=null && str === "+"){
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

    deleteColor();

    var date = new Date();
    if(str !=undefined && str!=null && str === "-"){
        globalVar.witchMonth -= 1;
    }else if (str !=undefined && str!=null && str === "+"){
        globalVar.witchMonth += 1;
    }else {
        return false;
    }
    if(globalVar.witchMonth === -1){
        globalVar.witchFullYear -= 1;
        globalVar.witchMonth = 11;
    }else if(globalVar.witchMonth === 12){
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
    for(var i = 2; i < globalVar.rows.length - 2; i++){
        for(var j = 0; j < 7; j++){
            globalVar.rows[i].cells[j].firstChild.innerHTML = globalVar.array[i - 2][j];
            if(globalVar.array[i - 2][j] == globalVar.oldDate){
                globalVar.rows[i].cells[j].className = "oldSelected";
            }
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
    if(newFullYear === globalVar.witchFullYear && newMonth === globalVar.witchMonth){
        var dateValue = date.getDate();
        for(var i = 12; i < globalVar.tdRows.length - 6; i++){
            if(globalVar.tdRows[i].firstChild.innerHTML == dateValue){
                globalVar.tdRows[i].className = "actived";
            }
        }
    }
}
//----------------------------------- End ---------------------------------------------

//----------------------------------- Begin -------------------------------------------
/*
给数组没有值的位置赋""
 */
var fullArray = function (dayNum,saveX,saveY) {
    for(var i = 0; i < dayNum; i++){
        globalVar.array[0][i] = "";
    }

    if(saveX == 5){
        if(saveY == 6){
        }else{
            saveY += 1
            for(; saveY < 7; saveY++){
                globalVar.array[5][saveY] = "";




            //    全部重新赋值，第一行前一个月最后一行，最后一行下个月第一行
            }
        }
    }else{
        if(saveY == 6){
            saveX += 1;
            for(; saveX < 6; saveX++){
                for(var i = 0; i < 7; i++){
                    globalVar.array[saveX][i] = "";
                }
            }
        }else{
            saveY += 1;
            for(;saveX < 6; saveX++){
                for(;saveY < 7; saveY++){
                    globalVar.array[saveX][saveY] = "";


                    // 全部重新赋值，第一行空白，最后一行下个月第一行
                }
                saveY = 0;
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