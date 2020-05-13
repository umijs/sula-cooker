const getFormMode = props => {
  let mode = 'create';
  const { path } = props.match;
  if (path.includes('edit')) {
    mode = 'edit';
  } else if (path.includes('view') || path.includes('detail')) {
    mode = 'view';
  }
  return mode;
};

export default getFormMode;
