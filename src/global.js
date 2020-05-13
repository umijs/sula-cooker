import { Icon } from 'sula';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  RedoOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import Mock from 'mockjs';

import 'antd/dist/antd.min.css';
import '../mock';

Mock.setup({
  timeout: '1000-2000',
});

Icon.iconRegister({
  edit: {
    outlined: EditOutlined,
  },
  delete: {
    outlined: DeleteOutlined,
  },
  plus: {
    outlined: PlusOutlined,
  },
  redo: {
    outlined: RedoOutlined,
  },
  eye: {
    outlined: EyeOutlined,
  },
});
