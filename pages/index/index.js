Page({
    data: {
        weekName: ['一','二','三','四','五','六','日'],
        nowTime: { // 当前时间
            year: 0,
            month: 0
        },
        showTime: { // 用于页面展示的时间
            year: 0,
            month: 0
        },
        days: []
    },
    onLoad(options){
        this.init()
    },
    // 初始化数据
    init() {
        this.getNowTime()
        const { year,month } = this.data.nowTime
        this.getDays(year,month)
    },
    getNowTime () {
        const newDate = new Date();
        const year = newDate.getFullYear();
        const month = newDate.getMonth();
        this.data.nowTime.year = year
        this.data.nowTime.month = month
        this.data.showTime.year = year
        this.data.showTime.month = month
        this.setData(this.data)
    },
    // 获取某月在日历上的合计天数
    getDays (year,month) {
        // 获取某年某月第一日的日期
        const newDate = new Date(year,month,1);
        let day = newDate.getDay();
        if(day === 0) {
            day = 7
        }
        const monthSize = this.getMonthSize(year, month)
        const NearMonths = this.getNearMonths(year,month)
        const leftMonthSize = this.getMonthSize(NearMonths[0].leftYear, NearMonths[0].leftMonth)
        // 获取日历前部空余时间
        const leftDaySize = day - 1;
        // 获取日尾前部空余时间
        let rightDaySize = 7 - ((monthSize + (day - 1)) % 7)
        rightDaySize = rightDaySize === 7?0:rightDaySize
        let days = []
        for(let i = 1; i<= monthSize;i++) {
            days.push({
                isNow: true,
                num: i
            })
        }
        let leftDays = []
        for (let i = 0; i<leftDaySize;i++){
            leftDays.unshift({
                isNow: false,
                num: leftMonthSize - i
            })

        }
        let rightDays = []
        for(let i = 1; i<= rightDaySize;i++) {
            rightDays.push({
                isNow: false,
                num: i
            })
        }
        days = [...leftDays,...days,...rightDays]
        this.data.days = days
        this.setData(this.data)
    },
    // 获取月天数
    getMonthSize(year,month) {
        const isLeap = !(year % (year % 100 ? 4 : 400)) ? 1:0
        const mDays = [31,28+isLeap,31,30,31,30,31,31,30,31,30,31];
        return mDays[month]
    },
    // 获取相邻月的年月
    getNearMonths(year,month) {
        let leftMonth
        let leftYear
        let rightMonth
        let rightYear
        if(month === 0){
            leftMonth = 11
            leftYear = year - 1
        } else {
            leftMonth = month - 1
            leftYear = year
        }
        if(month === 11){
            rightMonth = 0
            rightYear = year + 1
        } else {
            rightMonth = month + 1;
            rightYear = year
        }
        return [
            {
                leftYear,leftMonth
            },
            {
                rightYear,rightMonth
            }
        ]
    },
    reduceMonth () {
        const { year,month } = this.data.showTime
        const NearMonths = this.getNearMonths(year,month)
        const { leftYear,leftMonth } = NearMonths[0]
        this.data.showTime.year = leftYear
        this.data.showTime.month = leftMonth
        this.setData(this.data)
        this.getDays(leftYear,leftMonth)
    },
    addMonth () {
        const { year,month } = this.data.showTime
        const NearMonths = this.getNearMonths(year,month)
        const { rightYear,rightMonth } = NearMonths[1]
        this.data.showTime.year = rightYear
        this.data.showTime.month = rightMonth
        this.setData(this.data)
        this.getDays(rightYear,rightMonth)
    }
})