
export function getCurrentDate(format) {
    let now = new Date();
    let year = now.getFullYear(); //得到年份
    let month = now.getMonth();//得到月份
    let date = now.getDate();//得到日期
    let day = now.getDay();//得到周几
    let hour = now.getHours();//得到小时
    let minu = now.getMinutes();//得到分钟
    let sec = now.getSeconds();//得到秒
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    let time = "";
    //精确到天
    if (format === 1) {
        time = year + "-" + month + "-" + date;
    }
    //精确到分
    else if (format === 2) {
        time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
    }
    return time;
}

export function comptime(beginTime, endTime) {
    const beginTimes = beginTime.substring(0, 10).split('-');
    const endTimes = endTime.substring(0, 10).split('-');

    beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);

    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);

    // alert(beginTime + "aaa" + endTime);
    // alert(Date.parse(endTime));
    // alert(Date.parse(beginTime));
    const a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
    if (a < 0) {
        return 1;
    } else if (a > 0) {
        return 0;
    } else if (a === 0) {
        return 0;
    }
    return 0;
}

export function addDate(date, days) {
    if (days === undefined || days === '') {
        days = 1;
    }
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();//得到小时
    var minu = date.getMinutes();//得到分钟
    var sec = date.getSeconds();//得到秒
    return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day)+" " +getFormatDate(hour)+":"+getFormatDate(minu)+":"+getFormatDate(sec);
}
// 日期月份/天的显示，如果是1位数，则在前面加上'0'
function getFormatDate(arg) {
    if (arg === undefined || arg === '') {
        return '';
    }

    var re = arg + '';
    if (re.length < 2) {
        re = '0' + re;
    }

    return re;
}