import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Column3D = ({chartData}) => {
  const chartConfigs = {
    type: 'column3d',
    width: '100%',
    // height: '100%',
    dataFormat: 'json',
    dataSource: {
      "chart": {
        "caption": "Most Popular",
        "xAxisName": "Stars",
        "yAxisName": "Repos",  
        "theme": "fusion",
        "decimals": "0"
      },
      "data": chartData
    },
  };
  return <ReactFC {...chartConfigs} />;
}

export default Column3D;

