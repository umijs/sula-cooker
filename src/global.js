import { Icon } from 'sula';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  RedoOutlined,
  EyeOutlined,
} from '@ant-design/icons';

import 'antd/dist/antd.min.css';
import '../mock';

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
