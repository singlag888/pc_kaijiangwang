import Vue from 'vue'
import Router from 'vue-router'
import IndexContainer from '@/components/indexContainer'
import Home from '@/components/index/home'
import IndexLeft from '@/components/index/indexLeft'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexContainer',
      component: IndexContainer,
      children: [
        {
          path: '/',
          name: 'Home',
          alias: '/index',
          component: Home,
          children: [
            {
              name: 'IndexLeft',
              path: '/',
              alias: '/index',
              component: IndexLeft,
            },
            {
              name: 'articleDetails',
              path: '/articleDetails/:id',
              component: () => import ('@/components/index/articleDetails'),
            },
            {
              name: 'trend',
              path: '/trend',
              component: () => import ('@/components/index/trend'),
            },
            {
              name: 'footerDetails',
              path: '/footerDetails/:identification',
              component: () => import ('@/components/index/footerDetails'),
            }
          ]
        },
        {
          path: 'Data',
          name: 'Data',
          component: () => import ('@/components/dataContainer/dataContainer'),
          children: [
            {
              path: 'historyData',
              name: 'historyData',
              component: () => import ('@/components/dataContainer/historyData/historyData')
            },
            {
              path: 'numberPlan',
              name: 'numberPlan',
              component: () => import ('@/components/dataContainer/numberPlan/numberPlan')
            },
            {
              path: 'trendChart',
              name: 'trendChart',
              component: () => import ('@/components/dataContainer/trendChart/trendChart')
            },
            {
              path: 'hotNumber',
              name: 'hotNumber',
              component: () => import ('@/components/dataContainer/hotNumber/hotNumber')
            },
            {
              path: 'luZhu',
              name: 'luZhu',
              component: () => import ('@/components/dataContainer/louZhu/louZhu')
            },
            {
              path: 'liveVideo',
              name: 'liveVideo',
              component: () => import ('@/components/dataContainer/liveVideo/liveVideo'),
              children: [
                {
                  path: 'ssc',
                  name: 'ssc',
                  component: () => import ('@/components/dataContainer/liveVideo/ssc')
                },
                {
                  path: 'pk10',
                  name: 'pk10',
                  component: () => import ('@/components/dataContainer/liveVideo/pk10')
                },
              ],
            }
          ],
        },

      ]
    },
    {
      name: 'forecastOverview',
      path: '/forecastOverview',
      component: () => import ('@/components/forecastOverview'),
    },
    {
      path: '/page404',
      name: 'page404',
      component: () => import ('@/components/base/page404')
    }
  ]
})
