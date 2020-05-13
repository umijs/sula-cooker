import { Random, mock } from 'mockjs';
import moment from 'moment';

const status = ['dispatching', 'success', 'warning'];

const level = ['High', 'Medium', 'Low'];

const recipientName = ['Lucy', 'Lily', 'Jack', 'Mocy'];

const recipientTime = ['morning', 'afternoon', 'night'];

const priceProject = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

const SERIAL = 'SERIAL_NUMBER_';

const success = {
  success: true,
  code: 200,
  message: 'success',
  description: 'success',
};

const faild = {
  success: false,
  code: 404,
  message: 'faild',
  description: 'Page not found',
};

let dataSource = [];
for (let i = 0; i < 200; i += 1) {
  dataSource.push({
    id: i + '',
    name: Random.name(),
    senderName: Random.name(),
    senderNumber: Random.id(),
    senderAddress: Random.sentence(2, 3),
    recipientName: Random.pick(recipientName),
    recipientNumber: Random.id(),
    recipientAddress: Random.sentence(2, 3),
    recipientTime: Random.pick(recipientTime),
    time: [Random.date('yyyy-MM-dd'), Random.date('yyyy-MM-dd')],
    priceProject: Random.pick(priceProject),
    address: Random.city(true),
    status: Random.pick(status),
    level: Random.pick(level),
    description: Random.sentence(3, 4),
    times: Random.natural(),
    createTime: Random.date('MM-dd HH:mm:ss'),
    ruler: [[{ type: 'price', comparator: 'lt', value: '100' }]],
  });
}

let maxId = -1;
dataSource.forEach(({ id }) => {
  if (id > maxId) {
    maxId = id;
  }
});

function getPagingData(
  { current, pageSize },
  filters = {},
  { order, columnKey } = {},
  nopag,
) {
  let filteredDataSource = dataSource;
  if (Object.keys(filters).length) {
    filteredDataSource = filteredDataSource.filter(row => {
      const isMatched = Object.keys(filters).every(key => {
        const filterValue = filters[key];
        const cellValue = row[key];
        if (filterValue === null) {
          return true;
        }
        if (Array.isArray(filterValue)) {
          if (filterValue.length === 0) {
            return true;
          }
          if (typeof cellValue === 'string') {
            return filterValue.includes(cellValue);
          }
          return true;
        }
        if (typeof cellValue === 'number' || typeof cellValue === 'boolean') {
          return filterValue === cellValue;
        }
        if (typeof cellValue !== 'number' && !cellValue) {
          return true;
        }

        if (key === 'id') {
          return `${SERIAL}${cellValue}`.includes(filterValue);
        }

        return cellValue.includes(filterValue);
      });

      return isMatched;
    });
  }

  if (order) {
    filteredDataSource.sort((a, b) => {
      return order === 'ascend'
        ? a[columnKey] - b[columnKey]
        : b[columnKey] - a[columnKey];
    });
  }

  const pageData = [];
  const start = (current - 1) * pageSize;
  let end = current * pageSize;

  if (end > filteredDataSource.length) {
    end = filteredDataSource.length;
  }
  for (let i = start; i < end; i += 1) {
    pageData.push(filteredDataSource[i]);
  }

  if (nopag) {
    return {
      ...success,
      data: dataSource.slice(0, 20),
    };
  }

  return {
    ...success,
    data: {
      list: pageData,
      total: filteredDataSource.length,
      pageSize,
      current,
    },
  };
}

const listApi = (body, nopag) => {
  const { filters, pageSize, current, sorter } = body;
  return getPagingData({ current, pageSize }, filters, sorter, nopag);
};

const addApi = body => {
  const { name, time = [], ...restReq } = body;
  dataSource.forEach(({ id }) => {
    if (Number(id) > Number(maxId)) {
      maxId = id;
    }
  });
  dataSource.unshift({
    id: String(maxId * 1 + 1),
    status: Random.pick(status),
    time: time.map(v => moment(v).format('YYYY-MM-DD')),
    ...restReq,
  });
  return success;
};

