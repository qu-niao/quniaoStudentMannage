import { Pie, Column } from '@ant-design/plots';

export const RingChart = ({ data, content, color = null }) => {
  const config= {
    appendPadding: 10,
    data,
    angleField: 'count',
    colorField: 'name',
    radius: 1,
    ...(color || {}),
    innerRadius: 0.6,
    label: false,
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: 24,
        },
        content: content,
      },
    },
  };
  return <Pie {...config} style={{ height: 'calc(100vh - 410px)' }} />;
};