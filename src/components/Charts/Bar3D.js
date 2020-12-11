import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Bar3D = ({chartData}) => {
  const chartConfigs = {
    type: 'bar3d',
    width: '100%',
    // height: '100%',
    dataFormat: 'json',
    dataSource: {
      "chart": {
        "caption": "Most Forked",
        "xAxisName": "Repos",
        "yAxisName": "Forks",  
        "theme": "fusion",
        "decimals": "0"
      },
      "data": chartData
    },
  };
  return <ReactFC {...chartConfigs} />;
}

export default Bar3D;