const deleteApi = ({ rowKeys }) => {
  const selectedRowKeys = Array.isArray(rowKeys) ? rowKeys : [rowKeys];
  selectedRowKeys.forEach(id => {
    dataSource = dataSource.filter(v => v.id != id);
  });
  return success;
};

const detailApi = body => {
  const { id } = body;
  const data = dataSource.find(v => v.id == id);
  return {
    ...success,
    data,
  };
};

const getList = data => ({
  ...success,
  data: data.map(v => ({ text: v, value: v })),
});

const getPlugins = () => ({
  ...success,
  data: {
    id: 123454321,
    input: 'sula',
    autocomplete: 'sula',
    textarea: 'sula-sula',
    inputnumber: 123,
    rate: 2,
    slider: 10,
    switch: true,
    checkboxgroup: ['sula'],
    radiogroup: 'sula',
    select: 'sula',
    treeselect: '0-0-1',
    cascader: ['zhejiang', 'hangzhou', 'xihu'],
    transfer: ['0', '1'],
    timepicker: '2019-12-16T13:08:31.001Z',
    datepicker: '2019-12-17T11:06:30.005Z',
    rangepicker: ['2019-12-16T11:06:30.009Z', '2019-12-19T11:06:30.009Z'],
    upload: [
      {
        uid: 'rc-upload-1576589336277-4',
        lastModified: 1576318435446,
        lastModifiedDate: '2019-12-14T10:13:55.446Z',
        name: 'scatter-simple.html',
        size: 1823,
        type: 'text/html',
        percent: 0,
        originFileObj: {
          uid: 'rc-upload-1576589336277-4',
        },
      },
    ],
  },
});

function logInfo(req, data) {
  const { url, type, body } = req;
  const jsonBody = JSON.parse(body);

  console.log(
    `%c request: %c ${type} ${url}`,
    'color:#f80;font-weight:bold;',
    'color:#f00;',
  );
  console.log('%c params:', 'color:#f80;font-weight:bold;', jsonBody);
  console.log('%c response:', 'color:#f80;font-weight:bold;', data);
  console.log('');
}

mock('/api/manage/list.json', 'post', function(req) {
  const { body } = req;
  const data = listApi(JSON.parse(body));
  logInfo(req, data);
  return data;
});

mock('/api/manage/listnopag.json', 'post', function(req) {
  const { body } = req;
  const data = listApi(JSON.parse(body), true);
  return data;
});

mock('/api/manage/add.json', 'post', function(req) {
  const { body } = req;
  const data = addApi(JSON.parse(body));
  logInfo(req, data);
  return data;
});

mock('/api/manage/delete.json', 'post', function(req) {
  const { body } = req;
  const data = deleteApi(JSON.parse(body));
  logInfo(req, data);
  return data;
});

mock('/api/manage/detail.json', 'post', function(req) {
  const { body } = req;
  const data = detailApi(JSON.parse(body));
  logInfo(req, data);
  return data;
});

mock('/api/manage/statusList.json', function(req) {
  const data = getList(status);
  logInfo(req, data);
  return data;
});
mock('/api/manage/priceList.json', function(req) {
  const data = getList(priceProject);
  logInfo(req, data);
  return data;
});
mock('/api/manage/recipientList.json', function(req) {
  const data = getList(recipientName);
  logInfo(req, data);
  return data;
});
mock('/api/manage/plugins.json', 'post', function(req) {
  const data = getPlugins();
  logInfo(req, data);
  return data;
});

mock('/api/techuiplugin.json', 'post', function(req) {
  const data = {
    ...success,
    data: {
      checkcard: true,
      checkcardgroup: ['B'],
      colorpicker: ['#FF86B7', '#5B8FF9'],
      inputamount: { amount: 11, currency: 'Rmb' },
      sliderinput: 0.39,
      tagfilter: ['cat9'],
      lightfilter: [1, '23'],
    },
  };
  logInfo(req, data);
  return data;
});
