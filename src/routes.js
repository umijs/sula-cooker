import CardForm from '@/pages/form/card';
import NestedCard from '@/pages/form/nestedcard';
import StepForm from '@/pages/form/stepform';
import Table from '@/pages/list/basic';
import SingleSearch from '@/pages/list/singlesearch';
import AdvancedSearch from '@/pages/list/advancedsearch';
import StepQueryTable from '@/pages/list/stepquerytable';
import NoPagination from '@/pages/list/nopagination';
import Vertical from '@/pages/form/vertical';
import Horizontal from '@/pages/form/horizontal';
import Media from '@/pages/form/media';

import TablePlugin from '@/pages/sulaplugin/table';
import FormPlugin from '@/pages/sulaplugin/form';

import FormLayout from '@/pages/sulalayout/form';

export default [
  {
    path: '/',
    redirect: '/list/basic',
    exact: true,
  },
  /** 表单 */
  {
    name: 'Nested Card',
    path: '/form/nestedcard',
    routes: [
      {
        path: '/form/nestedcard',
        redirect: '/form/nestedcard/create',
        exact: true,
      },
      {
        path: '/form/nestedcard/create',
        name: 'Create',
        component: NestedCard,
      },
      {
        path: '/form/nestedcard/edit/:id',
        name: 'Edit',
        component: NestedCard,
      },
      {
        path: '/form/nestedcard/view/:id',
        name: 'View',
        component: NestedCard,
      },
    ],
  },
  {
    name: 'Card',
    path: '/form/card',
    routes: [
      {
        path: '/form/card',
        redirect: '/form/card/create',
        exact: true,
      },
      {
        path: '/form/card/create',
        name: 'Create',
        component: CardForm,
      },
      {
        path: '/form/card/edit/:id',
        name: 'Edit',
        component: CardForm,
      },
      {
        path: '/form/card/view/:id',
        name: 'View',
        component: CardForm,
      },
    ],
  },
  {
    name: 'Vertical',
    path: '/form/vertical',
    routes: [
      {
        path: '/form/vertical',
        redirect: '/form/vertical/create',
        exact: true,
      },
      {
        path: '/form/vertical/create',
        name: 'Create',
        component: Vertical,
      },
      {
        path: '/form/vertical/edit/:id',
        name: 'Edit',
        component: Vertical,
      },
      {
        path: '/form/vertical/view/:id',
        name: 'View',
        component: Vertical,
      },
    ],
  },
  {
    name: 'Horizontal',
    path: '/form/horizontal',
    routes: [
      {
        path: '/form/horizontal',
        redirect: '/form/horizontal/create',
        exact: true,
      },
      {
        path: '/form/horizontal/create',
        name: 'Create',
        component: Horizontal,
      },
      {
        path: '/form/horizontal/edit/:id',
        name: 'Edit',
        component: Horizontal,
      },
      {
        path: '/form/horizontal/view/:id',
        name: 'View',
        component: Horizontal,
      },
    ],
  },
  {
    name: 'Media',
    path: '/form/media',
    routes: [
      {
        path: '/form/media',
        redirect: '/form/media/create',
        exact: true,
      },
      {
        path: '/form/media/create',
        name: 'Create',
        component: Media,
      },
      {
        path: '/form/media/edit/:id',
        name: 'Edit',
        component: Media,
      },
      {
        path: '/form/media/view/:id',
        name: 'View',
        component: Media,
      },
    ],
  },
  {
    name: 'StepForm',
    path: '/form/stepform',
    routes: [
      {
        path: '/form/stepform',
        redirect: '/form/stepform/create',
        exact: true,
      },
      {
        path: '/form/stepform/create',
        name: 'Create',
        component: StepForm,
      },
      {
        path: '/form/stepform/edit/:id',
        name: 'Edit',
        component: StepForm,
      },
      {
        path: '/form/stepform/view/:id',
        name: 'View',
        component: StepForm,
      },
    ],
  },
  /** 列表 */
  {
    name: 'List',
    path: '/list',
    routes: [
      {
        path: '/list',
        redirect: '/list/basic',
        exact: true,
      },
      {
        name: 'Basic',
        path: '/list/basic',
        component: Table,
      },
      {
        name: 'SingleSearch',
        path: '/list/singlesearch',
        component: SingleSearch,
      },
      {
        name: 'AdvancedSearch',
        path: '/list/advancedsearch',
        component: AdvancedSearch,
      },
      {
        name: 'StepQueryTable',
        path: '/list/stepquerytable',
        component: StepQueryTable,
      },
      {
        name: 'NoPagination',
        path: '/list/nopagination',
        component: NoPagination,
      },
    ],
  },
  /** 布局 */
  {
    name: 'Layout',
    path: '/layout',
    routes: [
      {
        path: '/layout',
        redirect: '/layout/form',
        exact: true,
      },
      {
        path: '/layout/form',
        component: FormLayout,
      },
    ],
  },
  /** 插件 */
  {
    name: 'Plugin',
    path: '/plugin',
    routes: [
      {
        path: '/plugin',
        redirect: '/plugin/table',
        exact: true,
      },
      {
        path: '/plugin/table',
        component: TablePlugin,
      },
      {
        path: '/plugin/form',
        component: FormPlugin,
      },
    ],
  },
];
