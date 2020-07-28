import {
  BulbOutlined,
  TableOutlined,
  FormOutlined,
  LayoutOutlined,
} from '@ant-design/icons';

export default [
  {
    name: 'List',
    icon: <TableOutlined />,
    hasChildren: true,
    children: [
      {
        name: 'Table',
        link: '#/list/basic',
      },
      {
        name: 'SingleSearch',
        link: '#/list/singlesearch',
      },
      {
        name: 'AdvancedSearch',
        link: '#/list/advancedsearch',
      },
      {
        name: 'StepQueryTable',
        link: '#/list/stepquerytable',
      },
      {
        name: 'NoPagination',
        link: '#/list/nopagination',
      },
    ],
  },
  {
    name: 'Form',
    icon: <FormOutlined />,
    hasChildren: true,
    children: [
      {
        name: 'Card',
        link: '#/form/card',
      },
      {
        name: 'NestedCard',
        link: '#/form/nestedcard',
      },
      {
        name: 'Vertical',
        link: '#/form/vertical',
      },
      {
        name: 'Media',
        link: '#/form/media',
      },
      {
        name: 'Horizontal',
        link: '#/form/horizontal',
      },
      {
        name: 'StepForm',
        link: '#/form/stepform',
      },
    ],
  },
  {
    name: 'Form Layout',
    icon: <LayoutOutlined />,
    hasChildren: true,
    children: [
      {
        name: 'form',
        link: '#/layout/form',
      },
    ],
  },
  {
    name: 'Plugin',
    icon: <BulbOutlined />,
    hasChildren: true,
    children: [
      {
        name: 'table',
        link: '#/plugin/table',
      },
      {
        name: 'form',
        link: '#/plugin/form',
      },
    ],
  },
];
