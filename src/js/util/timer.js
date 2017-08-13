class Timer {

    constructor (){
        this.time = '';
        this.init = null;
        this.second = 0;
        this.minute = 0;
        this.hour = 0;
    }

    start (){
        this.init = setInterval(() => {
            this.timer();
        }, 1000);
    }

    end (){
        clearInterval(this.init);
        return this.time;
    }

    reset (){
        this.second = 0;
        this.minute = 0;
        this.hour = 0;
    }

    timer (){

        this.second++;
        if(this.second >= 60)
        {
            this.second = 0;
            this.minute++;
        }

        if(this.minute >= 60)
        {
            this.minute = 0;
            this.hour++;
        }

        this.time = this.hour +'时'+ this.minute +'分'+ this.second +'秒';

    }
}



export default Timer;