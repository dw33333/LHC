/**
 * Created by DAHAI on 2018/3/26.
 */
let P ={
    getSiblings(elm) {
        var a = [];
        var p = elm.parentNode.children;
        for(var i =0,pl= p.length;i<pl;i++) {
            if(p[i] !== elm) a.push(p[i]);
        }
        return a;
    },
    removeAllactive(allA){
        for(let i= 0,len=allA.length;i<len;i++){
            allA[i].classList.remove('active');
        }
    },
    removeAllwarning(allA){
        for(let i= 0,len=allA.length;i<len;i++){
            allA[i].classList.remove('warning');
        }
    },
    num_zh(n){
        var zarr = ['一','二','三','四','五','六','七','八','九','十','十一','十二'];
        return isNaN(n) ? zarr.indexOf(n)+1 : zarr[n-1];
    },
    getNumZh(str){
        return str.replace(/[^一二三四五六七八九十]/ig,"");
    },
    getRank:function(arr,num){
        // console.log('2222',arr);
        var r=[];
        return function f(t,a,n){
            if(0==n)return r.push(t.join(","));
            for(var i=0,l=a.length;i<=l-n;i++)
                f(t.concat(a[i]),a.slice(i+1),n-1)
        }([],arr,num),r
    },
};
export  default P;