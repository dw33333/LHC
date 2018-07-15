import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store"
const lottery = (resolve) => {
  import('@/components/Lottery/lottery').then((module) => {
    resolve(module)
  })
}
const Gsk3 = (resolve) => {
  import('@/components/Lottery/Gsk3').then((module) => {
    resolve(module)
  })
}
const Tjssc = (resolve) => {
  import('@/components/Lottery/Tjssc').then((module) => {
    resolve(module)
  })
}
const xjssc = (resolve) => {
  import('@/components/Lottery/xjssc').then((module) => {
    resolve(module)
  })
}
const tcpl = (resolve) => {
  import('@/components/Lottery/tcpl').then((module) => {
    resolve(module)
  })
}
const gdklsf = (resolve) => {
  import('@/components/Lottery/gdklsf').then((module) => {
    resolve(module)
  })
}
const cqssc = (resolve) => {
  import('@/components/Lottery/cqssc').then((module) => {
    resolve(module)
  })
}
const bjpks = (resolve) => {
  import('@/components/Lottery/bjpks').then((module) => {
    resolve(module)
  })
}
const bjkl8 = (resolve) => {
  import('@/components/Lottery/bjkl8').then((module) => {
    resolve(module)
  })
}
const fucai = (resolve) => {
  import('@/components/Lottery/fucai').then((module) => {
    resolve(module)
  })
}
const page = (resolve) => {
  import('@/components/Lottery/page').then((module) => {
    resolve(module)
  })
}
const shk3 = (resolve) => {
  import('@/components/Lottery/shk3').then((module) => {
    resolve(module)
  })
}
const Bjk3 = (resolve) => {
  import('@/components/Lottery/Bjk3').then((module) => {
    resolve(module)
  })
}
const hubk3 = (resolve) => {
  import('@/components/Lottery/hubk3').then((module) => {
    resolve(module)
  })
}
const Fjk3 = (resolve) => {
  import('@/components/Lottery/Fjk3').then((module) => {
    resolve(module)
  })
}
const nmgk3 = (resolve) => {
  import('@/components/Lottery/nmgk3').then((module) => {
    resolve(module)
  })
}
const ahk3 = (resolve) => {
  import('@/components/Lottery/ahk3').then((module) => {
    resolve(module)
  })
}
const hbk3 = (resolve) => {
  import('@/components/Lottery/hbk3').then((module) => {
    resolve(module)
  })
}
const jlk3 = (resolve) => {
  import('@/components/Lottery/jlk3').then((module) => {
    resolve(module)
  })
}
const gxk3 = (resolve) => {
  import('@/components/Lottery/gxk3').then((module) => {
    resolve(module)
  })
}
const jsk3 = (resolve) => {
  import('@/components/Lottery/jsk3').then((module) => {
    resolve(module)
  })
}
const Cqklsf = (resolve) => {
  import('@/components/Lottery/Cqklsf').then((module) => {
    resolve(module)
  })
}
const tjklsf = (resolve) => {
  import('@/components/Lottery/tjklsf').then((module) => {
    resolve(module)
  })
}
const hnklsf = (resolve) => {
  import('@/components/Lottery/hnklsf').then((module) => {
    resolve(module)
  })
}
const gxklsf = (resolve) => {
  import('@/components/Lottery/gxklsf').then((module) => {
    resolve(module)
  })
}
const Gd11x5 = (resolve) => {
  import('@/components/Lottery/Gd11x5').then((module) => {
    resolve(module)
  })
}
const Shssl = (resolve) => {
  import('@/components/Lottery/Shssl').then((module) => {
    resolve(module)
  })
}
const Bj28 = (resolve) => {
  import('@/components/Lottery/Bj28').then((module) => {
    resolve(module)
  })
}
const Txffc = (resolve) => {
  import('@/components/Lottery/Txffc').then((module) => {
    resolve(module)
  })
}
const lottery_result = (resolve) => {
  import('@/components/Lottery/lottery_result').then((module) => {
    resolve(module)
  });
}
const NoteInquiry = (resolve) => {
  import('@/components/Lottery/NoteInquiry').then((module) => {
    resolve(module)
  });
}
const Yfssc = (resolve) => {
  import('@/components/Lottery/Yfssc').then((module) => {
    resolve(module)
  });
}
Vue.use(Router)
const route = new Router({
  linkActiveClass: 'u-link--Active',
  mode: 'history',
  base: '/',
  routes: [
    {
      path:'/lottery:id',
      name:'lottery',
      component:lottery,
      children:[
        {
          path: '/lhc',
          name: 'Xglhc',
          component: page,
        },
        {
          path:'/Txffc',
          name:'Txffc',
          component:Txffc
        },
        {
          path: '/Yfssc',
          name: 'Yfssc',
          component:Yfssc
        },
        {
          path:'/NoteInquiry',
          name:'NoteInquiry',
          component:NoteInquiry
        },
        {
          path: '/lottery_result',
          name: 'lottery_result',
          component: lottery_result
        },
        {
          path:'/Bj28',
          name: 'Bj28',
          component: Bj28
        },
        {
          path: '/Shssl',
          name: 'Shssl',
          component: Shssl
        },
        {
          path: '/gxklsf',
          name: 'Gxklsf',
          component:gxklsf
        },
        {
          path: '/Gd11x5',
          name: 'Gd11x5',
          component: Gd11x5
        },
        {
          path: '/hnklsf',
          name: 'Hnklsf',
          component: hnklsf
        },
        {
          path: '/Cqklsf',
          name: 'Cqklsf',
          component: Cqklsf
        },
        {
          path: '/tjklsf',
          name: 'Tjklsf',
          component: tjklsf
        },
        {
          path: '/jsk3',
          name: 'Jsk3',
          component: jsk3
        },
        {
          path: '/gxk3',
          name: 'Gxk3',
          component: gxk3
        },
        {
          path: '/jlk3',
          name: 'Jlk3',
          component: jlk3
        },
        {
          path: '/ahk3',
          name: 'Ahk3',
          component: ahk3
        },
        {
          path: '/hbk3',
          name: 'Hbk3',
          component: hbk3
        },
        {
          path: '/nmgk3',
          name: 'Nmgk3',
          component: nmgk3
        },
        {
          path: '/Fjk3',
          name: 'Fjk3',
          component: Fjk3
        },
        {
          path: '/Bjk3',
          name: 'Bjk3',
          component: Bjk3
        },  
        {
          path: '/hubk3',
          name: 'Hubk3',
          component: hubk3
        },
        {
          path: '/shk3',
          name: 'Shk3',
          component: shk3
        },
        {
          path:'/Gsk3',
          name:'Gsk3',
          component:Gsk3
        },
        {
          path: '/Fc3d',
          name: 'Fc3d',
          component: fucai,
        },
        {
          path: '/bjkl8',
          name: 'Bjkl8',
          component: bjkl8
        },
        {
          path: '/Bjpk10',
          name: 'Bjpk10',
          component: bjpks
        },
        {
          path: '/cqssc',
          name: 'Cqssc',
          component: cqssc
        },
        {
          path: '/gdklsf',
          name: 'Gdklsf',
          component: gdklsf
        },
        {
          path: '/Tcpl3',
          name: 'Tcpl3',
          component: tcpl,
        },
        {
          path: '/xjssc',
          name: 'Xjssc',
          component: xjssc
        },
        {
          path: '/Tjssc',
          name: 'Tjssc',
          component: Tjssc
        }
      ]
    },
  ]
});
route.afterEach((to) => {
  let disDL = ['lottery_result','NoteInquiry'];
    if(disDL.indexOf(to.matched&&to.matched.length>0?to.matched[0].name:to.name)!==-1){
      store.commit("SHOWBOTTOM",false);
    }else{
      store.commit("SHOWBOTTOM",true);
  }
})
export default route;