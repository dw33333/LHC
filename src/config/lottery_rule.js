/**
 * Created by DAHAI on 2018/5/20.
 */
import P from './lottery_public.js';
let R = {
    //求和
    getSum(arr){
        arr =arr.split(",") ;
        let sum = 0;
        for(let i= 0,len=arr.length;i<len;i++){
            sum += parseInt(arr[i]);
        }
        return sum;
    },
    //总和大小
    SumDx(arr,num){
        let sum = this.getSum(arr);
        if(sum >= num) return '大';
        else if(sum==84&&num==85) return '和';
        else if(sum==55&&num==56) return '和';
        else if(sum==30&&num==31) return '和';
        else return '小';
    },
    //三公
    ResultSg(arr){
        let z =  (arr[0]-0)+(arr[1]-0)+(arr[2]-0)+ "";
        let x =  (arr[2]-0)+(arr[3]-0)+(arr[4]-0)+"";
        z  = z.substr(z.length-1,1)-0;
        x  = x.substr(x.length-1,1)-0;
        if(z==0) z  = 10;
        if(x==0) x  = 10;
        if(z>x){
            return '左闲';
        }else if(z==x){
            return '和';
        }else{
            return '右闲';
        }
    },
    //十一选五/顺子/半顺/杂六  / ，3D三连
    ResultBs(a,num){
        //截取前三，中三，后三
        let newArr ;
        let value = '';
        if(num==1) newArr=a.slice(0,3)
        else if(num==2) newArr=a.slice(1,4)
        else newArr=a.slice(2,5);
        let arr =  this.getCount(newArr);
        // 前三 /中三/后三
            for (let k = 0,len=arr.length; k <len; k++) {
                if(arr.length==3&&arr[1].date-arr[0].date==1&&arr[2].date-arr[1].date==1 || this.szTSw(arr.join(',')))  value = '顺子';
                else if(arr.length==3&&(arr[1].date-arr[0].date==1||arr[2].date-arr[1].date==1)) value = '半顺';
                else if(arr.length==2&&arr[1].date-arr[0].date==1) value = '半顺';
                else if(arr.length==2) value = '对子';
                else if(arr.length==2) value = '豹子';
                else value = '杂六';
            }
          return value;
    },
    //梭哈
    getSh(a){
        let value = '';
        let arr =  this.getCount(a);
        for (let k = 0; k < arr.length; k++) {
           if(arr.length==5&&arr[1].date-arr[0].date==1&&arr[2].date-arr[1].date==1&&arr[3].date-arr[2].date==1&&arr[4].date-arr[3].date==1 || this.szTS(arr.join(','))) return value = '顺子';
           else if(arr.length==5&&arr[1].date-arr[0].date==2&&arr[2].date-arr[1].date==2&&arr[3].date-arr[2].date==2&&arr[4].date-arr[3].date==2)  return value = '五离';
           else if(arr.length==5)  value = '杂六';
           else if(arr.length==4) value = '对子';
           else if(arr.length==3&&arr[k].count==3) return value = '三张';
           else if(arr.length==3) value = '两对';
           else if(arr.length==2 &&arr[k].count==4) return value = '四张';
           else if(arr.length==2) value = '葫芦';
           else if(arr.length==1) value = '豹子';
       }
            return value;

    },
    // 处理几个特殊的顺子
    szTS(r){
        if (r == '0,1,2,3,9' || r == '0,1,2,8,9' || r == '0,1,7,8,9' || r == '0,6,7,8,9') {
            return true;
        } else {
            return false;
        }
    },
    //处理十一选五几个特殊的顺子
    szTSw(r){
        if (r == '1,10,11' || r == '1,2,11' || r=='1,20,21' || r=='1,2,21') {
            return true;
        } else {
            return false;
        }
    },
    // 快三 长短牌的
    getKsCdp(a){
        let arrSum = [];
        let value = ''
        let arr =  this.getCount(a);
        for(let j=0;j<arr.length;j++){
            arrSum.push(arr[j].date)
        }
        for (let k = 0; k < arr.length; k++) {
            if(arr.length==3){
                value  = '长牌--'+ this.doCp(P.getRank(arrSum,2))
            }else if(arr.length==2){
                value =  arr[0].count==2?arr[0].date+arr[0].date:arr[1].date+arr[1].date;
                value = '短牌--'+ value;
            }else{
                value =  '豹子'
            }
        }
        return value;
    },
    // 快乐十分 /  东南西北/ 中发白
    ResultZfb(n){
        if(parseInt(n)<8) return '中'
        else if(parseInt(n)<15) return '发'
        else return '白'
    },
    ResultDnxb(n){
        let r ='';
        switch(parseInt(n)){
            case 1:
            case 5:
            case 9:
            case 13:
            case 17:
                r='东';
                break;
            case 2:
            case 6:
            case 10:
            case 14:
            case 18:
                r='南';
                break;
            case 3:
            case 7:
            case 11:
            case 15:
            case 19:
                r='西';
                break;
            case 4:
            case 8:
            case 12:
            case 16:
            case 20:
                r='北';
                break;
            default :
                break;
        }
        return r;
    },
    // 快乐十分  / 尾大小
    filterWdx(a){
        a=a+'';
        a = a.charAt(a.length-1)
        if(a>=5) return '尾大'
        else return '尾小'
    },
    //百家乐
    ResultBjl(arr){
        let value = '';
         //庄牌
        let z =  (arr[0]-0)+(arr[1]-0)+"";
            z  = z.substr(z.length-1,1)-0;
        //闲牌
        let x =  (arr[3]-0)+(arr[4]-0)+"";
             x  = x.substr(x.length-1,1)-0;
        //  第五张牌
        let four = (arr[2]-0)+(arr[4]-0)+"";
             four  = four.substr(four.length-1,1)-0;
        //  第六张牌
        let six = (arr[0]-0)+(arr[2]-0)+"";
            six  = six.substr(six.length-1,1)-0;
        // 有一个天生赢家或者两个都大等于6(庄闲都不补)
        if(z>=8 || x>=8 || z>=6&&x>=6){
          // 直接比较，不做操作
        }else if(x<6){
            // 闲小于6，补牌,这张是第五张牌
            x+=four;
            // 庄补牌，这张是第六张牌
            if(z<=2){
                z+=six;
            }else if(z==3&&four!=8){
                z+=six;
            }else if(z==4&&four!=0&&four!=1&&four!=8&&four!=9){
                z+=six;
            }else if(z==5&&four==4||four==5||four==6||four==7){
                z+=six;
            }else if(z==6&&four==6||four==7){
                z+=six;
            }
        }else if(x>6){
            // 闲大于6，不需补牌，庄需要补牌,此张牌是第五张牌
              z+=four;
        }
        // 判断结果
        z  = z+"";
        z= z.substr(z.length-1,1)-0;
        x  = x+"";
        x= x.substr(x.length-1,1)-0;
        z>x?value='庄':value='闲';
        if(z==x) value = '和';
        return value;
    },
    //快乐8 / 前后，单双合，五行 / 大小单双
    filgerQhh(arr){
        if(typeof arr=='string') arr = arr.split(',');
        let c1=0;
        for(let i=0,len=arr.length;i<len;i++){
            if(arr[i]<41) c1++
        }
        if(c1>10) return '前'
        else if(c1<10) return '后'
        else return '和'
    },
    filgerDsh(arr){
        if(typeof arr=='string') arr = arr.split(',');
        let c1=0;
        for(let i=0,len=arr.length;i<len;i++){
            if(arr[i]%2 != 0) c1++
        }
        if(c1>10) return '单'
        else if(c1<10) return '双'
        else return '和'
    },
    filterWh(arr){
        let sum = this.getSum(arr);
        if(sum>209 && sum<696) return '金'
        else if(sum>695 && sum<764) return '木'
        else if(sum>763 && sum<856) return '水'
        else if(sum>855 && sum<924) return '火'
        else if(sum>923 && sum<1411) return '土'
    },
    filterKlcDsDx(a){
        let r = '';
         a=this.getSum(a);
        if(a%2==0){
            if(a>810) r='大双'
            else if(a<810) r='小双'
            else '--'
        }else{
            if(a>810) r='大单'
            else if(a<810) r='小单'
            else '--'
        }
        return r;
    },
    //计算牛牛
    fiterniuniu(numArr) {
        let is_niu = 'false'
        let niu_ji = ''
        let niu_text = ''
        if (((parseInt(numArr[0]) + parseInt(numArr[1]) + parseInt(numArr[2])) % 10) == 0) {
            is_niu = 'true'
            niu_ji = (parseInt(numArr[3]) + parseInt(numArr[4])) % 10;
        }
        else if (((parseInt(numArr[0]) + parseInt(numArr[1]) + parseInt(numArr[3])) % 10) == 0) {
            is_niu = 'true'
            niu_ji = (parseInt(numArr[2]) + parseInt(numArr[4])) % 10;
        }
        else if (((parseInt(numArr[0]) + parseInt(numArr[1]) + parseInt(numArr[4])) % 10) == 0) {
            is_niu = 'true'
            niu_ji = (parseInt(numArr[2]) + parseInt(numArr[3])) % 10;
        }
        else if (((parseInt(numArr[0]) + parseInt(numArr[2]) + parseInt(numArr[3])) % 10) == 0) {
            is_niu = 'true'
            niu_ji = (parseInt(numArr[1]) + parseInt(numArr[4])) % 10;
        }
        else if (((parseInt(numArr[0]) + parseInt(numArr[2]) + parseInt(numArr[4])) % 10) == 0) {
            is_niu = 'true'
            niu_ji = (parseInt(numArr[1]) + parseInt(numArr[3])) % 10;
        }
        else if (((parseInt(numArr[0]) + parseInt(numArr[3]) + parseInt(numArr[4])) % 10) == 0) {
            is_niu = 'true'
            niu_ji = (parseInt(numArr[1]) + parseInt(numArr[2])) % 10;
        }
        else if (((parseInt(numArr[1]) + parseInt(numArr[2]) + parseInt(numArr[3])) % 10) == 0) {
            is_niu = 'true'
            niu_ji = (parseInt(numArr[0]) + parseInt(numArr[4])) % 10;
        }
        else if (((parseInt(numArr[1]) + parseInt(numArr[2]) + parseInt(numArr[4])) % 10) == 0) {
            is_niu = 'true'
            niu_ji = (parseInt(numArr[0]) + parseInt(numArr[3])) % 10;
        }
        else if (((parseInt(numArr[1]) + parseInt(numArr[3]) + parseInt(numArr[4])) % 10) == 0) {
            is_niu = 'true'
            niu_ji = (parseInt(numArr[0]) + parseInt(numArr[2])) % 10;
        }
        else if (((parseInt(numArr[2]) + parseInt(numArr[3]) + parseInt(numArr[4])) % 10) == 0) {
            is_niu = 'true'
            niu_ji = (parseInt(numArr[0]) + parseInt(numArr[1])) % 10;
        }
        if (is_niu === 'true') {
            if (niu_ji === 0) {
                niu_text = '牛牛';
            } else {
                niu_text = `牛${niu_ji}`
            }
        }
        else {
            niu_text = '无牛'
        }
        return niu_text
    },
    //处理数据，快三长牌短牌，棋牌梭哈使用
    getCount(a){
        let arr = [];
        let result = a;
        result.sort((a, b) => a - b);
        for (let i = 0; i < result.length;) {
            let count = 0;
            for (let j = i; j < result.length; j++) {
                if (result[i] === result[j]) {
                    count++;
                }
            }
            arr.push({
                date: result[i],
                count: count
            });
            i+=count;
        }
        return arr;
    },
    doCp(arr){
        // console.log(222);
        let arr2=[];
        // arr.join(',')
        for(let i=0,len=arr.length;i<len;i++){
            arr2.push(arr[i].replace(',',''));
        };
        return arr2;
    },
}
export  default  R;
